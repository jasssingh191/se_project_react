import closeBtn from "../../assets/close-btn.png";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, card, onClose, onConfirmDelete }) {
  const handleConfirm = () => {
    onConfirmDelete(card);
  };

  return (
    <div
      className={`delete-modal ${isOpen ? "delete-modal_opened" : ""}`}
    >
      <div className="delete-modal__content">
        <button className="delete-modal__close-btn" onClick={onClose} type="button">
          <img src={closeBtn} alt="Close" />
        </button>
        <p className="delete-modal__title">
          Are you sure you want to delete this item?
        </p>
        <p className="delete-modal__subtitle">This action is irreversible.</p>
        <button
          className="delete-modal__confirm-btn"
          onClick={handleConfirm}
          type="button"
        >
          Yes, delete item
        </button>
        <button
          className="delete-modal__cancel-btn"
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
