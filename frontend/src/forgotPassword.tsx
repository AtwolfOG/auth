import { useState,useEffect, type FormEvent } from "react";
import {  CiMail } from "react-icons/ci";
import Input from "./input";
import { useAuthStore } from "./utils/stateManagement";
import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router";

export default function ForgotPassword(){
    const [email, setEmail] = useState<string>("");
    const {setResetPassword, user } = useAuthStore();
    // const navigate = useNavigate();


// useEffect(() => {
//     if(!user){
//       navigate("/login", { replace: true });
//     }
//   }, [user,navigate]);
    const handleForgotPassword = async (e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(!email){
        toast.error("Please enter your email",{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true
        })
        return;
      }
      // if(email.trim() !== user?.email){
      //   toast.error("Email does not match the signed in user",{
      //     position: "top-center",
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //     closeOnClick: true
      //   })
      //   setEmail(""); // Clear the email input if it doesn't match
      //   return;
      // }
     const resetUrl =  await setResetPassword(email.trim());
     if(resetUrl) {
        toast.success("Password reset link sent to your email", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true
        });
        // navigate(`/reset-password/${resetUrl}`); // Redirect to reset password page after sending the reset link
      }
    }
      return (<>
        <form className="form h-65 entry" onSubmit={handleForgotPassword}>
            <h1 className="text-2xl text-center text-green-500 ">Forgot Password</h1>
            <p className="text-white/70 ">Enter Your Email</p>

    <Input Icon={CiMail} value={email} setValue={setEmail} placeholder="email" type="email" />
            <p className="text-white/70 mt-1">The link will be sent to you shortly</p>
    
<button type="submit" className="border w-5/12 border-white/20 bg-green-600/20 active:bg-green-700 rounded-xl  text-white/50 my-5 p-1" >send</button>
    
        </form>
        <ToastContainer/>
        </>
      );
}