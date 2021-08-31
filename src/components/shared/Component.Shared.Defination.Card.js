import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";

const DefinationCard = ({
  definition,
  example,
  image_url,
  type,
  length,
  index,
}) => {
  return (
    <>
      {image_url && (
        <Image
          src={image_url}
          style={{ height: "70px", width: "70px", marginLeft: "45%" }}
          roundedCircle
        />
      )}
      <h6> Type: {type}</h6>
      <h6>Definition: {definition}</h6>
      {example && <h6>Example: {example}</h6>}
      <h6> {image_url}</h6>
      {length !== index && (
        <hr
          style={{
            color: "coral",
            backgroundColor: "red",
            height: 2,
          }}
        />
      )}
    </>
  );
};

DefinationCard.propTypes = {
  definition: PropTypes.string,
  example: PropTypes.string,
  image_url: PropTypes.string,
  type: PropTypes.string,
  length: PropTypes.number,
  index: PropTypes.number,
};

export default React.memo(DefinationCard);
