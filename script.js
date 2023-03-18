// Take a user guess

// See how close, check the guess

// modify the board

// repeat until user solves or they run out of guess

// to reset board

(() => {
  // Get a word to start with, the puzzle
  let word = "";
  let userGuess = "";
  let keyboard = document.querySelector(".keyboard");

  function getWord() {
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((response) => response.json())
      .then((data) => {
        //   console.log(data);
        word = data[0];
        console.log(word);
      });
  }

  function handleLetterEvent(key) {
    if (key.toLowerCase() === "enter") {
      if (userGuess.length === 5) {
        console.log("enter was clicked");
      }
    } else if (
      key.toLowerCase() === "delete" ||
      key.toLowerCase() === "backspace"
    ) {
      userGuess = userGuess.substring(0, userGuess.length - 1);
      console.log(userGuess);
    } else if (isLetter(key) != null) {
      if (userGuess.length < 5) {
        userGuess += key;
        console.log(userGuess);
      }
    }
  }

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  keyboard.addEventListener("click", (event) => {
    if (event.target.dataset.key != undefined) {
      handleLetterEvent(event.target.dataset.key);
    }
  });
  // event.target.dataset.key = 'g'
  document.body.addEventListener("keydown", (event) =>
    handleLetterEvent(event.key)
  );
  //event.key

  getWord();
})();
