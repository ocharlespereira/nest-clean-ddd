import { QuestionsRepository } from '@/domain/forum/application/repositories/question-respository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-respository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRespository } from './prisma/repositories/prisma-answer-attachments-respository'
import { PrismaAnswerCommentsRespository } from './prisma/repositories/prisma-answer-comments-respository'
import { PrismaAnswersRespository } from './prisma/repositories/prisma-answers-respository'
import { PrismaQuestionAttachementsRespository } from './prisma/repositories/prisma-question-attachments-respository'
import { PrismaQuestionCommentsRespository } from './prisma/repositories/prisma-question-comments-respository'
import { PrismaQuestionsRespository } from './prisma/repositories/prisma-questions-respository'
import { PrismaStudentsRespository } from './prisma/repositories/prisma-students-respository'

@Module({
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
    PrismaQuestionCommentsRespository,
    PrismaQuestionAttachementsRespository,
    PrismaAnswersRespository,
    PrismaAnswerCommentsRespository,
    PrismaAnswerAttachmentsRespository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    PrismaQuestionCommentsRespository,
    PrismaQuestionAttachementsRespository,
    PrismaAnswersRespository,
    PrismaAnswerCommentsRespository,
    PrismaAnswerAttachmentsRespository,
  ],
})
export class DataBaseModule {}
