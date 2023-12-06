export class User {
  id: string
  email: string
  name: string
  paternalSurname: string
  maternalSurname: string
  role: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string

  creator: User
  updater: User
}
