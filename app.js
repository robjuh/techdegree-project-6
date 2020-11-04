//2. Get the elements you’ll need from your HTML
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const btn_reset = document.querySelector(".btn__reset");
const keyboardButton = document.querySelectorAll(".keyrow button");
let missed = 0;

//3. attach a event listener to the “Start Game” button to hide the start screen overlay
btn_reset.addEventListener('click', () => {
    btn_reset.style.display = 'none';
});

//4. Create a phrases array that contains at least 5 different phrases as strings

let phrases = [
    "ajax amsterdam",
    "it always rains in the netherland",
    "everyone is a giant",
    "we are rude",
    "everyone wears clogs",
];

//5. Create a getRandomPhraseAsArray function
function getRandomPhraseAsArray(arr) {
    const randomNum = Math.floor(Math.random() * arr.length);
    randomPhrase = arr[randomNum];
    phraseCharacters = randomPhrase.split("");
    return phraseCharacters;
  }
  
  function addPhraseToDisplay(arr) {
    const ul = document.querySelector("#phrase ul");
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement("li");
      ul.appendChild(li);
      li.textContent = arr[i];
      if (arr[i] != " ") {
        li.className = "letter";
      } else {
        li.className = "space";
      }
    }
  }

//6. Set the game display
    btn_reset.addEventListener("click", () => {
    for (let i = 0; i < keyboardButton.length; i++) {
     keyboardButton[i].style.cursor = "pointer";
     }
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
    missed = 0;
    const buttons = document.querySelectorAll(".keyrow button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("chosen");
      buttons[i].disabled = false;
    }
    const hearts = document.querySelectorAll(".tries img");
    for (let j = 0; j < hearts.length; j++) {
      hearts[j].src = "images/liveHeart.png";
    }
    const listItems = document.querySelectorAll("ul li");
    for (let j = 0; j < listItems.length; j++) {
      if (listItems[j] != 0) {
        listItems[j].remove();
      }
    }
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
  });

  //7. Create a checkLetter function
  function checkLetter(buttonSelected) {
    const letters = document.querySelectorAll(".letter");
    let letterMatch = null;
    for (let i = 0; i < letters.length; i++) {
      if (buttonSelected == letters[i].textContent) {
        letters[i].className = "letter show";
        letterMatch = letters[i].textContent;
      }
    }
    return letterMatch;
  }

  //8. Add an event listener to the keyboard
qwerty.addEventListener("click", (event) => {
    const buttons = document.querySelectorAll(".keyrow button");
    const buttonContent = event.target.textContent;
  
    if (event.target.tagName == "BUTTON") {
      event.target.style.cursor = "none";
      let letterFound = checkLetter(buttonContent);
      for (let i = 0; i < buttons.length; i++) {
        event.target.className = "chosen";
        event.target.disabled = true;
      }

  //9. Count the missed guesses in the game
  const hearts = document.querySelectorAll(".tries img");
  if (letterFound == null) {
    hearts[missed].src = "images/lostHeart.png";
    hearts.length--;
    missed += 1;
  }
  
  const letters = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");

  //10. Create a checkWin function
  function checkWin() {
    let overlay = document.querySelector("#overlay");
    let overlayTitle = document.querySelector(".title");
    if (show.length == letters.length) {
      overlay.className = "win";
      overlay.style.display = "flex";
      overlayTitle.textContent = "You Win !";
    } else if (missed >= 5) {
      overlay.className = "lose";
      overlay.style.display = "flex";
      overlayTitle.textContent = "Game Over ";
    }
  }
  checkWin();
}
});