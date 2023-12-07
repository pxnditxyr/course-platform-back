import { Category } from 'src/courses/categories/entities/category.entity'
import { TakenCourse } from 'src/courses/taken-courses/entities/taken-course.entity'
import { User } from 'src/users/users/entities/user.entity'

export class Course {
  id: string
  name: string
  details: string
  categoryId: string
  city: string
  version: string
  startDate: Date
  endDate: Date
  imageUrl: string
  status: boolean
  createdAt: Date
  createdBy?: string | null
  updatedAt: Date
  updatedBy?: string | null
  
  creator?: User | null
  updater?: User | null

  category: Category
  takenCourses: TakenCourse[]
}
