import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments-respository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-respository'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-respository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let inMemoryStudentRepository: InMemoryStudentRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
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
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentRepository,
    )
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comment test',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comment test',
    )
  })
})
