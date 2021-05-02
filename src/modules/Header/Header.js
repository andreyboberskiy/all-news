import successToastr from "libs/toastr/successToastr";
import React, { useEffect } from "react";
import classes from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import routesByName from "../../routes/routesByName";

const Header = (props) => {
  return (
    <>
      <div className={classes.root}>
        <nav>
          <div className="nav-wrapper teal darken-1 row">
            <NavLink to="/" className="fz-4 col s4">
              <span className="text-color-main ml-2">News</span> 24/7
            </NavLink>
            <NavLink to="/" className="col s4 tac fz-4 fw600">
              Новини України
            </NavLink>
            <ul
              id="nav-mobile"
              className="right hide-on-med-and-down col s4 row"
            >
              <li className="tac col s4">
                <NavLink
                  to={routesByName.saved}
                  className="fz-2"
                  activeClassName={classes.activeLink}
                >
                  Збережене
                </NavLink>
              </li>
              <li className="tac col s4">
                <NavLink
                  to={routesByName.notes}
                  className="fz-2"
                  activeClassName={classes.activeLink}
                >
                  Нотатки
                </NavLink>
              </li>
              <li className="tac col s4">
                <NavLink
                  to={routesByName.exchange}
                  className="fz-2"
                  activeClassName={classes.activeLink}
                >
                  Курс валют
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={classes.fakePadding} />
    </>
  );
};

export default Header;
