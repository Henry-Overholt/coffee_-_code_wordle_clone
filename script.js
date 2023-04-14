// Get a word to start with, the puzzle ✅

// Take a user guess ✅

// See how close, check the guess ✅

// repeat until user solves or they run out of guess ✅

// modify the board ✅

// to reset board

(() => {
  let word = "";
  let userGuess = "";
  let keyboard = document.querySelector(".keyboard");
  let keys = document.querySelectorAll(".key");
  let gameRows = document.querySelectorAll(".gameboard-row");
  let guessNum = 1;
  let guesses = [];

  /**
   * calls the api that returns a random word of 5 characters in length
   */
  function getWord() {
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((response) => response.json())
      .then((data) => {
        word = data[0];
        console.log(word);
      });
  }

  /**
   * @param key {string} the inputted key data from both the key press listener and the click event
   * Takes action depending on what key is pressed, enter = checkGuess / delete = remove letter from key and gameboard / accepted letter = adds to guess and gameboard
   */
  function handleLetterEvent(key) {
    if (key.toLowerCase() === "enter") {
      if (userGuess.length === 5) {
        checkGuess();
      }
    } else if (
      key.toLowerCase() === "delete" ||
      key.toLowerCase() === "backspace"
    ) {
      findLetterTile(userGuess.length - 1, guessNum).innerText = ""; // the returned element from findLetterTile and reset that innerText to empty
      userGuess = userGuess.substring(0, userGuess.length - 1);
    } else if (isLetter(key) != null) {
      if (userGuess.length < 5) {
        findLetterTile(userGuess.length, guessNum).innerText =
          key.toUpperCase(); // adds key as innerText to returned element as upperCase version;
        userGuess += key;
      }
    }
  }

  /**
   * runs the check after enter is pressed to win the game, continue to next guess or ends the game if number of guesses is reached
   */
  function checkGuess() {
    if (userGuess === word) {
      giveFeedback(guessNum, userGuess);
      console.log("You win");
    } else {
      if (guessNum < 6) {
        giveFeedback(guessNum, userGuess);
        guessNum++; // increments guess counter
        guesses.push(userGuess); // pushes guess to the guesses array as history of guess

        userGuess = ""; //resets guess to empty string for next guess
      } else {
        console.log("You lose");
      }
    }
  }
  /**
   * unction that will change the color for tiles as correct, present or absent
   * @param num the guess number
   * @param guess the guess we are checking
   */
  function giveFeedback(num, guess) {
    let feedbacks = [];
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === word[i]) {
        findLetterTile(i, num).classList.add("correct");
        changeKeyBackgrounds(guess[i], "correct");
        feedbacks.push("correct");
      } else if (word.includes(guess[i])) {
        findLetterTile(i, num).classList.add("present");
        changeKeyBackgrounds(guess[i], "present");
        feedbacks.push("present");
      } else {
        findLetterTile(i, num).classList.add("absent");
        changeKeyBackgrounds(guess[i], "absent");
        feedbacks.push("absent");
      }
    }
  }

  /**
   * Finds and changes the keys on the keyboard to reflect guessed letters if absent, present, or correct
   * @param letter the letter we are looking for
   * @param className the class name we are adding
   */
  function changeKeyBackgrounds(letter, className) {
    for (let key of keys) {
      if (key.dataset.key === letter) {
        key.classList.add(className);
        break;
      }
    }
  }

  /**
   * @param letterPosition the position of the tile you want returned. For adding you want the userGuess.length for deleting you want userGuess.length -1
   * @returns the selected div with a class of tile to add or remove innerText or add a class
   */
  function findLetterTile(letterPosition, number) {
    for (let row of gameRows) {
      //loops through gameRows looking for the correct row
      if (+row.dataset.row === number) {
        //compares our dataset attribute to the current guessNum starting at 1
        return row.children[letterPosition]; //returns the entire div with class of tile
      }
    }
  }

  /**
   * @param str string of the letter you want to check to see if it is a letter
   * @returns the matching letter object if matched / null if not a letter
   */
  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  // event listener to clicks in the keyboard element
  keyboard.addEventListener("click", (event) => {
    if (event.target.dataset.key != undefined) {
      handleLetterEvent(event.target.dataset.key);
    }
  });

  // event listener for any key down event so user can type in guess if they don't want to click
  document.body.addEventListener("keydown", (event) =>
    handleLetterEvent(event.key)
  );

  // makes the call to get the word to guess
  getWord();
})();
