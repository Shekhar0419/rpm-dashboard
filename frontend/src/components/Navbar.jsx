import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="brand">RPM Health Monitor</span>
      </div>
      <nav className="navbar-right">
        <Link to="/">Login</Link>
        <Link to="/doctor">Doctor Portal</Link>
      </nav>
    </header>
  );
};

export default Navbar;
