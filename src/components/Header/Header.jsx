import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Avatar from "../Avatar/Avatar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  isLoggedIn,
  onAddClothesClick,
  onRegisterClick,
  onLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
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
          {isLoggedIn && (
            <button className="header__add-clothes-btn" onClick={onAddClothesClick}>
              + Add clothes
            </button>
          )}
        </div>
        {isLoggedIn ? (
          <Link to="/profile" className="header__user-container">
            <p className="header__username">{currentUser?.name}</p>
            <Avatar user={currentUser} className="header__avatar" />
          </Link>
        ) : (
          <div className="header__auth-buttons">
            <button
              className="header__auth-btn"
              onClick={onRegisterClick}
              type="button"
            >
              Sign up
            </button>
            <button
              className="header__auth-btn"
              onClick={onLoginClick}
              type="button"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
