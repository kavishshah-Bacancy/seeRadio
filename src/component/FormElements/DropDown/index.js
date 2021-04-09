import React from "react";
import PropTypes from "prop-types";

const DropDown = ({
  value,
  name,
  data,
  placeholder,
  styleClass,
  onChange,
  disabled,
}) => {
  const handleChange = (e) => {
    console.log(e.target.name);
    onChange(e.target.name, e.target.value);
  };
  return (
    <div className={`form-group ${styleClass}`}>
      <select
        name={name}
        value={name === "state" || name === "secState" ? value.name : value}
        className="form-control"
        onChange={handleChange}
        disabled={disabled ? disabled : null}
      >
        <option value="">{placeholder}</option>
        {data.map((item, key) => (
          <option
            key={key}
            value={
              name === "state" || name === "secState"
                ? JSON.stringify(item)
                : item.id
            }
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

DropDown.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.array.isRequired,
  styleClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
  value: "",
  styleClass: "",
  placeholder: "",
};

export default DropDown;
