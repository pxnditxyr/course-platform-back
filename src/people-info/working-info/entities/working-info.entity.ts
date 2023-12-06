import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class WorkingInfo {
  id: string
  userId: string
  profession: string
  professionLevelId: string
  institutionTitle: string
  jobAddress: string
  position: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
    
  user: User
  creator: User
  updater: User

  professionLevel: Subparameter
}
