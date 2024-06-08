import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo"><NavLink to="/">AgriNetwork</NavLink></div>
        <ul className="nav-links">
        </ul>
        <div className="profile"><ProfileButton /></div>
      </div>
    </nav>

  );
}

export default Navigation;
