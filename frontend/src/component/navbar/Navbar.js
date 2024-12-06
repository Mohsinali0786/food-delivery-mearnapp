import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link as LinkR, NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from "react-router-dom";
// import LogoImg from "../utils/Images/Logo.png";
import "./Navbar.css"
import {
  FavoriteBorder,
  MenuRounded,
  SearchRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
// import Button from "./Button";
import { Avatar, Button } from "@mui/material";
import { useDispatch } from "react-redux";
// import { logout } from "../redux/reducers/UserSlice";
import LogoImg from '../../utils/images/Logo.png'
import TemporaryDrawer from "../drawer";
import PeopleIcon from '@mui/icons-material/People';
import { StoreContext } from "../../context/storeContext";
import { Link } from "react-router-dom";
import { getAllFoods } from "../../utils/commonMethods";
const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;
const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;
const Logo = styled.img`
  height: 34px;
`;
const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
  @media screen and (max-width: 768px) {

  }
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
// const MobileIcons = styled.div`
//   color: ${({ theme }) => theme.text_primary};
//   display: none;
//   @media screen and (max-width: 768px) {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 16px;
//   }
// `;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 80%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const TextButton = styled.span`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export default function Navbar({ setOpenAuth, openAuth, currentUser, setShowLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartTotalAmount, token, setToken, loginData } = useContext(StoreContext)
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
  console.log(loginInfo, 'logiiiiiiiiiiii')
  const Navigate = useNavigate()

  return (
    <Nav>
      <NavContainer>
        <div>
          <NavLogo to="/">
            <Logo src={LogoImg} />
          </NavLogo>
          {loginInfo ?
            <TemporaryDrawer />
            : null
          }

        </div>

        {/* <MobileIcons>
                    <Navlink to="/search">
                        <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
                    </Navlink>
                    <Navlink to="/favorite">
                        <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
                    </Navlink>
                    <Navlink to="/cart">
                        <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
                    </Navlink>
                    {currentUser && (
                        <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
                    )}
                </MobileIcons> */}

        <NavItems>
          {/* <Navlink to="/">Home</Navlink> */}
          {/* <Navlink to="/dishes">Dishes</Navlink> */}
          {/* <Navlink to="/orders">Orders</Navlink> */}
          {/* <Navlink to="/contact">Contact</Navlink> */}
          {/* {loginData?.role == "SUPERADMIN_ROLE" ?
            <Navlink onClick={() => window.location.href = 'http://localhost:5173'}>Dashboard</Navlink>
            :
            null
          } */}
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen} className="mobileDropDown">
            <Navlink to="/" onClick={() => setIsOpen(false)}>
              Home
            </Navlink>
            <Navlink to="/dishes" onClick={() => setIsOpen(false)}>
              Dishes
            </Navlink>
            <Navlink to="/orders" onClick={() => setIsOpen(false)}>
              Orders
            </Navlink>
            <Navlink to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Navlink>
            {currentUser ? (
              <>
                <Button>
                  Logout
                </Button>
              </>
            ) : (
              <div className="mbAuthBtnCss">
                {/* <Button className="authBtnCss" fullWidth >Sign In</Button> */}
                <Button className="authBtnCss" onClick={() => {setShowLogin(true);setIsOpen(false)}} fullWidth>Sign Up</Button>
              </div>
            )}
          </MobileMenu>
        )}

      </NavContainer>
      <ButtonContainer>
        <Navlink to="/search" >
          <form className="d-flex d-none" >
            <input className="serachBox" placeholder="Search" aria-label="Search" />
            {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </form>
        </Navlink>
        <Navlink to="/userFavourite">
          <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
        </Navlink>
        <Navlink to="/cart-items" className="shopping-Cart">
          <ShoppingCartOutlined
            sx={{ color: "inherit", fontSize: "28px" }}
          />
          <div className={getCartTotalAmount() == 0 ? "" : "dot"}></div>
        </Navlink>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>
        {
          loginInfo ?
            <p>Welcome !! {loginInfo?.email}</p>
            :
            null
        }
        <div className="ConatinerAuthBtn">
          {/* <Button className="authBtnCss" onClick={()=>setShowLogin(true)}>Sign In</Button> */}
          {
            !token ?
              // <Button className="authBtnCss" onClick={() =>setShowLogin(true)}>Sign Up</Button>
              <Button className="authBtnCss" onClick={() => setShowLogin(true)}>
              <HashLink to="#signUp">
                Sign Up
              </HashLink>
            </Button>

              :
              <div className="navbar-profile">
                {/* <img /> */}
                <PeopleIcon />
                <ul className="navbar-profile-dropdown">
                  <li >
                    <ShoppingBagIcon className="text-tomato" />
                    {/* <p className="text-black">Order</p> */}
                    <Link to="/myOrders" className="text-black">Order</Link>
                  </li>
                  <hr />
                  <li onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("loginInfo"); setToken(''); Navigate("/");getAllFoods()}}>
                    {/* <Button > */}
                    <LogoutIcon className="text-tomato" />
                    <p className="text-black">Logout</p>
                    {/* </Button> */}
                  </li>
                </ul>
              </div>

          }
        </div>

      </ButtonContainer>
    </Nav>
  )
}