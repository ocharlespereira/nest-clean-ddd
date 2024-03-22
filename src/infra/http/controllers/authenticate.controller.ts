import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'

const AuthenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof AuthenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(AuthenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return {
      accessToken,
    }
  }
}
