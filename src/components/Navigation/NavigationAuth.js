import React, { Component } from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

import LogoB from "./LogoB.png";
import "./burger.css";

// Style :
// const Navbaras = styled.div`
//   background: #1c6ea4;
//   border-bottom: 1px solid blue;
//   box-shadow: 0 4px 2px -2px grey;
//   display: flex;
//   height: 10vh;
//   justify-content: space-between;
// `;
// const NavbarasChild = styled.div`
//   flex: 1;
//   font-size: 2.5vh;
//   font-weight: 400;
//   justify-content: center;
// `;

export default class NavigationAuth extends Component {
  handleChecked = (e) => {
    const menuBtn = document.querySelector(".menu-btn");
    menuBtn.classList.remove("open");
    document.getElementById("check").checked = false;
  };

  handleBurgerClick = (e) => {
    const menuBtn = document.querySelector(".menu-btn");
    if (document.getElementById("Hamburger").classList.contains("open")) {
      menuBtn.classList.remove("open");
    } else {
      menuBtn.classList.add("open");
    }
  };
  render() {
    return (
      <nav className="sticky" id="navbar" style={{ zIndex: 1 }}>
        <input type="checkbox" id="check" />

        <label className="checkbtn" htmlFor="check">
          <div
            id="Hamburger"
            className="menu-btn"
            onClick={this.handleBurgerClick}
          >
            <div className="menu-btn_burger"></div>
          </div>
        </label>

        <Link to={ROUTES.HOME}>
          <img
            alt="logoImage"
            style={{ height: "90%", margin: "auto 4vh" }}
            src={LogoB}
            size="small"
          />
        </Link>

        <ul>
          <li>
            <Link
              to={ROUTES.ADMIN}
              className="nav-Link"
              onClick={this.handleChecked}
            >
              Vartotojai
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.ACCOUNT}
              className="nav-Link"
              onClick={this.handleChecked}
            >
              Profilis
            </Link>
          </li>
          {/* <li>
            <Link
              to={ROUTES.GRAPHICS}
              className="nav-Link"
              onClick={this.handleChecked}
            >
              Graphics
            </Link>
          </li> */}
          <li>
            <SignOutButton />
          </li>
        </ul>
      </nav>
    );
  }
}
//   <Navbaras>
//   <Link to={ROUTES.HOME}>
//     <img
//       alt="logoImage"
//       style={{ height: "90%", margin: "auto 4vh" }}
//       src={LogoB}
//       size="small"
//     />
//   </Link>
//     <div
//       style={{
//         alignItems: "center",
//         display: "flex",
//         float: "right",
//         marginRight: "2vh",
//         width: "35%",
//       }}
//     >
//       <NavbarasChild>
//         <Link to={ROUTES.QUESTIONS}>Questions</Link>
//       </NavbarasChild>
//       <NavbarasChild>
//         <Link to={ROUTES.ACCOUNT}>Account</Link>
//       </NavbarasChild>
//       <NavbarasChild>
//         <Link to={ROUTES.ADMIN}>Admin</Link>
//       </NavbarasChild>
//       <SignOutButton />
//     </div>
//   </Navbaras>
