import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import './loginPopUp.css'
export default function LoginPopUp({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <ClearIcon className="cancelIcon" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-input">
          {currState == "Sign Up" ? <input type="text" placeholder="Your Name" required /> : null}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Your Password" required />
        </div>
        <button>
          {currState == "Sign Up" ? "Create Account" : "Login In"}
        </button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the terms of use & privacy policy </p>
        </div>
        {
            currState == "Login" ?
            <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span> </p>
            :
            <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span> </p>
        }
      </form>
    </div>
  );
}
