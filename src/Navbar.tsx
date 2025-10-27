import React from "react";
import "./Navbar.css";
interface NavbarProps {
  onClearClick: () => void;
}

const Navbar = ({ onClearClick }: NavbarProps) => {
const handleClear = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClearClick();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">butterflyjin.dev</a>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a href="#clear" onClick={handleClear}>Clear</a>
        </li>
      </ul>
      <div className="navbar-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
