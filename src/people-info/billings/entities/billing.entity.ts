import { User } from 'src/users/users/entities/user.entity'

export class Billing {
  id: string
  userId: string
  nit: string
  reason: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string

  user: User
  creator: User
  updater: User
}
