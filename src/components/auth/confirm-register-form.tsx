import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { confirmSignUp } from "aws-amplify/auth";
import { useState } from "react";


/**
 * ConfirmRegisterForm component handles the confirmation of user registration by verifying the confirmation code.
 * 
 * @param {Object} props - The properties object.
 * @param {function} props.onNextStep - Callback function to proceed to the next step in the registration process.
 * @param {string} props.userEmail - The email address of the user to be confirmed.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 */

export default function ConfirmRegisterForm ({ onNextStep, userEmail }: { onNextStep: (nextStep: string, email?: string) => void, userEmail: string }) {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleConformSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(userEmail);
            const result = await confirmSignUp({
                username: userEmail,
                confirmationCode: confirmationCode,
            });
            onNextStep(result.nextStep.signUpStep);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }

    return (
        <form onSubmit={handleConformSignIn} noValidate>
            <div className="bg-background border-small border-foreground p-3 w-1/3 mx-auto">
                <h1 className="mt-10 text-center text-foreground text-lg">2-Step Verfication</h1>
                <h5 className="justify-center text-center text-foreground mb-6 text-sm font-thin">
                    Check Email for Confirmation Code
                </h5>
                <hr className="solid mx-10" />
                <Input
                    name="string"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="my-7 px-4"
                    placeholder="*********"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Button type="submit" className="w-full" color="primary" radius="none">
                    Confirm Sign In
                </Button>
                {errorMessage && (
                    <p className="danger text-center mt-3 italic text-small">{errorMessage}</p>
                )}
            </div>
        </form>
    );
}
