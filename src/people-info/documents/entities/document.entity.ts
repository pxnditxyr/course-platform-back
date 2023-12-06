import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Document {
  id: string
  userId: string
  imageUrl: string
  documentTypeInt: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string

  creator: User
  updater: User

  user: User
  documentType: Subparameter
}
