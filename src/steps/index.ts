import { userSteps } from './user';
import { userRoleSteps } from './user-role';
import { permissionSetSteps } from './permission-set';

const integrationSteps = [
  ...userSteps,
  ...userRoleSteps,
  ...permissionSetSteps,
];

export { integrationSteps };
