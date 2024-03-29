import { User } from 'src/users/users/entities/user.entity'

export class ContactInfo {
  id: string
  userId: string
  phone: string
  landline: string
  department: string
  city: string
  address: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  user?: User | null
  creator?: User | null
  updater?: User | null
}
