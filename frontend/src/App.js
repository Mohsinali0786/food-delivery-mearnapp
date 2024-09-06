import './App.css';
import { lightTheme } from "./utils/Theme";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar,LoginPopUp, FoodDisplay, Footer} from "./component";
import {
  Home,
  Authentication,
  Cart,
  Favourites,
  FoodDetails,
  FoodListing,
  AllUser
} from './pages';
import { useState } from 'react';
const Container = styled.div``;
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
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
            <Route path="/favorite"  element={<Favourites />} />
            <Route path="/cart"  element={<Cart />} />
            <Route path="/dishes/:id"  element={<FoodDetails />} />
            <Route path="/dishes"  element={<FoodListing />} />
            <Route path="/all-users"  element={<AllUser />} />
            <Route path="/all-foods"  element={<FoodDisplay />} />

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
