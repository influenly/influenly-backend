import { UserRoles, UserType } from 'src/common/constants';
export interface AuthDecoratorInput {
    role?: UserRoles.ADMIN | UserRoles.REGULAR;
    type?: UserType;
}
