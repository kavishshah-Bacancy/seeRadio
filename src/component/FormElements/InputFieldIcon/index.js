import React, { useState } from "react";
import PropTypes from "prop-types";

import { validateInput, Validators } from "../../Validator/Validator";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

const InputFieldIcon = ({
  value,
  label,
  name,
  placeholder,
  validators,
  type,
  onChange,
  children,
  newPwd,
}) => {
  const [error, setError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const handleChange = (event) => {
    setError(validateInput(validators, event.target.value));
    if (event.target.name === "confirmPassword") {
      if (event.target.value !== newPwd) {
        setConfirmError(true);
      } else setConfirmError(false);
    }
    onChange(event.target.name, event.target.value);
  };

  return (
    <div style={{ padding: "0px 0px 20px" }}>
      <InputGroup>
        {label && <label htmlFor="app-input-field">{label}</label>}
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
          name={name}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>{children}</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {error && <span style={{ color: "red" }}>{error.message}</span>}
      {!error && confirmError ? (
        <span style={{ color: "red" }}>
          Confirm Password and New password does not Match**
        </span>
      ) : null}
    </div>
  );
};

// InputFieldIcon.propTypes = {
//   value: PropTypes.string,
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   validators: PropTypes.array,
//   type: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
// };

// InputFieldIcon.defaultProps = {
//   value: "",
//   label: "",
//   placeholder: "",
//   type: "text",
//   validators: [],
// };

export default InputFieldIcon;
