import { defineFunction } from '@aws-amplify/backend';

export const registerUser = defineFunction({
  name: 'registerUser',
  entry: './handler.ts'
});