import { SetMetadata } from '@nestjs/common';
import { METADATA_REQUEST_ROLES } from '../constants/metadata-request';
import { UserRole } from 'src/common/constants/types';

export const RoleProtected = (role: UserRole) => {
  return SetMetadata(METADATA_REQUEST_ROLES, role);
};
