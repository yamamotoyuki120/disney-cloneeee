import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Firebase";
import {
  selectUserPhoto,
  selectUsername,
  setSignOutState,
  setUserLoginDetails,
} from "../Features/User/UserSlice";

import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigate();
  const UserName = useSelector(selectUsername);
  const Userphoto = useSelector(selectUserPhoto);
  console.log(Userphoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        Navigation("/home");
      }
    });
  }, [UserName]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (!UserName) {
        const result = await signInWithPopup(auth, googleProvider);
        setUser(result.user);
      } else {
        await auth.signOut();
        dispatch(setSignOutState());
        Navigation("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <Nav>
      <Logo>
        <img src="images/logo.svg" alt="" />
      </Logo>

      {!UserName ? (
        <Login onClick={handleAuth}> Login</Login>
      ) : (
        <>
          <NavMenu>
            <Link to={"/home"}>
              <img src="images/home-icon.svg" alt="home" />
              <span>HOME</span>
            </Link>

            <Link to={"/search"}>
              <img src="images/search-icon.svg" alt="search" />
              <span>SEARCH</span>
            </Link>

            <Link to={"/orginial"}>
              <img src="images/original-icon.svg" alt="home" />
              <span>ORIGINAL</span>
            </Link>

            <Link to={"/movies"}>
              <img src="images/movie-icon.svg" alt="home" />
              <span>MOVIES</span>
            </Link>

            <Link to={"/series"}>
              <img src="images/series-icon.svg" alt="home" />
              <span>SERIES</span>
            </Link>
          </NavMenu>
          <SignOut>
            <LogoText>
              <img src={Userphoto} alt="user photo" />
            </LogoText>
            <DropDown>
              <span onClick={handleAuth}> Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};
const LogoText = styled.h4`
  color: red;

  img {
    border-radius: 50%;
    height: 50px;
  }
`;
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;

  letter-spacing: 16px;
  z-index: 100;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
    padding-bottom: 20px;
  }
`;
const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
  }
  img {
    height: 20px;
    width: 20px;
    min-height: 20px;
  }
  span {
    /* padding-left:10px ; */
    color: rgb(249, 249, 249);
    font-size: 13px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    margin-top: 5px;
    position: relative;
  } 

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid white;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s ease 0s;
  border-radius: 4px;
  color:white;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;

  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  letter-spacing: 2px;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: white;

  ${LogoText} {
    letter-spacing: 1px;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
    }
  }
`;
export default Header;
