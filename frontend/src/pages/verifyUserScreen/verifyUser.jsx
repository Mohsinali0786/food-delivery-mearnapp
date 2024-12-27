import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
// import Login from "./login";
export const VerifyEmail = () => {
  // const [user,updateUser] = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const Navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = searchParams.get("userId");

  useEffect(() => {
    console.log(user, "userrrrrrrr");
    console.log(userId, "userId");
    localStorage.clear();
    verifyingEmail();
  }, [user, userId, isVerified]);

  useEffect(() => {setMessageAlert()}, []);
  const setMessageAlert = (message) => {
    if (!user?.isVerified) {
      setMessage(message + " Now you an Login");
    } else {
      setMessage("Already Email Verified");
    }
  };
  const verifyingEmail = async () => {
    if (!user?.isVerified) {
      const response = await fetch(
        "https://food-delivery-f-mearnapp.vercel.app/api/verify-email",
        // "http://localhost:5001/api/verify-email",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("user", JSON.stringify(json.user));
        setMessageAlert(json.message);
        setTimeout(() => {
          setIsVerified(true);
        }, 20000);
      }
      //   console.log(json, "success");
      console.log("Ressssssss", json);
    } else {
      // setMessage('Already Email Verified')
    }
  };
  const routeToLogin = () => {
    Navigate("/login");
  };
  return (
    <>
      {isVerified ? null : (
        <div class="alert alert-success" role="alert">
          {message}
          <Button onClick={routeToLogin}>Click here to Login</Button>
        </div>
      )}
    </>
  );
};