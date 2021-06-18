import { userSteps } from './user';
import { userRoleSteps } from './user-role';
import { permissionSetSteps } from './permission-set';
import { groupSteps } from './group';

const integrationSteps = [
  ...userSteps,
  ...userRoleSteps,
  ...permissionSetSteps,
  ...groupSteps,
];

export { integrationSteps };
