import Card from "./card.js";

export default class Bingo {
  constructor() {
    this.cards = [
      "Already made a website",
      "Already worked before they started studying",
      "Already designed a logo",
      "Doesn't live with their parents",
      "Doesn't have a Discord account",
      "Has to commute more than 1 hour to school",
      "Is a vegetarian",
      "Can play the guitar",
      "Has already visited the US of A",
      "Is older than 25",
      "Owns a goldfish",
      "Is afraid of snakes",
      "Speaks 3 different languages",
      "Has never been to a festival before",
      "Knows what CSS is",
      "Is a Marvel Comics fan",
      "Knows all the ingredients for a mojito",
      "Has a student job",
      "Plays a team sport",
      "Knows how to play chess",
      "Is a DJ",
      "Likes cilantro",
      "Is afraid of heights",
      "Loves heavy metal music",
      "Is famous on Instagram",
    ];

    // we start by rendering the cards to the screen
    this.renderCards();

    // then we load the saved bingo cards from localstorage to mark them as done
    Bingo.load();
  }

  renderCards() {
    for (let i = 0; i < this.cards.length; i++) {
      let card = new Card(this.cards[i]);
      card.render(i);
    }
  }

  static checkWinner() {
    let cardsDone = document.querySelectorAll(".bingo__card--done");
    if (cardsDone.length === 5) {
      document.querySelector(".bingo__overlay").style.display = "block";
    }
  }

  static save() {
    let cardsWon = [];
    let cards = document.querySelectorAll(".bingo__card--done");

    if (cards.length === 0) {
      localStorage.clear();
    }

    for (let i = 0; i < cards.length; i++) {
      cardsWon.push(cards[i].dataset.number);
      console.log(cardsWon);
    }

    localStorage.setItem("bingo", JSON.stringify(cardsWon));

    if (cardsWon.length === 5) {
      localStorage.clear();
    }
  }

  static load() {
    // check if localstorage item exists
    if (localStorage.getItem("bingo")) {
      let cardsWon = JSON.parse(localStorage.getItem("bingo"));
      console.log(cardsWon);
      for (let i = 0; i < cardsWon.length; i++) {
        let card = document.querySelector(`[data-number="${cardsWon[i]}"]`);
        card.classList.add("bingo__card--done");
      }
    }
  }
}
