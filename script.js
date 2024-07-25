'use strict';

const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const CurrentScoreEl0 = document.getElementById('current--0');
const CurrentScoreEl1 = document.getElementById('current--1');

let scores = [0, 0];
let activePlayer = 0;

// Initial conditions
scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
diceEl.classList.add('hidden');

let CurrentScore = 0;
let playing = true;

function switchPlayer() {
  console.log('Switch Player !');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  CurrentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

// Dice roll functionality
let diceNum;

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceNum = Math.floor(Math.random() * 6 + 1);
    //   console.log(diceNum);

    diceEl.src = `dice-${diceNum}.png`;
    diceEl.classList.remove('hidden');

    if (diceNum !== 1) {
      CurrentScore = CurrentScore + diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        CurrentScore;
    } else {
      // Switching to next player
      // console.log('Switch Player !');
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // CurrentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;

      // document.querySelector('.player--0').classList.toggle('player--active');
      // document.querySelector('.player--1').classList.toggle('player--active');
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  // Add current score to active player's score
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + CurrentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      console.log(playing);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');

      document.querySelector(`#name--${activePlayer}`).textContent = `Winner !`;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // Reset game
  scores = [0, 0];
  CurrentScore = 0;
  playing = true;
  // diceEl.classList.remove('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document.querySelector('.player--0').classList.add('player--active');

  document.getElementById(`name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;

  document.getElementById(`current--${activePlayer}`).textContent =
    CurrentScore;
  activePlayer = 0;

  diceEl.classList.add('hidden');
});
