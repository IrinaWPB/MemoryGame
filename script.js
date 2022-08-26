const gameContainer = document.getElementById("game");
const startGame = document.querySelector('#startbtn');
const startGameDiv = document.querySelector('#start');
const restartGame = document.querySelector('#restart');
const scoreDisplay = document.querySelector('#score');
const gameOverDiv = document.querySelector('#gameover');
const lowestScoreIn = document.querySelector('#lowest-score');
const finalScoreIn = document.querySelector('#final-score');
const cardsQty = document.querySelector("input");

let cards;
let score = 0;
let firstClicked;
let shuffledColors;

startGame.addEventListener('click', function(e) {
  e.preventDefault();
  gameContainer.classList.remove('hidden');
  startGameDiv.classList.add('hidden');
  shuffledColors = shuffle(rgbColors());
  createDivsForColors(shuffledColors); 
});

restartGame.addEventListener('click', function() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = 'white';
    cards[i].classList.remove('matched');
    score = 0;
    scoreDisplay.innerText = score;
  }
});

function rgbColors() {
  let colors = [];
  for (let i = 0; i < (parseInt(cardsQty.value))/2; i++) {
    let r  = Math.floor(Math.random() * 256);
    let g  = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    colors[i] = `rgb(${r},${g},${b})`;
  }
    colors = colors.concat(colors);
    return colors;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = parseInt(cardsQty.value);
  console.log('Counter', counter);

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}



// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    console.log("gde ya");
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    cards = document.querySelectorAll('div>div');
  }
}
let pairCounter = 0;
function handleCardClick(event) {
  
  //When clicked - changing a background color
  event.target.style.backgroundColor = event.target.className;

  //Checking if there is a clicked card
  if (firstClicked && event.target !== firstClicked) {
    //If classnames match - keeping them on the screen
    if (event.target.className === firstClicked.className ) {
    event.target.style.backgroundColor = event.target.className;
    event.target.classList.add('matched');
    firstClicked.classList.add('matched');
    pairCounter += 2;
      if (pairCounter === parseInt(cardsQty.value)) {
          gameOver(score);
        }
    //Setting to a start of the cycle
    firstClicked = '';

    //If colors don't march setting both divs colors to white
    } else {
      setTimeout(function() {
      firstClicked.style.backgroundColor = 'white';
      event.target.style.backgroundColor = 'white';
      //Starting the cycle over
      firstClicked = '';
      }, 1000); 
    }
  //SEtting a first clicked card  
  } else {
    event.target.style.backgroundColor = event.target.className;
    firstClicked = event.target;
  }
  score++;
  scoreDisplay.innerText = score;
  console.log(score);
} 

function gameOver(finalScore) {
  let lowestScore = localStorage.getItem('lowestScore');
  if (!lowestScore || lowestScore > finalScore) {
    lowestScore = finalScore;
  }
  localStorage.setItem('lowestScore', lowestScore);
  lowestScoreIn.innerText = lowestScore;
  finalScoreIn.innerText = finalScore;
  setInterval(function() {
    gameContainer.classList.add('hidden'); 
    gameOverDiv.classList.remove('hidden');
    startGameDiv.classList.remove('hidden');
  }, 1000);
}







