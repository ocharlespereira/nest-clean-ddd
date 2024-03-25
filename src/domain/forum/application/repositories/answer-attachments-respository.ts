import { AnswerAttachement } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachement[]>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
