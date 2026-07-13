import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const defaultValues = { name: "", imageUrl: "", weather: "" };

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const { values, handleChange, reset } = useForm(defaultValues);

  const handleSubmit = () => {
    onAddItem({ name: values.name, imageUrl: values.imageUrl, weather: values.weather }, reset);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="New Garment"
      name="add-clothes"
      buttonText="Add garment"
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
        Image
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          Hot
        </label>
        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
