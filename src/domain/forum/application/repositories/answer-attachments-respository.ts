import { AnswerAttachement } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachement[]>
  abstract createMany(attachments: AnswerAttachement[]): Promise<void>
  abstract deleteMany(attachments: AnswerAttachement[]): Promise<void>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
