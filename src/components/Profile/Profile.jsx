import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onAddNewClick,
  onCardLike,
  onEditProfileClick,
  onSignOut,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddNewClick={onAddNewClick}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
