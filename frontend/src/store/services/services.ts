import { Storage } from "./storage/storage.service"
import { Http } from "./http/http.service"
import { AuthApi } from "./auth-api/auth-api.service"
import { UsersApi } from "./users-api/users-api.service"
import { Notification } from "./notification/notification.service"

const storage = new Storage({
  storage: localStorage,
})

const http = new Http({
  storage,
})

const authApi = new AuthApi({
  http,
})

const usersApi = new UsersApi({
  http,
})

const notification = new Notification()

export { storage, http, authApi, usersApi, notification }
