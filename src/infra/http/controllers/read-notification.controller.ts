import { ReadNotificationUseCase } from '@/domain/notification/application/use-case/read-notification'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('/notifications/:notificationtId/read')
export class ReadNotificationController {
  constructor(private readNotifications: ReadNotificationUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('notificationtId') notificationtId: string,
  ) {
    const result = await this.readNotifications.execute({
      notificationtId,
      recipientId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
