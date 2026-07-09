import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = Boolean(
    currentUser && item.likes.some((id) => id === currentUser._id)
  );
  const itemLikeButtonClassName = `item-card__like-btn ${
    isLiked ? "item-card__like-btn_active" : ""
  }`;

  const handleClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item-card">
      <h2 className="item-card__name">{item.name}</h2>
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
          aria-label="Like item"
        >
          <svg viewBox="0 0 24 24" className="item-card__like-icon">
            <path d="M12 21s-7.5-4.6-10-9.3C.4 8.6 2 5 5.5 5c2 0 3.5 1.2 4.5 2.7C11 6.2 12.5 5 14.5 5 18 5 19.6 8.6 22 11.7 19.5 16.4 12 21 12 21z" />
          </svg>
        </button>
      )}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={handleClick}
      />
    </li>
  );
}

export default ItemCard;
