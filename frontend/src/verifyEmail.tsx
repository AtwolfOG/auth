import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "./utils/stateManagement";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

export default function VerifyEmail() {
  const [code, setCode] = useState<Array<string>>(["", "", "", "", "", ""]);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const { verifyEmail, user, isVerified, isAuthenticated,isLoading, resetVerificationToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate("/signup", { replace: true });
    }
    if (isVerified && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [ isVerified, navigate,  user, isAuthenticated]);
  function handleChange(index: number, value: string) {
    if (/[^0-9]/.test(value)) return; // Allow only digits
    const newCode: string[] = [...code];
    if (newCode.every((val) => val !== "") && index === 5 && value !== "")
      return;
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findIndex((code) => code === "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRef.current[focusIndex]?.focus();
    } else {
      if (value === " ") return;
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  }
  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRef.current[index + 1]?.focus();
    } else if (e.key === "Delete" && index < 5 && !code[index]) {
      inputRef.current[index + 1]?.focus();
    } else if (e.key === "Backspace" && index > 0 && code[index] === "") {
      inputRef.current[index - 1]?.focus();
    } 
    else if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      // Handle form submission logic here
      console.log("Code submitted:", code.join(""));
    }
  }
 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = code.join("");
    if (token.length === 6) {
      const errorMessage = await verifyEmail(token);
      if (errorMessage) {
      notify(errorMessage);
    }
    } else {
      notify("Please enter a valid 6-digit code");
      // inputRef.current[0]?.focus(); // Focus the first input if the code is invalid
    }
  }
  // Function to display error messages using toast notifications
  const notify = (message: string) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
    async function handleResetToken() {
     const errorMessage = await resetVerificationToken();
     if (errorMessage) {
       notify(errorMessage);
     } else {
       toast.success("Verification token reset. Please check your email for the new code.",{position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,});
     }
    }
  return (
    <>
      <form className="form h-60 entry" onSubmit={handleSubmit}>
        <h1 className="text-white/60 text-2xl">Verify Email</h1>
        <p className="text-white/80">Enter your six digit code</p>
        <div className="flex w-full justify-between">
          {code.map(
            (digit: string, index: number): React.ReactNode => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputRef.current[index] = el;
                }}
                className="border border-white/20 outline outline-white/20 rounded-xl px-2.5 py-1  w-9 caret-white/20 text-white/40 my-3 text-2xl"
              />
            )
          )}
        </div>
        <button type="button" onClick={handleResetToken}>Resend verification token</button>
        <button
          type="submit"
          className="border w-30 border-white/20 bg-green-600/20 active:bg-green-700 rounded-xl mt-3 text-white/50 py-1 hover:scale-x-110 transition-all duration-150"
        >
          {isLoading? "Loading...": "Verify Email"}
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
