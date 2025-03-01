import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

import { registerUser } from './functions/registerUser/resource';

const backend = defineBackend({
  auth,
  data,
  registerUser
});
