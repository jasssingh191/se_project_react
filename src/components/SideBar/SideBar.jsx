import { useContext } from "react";
import Avatar from "../Avatar/Avatar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <Avatar user={currentUser} className="sidebar__avatar" />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__actions">
        <button
          className="sidebar__edit-btn"
          onClick={onEditProfileClick}
          type="button"
        >
          Edit profile
        </button>
        <button
          className="sidebar__signout-btn"
          onClick={onSignOut}
          type="button"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
