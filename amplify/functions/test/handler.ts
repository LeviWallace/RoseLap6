import type { Schema } from "../../data/resource"

export const handler: Schema["test"]["functionHandler"] = async (event) => {
  const { name } = event.arguments;
  return 'Hello, ${name}!';
};