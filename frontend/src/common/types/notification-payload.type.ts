import { NotificationType } from "../enums/notification/notification"

type NotificationPayload = {
  type: NotificationType
  message: string
}

export { type NotificationPayload }
