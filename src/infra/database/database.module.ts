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
    PrismaQuestionsRespository,
    PrismaQuestionCommentsRespository,
    PrismaQuestionAttachementsRespository,
    PrismaAnswersRespository,
    PrismaAnswerCommentsRespository,
    PrismaAnswerAttachmentsRespository,
  ],
  exports: [
    PrismaService,
    PrismaQuestionsRespository,
    PrismaQuestionCommentsRespository,
    PrismaQuestionAttachementsRespository,
    PrismaAnswersRespository,
    PrismaAnswerCommentsRespository,
    PrismaAnswerAttachmentsRespository,
  ],
})
export class DataBaseModule {}
