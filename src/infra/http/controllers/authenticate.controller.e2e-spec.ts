import { AppModule } from '@/infra/app.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

describe('Create Authenticate (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DataBaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  it('[POST] /sessions', async () => {
    await studentFactory.makePrismaStudent({
      email: 'jon@example.com',
      password: await hash('123123', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'jon@example.com',
      password: '123123',
    })

    expect(response.statusCode).toBe(200)

    expect(response.body).toEqual({
      accessToken: expect.any(String),
    })
  })
})
