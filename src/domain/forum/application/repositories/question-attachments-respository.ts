import { QuestionAttachement } from '../../enterprise/entities/question-attachment'

export abstract class QuestionAttachmentRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachement[]>

  abstract createMany(attachments: QuestionAttachement[]): Promise<void>
  abstract deleteMany(attachments: QuestionAttachement[]): Promise<void>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
