import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments-respository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-respository'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-respository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let inMemoryStudentRepository: InMemoryStudentRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
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
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 10) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 5) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 16) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 16) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 10) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 5) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
