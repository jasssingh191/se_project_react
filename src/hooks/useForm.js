import { useState } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const reset = (newValues = inputValues) => {
    setValues(newValues);
  };

  return { values, handleChange, reset };
}

export default useForm;
