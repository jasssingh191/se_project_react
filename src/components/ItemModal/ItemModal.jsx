import { useContext } from "react";
import "./ItemModal.css";
import closeBtn from "../../assets/close-btn.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, card, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (!card) {
    return null;
  }

  const isOwn = Boolean(currentUser && card.owner === currentUser._id);

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
          <img src={closeBtn} alt="Close" />
        </button>
        <div className="item-modal__image-container">
          <img src={card.imageUrl} alt={card.name} className="item-modal__image" />
        </div>
        <div className="item-modal__details">
          <h2 className="item-modal__name">{card.name}</h2>
          <p className="item-modal__weather">
            Weather:{" "}
            <span className="item-modal__weather-type">{card.weather}</span>
          </p>
          {isOwn && (
            <button
              className="item-modal__delete-btn"
              onClick={onDeleteClick}
              type="button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
