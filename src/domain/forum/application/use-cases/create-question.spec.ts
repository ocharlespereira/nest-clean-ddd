import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments-respository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-respository'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-respository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let inMemoryStudentRepository: InMemoryStudentRepository
let sut: CreateQuestionUseCase

describe('Create Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
    inMemoryStudentRepository = new InMemoryStudentRepository()

    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentRepository,
      inMemoryStudentRepository,
    )

    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a new question with attachemnts', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'Question content',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })

  it('should persist attachments when creating a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'Question content',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryQuestionAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]),
    )
  })
})
