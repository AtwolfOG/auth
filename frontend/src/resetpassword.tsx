import { useEffect, useState, type JSX } from "react";
import passwordTester from "./utils/passwordTest";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "./utils/stateManagement";
import { toast, ToastContainer } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [strength, strengthCount]: [JSX.Element[], number] =
    passwordTester(password);
  const { isLoading, resetPassword, error, user } = useAuthStore();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const notifyError = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "dark",
    });
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  console.log(isLoading, "run");
  const enableSubmit = strengthCount > 3 && password === confirmPassword;
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (token && enableSubmit) {
      const message = await resetPassword(token, password);
      console.log("Password reset request sent");
      setPassword("");
      setConfirmPassword("");
      if (message) {
        toast.success(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "dark",
        });
        navigate("/login", { replace: true });
        return;
      }
      if (error) {
        notifyError(error);
      }
    }
  }
  return (
    <>
      <form className="form h-90" onSubmit={handleSubmit}>
        <h1 className="text-white/60 text-2xl">Reset Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-white/20 outline outline-white/20 rounded-2xl p-1 pl-6 w-full caret-white/20 text-white/40 my-3"
          placeholder="reset password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-white/20 outline outline-white/20 rounded-2xl p-1 pl-6 w-full caret-white/20 text-white/40 my-3"
          placeholder="confirm password"
        />
        <div className="flex flex-col items-center">{strength}</div>
        <button
          type="submit"
          disabled={!enableSubmit}
          className="border w-6/12 border-white/20 bg-green-600/20 active:bg-green-700 rounded-xl mt-3 text-white/50 py-1 hover:scale-x-110 transition-all duration-200"
        >
          {isLoading ? "Loading..." : enableSubmit ? "Reset Password" : "❌"}
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
