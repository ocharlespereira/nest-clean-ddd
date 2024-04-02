import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-respository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-respository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-respository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-respository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-respository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Module } from '@nestjs/common'
import { CacheModule } from '../cache/cache.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRespository } from './prisma/repositories/prisma-answer-attachments-respository'
import { PrismaAnswerCommentsRespository } from './prisma/repositories/prisma-answer-comments-respository'
import { PrismaAnswersRespository } from './prisma/repositories/prisma-answers-respository'
import { PrismaAttachmentsRespository } from './prisma/repositories/prisma-attachments-respository'
import { PrismaNotificationsRespository } from './prisma/repositories/prisma-notifications-repository'
import { PrismaQuestionAttachementsRespository } from './prisma/repositories/prisma-question-attachments-respository'
import { PrismaQuestionCommentsRespository } from './prisma/repositories/prisma-question-comments-respository'
import { PrismaQuestionsRespository } from './prisma/repositories/prisma-questions-respository'
import { PrismaStudentsRespository } from './prisma/repositories/prisma-students-respository'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRespository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRespository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRespository,
    },
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestionAttachementsRespository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRespository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRespository,
    },
    {
      provide: AnswerAttachmentRepository,
      useClass: PrismaAnswerAttachmentsRespository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRespository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRespository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DataBaseModule {}
