import { useNavigate } from "react-router";
import { useAuthStore } from "./utils/stateManagement";
import { useEffect, type JSX } from "react";

export default  function RedirectAuthenticated({children} :{children: JSX.Element}) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    // Check if the user is authenticated
    console.log(isAuthenticated, "isAuthenticated in redirectAuthenticated");
    useEffect(()=>{ if(isAuthenticated){
        navigate("/", { replace: true });
    }}, [isAuthenticated, navigate]);
    return children;
}