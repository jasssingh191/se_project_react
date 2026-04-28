import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </aside>
  );
}

export default SideBar;
