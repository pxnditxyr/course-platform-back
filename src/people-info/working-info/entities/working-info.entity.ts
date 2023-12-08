import { Subparameter } from 'src/parametric/subparameters/entities/subparameter.entity'
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
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null
    
  user?: User | null
  creator?: User | null
  updater?: User | null

  professionLevel?: Subparameter | null
}
