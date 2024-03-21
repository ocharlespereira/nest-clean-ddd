import { QuestionsRepository } from '@/domain/forum/application/repositories/question-respository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRespository } from './prisma/repositories/prisma-answer-attachments-respository'
import { PrismaAnswerCommentsRespository } from './prisma/repositories/prisma-answer-comments-respository'
import { PrismaAnswersRespository } from './prisma/repositories/prisma-answers-respository'
import { PrismaQuestionAttachementsRespository } from './prisma/repositories/prisma-question-attachments-respository'
import { PrismaQuestionCommentsRespository } from './prisma/repositories/prisma-question-comments-respository'
import { PrismaQuestionsRespository } from './prisma/repositories/prisma-questions-respository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRespository,
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
    PrismaQuestionCommentsRespository,
    PrismaQuestionAttachementsRespository,
    PrismaAnswersRespository,
    PrismaAnswerCommentsRespository,
    PrismaAnswerAttachmentsRespository,
  ],
})
export class DataBaseModule {}
