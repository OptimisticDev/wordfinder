import React from "react";
import PropTypes from "prop-types";
import WordDefinationCard from "./shared/Component.Shared.Card";

const WordDetailsCards = ({ wordDetails, viewMode, changeEventFunc }) => {
  return (
    <>
      {wordDetails.map((wordDetail, index) => (
        <WordDefinationCard
          wordDefinations={wordDetail.definitions}
          word={wordDetail.word}
          pronunciation={wordDetail.pronunciation}
          changeEventFunc={changeEventFunc}
          wordIndex={index}
          key={index}
          viewMode={viewMode}
        />
      ))}
    </>
  );
};

WordDetailsCards.propTypes = {
  wordDetails: PropTypes.array.isRequired,
  viewMode: PropTypes.string.isRequired,
  changeEventFunc: PropTypes.func.isRequired,
};

export default React.memo(WordDetailsCards);
