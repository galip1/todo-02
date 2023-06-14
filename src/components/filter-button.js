import React from "react";

const FilterButton = ({ isPressed, name, setFilter }) => {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span>{name}</span>
    </button>
  );
};

export default FilterButton;
