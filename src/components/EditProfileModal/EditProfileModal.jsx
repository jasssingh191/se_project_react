import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onCloseModal, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, reset } = useForm({ name: "", avatar: "" });

  useEffect(() => {
    if (isOpen && currentUser) {
      reset({ name: currentUser.name || "", avatar: currentUser.avatar || "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentUser]);

  const handleSubmit = () => {
    onUpdateProfile(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Change profile data"
      name="edit-profile"
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
