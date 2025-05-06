import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

export default function LoginForm({
  onNextStep,
}: {
  onNextStep: (nextStep: string, email?: string) => void;
}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword(): void {
    setShowPassword(!showPassword);
  }

  async function handleLoginUser(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { nextStep } = await signIn({
        username: userData.email,
        password: userData.password,
        options: {
          email: userData.email,
        },
      });

      onNextStep(nextStep.signInStep);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form noValidate onSubmit={handleLoginUser}>
      <div className="bg-background border-small border-foreground p-3 w-1/3 mx-auto">
        <h1 className="mt-10 text-center text-foreground text-lg">
          Welcome Back
        </h1>
        <h5 className="justify-center text-center text-foreground mb-6 text-sm font-thin">
          Please enter your details to sign in.
        </h5>
        <hr className="solid mx-10" />
        <Input
          className="my-7 px-4"
          classNames={{
            input: ["bg-transparent", "text-foreground"],
            inputWrapper:
              "border-1 rounded-none border-foreground hover:border-foreground",
          }}
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={userData.email}
          variant="bordered"
          onChange={handleChange}
        />
        <Input
          className="my-7 px-4"
          classNames={{
            input: [
              "bg-transparent",
              "text-foreground",
              "placeholder:text-grey",
            ],
            inputWrapper: "border-1 border-foreground rounded-none",
          }}
          endContent={
            <button
              aria-label="toggle password visibility"
              tabIndex={-1}
              type="button"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password"
          name="password"
          placeholder="*********"
          type={showPassword ? "text" : "password"}
          value={userData.password}
          variant="bordered"
          onChange={handleChange}
        />
        <Button className="w-full" color="primary" radius="none" type="submit">
          Log In
        </Button>
        {errorMessage && (
          <p className="danger text-center mt-3 italic text-small">
            {errorMessage}
          </p>
        )}
        <h1 className="mt-3 text-sm font-thin text-foreground text-center">
          Don&apos;t have an account yet?&nbsp;
          <button
            className="font-bold italic cursor-pointer bg-transparent border-none p-0"
            type="button"
            onClick={() => onNextStep("REGISTER")}
          >
            Sign Up
          </button>
        </h1>
      </div>
    </form>
  );
}
