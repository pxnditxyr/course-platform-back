import { Subparameter } from "src/parametric/subparameters/entities/subparameter.entity"
import { User } from "src/users/users/entities/user.entity"

export class PersonalInfo {
  id: string
  userId: string
  ciExtensionId: string
  genderId: string
  birthDate: Date
  nationality: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  creator?: User | null
  updater?: User | null
  user?: User | null

  ciExtension?: Subparameter | null
  gender?: Subparameter | null
}
