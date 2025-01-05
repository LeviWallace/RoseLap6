import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    "custom:firstName": {
      dataType: "String",
      minLen: 2,
      maxLen: 20,
      mutable: true,
    },
    "custom:lastName": {
      dataType: "String",
      minLen: 2,
      maxLen: 20,
      mutable: true,
    },
  }
});