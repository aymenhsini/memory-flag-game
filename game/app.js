const cards = document.querySelectorAll(".memory-card");
const gameScore = document.getElementById("score");
const message = document.querySelector(".message > p");
let score = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
  score++;
  gameScore.innerHTML = score;
  message.innerHTML = " Good job, You found a match !!!\uD83D\uDC4D";
  setTimeout(() => {
    message.innerHTML = "Search for a match !!!";
  }, 2500);
}

function unflipCards() {
  lockBoard = true;
  message.innerHTML = " Sorry, try again !!!\uD83D\uDC4E";
  setTimeout(() => {
    message.innerHTML = "Search for a match !!!";
  }, 2500);
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
