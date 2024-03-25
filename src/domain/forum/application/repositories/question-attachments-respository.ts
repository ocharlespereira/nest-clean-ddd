import { QuestionAttachement } from '../../enterprise/entities/question-attachment'

export abstract class QuestionAttachmentRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachement[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
