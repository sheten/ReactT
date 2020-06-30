import React, { Component } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

import LogoB from "./LogoB.png";
import "./burger.css";

export default class NavigationAuth extends Component {
  handleChecked = () => {
    const menuBtn = document.querySelector(".menu-btn");
    menuBtn.classList.remove("open");
    document.getElementById("check").checked = false;
  };

  handleBurgerClick = () => {
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
            onClick={this.handleChecked}
          />
        </Link>

        <ul>
          <li>
            <Link
              to={ROUTES.GRAPHICS}
              className="nav-Link"
              onClick={this.handleChecked}
            >
              Graphics
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.QUESTIONS}
              className="nav-Link"
              onClick={this.handleChecked}
            >
              Test Questions
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.ADMIN}
              className="nav-Link"
              onClick={this.handleChecked}
            >
              Admin
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.ACCOUNT}
              className="nav-Link"
              onClick={this.handleChecked}
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              to={ROUTES.INSERTQUESTIONS}
              className="nav-Link"
              onClick={this.handleChecked}
            >
              Add Question
            </Link>
          </li>

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
