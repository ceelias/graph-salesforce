import { userSteps } from './user';
import { userRoleSteps } from './user-role';
import { userPermissionSteps } from './permission-set';

const integrationSteps = [
  ...userSteps,
  ...userRoleSteps,
  ...userPermissionSteps,
];

export { integrationSteps };
