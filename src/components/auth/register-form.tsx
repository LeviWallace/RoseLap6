import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";
import { signUp } from "aws-amplify/auth";


/**
 * RegisterForm - A React component for handling user registration.
 * @param {Function} onNextStep - A function to handle the next step in the registration process.
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export default function RegisterForm({ onNextStep }: {onNextStep: (nextStep: string, email?: string) => void}) {
    
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirm: "",
        firstName: "",
        lastName: "",
    });

    const [show, setShow] = useState({
        password: false,
        confirm: false,
    });

    const [errorMessage, setErrorMessage] = useState("");

    function toggleShow(password: 'password' | 'confirm') {
        setShow((prev) => ({ ...prev, [password]: !prev[password] }));
    };

    async function handleRegisterUser(e: React.FormEvent) {
        e.preventDefault();
        
        if (userData.password !== userData.confirm) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const result = await signUp({
                username: userData.email,
                password: userData.password,
                options: {
                    userAttributes: {
                        'custom:firstName': userData.firstName,
                        'custom:lastName': userData.lastName,
                    },
                },
            })
            onNextStep(result.nextStep.signUpStep, userData.email);
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <form onSubmit={handleRegisterUser} noValidate>
            <div className="bg-background border-small border-foreground p-3 w-1/3 mx-auto">
                <h1 className="mt-10 text-center text-foreground text-lg">Welcome Back</h1>
                <h5 className="justify-center text-center text-foreground mb-6 text-sm font-thin">
                    Please enter your details to register an account
                </h5>
                <hr className="solid mx-10" />
                <Input
                    name="firstName"
                    type="text"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="my-7 px-4"
                    placeholder="Enter First Name"
                    label="First Name"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Input
                    name="lastName"
                    type="text"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="my-7 px-4"
                    placeholder="Enter Last Name"
                    label="Last Name"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Input
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="my-7 px-4"
                    placeholder="Enter Email"
                    type="email"
                    label="Email"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                />
                <Input
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    className="my-7 px-4"
                    placeholder="Enter Password"
                    type={show.password ? "text" : "password"}
                    label="Password"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: "border-1 border-foreground rounded-none",
                    }}
                    endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-none"
                          type="button"
                          onClick={() => toggleShow('password')}
                        >
                          {show.password ? (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                />
                <Input
                    name="confirm"
                    value={userData.confirm}
                    onChange={handleChange}
                    className="my-7 px-4"
                    placeholder="Re-enter Password"
                    type={show.confirm ? "text" : "password"}
                    label="Confirm Password"
                    variant="bordered"
                    classNames={{
                        input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                        inputWrapper: `border-1 border-foreground rounded-none`,
                    }}
                    endContent={
                        <button
                          aria-label="toggle password visibility"
                          className="focus:outline-none"
                          type="button"
                          onClick={() => toggleShow('confirm')}
                        >
                          {show.confirm ? (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                    }
                />
                <Button type="submit" className="w-full" color="primary" radius="none">
                    Register
                </Button>
                {errorMessage && (
                    <p className="danger text-center mt-3 italic text-small">{errorMessage}</p>
                )}
                <h1 className="mt-3 text-sm font-thin text-foreground text-center">
                    Already have an account? <a className="font-bold italic cursor-pointer" onClick={() => onNextStep("LOGIN")}>Sign in</a>
                </h1>
            </div>
        </form>
    );
}
