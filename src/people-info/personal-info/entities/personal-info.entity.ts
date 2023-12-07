import { Subparameter } from "src/parametric/subparameters/entities/subparameter.entity"
import { User } from "src/users/users/entities/user.entity"

export class PersonalInfo {
  id: string
  userId: string
  ciExtentionId: string
  genderId: string
  birthDate: Date
  nationality: string
  status: boolean
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string

  creator: User
  updater: User
  user: User

  ciExtention: Subparameter
  gender: Subparameter
}
