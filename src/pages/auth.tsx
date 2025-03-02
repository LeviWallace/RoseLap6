import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useNavigate } from "react-router-dom";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import ConfirmRegisterForm from "@/components/auth/confirm-register-form";
import { fetchUserAttributes } from "aws-amplify/auth";

Amplify.configure(outputs)

/**
 * AuthenticationPage component handles the user authentication process.
 * It manages different steps of authentication such as login, registration, and confirmation.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <AuthenticationPage />
 *
*/

enum Step {
    LOGIN,
    REGISTER,
    CONFIRM_LOGIN,
    DONE,
}

export default function AuthenticationPage()
{
    const navigate = useNavigate();

    const [step, setStep] = useState(Step.REGISTER); // Initial step

    const [userEmail, setUserEmail] = useState(""); // Used to hold account information across pages

    const handleNextStep = (nextStep: string, email?: string) => {
        if (email) setUserEmail(email);
        
        switch(nextStep) {
            case "LOGIN":
                setStep(Step.LOGIN);
                break;
            case "CONFIRM_SIGN_UP":
                setStep(Step.CONFIRM_LOGIN);
                break;
            case "REGISTER":
                setStep(Step.REGISTER);
                break;
            default:
                setStep(Step.DONE);
                break;
        }
    };

    useEffect(() => {
        const fetchAttributes = async () => {
            // Set username in local storage
            const attributes = await fetchUserAttributes();
            localStorage.setItem("username", attributes['custom:firstName'] || 'User');
            // Redirect to the home page once the user is done
            navigate('/');
        };

        if (step == Step.DONE) fetchAttributes();
    }, [step]);

    return (
        <DefaultLayout>
            <div> 
                {step === Step.LOGIN  && <LoginForm onNextStep={handleNextStep} />}
                {step === Step.CONFIRM_LOGIN && <ConfirmRegisterForm onNextStep={handleNextStep} userEmail={userEmail}/>}
                {step === Step.REGISTER && <RegisterForm onNextStep={handleNextStep}/>}
            </div>
        </DefaultLayout>
    );
}