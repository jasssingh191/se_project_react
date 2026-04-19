import "./Header.css";

function Header({ onAddClothesClick }) {
  // Generate current date
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__logo-section">
          <div className="header__logo">WTWR</div>
          <p className="header__date">{currentDate}</p>
        </div>
        <p className="header__location">Portland</p>
      </div>
      <div className="header__bottom">
        <button className="header__add-clothes-btn" onClick={onAddClothesClick}>
          + Add clothes
        </button>
        <div className="header__user-section">
          <p className="header__user-name">Terrence Jenkins</p>
          <div className="header__avatar"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
