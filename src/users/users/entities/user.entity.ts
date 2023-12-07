export class User {
  id: string
  email: string
  name: string
  paternalSurname: string
  maternalSurname: string
  role: string
  password: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  creator?: User | null
  updater?: User | null
}
