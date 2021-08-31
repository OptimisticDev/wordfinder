import React, { useState, useEffect, useCallback } from "react";
import { Row } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBarComponent from "./components/Component.NavBar";
import SharedButtonComponent from "./components/shared/Component.Shared.Button";
import SearchComponent from "./components/Component.Search";
import WordDetailsCards from "./components/Component.Cards";
import Footer from "./components/Component.Footer";

import {
  GLOBAL_INITIAL_STATE,
  LOCAL_STORAGE_CONSTANTS,
  SUCCESS_STATUS_CODE,
} from "./utils/constants";
import { getWordDefination } from "./api";
import {
  addWordDefinationToStorage,
  getWordDefinationFromStorage,
  capSentence,
  filterWordDefination,
} from "./utils";

const App = () => {
  const [globalState, setGlobalState] = useState(GLOBAL_INITIAL_STATE);

  const searchTextHandler = (e) => {
    const searchKey = e.target.className.split(" ")[1];
    const searchText = e.target.value;
    setGlobalState((prevState) => ({ ...prevState, [searchKey]: searchText }));
  };

  const fetchSearchResult = async () => {
    try {
      const uniqueFilteredWordDetails = filterWordDefination(
        LOCAL_STORAGE_CONSTANTS.definations,
        globalState.searchWord
      );
      
      if (uniqueFilteredWordDetails.length === 0 && globalState.searchWord) {
        const { data, status } = await getWordDefination(
          globalState.searchWord
        );

        if (status === SUCCESS_STATUS_CODE) {
          data.word = data && capSentence(data.word);
          data.definitions = data.definitions.map((def) => {
            return {
              ...def,
              definition: capSentence(def.definition),
              type: capSentence(def.type),
              example: def.example ? capSentence(def.example) : null,
            };
          });

          setGlobalState((prevState) => ({
            ...prevState,
            wordDetails: [data, ...prevState.wordDetails],
          }));

          addWordDefinationToStorage(
            globalState.wordDetails,
            data,
            LOCAL_STORAGE_CONSTANTS.definations
          );
          toast.success("Searching word added to storage successfully");
        } else {
          toast.success("Searching word already exists in storage");
        }
      } else {
        setGlobalState((prevState) => ({
          ...prevState,
          wordDetails: [...uniqueFilteredWordDetails],
        }));
      }
    } catch (error) {
      toast.error("Failed to fetch searching word");
      console.log(error);
    }
  };

  const searchInFavorites = () => {
    const filteredFavorites = filterWordDefination(
      LOCAL_STORAGE_CONSTANTS.favouriteDefinations,
      globalState.searchWord
    );

    setGlobalState((prevState) => ({
      ...prevState,
      favoriteWordDetails: [...filteredFavorites],
    }));
  };

  const addToFavorite = useCallback((index) => {
    const isExistsInFavorite = globalState.favoriteWordDetails.filter(
      (favoriteWordDetail) =>
        favoriteWordDetail.word === globalState.wordDetails[index].word
    );

    if (
      isExistsInFavorite.length === 0 ||
      globalState.favoriteWordDetails.length === 0
    ) {
      setGlobalState((prevState) => ({
        ...prevState,
        favoriteWordDetails: [
          prevState.wordDetails[index],
          ...prevState.favoriteWordDetails,
        ],
      }));

      addWordDefinationToStorage(
        globalState.favoriteWordDetails,
        globalState.wordDetails[index],
        LOCAL_STORAGE_CONSTANTS.favouriteDefinations
      );
      toast.info("Word successfully added to favorite word list");
    } else {
      toast.error("Selected word already exists in favorite word list");
    }
  }, [globalState.favoriteWordDetails, globalState.wordDetails]);

  const removeFromFavorite = useCallback((removedIndex) => {
    const removedWordDefination = globalState.favoriteWordDetails.filter(
      (favoriteWordDetail, index) => index !== removedIndex
    );
    setGlobalState((prevState) => ({
      ...prevState,
      favoriteWordDetails: [...removedWordDefination],
    }));

    addWordDefinationToStorage(
      removedWordDefination,
      null,
      LOCAL_STORAGE_CONSTANTS.favouriteDefinations
    );
    toast.warn("Word successfully removed to favorite word list");
  },[globalState.favoriteWordDetails]);

  const ToggleViewMode = (viewMode) =>
    setGlobalState((prevState) => ({ ...prevState, viewMode: viewMode }));

  useEffect(() => {
    const storedwordDetails = getWordDefinationFromStorage(
      LOCAL_STORAGE_CONSTANTS.definations
    );
    const storedFavoriteWordDetails = getWordDefinationFromStorage(
      LOCAL_STORAGE_CONSTANTS.favouriteDefinations
    );
    if (storedwordDetails) {
      setGlobalState((prevState) => ({
        ...prevState,
        wordDetails: [...storedwordDetails],
      }));
    }
    if (storedFavoriteWordDetails) {
      setGlobalState((prevState) => ({
        ...prevState,
        favoriteWordDetails: [...storedFavoriteWordDetails],
      }));
    }
  }, []);
  
  return (
    <div className="App">
      <NavBarComponent />
      <div className="directory__group">
        <SharedButtonComponent
          title="Search Dictionary"
          variant="light"
          viewMode="searchDictionary"
          changeFunc={ToggleViewMode}
        />
        <SharedButtonComponent
          title="View Favorites"
          variant="primary"
          viewMode="searchFavorites"
          changeFunc={ToggleViewMode}
        />
      </div>
      <div className="search__panel">
        <SearchComponent
          changeText={searchTextHandler}
          placeHolder={
            globalState.viewMode === GLOBAL_INITIAL_STATE.viewMode
              ? "Search in dictionary"
              : "Search in favorites"
          }
        />
        <SharedButtonComponent
          title="Search"
          variant="outline-success"
          changeFunc={
            globalState.viewMode === GLOBAL_INITIAL_STATE.viewMode
              ? fetchSearchResult
              : searchInFavorites
          }
        />
      </div>
      <div className="card__list">
        <Row className="align-items-stretch">
          <WordDetailsCards
            wordDetails={
              globalState.viewMode === GLOBAL_INITIAL_STATE.viewMode
                ? globalState.wordDetails
                : globalState.favoriteWordDetails
            }
            changeEventFunc={
              globalState.viewMode === GLOBAL_INITIAL_STATE.viewMode
                ? addToFavorite
                : removeFromFavorite
            }
            viewMode={globalState.viewMode}
          />
        </Row>
        <ToastContainer />
        <Footer />
      </div>
    </div>
  );
};

export default App;
