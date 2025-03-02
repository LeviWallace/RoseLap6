import { defineAuth } from '@aws-amplify/backend';


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