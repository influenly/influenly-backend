import { UserTypes } from 'src/common/constants/enums/user-types.enum';
export interface IJwtPayload {
    userId: number;
    userType: UserTypes.ADVERTISER | UserTypes.CREATOR;
}
