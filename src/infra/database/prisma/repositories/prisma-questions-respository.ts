import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-respository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-respository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/values-objects/question-details'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { Injectable } from '@nestjs/common'
import { PrismanQuestionDetailsMapper } from '../mappers/prisma-question-details-mapper'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionsRespository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private cacheRepository: CacheRepository,
    private questionAttachments: QuestionAttachmentRepository,
  ) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { slug },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const CACHE_KEY = `question:${slug}:details`
    const cacheHit = await this.cacheRepository.get(CACHE_KEY)

    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit)

      return cacheData
    }

    const question = await this.prisma.question.findUnique({
      where: { slug },
      include: {
        author: true,
        attachments: true,
      },
    })

    if (!question) {
      return null
    }

    const questionDetails = PrismanQuestionDetailsMapper.toDomain(question)

    // cache
    await this.cacheRepository.set(CACHE_KEY, JSON.stringify(questionDetails))

    return questionDetails
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const perPage = 20
    const question = await this.prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return question.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data,
    })

    await this.questionAttachments.createMany(question.attachments.getItems())

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    const CACHE_KEY = `question:${data.slug}:details`

    await Promise.all([
      this.prisma.question.update({
        where: {
          id: data.id,
        },
        data,
      }),
      this.questionAttachments.createMany(question.attachments.getNewItems()),
      this.questionAttachments.deleteMany(
        question.attachments.getRemovedItems(),
      ),
      this.cacheRepository.delete(CACHE_KEY),
    ])

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question): Promise<void> {
    await this.prisma.question.delete({
      where: {
        id: question.id.toString(),
      },
    })
  }
}
