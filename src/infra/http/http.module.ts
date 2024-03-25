import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { DeleteQuestionseCase } from '@/domain/forum/application/use-cases/delete-question'
import { EditQuestionseCase } from '@/domain/forum/application/use-cases/edit-question'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Module } from '@nestjs/common'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DataBaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-question.controller'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'

@Module({
  imports: [DataBaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionseCase,
    DeleteQuestionseCase,
  ],
})
export class HttpModule {}
