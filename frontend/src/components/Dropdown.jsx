import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";

const Select = (props) => {
  const { dropdownOptions, handleDropdown, selected,label } = props;
  return (
    <DropdownButton 
    key={props.key}
      onSelect={handleDropdown}
      id="dropdown-basic-button"
      title={selected === null ? label : selected}
    >
      {dropdownOptions.map((item) => {
        return <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>;
      })}
    </DropdownButton>
  );
};

export default Select;
