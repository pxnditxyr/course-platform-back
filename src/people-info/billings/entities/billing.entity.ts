import { User } from 'src/users/users/entities/user.entity'

export class Billing {
  id: string
  userId: string
  nit: string
  reason: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  user?: User | null
  creator?: User | null
  updater?: User | null
}
