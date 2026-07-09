import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const defaultValues = { email: "", password: "" };

function LoginModal({ isOpen, onCloseModal, onLogin }) {
  const { values, handleChange, reset } = useForm(defaultValues);

  const handleSubmit = () => {
    onLogin(values, reset);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Log in"
      name="login"
      buttonText="Log in"
      onSubmit={handleSubmit}
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
    </ModalWithForm>
  );
}

export default LoginModal;
