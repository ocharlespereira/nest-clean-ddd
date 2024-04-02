import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { OnQuestionBestaAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '@/domain/notification/application/use-case/send-notification'
import { Module } from '@nestjs/common'
import { DataBaseModule } from '../database/database.module'

@Module({
  imports: [DataBaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestaAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
