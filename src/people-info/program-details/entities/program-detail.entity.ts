import { Advertising } from 'src/advertising/adverstising/entities/advertising.entity'
import { Subparameter } from 'src/parametric/subparameters/entities/subparameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class ProgramDetail {
  id: string
  userId: string
  paymentMethodId: string
  registrationConditionId: string
  howToFindOutId: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  creator?: User | null
  updater?: User | null
  user?: User | null

  paymentMethod?: Subparameter | null
  registrationCondition?: Subparameter | null
  howToFindOut?: Advertising | null
}
