import React, { useState } from "react";
import PropTypes from "prop-types";

import { validateInput } from "../../Validator/Validator";
import { Input } from "reactstrap";

const InputField = ({
  value,
  label,
  name,
  placeholder,
  validators,
  type,
  onChange,
}) => {
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    setError(validateInput(validators, event.target.value));
    onChange(event.target.name, event.target.value);
  };

  function formatPhoneNumber(phoneNumberString) {
    let cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + "-" + match[2] + "-" + match[3];
    }
    return null;
  }

  let newVal = "";
  if (name === "phone" || name === "secPhone") {
    newVal = formatPhoneNumber(value);
    value = newVal;
  }
  return (
    <div className="form-group">
      {label && <label htmlFor="app-input-field">{label}</label>}

      {type === "textarea" ? (
        <textarea
          className="form-control"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => handleChange(e)}
        />
      ) : (
        <Input
          type={type}
          value={value}
          className="form-control"
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
          name={name}
        />
      )}
      {error && <span style={{ color: "red" }}>{error.message}</span>}
    </div>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  validators: PropTypes.array,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  value: "",
  label: "",
  placeholder: "",
  type: "text",
  validators: [],
};

export default InputField;
