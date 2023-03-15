// Take a user guess

// See how close, check the guess

// modify the board

// repeat until user solves or they run out of guess

// to reset board

(() => {
  // Get a word to start with, the puzzle
  let word = "";

  function getWord() {
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((response) => response.json())
      .then((data) => {
        //   console.log(data);
        word = data[0];
        console.log(word);
      });
  }

  getWord();
})();
