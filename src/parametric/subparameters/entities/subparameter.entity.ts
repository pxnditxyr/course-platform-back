import { Parameter } from 'src/parametric/parameters/entities/parameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Subparameter {
  id: string
  name: string
  details: string
  parameterId: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  creator?: User | null
  updater?: User | null
  parameter?: Parameter | null
}
