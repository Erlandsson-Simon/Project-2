let suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();

let dealerHand = new Array();
let playerHand = new Array();

let playerTotalWeight;

let num = 4;

let dealerLow = true;

let gameOver = false;
let gameDraw = false;
let gameWon = false;

let playerCardAmount = document.querySelector(".playerCards");
let dealerCardAmount = document.querySelector(".dealerCards");

let dealButton = document.querySelector(".dealCardsButton");
dealButton.addEventListener("click", createDeck);

let hitButton = document.querySelector(".hitButton");
hitButton.addEventListener("click", hit);

let standButton = document.querySelector(".standButton");
standButton.addEventListener("click", stand);

function createDeck() {
  // 10 + ny deck
  gameDraw = false;
  gameEnd = false;
  gameWon = false;

  if (deck.length < 10) {
    deck = [];
    values.forEach((values) => {
      suits.forEach((suits) => {
        let weight = parseInt(values);
        if (values == "J" || values == "Q" || values == "K") {
          weight = 10;
        }
        if (values == "A") {
          weight = 11;
        }
        let card = { Value: values, Suit: suits, Weight: weight };
        deck.push(card);
      });
    });
  }
  shuffleDeck(deck);
  dealCards();
}

function shuffleDeck(deck) {
  let sort = deck.sort((a, b) => 0.5 - Math.random());
  return sort;
}

function dealCards() {
  document.querySelector(".endScreen").style.display = "none";

  dealerHand = [];
  playerHand = [];

  dealerLow = true;

  dealerHand.push(deck[0]);
  deck.shift();

  document.querySelector(".dealerCards").innerHTML = "";
  document.querySelector(".dealerCards").append(dealerImgSelector());

  playerHand.push(deck[0]);
  deck.shift();

  playerHand.push(deck[0]);
  deck.shift();

  dealerHand.push(deck[0]);
  deck.shift();

  document.querySelector(".playerCards").innerHTML = "";
  document.querySelector(".playerCards").append(playerImgSelector());

  document.querySelector(".playerCardText").innerHTML =
    "Player cards: " + checkPlayerWeight();
  document.querySelector(".dealerCardText").innerHTML =
    "Dealer cards: " + dealerHand[0].Weight;

  if (checkPlayerWeight() == 21) {
    console.log("You have won");
    gameWon = true;
    gameEnd();
  }
}

function checkPlayerWeight() {
  let cardWeight = 0;
  playerHand.forEach((playerHand) => {
    cardWeight += playerHand.Weight;
  });
  return cardWeight;
}

function checkDealerWeight() {
  let dealerCardWeight = 0;
  dealerHand.forEach((dealerHand) => {
    dealerCardWeight += dealerHand.Weight;
  });
  return dealerCardWeight;
}

function hit() {
  playerHand.push(deck[0]);
  deck.shift();
  document.querySelector(".playerCards").innerHTML = "";
  document.querySelector(".playerCards").append(playerImgSelector());
  if (checkPlayerWeight() > 21) {
    playerHand.forEach((playerHand) => {
      if (playerHand.Value == "A") {
        playerHand.Weight = 1;
      }
    });
    if (checkPlayerWeight() > 21) {
      console.log("You have lo");
      gameOver = true;
      gameEnd();
    }
  }
  document.querySelector(".playerCardText").innerHTML =
    "Player cards: " + checkPlayerWeight();

  if (checkPlayerWeight() > 21) {
    console.log("You have Lost...");
    gameOver = true;
    gameEnd();
  }
}

function dealerHit() {
  dealerHand.push(deck[0]);
  deck.shift();
  document.querySelector(".dealerCards").innerHTML = "";
  document.querySelector(".dealerCards").append(dealerImgSelector());
}

function stand() {
  if (checkDealerWeight > 16) {
    dealerLow = false;
  }

  while (dealerLow) {
    dealerHit();

    document.querySelector(".dealerCardText").innerHTML =
      "Dealer cards: " + checkDealerWeight();

    if (checkDealerWeight() > 16) {
      dealerLow = false;
    }
  }

  if (checkDealerWeight() > checkPlayerWeight() && checkDealerWeight() < 22) {
    console.log("You have Lost...");
    gameOver = true;
    gameEnd();
  } else if (checkPlayerWeight() == checkDealerWeight()) {
    console.log("Its a Draw.");
    gameDraw = true;
    gameEnd();
  } else {
    console.log("You have Won!");
    gameWon = true;
    gameEnd();
  }
}

function playerImgSelector() {
  let playerCardDiv = document.createElement("div");

  playerHand.forEach((element) => {
    let playerCardImgSrc = "./CardImages/";
    playerCardImgSrc += element.Suit;
    playerCardImgSrc += "/";
    playerCardImgSrc += element.Value;
    playerCardImgSrc += ".png";
    console.log(playerCardImgSrc);
    let playerCardImg = document.createElement("img");
    playerCardImg.setAttribute("src", playerCardImgSrc);
    playerCardImg.setAttribute("alt", element.Value + "of" + element.Suit);
    playerCardDiv.append(playerCardImg);
  });

  return playerCardDiv;
}

function dealerImgSelector() {
  let dealerCardDiv = document.createElement("div");

  dealerHand.forEach((element) => {
    let dealerCardImgSrc = "./CardImages/";
    dealerCardImgSrc += element.Suit;
    dealerCardImgSrc += "/";
    dealerCardImgSrc += element.Value;
    dealerCardImgSrc += ".png";
    console.log(dealerCardImgSrc);
    let dealerCardImg = document.createElement("img");
    dealerCardImg.setAttribute("src", dealerCardImgSrc);
    dealerCardImg.setAttribute("alt", element.Value + "of" + element.Suit);
    dealerCardDiv.append(dealerCardImg);
  });

  return dealerCardDiv;
}

function gameEnd() {
  console.log("hello");
  if (gameOver) {
    document.querySelector(".endScreen").style.display = "flex";
    document.querySelector(".endText").innerHTML = "You have lost!";
  }

  if (gameDraw) {
    document.querySelector(".endScreen").style.display = "flex";
    document.querySelector(".endText").innerHTML = "It's a draw!";
  }

  if (gameWon) {
    document.querySelector(".endScreen").style.display = "flex";
    document.querySelector(".endText").innerHTML = "You have won!";
  }
}
