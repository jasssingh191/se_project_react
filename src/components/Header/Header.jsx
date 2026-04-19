import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ weatherData, onAddClothesClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR" className="header__logo" />
        <p className="header__date">{currentDate}, {weatherData.city}</p>
      </div>
      <div className="header__right">
        <button className="header__add-clothes-btn" onClick={onAddClothesClick}>
          + Add clothes
        </button>
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
