import { Subparameter } from 'src/parametric/subparameters/entities/subparameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Document {
  id: string
  userId: string
  url: string
  documentTypeId: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  creator?: User | null
  updater?: User | null

  user?: User | null
  documentType?: Subparameter | null
}
