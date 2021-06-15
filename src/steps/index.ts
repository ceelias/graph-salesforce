import { userSteps } from './user';
import { userRoleSteps } from './user-role';

const integrationSteps = [...userSteps, ...userRoleSteps];

export { integrationSteps };
