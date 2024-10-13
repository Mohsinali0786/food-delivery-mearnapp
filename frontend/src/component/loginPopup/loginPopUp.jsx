import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useState } from "react";
import "./loginPopUp.css";
import { patchRequest } from "../../utils/service";
import { StoreContext } from "../../context/storeContext";
export default function LoginPopUp({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");
  const { token, setToken ,setCartItems , setLoginData ,loginData} = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();
    let res = {};
    if (currState == "Sign Up") {
      res = await patchRequest("/signUp", data);
    } else {
      res = await patchRequest("/signIn", data);
    }
    if (res && res.success) {
      setToken(res.token);
      localStorage.setItem("token", res.token);
      setLoginData(res.user)
      setShowLogin(false);
      // console.log(res.user.cart,'res.user.cart')
      // setCartItems(res.user.cart)
    }
    if (res && res.message) {
      alert(res.message);
    }
  };
  console.log(loginData,'loginData in Sign in')
  return (
    <div className="login-popup">
      <form
        action=""
        onSubmit={(e) => onLogin(e)}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <ClearIcon
            className="cancelIcon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-input">
          {currState == "Sign Up" ? (
            <input
              type="text"
              name="name"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Your Name"
              required
            />
          ) : null}
          <input
            type="email"
            name="email"
            value={data?.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            value={data?.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Your Password"
            required
          />
        </div>
        <button type="submit">
          {currState == "Sign Up" ? "Create Account" : "LogIn"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy </p>
        </div>
        {currState == "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>{" "}
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>{" "}
          </p>
        )}
      </form>
    </div>
  );
}
