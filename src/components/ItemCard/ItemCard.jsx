import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <h2 className="item-card__name">{item.name}</h2>
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
