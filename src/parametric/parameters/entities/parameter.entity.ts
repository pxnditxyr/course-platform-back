import { Subparameter } from 'src/parametric/subparameters/entities/subparameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Parameter {
  id: string
  name: string
  details: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  creator?: User | null
  updater?: User | null

  subparameters?: Subparameter[]
}
