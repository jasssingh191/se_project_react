import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ weatherData, onAddClothesClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__left">
        <img src={logo} alt="WTWR" className="header__logo" />
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </Link>
      <div className="header__right">
        <div className="header__controls">
          <ToggleSwitch />
          <button className="header__add-clothes-btn" onClick={onAddClothesClick}>
            + Add clothes
          </button>
        </div>
        <Link to="/profile" className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
