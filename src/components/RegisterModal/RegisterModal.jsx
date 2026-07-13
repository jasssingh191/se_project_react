import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const defaultValues = { name: "", avatar: "", email: "", password: "" };

function RegisterModal({ isOpen, onCloseModal, onRegister, onLoginClick }) {
  const { values, handleChange, reset } = useForm(defaultValues);

  const handleSubmit = () => {
    onRegister(values, reset);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Sign up"
      name="register"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      footer={
        <button
          type="button"
          className="modal__switch-btn"
          onClick={onLoginClick}
        >
          or Log in
        </button>
      }
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
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

export default RegisterModal;
