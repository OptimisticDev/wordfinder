export const addWordDefinationToStorage = (
  wordDefinations,
  newDefinations,
  key
) => {
  if (newDefinations !== null) {
    localStorage.setItem(
      key,
      JSON.stringify([newDefinations, ...wordDefinations])
    );
  } else {
    localStorage.setItem(key, JSON.stringify([...wordDefinations]));
  }
};

export const getWordDefinationFromStorage = (key) => {
  const wordDetails = JSON.parse(localStorage.getItem(key));
  if (wordDetails === null) return [];
  else return wordDetails;
};

export const capSentence = (text) => {
  let wordsArray = text.toLowerCase().split(" ");
  let capsArray = [];

  wordsArray.forEach((word) => {
    capsArray.push(word[0].toUpperCase() + word.slice(1));
  });

  return capsArray.join(" ");
};

export const filterWordDefination = (storageKey, searchKey) => {
  const wordDetails = getWordDefinationFromStorage(storageKey);
  const uniqueFilteredWordDetails = new Set();
  let filterWordDetails = [];
  if (searchKey) {
    wordDetails.forEach((wordDetail) => {
      wordDetail.definitions.forEach((def) => {
        if (
          def.type.toLowerCase().includes(searchKey.toLowerCase()) ||
          wordDetail.word.toLowerCase().includes(searchKey.toLowerCase())
        ) {
          uniqueFilteredWordDetails.add(wordDetail);
        }
      });
    });
    for (let item of uniqueFilteredWordDetails) filterWordDetails.push(item);
  } else {
    filterWordDetails = wordDetails;
  }
  return filterWordDetails;
};
