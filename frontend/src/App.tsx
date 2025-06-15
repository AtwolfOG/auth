import Layout from "./layout.tsx";
import {  Routes, Route } from "react-router";
import Signup from "./signup.tsx";
import Login from "./login.tsx";
import VerifyEmail from "./verifyEmail.tsx";
import ResetPassword from "./resetpassword.tsx";
import ForgotPassword from "./forgotPassword.tsx";
import Homepage from "./homepage.tsx";
import RedirectAuthenticated from "./redirectAuthenticated.tsx";
import RedirectUnauthenticated from "./redirectUnauthenticated.tsx";
    
function App() {
  return <>
  <Layout/>
<Routes>
  <Route path="/signup" element={<RedirectAuthenticated><Signup/></RedirectAuthenticated>}/>
  <Route path="/login" element={<RedirectAuthenticated><Login/></RedirectAuthenticated>}/>
  <Route path="/verify-email" element={<RedirectAuthenticated><VerifyEmail/></RedirectAuthenticated>}/>
  <Route path="/forgot-password" element={<ForgotPassword/>}/>
  <Route path="/reset-password/:token" element={<ResetPassword/>}/>
  <Route path="/" element={<RedirectUnauthenticated><Homepage/></RedirectUnauthenticated>}/>
</Routes>
  </>;
}

export default App;
