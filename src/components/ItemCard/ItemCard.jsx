import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__image-container">
        <img
          src={item.link}
          alt={item.name}
          className="item-card__image"
          onClick={handleClick}
        />
      </div>
      <p className="item-card__name">{item.name}</p>
    </li>
  );
}

export default ItemCard;
