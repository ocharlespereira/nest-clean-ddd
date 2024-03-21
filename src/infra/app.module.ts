import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { envSchema } from './env'
import { AuthenticateController } from './http/controllers/authenticate.controller'
import { CreateAccountController } from './http/controllers/create-account.controller'
import { CreateQuestionController } from './http/controllers/create-question.controller'
import { FetchRecentQuestionController } from './http/controllers/fetch-recent-question.controller'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
