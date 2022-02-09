var suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();

var dealerHand = new Array();
var playerHand = new Array();

var playerTotalWeight;

var deckBtn = document.querySelector(".newDeckBtn");
deckBtn.addEventListener("click", createDeck);

function createDeck() {
    deck = new Array();
    values.forEach(values => {
        suits.forEach(suits => {
            var weight = parseInt(values);
            if(values == "J" || values == "Q" || values == "K")
            {
                weight = 10;
            }
            if(values == "A") 
            {
                weight = 11;
            }
            var card = {Value: values, Suit: suits, Weight: weight}
            deck.push(card);
        });
    });
    shuffleDeck(deck);
    console.log("test");
}

function shuffleDeck(deck) {
    var sort = deck.sort((a, b) => 0.5 - Math.random());
    return sort;
}

function dealCards() {
    dealerHand.push(deck[0], deck[3]);
    playerHand.push(deck[1], deck[2]);
}

function checkPlayerWeight() {
    playerTotalWeight = 0;
    parseInt(playerTotalWeight);
    playerHand.forEach(playerHand => {
        playerTotalWeight += playerHand.weight;
    });
}

function startGame() {
    
}