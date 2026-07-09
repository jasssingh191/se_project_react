import "./Avatar.css";

function Avatar({ user, className = "" }) {
  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className={`avatar ${className}`}
      />
    );
  }

  return (
    <div className={`avatar avatar_placeholder ${className}`}>
      {user?.name ? user.name[0].toUpperCase() : "?"}
    </div>
  );
}

export default Avatar;
