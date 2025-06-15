import { useEffect, type JSX } from "react";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import Input from "./input.jsx";
import PasswordStrength from "./utils/passwordStrength.jsx";
import passwordTester from "./utils/passwordTest.tsx";
import { useAuthStore } from "./utils/stateManagement.tsx";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

// type Tester = [RegExp, string][];

export default function Signup() {
  const { isLoading, signup, user, error } = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  console.log(user)
  let enableSubmitButton: boolean = false;
  const notifyError = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,});

  // display error message if signup fails
useEffect(() =>{
    
  if (user) {
    navigate("/verify-email", { replace: true });
  }},[ user, navigate]);
  // If user is already logged in, redirect to home page
  

  // testing the password strength, username and email format
  const [strength, strengthCount]: [JSX.Element[], number] =
    passwordTester(password);
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex: RegExp = /^[a-zA-Z0-9_]{3,}$/;
  let emailIsValid: boolean = false;
  let usernameIsValid: boolean = false;

  if (email && emailRegex.test(email)) {
    emailIsValid = true;
  }
  if (username && usernameRegex.test(username)) {
    usernameIsValid = true;
  }

  if (emailIsValid && usernameIsValid && strengthCount > 3) {
    enableSubmitButton = true;
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signup({ email, password, username });
    if (error) {
      notifyError(error);
    }
  }

  return (
    <>
    <form className="form h-140 entry" onSubmit={handleSubmit}>
      <h1 className="text-2xl text-center text-green-500">Sign Up</h1>
      <Input
        Icon={CiMail}
        value={email}
        setValue={setEmail}
        placeholder="email"
        type="email"
      />
      <Input
        Icon={CiLock}
        value={password}
        setValue={setPassword}
        placeholder="password"
        type="password"
      />
      <Input
        Icon={FaUserCircle}
        value={username}
        setValue={setUsername}
        placeholder="username"
        type="username"
      />
      <PasswordStrength strengthCount={strengthCount} />
      <div className="text-left">
        {strength}
        <p className={`text-${emailIsValid ? "green" : "red"}-500 mb-1 mt-2`}>
          {emailIsValid ? "Valid email format" : "Invalid email format"}
        </p>
        <p className={`text-${usernameIsValid ? "green" : "red"}-500 my-1`}>
          Username must be at least 3 characters
        </p>
      </div>
      <button
        type="submit"
        className="border w-8/12 border-white/20 bg-green-600/20 active:bg-green-700 rounded-xl mt-3 text-white/50"
        disabled={!enableSubmitButton}
      >
        {isLoading ? "Loading..." : enableSubmitButton ? "Sign Up" : "❌"}
      </button>
      <a
        href="/login"
        className="text-center underline underline-offset-2 my-2">Already have an account?</a>
    </form>
    <ToastContainer/>
    </>
  );
}
