import { UseGuards, applyDecorators } from '@nestjs/common'
import { ValidRoles } from '../enums/valid-roles.enum'
import { RoleProtected } from './role-protected/role-protected.decorator'
import { AuthGuard } from '@nestjs/passport'
import { UserRoleGuard } from '../guards'

export function Auth ( ...roles : ValidRoles[] )  {
  return applyDecorators(
    RoleProtected( ...roles ),
    UseGuards( AuthGuard(), UserRoleGuard  )
  )
}
