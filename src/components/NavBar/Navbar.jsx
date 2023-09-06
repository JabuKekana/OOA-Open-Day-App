import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  const closeDropdown = () => {
    setIsMoreDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/credits" className="nav-link">
            Credits
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/map" className="nav-link">
            Map
          </NavLink>
        </li>
        <li className={`nav-item dropdown ${isMoreDropdownOpen ? "open" : ""}`}>
          <button
            className={`nav-link more-button ${isMoreDropdownOpen ? "active" : ""}`}
            onClick={toggleMoreDropdown}
          >
            More
          </button>
          {isMoreDropdownOpen && (
            <ul className="dropdown-list">
              <li className="dropdown-item">
                <NavLink
                  to="/schedule"
                  className="dropdown-link"
                  onClick={closeDropdown}
                >
                  Schedule
                </NavLink>
              </li>
              <li className="dropdown-item">
                <NavLink
                  to="/notifications"
                  className="dropdown-link"
                  onClick={closeDropdown}
                >
                  Notifications
                </NavLink>
              </li>
              <li className="dropdown-item">
                <NavLink
                  to="/categories"
                  className="dropdown-link"
                  onClick={closeDropdown}
                >
                  Categories
                </NavLink>
              </li>
              <li className="dropdown-item">
                <NavLink
                  to="/queries"
                  className="dropdown-link"
                  onClick={closeDropdown}
                >
                  Queries
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
