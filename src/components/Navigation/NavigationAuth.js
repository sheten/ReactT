import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { withAuthorization } from "../Session";

import SignOutButton from "../SignOut";

import LogoB from "./LogoB.png";
import "./burger.css";

class NavigationAuth extends Component {
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
    if (this.props.firebase.auth.currentUser.uid) {
      return (
        <nav
          className="sticky"
          id="navbar"
          style={{
            zIndex: 1,
            boxShadow: "0 4px 2px -2px gray",
            height: "10vh",
          }}
        >
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
                to={ROUTES.POOL}
                className="nav-Link"
                onClick={this.handleChecked}
              >
                Pool
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
                to={ROUTES.MONTHLYGRAPHS}
                className="nav-Link"
                onClick={this.handleChecked}
              >
                Monthly Graphs
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.WEEKLYGRAPHS}
                className="nav-Link"
                onClick={this.handleChecked}
              >
                Weekly Graphs
              </Link>
            </li>

            <li>
              <SignOutButton />
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav
          className="sticky"
          id="navbar"
          style={{ zIndex: 1, boxShadow: "0 4px 2px -2px gray" }}
        >
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
                to={ROUTES.ACCOUNT}
                className="nav-Link"
                onClick={this.handleChecked}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.MONTHLYGRAPHS}
                className="nav-Link"
                onClick={this.handleChecked}
              >
                Monthly Graphs
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.WEEKLYGRAPHS}
                className="nav-Link"
                onClick={this.handleChecked}
              >
                Weekly Graphs
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
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(NavigationAuth);
