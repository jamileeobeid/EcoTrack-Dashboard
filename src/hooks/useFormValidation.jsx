import { useState } from "react";

export default function useFormValidation(initialState, validators = {}) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    // Update values
    setValues({ ...values, [name]: value });

    // Run validation if validator exists
    if (validators[name]) {
      const errorMsg = validators[name](value);
      setErrors({ ...errors, [name]: errorMsg });
    } else {
      // Default: required check
      setErrors({ ...errors, [name]: value.trim() === "" ? "" : "" });
    }
  }

  return { values, errors, handleChange, setValues, setErrors };
}
