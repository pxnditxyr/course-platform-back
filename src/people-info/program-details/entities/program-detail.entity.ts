import { Advertising } from 'src/advertising/adverstising/entities/advertising.entity'
import { Subparameter } from 'src/parametrics/subparameters/entities/subparameter.entity'
import { User } from 'src/users/users/entities/user.entity'

export class ProgramDetail {
  id: string
  userId: string
  paymentMethodId: string
  registrationConditionId: string
  howToFindOutId: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string

  creator: User
  updater: User
  user: User

  paymentMethod: Subparameter
  registrationCondition: Subparameter
  howToFindOut: Advertising
}
