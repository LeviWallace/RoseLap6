import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

import { test } from './functions/test/resource';

const backend = defineBackend({
  auth,
  data,
  test
});
