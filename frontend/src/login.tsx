import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import Input from "./input";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "./utils/stateManagement";

export default function Login(){
    const [email, setEmail] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const {isLoading,error, login} = useAuthStore();
      const notifyError = (message: string )=>{
        toast.error(message,{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        })
      }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({ email, password });
        if (error) {
          notifyError(error);
        }
        console.log("Login submitted with:", { email, password });
        // Add your login logic here
      };
      return (
        <>
        <form className="form h-80 entry" onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center text-green-500 ">Login</h1>
    <Input Icon={CiMail} value={email} setValue={setEmail} placeholder="email" type="email" />
    <Input Icon={CiLock} value={password} setValue={setPassword} placeholder="password" type="password" />
<button type="submit" className="border w-8/12 border-white/20 bg-green-600/20 active:bg-green-700 rounded-xl  text-white/50 my-5 p-1">{isLoading? "Loading...":"Login"}</button>
    
    <a href="/signup" className="text-center underline underline-offset-2 ">Don't have an account?</a>
    <a href="/forgot-password" className="text-center underline underline-offset-2 ">Forgot password</a>
        </form>
        <ToastContainer/></>
      );
}