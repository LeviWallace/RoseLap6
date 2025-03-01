import type { Schema } from "../../data/resource"
import { signUp } from "aws-amplify/auth"
import { Amplify } from "aws-amplify"
import outputs from "../../../amplify_outputs.json"

Amplify.configure(outputs)

export const handler: Schema["registerUser"]["functionHandler"] = async (event) =>
{
    const { email, password, firstName, lastName } = event.arguments;
    if (!email || !password || !firstName || !lastName) {
        return { error: "Missing required fields" }
    }
    try {
        const { nextStep } = await signUp({
            username: email,
            password: password,
            options: {
                userAttributes: {
                    "custom:firstName" : firstName,
                    "custom:lastName": lastName
                }
            }
        })
        return { nextStep: nextStep.signUpStep, error: "" }
    } catch (error: any) {
        return { nextStep: null, error: error.message }
    }
}