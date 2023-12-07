import { Course } from 'src/courses/courses/entities/course.entity'
import { User } from 'src/users/users/entities/user.entity'

export class TakenCourse {
  id: string
  userId: string
  courseId: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null

  creator?: User | null
  updater?: User | null

  user: User
  course: Course
}
