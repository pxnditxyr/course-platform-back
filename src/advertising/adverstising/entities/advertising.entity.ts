import { ProgramDetail } from 'src/people-info/program-details/entities/program-detail.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Advertising {
  id: string
  name: string
  description: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string

  creator: User
  updater: User

  howToFindOut: ProgramDetail[]
}
