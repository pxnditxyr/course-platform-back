import { Parameter } from 'src/parametrics/parameters/entities/parameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Subparameter {
  id: string
  name: string
  details: string
  parameterId: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string

  creator: User
  updater: User
  parameter: Parameter
}
