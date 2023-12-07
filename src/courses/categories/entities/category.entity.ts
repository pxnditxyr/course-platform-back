import { Course } from 'src/courses/courses/entities/course.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Category {
  id: string
  name: string
  details: string
  imageUrl?: string | null
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  creator?: User | null
  updater?: User | null

  courses?: Course[]
}
