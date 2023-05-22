import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.jpg";

const Navbar = ({ show, Logout }) => {
  const nav = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/About",
    },
    {
      name: "Contact",
      url: "/Contact",
    },
  ];

  const buttns = [
    {
      name: "Signup",
      url: "/Signup",
    },
    {
      name: "Signin",
      url: "/Login",
    },
  ];

  return (
    <div>
      <div className="Image_Container">
        <img src={logo} alt="" />
      </div>
      <div className="Navbar">
        <div className="Navbar_Link_Container">
          {nav.map((elem) => {
            return (
              <NavLink className="Navbar_Link" key={elem.name} to={elem.url}>
                {elem.name}
              </NavLink>
            );
          })}
        </div>
        <div className="Navbar_btn_Container">
          {show ? (
            buttns.map((buttn) => {
              return (
                <NavLink className="Navbar_btn" key={buttn.name} to={buttn.url}>
                  {buttn.name}
                </NavLink>
              );
            })
          ) : (
            <NavLink className="Navbar_btn" onClick={Logout}>
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
