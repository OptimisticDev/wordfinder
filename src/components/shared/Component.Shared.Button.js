import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const SharedButtonComponent = ({ title, variant, changeFunc, viewMode }) => {
  return (
    <Button variant={variant} onClick={() => changeFunc(viewMode)}>
      {title}
    </Button>
  );
};

SharedButtonComponent.defaultProps = {
  variant: "dark",
};

SharedButtonComponent.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  viewMode: PropTypes.string,
  changeFunc: PropTypes.func,
};

export default SharedButtonComponent;
