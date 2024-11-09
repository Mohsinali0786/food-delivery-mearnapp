import { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./verify.css";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
export default function VerifyOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const verifyPayment = async (event) => {
    let res = await axios.post(url + "/verifyOrder", { success, orderId });
    console.log("res.data ====>", res.data);
    if (res.data.success) {
      navigate("/myOrders");
    } else {
      navigate("/");
    }
  };
  useEffect(()=>{
    verifyPayment()
  },[])
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}
