import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeBtnDefault from "../../assets/Like-btn-State=Default.png";
import likeBtnLiked from "../../assets/Like-btn-State=Liked.png";

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
          aria-label={isLiked ? "Unlike item" : "Like item"}
        >
          <img
            src={isLiked ? likeBtnLiked : likeBtnDefault}
            alt={isLiked ? "Unlike item" : "Like item"}
            className="item-card__like-icon"
          />
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
