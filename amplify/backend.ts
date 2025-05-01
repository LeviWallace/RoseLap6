import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { simulateFunctionHandler } from './functions/simulate/resource';


const backend = defineBackend({
  auth,
  data,
  simulateFunctionHandler,
});
