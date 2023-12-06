import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Parameter {
  id: string
  name: string
  details: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string

  creator: User
  updater: User

  subparameters: Subparameter[]
}
