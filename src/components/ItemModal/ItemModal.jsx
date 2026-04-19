import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose }) {
  if (!card) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("item-modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`item-modal ${isOpen ? "item-modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="item-modal__content">
        <button
          className="item-modal__close-btn"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>
        <div className="item-modal__image-container">
          <img src={card.link} alt={card.name} className="item-modal__image" />
        </div>
        <div className="item-modal__details">
          <h2 className="item-modal__name">{card.name}</h2>
          <p className="item-modal__weather">
            Weather:{" "}
            <span className="item-modal__weather-type">{card.weather}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
