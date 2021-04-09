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
  selectedCondition,
  cityName,
}) => {
  const handleChange = (e) => {
    console.log(e.target.name);
    onChange(e.target.name, e.target.value);
  };
  return (
    <div className={`form-group ${styleClass}`}>
      <select
        name={name}
        value={name === "targetMarket" ? value.name : value.companyName}
        className="form-control"
        onChange={handleChange}
        disabled={disabled ? disabled : null}
      >
        <option value="">{placeholder}</option>
        {data.map((item, key) => (
          <option
            key={key}
            selected={
              name !== "targetMarket"
                ? item.id === selectedCondition
                  ? true
                  : false
                : item.name === cityName
                ? true
                : false
            }
            value={JSON.stringify(item)}
          >
            {name === "targetMarket" ? item.name : item.companyName}
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
