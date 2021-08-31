import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

import DefinationCard from "./Component.Shared.Defination.Card";
import { GLOBAL_INITIAL_STATE } from "../../utils/constants";

const WordDefinationCard = ({
  wordDefinations,
  word,
  pronunciation,
  viewMode,
  changeEventFunc,
  wordIndex,
}) => {
  return (
    <Col xl={4} lg={4} md={4} sm={12} xs={12} style={{ marginTop: "25px" }}>
      <Card style={{ height: "100%" }}>
        <Card.Header>
          {word}
          <i
            className="fas fa-heart"
            style={{
              color: viewMode !== GLOBAL_INITIAL_STATE.viewMode ? "red" : "",
            }}
            onClick={() => changeEventFunc(wordIndex)}
          ></i>
        </Card.Header>
        <Card.Body>
          <Card.Title>{pronunciation}</Card.Title>

          {wordDefinations.map((wordDefination, index) => (
            <DefinationCard
              definition={wordDefination.definition}
              example={wordDefination.example}
              image_url={wordDefination.image_url}
              type={wordDefination.type}
              length={wordDefinations.length - 1}
              index={index}
              key={index}
            />
          ))}
        </Card.Body>
      </Card>
    </Col>
  );
};

WordDefinationCard.propTypes = {
  wordDefinations: PropTypes.array,
  word: PropTypes.string,
  pronunciation: PropTypes.string,
  wordIndex: PropTypes.number,
  viewMode: PropTypes.string,
  changeEvenFunc: PropTypes.func,
};

export default React.memo(WordDefinationCard);
