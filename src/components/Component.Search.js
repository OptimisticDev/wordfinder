import React from "react";
import PropTypes from "prop-types";

const SearchComponent = ({ changeText, placeHolder }) => {
  return (
    <input
      type="text"
      placeholder={placeHolder}
      className="search__field searchWord"
      onChange={changeText}
    />
  );
};

SearchComponent.propTypes = {
  changeText: PropTypes.func,
  placeHolder: PropTypes.string,
};

export default SearchComponent;
