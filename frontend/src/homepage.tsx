import { useAuthStore } from "./utils/stateManagement";
import { useNavigate } from "react-router";

export default function Homepage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  console.log(user, isAuthenticated);
  const handleLogout = async () => {
    await logout();
    // localStorage.removeItem("auth-store"); // Clear local storage
    navigate("/login", {replace: true}); // Redirect to login page after logout
  };
  const handleForgotPassword = async () => {
    navigate("/forgot-password",{ replace: true}); // Redirect to forgot password page
  };
  return (
    <div className="flex justify-center m-auto text-emerald-200 text-[18px] entry">
      <div className="w-87 h-80 bg-[#1820128f] rounded-2xl backdrop-blur-xl flex flex-col justify-around items-center py-3.5 entry">
        <h1 className="text-center mt-2 ">Welcome to the Home page</h1>
        <div className="h-17 w-80 border border-white/20 text-white/70 text-[16px] rounded-lg flex flex-col justify-around  p-2">
          <p className="">
            {user ? `Hello, ${user.username}` : "You are not logged in"}
          </p>
          <p className=" ">
            {user
              ? `Email: ${user.email}`
              : "Please log in to see your details"}
          </p>
        </div>
        <div className="h-17 w-80 border border-white/20 text-white/70 text-[16px] rounded-lg flex flex-col justify-around  p-3">
          <p>
            {`Created on: ${
              user ? new Date(user?.createdAt).toLocaleString() : "N/A"
            }`}
          </p>
          <p>
            {`Updated on: ${
              user ? new Date(user?.updatedAt).toLocaleString() : "N/A"
            }`}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            className="underline underline-offset-3"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </button>
          <button
            className="underline underline-offset-3"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
