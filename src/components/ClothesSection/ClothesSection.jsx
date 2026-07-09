import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, onCardClick, onAddNewClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const ownItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-btn"
          onClick={onAddNewClick}
          type="button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {ownItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
