import React from "react";
import "./Navbar.css";
type ViewType = 'profile' | 'wordgame';
interface NavbarProps {
  onClearClick: () => void;
  onNavigate: (view: ViewType) => void; // onNavigate 타입을 추가합니다.
}

const Navbar = ({ onClearClick, onNavigate }: NavbarProps) => {
  const handleClear = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClearClick();
    };
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>, 
    view: 'profile' | 'wordgame'
  ) => {
    e.preventDefault(); // 페이지가 새로고침되거나 #으로 점프하는 것을 막습니다.
    onNavigate(view);   // 부모(App)에게 "이 화면으로 바꿔줘"라고 알립니다.
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
          {/* Services를 누르면 'wordgame'을 보여줍니다. */}
            <a href="#services" onClick={(e) => handleNavClick(e, 'wordgame')}>
            Services
            </a>
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
