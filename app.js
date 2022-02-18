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
    if(deck.length < 10) {
    deck = [];
    values.forEach(values => {
        suits.forEach(suits => {
            let weight = parseInt(values);
            if(values == "J" || values == "Q" || values == "K")
            {
                weight = 10;
            }
            if(values == "A") 
            {
                weight = 11;
            }
            let card = {Value: values, Suit: suits, Weight: weight}
            deck.push(card);
        });
    });
    shuffleDeck(deck);
}
    dealCards();
}

function shuffleDeck(deck) {
    let sort = deck.sort((a, b) => 0.5 - Math.random());
    return sort;
}

function dealCards() {
    dealerHand = []
    playerHand = []

    dealerLow = true;

    dealerHand.push(deck[0]);
    deck.shift();
    playerHand.push(deck[0]);
    deck.shift();
    playerHand.push(deck[0]);
    deck.shift();
    dealerHand.push(deck[0]);
    deck.shift();

    playerCardAmount.innerHTML = "Player cards: " + checkPlayerWeight();
    dealerCardAmount.innerHTML = "Dealer cards: " + dealerHand[0].Weight;
}

function checkPlayerWeight() {
    let cardWeight = 0;
    playerHand.forEach(playerHand => {
        cardWeight += playerHand.Weight;
    });
    return cardWeight;
}

function checkDealerWeight() {
    let dealerCardWeight = 0;
    dealerHand.forEach(dealerHand => {
        dealerCardWeight += dealerHand.Weight;
    })
    return dealerCardWeight;
}

function hit() {
    playerHand.push(deck[0])
    deck.shift();
    if(checkPlayerWeight() > 21) {
        playerHand.forEach(playerHand => {
            if(playerHand.Value == "A") {
                playerHand.Weight = 1
            }
        }) 
        if(checkPlayerWeight() > 21) {
            console.log("You have lost");
        }
    }
    playerCardAmount.innerHTML = "Player cards: " + checkPlayerWeight();
}

function dealerHit() {
    dealerHand.push(deck[0]);
    deck.shift();
}

function stand() {

    if(checkDealerWeight > 16) {
        dealerLow = false;
    }
    
    while(dealerLow) {
        dealerHit();
        dealerCardAmount.innerHTML = "Dealer cards: " + checkDealerWeight();

        if(checkDealerWeight() > 16) {
            dealerLow = false;
        }
        
    }
    
    if (checkDealerWeight() > 16) {
        if(checkDealerWeight() > checkPlayerWeight() && checkDealerWeight() < 22) {
            console.log("You have Lost...");
            gameOver = true;
        } else if (checkPlayerWeight() == checkDealerWeight()) {
            console.log("Its a Draw.");
            gameDraw = true;
        } else {
            console.log("You have Won!");
            gameWon = true;
        }
    }
}