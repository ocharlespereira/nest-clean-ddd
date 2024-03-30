import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-respository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { AnswerAttachement } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachementList } from '../../enterprise/entities/answer-attachment-list'

interface AnwserQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type AnwserQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

@Injectable()
export class AnwserQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  async execute({
    authorId,
    questionId,
    content,
    attachmentsIds,
  }: AnwserQuestionUseCaseRequest): Promise<AnwserQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })
    console.log('answer :', answer.id)

    const answerAttachments = attachmentsIds.map((attachmentsIds) => {
      return AnswerAttachement.create({
        attachmentId: new UniqueEntityID(attachmentsIds),
        answerId: answer.id,
      })
    })

    // info vindo do Question.set.attachments para criar os Ids
    answer.attachments = new AnswerAttachementList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}
