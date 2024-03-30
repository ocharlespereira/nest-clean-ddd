import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachement } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Attachment as AnswerAttachment, Prisma } from '@prisma/client'

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

  static toPrismaUpdateMany(
    attachments: AnswerAttachement[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString()
    })

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        answerId: attachments[0].answerId.toString(),
      },
    }
  }
}
