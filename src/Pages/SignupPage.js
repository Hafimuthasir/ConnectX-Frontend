import React from "react";
import Signup from "../components/Signup/Signup";
import iLogin from "../images/iLogin.jpg";

// import ButtonAppBar from '../components/Navbar/Navbar'
function SignupPage() {
  return (
    <div
      style={{
        backgroundImage:`url(${iLogin})`,
        minHeight: "100vh",
        maxWidth: "100vw",
        backgroundSize: "cover",
      }}
    >
      <Signup />
    </div>
  );
}

export default SignupPage;
