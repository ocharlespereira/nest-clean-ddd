import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-respository'
import { QuestionAttachement } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentRepository
{
  public items: QuestionAttachement[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }

  async createMany(attachments: QuestionAttachement[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachement[]): Promise<void> {
    const questionAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = questionAttachments
  }
}
