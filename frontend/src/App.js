import './App.css';
import { lightTheme } from "./utils/Theme";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar,LoginPopUp, FoodDisplay, Footer} from "./component";
import { VerifyEmail } from './pages/verifyUserScreen/verifyUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Home,
  Cart,
  AllUser,
  PlaceOrder,
  VerifyOrder,
  MyOrders,
  Menu,
  Order,
  MyFaourites
} from './pages';
import { useState } from 'react';
const Container = styled.div``;
function App() {
  const [showLogin, setShowLogin] = useState(false);
// const url = "http://localhost:5001/api"
const url = "https://food-delivery-b-mearnapp.vercel.app/api"
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
        <ToastContainer autoClose={1000} hideProgressBar={false}/>
          {
            showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : null
          }
          <Navbar
          // setOpenAuth={setOpenAuth}
          // openAuth={openAuth}
          // currentUser={currentUser}
          setShowLogin={setShowLogin}
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/cart"  element={<Cart />} />
            <Route path="/all-users"  element={<AllUser />} />
            <Route path="/all-foods"  element={<FoodDisplay />} />
            <Route path="/cart-items"  element={<Cart />} />
            <Route path="/orders"  element={<PlaceOrder />} />
            <Route path="/verify"  element={<VerifyOrder />} />
            <Route path="/myOrders"  element={<MyOrders />} />
            <Route path="/menu"  element={<Menu />} />
            <Route path="/userFavourite"  element={<MyFaourites />} />
            <Route path="/adminOrder"  element={<Order  url={url}/>} /> 
            <Route path="/verify-email" element={<VerifyEmail/>} />




          </Routes>
          {/* {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )} */}
          <Footer/>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
