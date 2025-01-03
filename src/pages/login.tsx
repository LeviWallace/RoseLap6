import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { confirmSignUp, signIn, signUp } from 'aws-amplify/auth'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useNavigate } from "react-router-dom";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs)

const RegisterForm = ({ onNextStep }: { onNextStep: (nextStep: string, details?: any) => void }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const { nextStep } = await signUp({
                username: email,
                password: password,
                options: {
                    userAttributes: {
                        'custom:firstName': firstName,
                        'custom:lastName': lastName,
                    },
                },
            })
            console.log(nextStep);
            onNextStep(nextStep.signUpStep, { email, nextStep });
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    return (
        <form onSubmit={handleRegister} noValidate>
            <div className="bg-background border-small border-foreground p-3 w-1/3 mx-auto">
                <h1 className="mt-10 text-center text-foreground text-lg">Welcome Back</h1>
                <h5 className="justify-center text-center text-foreground mb-6 text-sm font-thin">
                    Please enter your details to register an account
                </h5>
                <hr className="solid mx-10" />
                <Input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="my-7 px-4"
                    placeholder="Enter your first name"
                    type="text"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="my-7 px-4"
                    placeholder="Enter your last name"
                    type="text"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="my-7 px-4"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="my-7 px-4"
                    placeholder="*********"
                    type="password"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Input
                    name="confirm"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="my-7 px-4"
                    placeholder="*********"
                    type="password"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Button type="submit" className="w-full" color="primary" radius="none">
                    Register
                </Button>
                {errorMessage && (
                    <p className="text-red-700 text-center mt-3 italic text-small uppercase">{errorMessage}</p>
                )}
                <h1 className="mt-3 text-sm font-thin text-foreground text-center">
                    Already have an account? <a className="font-bold italic" onClick={() => onNextStep("LOGIN", {})}>Sign in</a>
                </h1>
            </div>
        </form>
    );
}

const SignInForm = ({ onNextStep }: { onNextStep: (nextStep: string, details?: any) => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { nextStep } = await signIn({
                username: email,
                password: password,
                options: {
                    email: email,
                },
            })
            console.log(nextStep);
            onNextStep(nextStep.signInStep, { email });
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }

    return (
        <form onSubmit={handleLogin} noValidate>
            <div className="bg-background border-small border-foreground p-3 w-1/3 mx-auto">
                <h1 className="mt-10 text-center text-foreground text-lg">Welcome Back</h1>
                <h5 className="justify-center text-center text-foreground mb-6 text-sm font-thin">
                    Please enter your details to sign in.
                </h5>
                <hr className="solid mx-10" />
                <Input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="my-7 px-4"
                    placeholder="Enter your email..."
                    type="email"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="my-7 px-4"
                    placeholder="*********"
                    type="password"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Button type="submit" className="w-full" color="primary" radius="none">
                    Log In
                </Button>
                {errorMessage && (
                    <p className="text-red-700 text-center mt-3 italic text-small">{errorMessage}</p>
                )}
                <h1 className="mt-3 text-sm font-thin text-foreground text-center">
                    Don't have an account yet? <a className="font-bold italic" onClick={() => onNextStep("REGISTER", {})}>Sign up</a>
                </h1>
            </div>
        </form>
    );
}

const ConformSignUpForm = ({ onNextStep, userEmail }: { onNextStep: (nextStep: string, details?: any) => void, userEmail: string }) => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const navigate = useNavigate();

    const handleConformSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await confirmSignUp({
                username: userEmail,
                confirmationCode: confirmationCode,
            });
            console.log(result);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }

    // const handleSendCode = async () => {
    //     try {
    //         const result = await confirmSignUp({ username: userEmail, confirmationCode: confirmationCode });
    //     } cathc 
    // }

    // useEffect(() => {
    //     handleSendCode();
    // }, []);

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
                    type="password"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Button type="submit" className="w-full" color="primary" radius="none">
                    Sign in
                </Button>
                {errorMessage && (
                    <p className="text-red-700 text-center mt-3 italic text-small">{errorMessage}</p>
                )}
            </div>
        </form>
    );
}


export default function LoginPage()
{
    const navigate = useNavigate();

    const [step, setStep] = useState('LOGIN'); // Initial step
    const [userDetails, setUserDetails] = useState({firstName: '', lastName: '', email: '', username: '', nextStep: null });

    // Update step and userDetails based on nextStep
    const handleNextStep = (nextStep: string, details = {}) => {
        setStep(nextStep);
        setUserDetails((prev) => ({ ...prev, ...details }));
    };

    const loginCallback = (location: string, details: {}) => handleNextStep(location, details);

    useEffect(() => {
        if (step == "DONE") navigate('/');
    }, [step]);

    return (
        <DefaultLayout>
            {step === 'LOGIN' && <SignInForm onNextStep={loginCallback} />}
            {step === 'REGISTER' && <RegisterForm onNextStep={loginCallback}/>}
            {step === 'CONFIRM_SIGN_UP' && <ConformSignUpForm onNextStep={loginCallback} userEmail={userDetails.email}/>}
        </DefaultLayout>
    );
}
