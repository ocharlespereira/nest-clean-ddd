import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachement } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Attachment as AnswerAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: AnswerAttachment): AnswerAttachement {
    if (!raw.answerId) {
      throw new Error('Invalid attachment type.')
    }

    return AnswerAttachement.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        answerId: new UniqueEntityID(raw.answerId),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
