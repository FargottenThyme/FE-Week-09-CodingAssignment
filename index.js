// Card Game: War simulation

// Create the class "Card"
class Card {
    // Assign constructor variables: value and cardSuit ("suit" caused issues initially)
    constructor(value, cardSuit) {
        this.value = value
        this.cardSuit = cardSuit
    }

    // Create a method to return the card name based on the value
    describe() {
        switch(this.value) {
            case 1:
                return `Ace of ${this.cardSuit}`;
                break;
            case 2:
                return `Two of ${this.cardSuit}`;
                break;
            case 3:
                return `Three of ${this.cardSuit}`;
                break;
            case 4:
                return `Four of ${this.cardSuit}`;
                break;
            case 5:
                return `Five of ${this.cardSuit}`;
                break;
            case 6:
                return `Six of ${this.cardSuit}`;
                break;
            case 7:
                return `Seven of ${this.cardSuit}`;
                break;
            case 8:
                return `Eight of ${this.cardSuit}`;
                break;
            case 9:
                return `Nine of ${this.cardSuit}`;
                break;
            case 10:
                return `Ten of ${this.cardSuit}`;
                break;
            case 11:
                return `Jack of ${this.cardSuit}`;
                break;
            case 12:
                return `Queen of ${this.cardSuit}`;
                break;
            case 13:
                return `King of ${this.cardSuit}`;
                break;
            default:
                console.error(); // returns an error if none of the valid card values are inputted
                break;
        }
    }
}

// Create the class "Deck"
class Deck {
    // Use the constructor to create an empty array to store multiples of Card
    constructor() {
        this.cards = [];
    }

    // Creates a method to add cards to the cards array
    // Uses a nested for loop to assign values based on j, and suits based on i
    addCards() {
        for(let i = 1; i <= 4; i++) {
            for(let j = 1; j <= 13; j++) {
                if(i === 1) {
                    this.cards.push(new Card(j, "Spades"))
                } else if (i === 2) {
                    this.cards.push(new Card(j, "Hearts"))
                } else if (i === 3) {
                    this.cards.push(new Card(j, "Clubs"))
                } else {
                    this.cards.push(new Card(j, "Diamonds"))
                }
            }
        }
    }

    // Creates a method to shuffle the cards array
    // Uses Math.floor and Math.random to "randomize" the value of j
    shuffleCards() {
        let preShuffle = this.cards // Creates a placeholder as a copy of the cards array
        let postShuffle = [] // Creates a placeholder for the shuffled array
        for (let i = this.cards.length; i > 0; i--) {
            let j = Math.floor(Math.random() * preShuffle.length)
            postShuffle.push(preShuffle[j]) // Pushes the preShuffle index to the postShuffle array
            preShuffle.splice(j, 1) // Removes the index from preShuffle to prevent recursion
        }
        this.cards = postShuffle // Sets the cards array to the resulting shuffled array
    }

    // Creates a method to deal the cards to player hands alternating
    // At the end, resets the cards array to empty.
    dealCards(player1, player2) {
        this.player1 = player1
        this.player2 = player2
        for (let i = 0; i < this.cards.length; i++) {
            if (i % 2 !== 0) {
                this.player1.cardsInHand.push(this.cards[i])
            } else {
                this.player2.cardsInHand.push(this.cards[i])
            }
        }
        this.cards = [];
    }

    // Creates a method to show the contents of the deck via the Card describe
    // If there are no contents, returns a message to say as such
    describe() {
        let contents = ""
        for (let i = 0; i < this.cards.length; i++) {
            contents += `${this.cards[i].describe()}\n`;
        }
        if (contents === "") {
            return `There is no cards in the deck.`
        }
        return contents
    }
}

// Creates the class "Player"
class Player {
    // Uses the constructor to assign a playerName via the parameter given,
    // Create a score with zero, and create an empty "cardsInHand" array
    constructor(playerName) {
        this.playerName = playerName
        this.score = 0
        this.cardsInHand = []
    }

    // Creates a method to iterate through and describe each card in the player's hand
    describeHand() {
        let contents = ""
        for (let i = 0; i < this.cardsInHand.length; i++) {
            contents += `${this.cardsInHand[i].describe()}\n`;
        }
        if (contents === "") {
            return `There is no cards in the Hand.`
        }
        return contents
    }

    // Creates a method to describe the player and their points if needed
    describe() {
        return `My name is ${this.playerName}. I have ${this.score} points.`
    }
}

// Creates a function to return a string showing a scoreboard of the current score
function printScore(player1, player2) {
    let scoreboard = `Current Score:\n` + `==================\n`
    scoreboard += `${player1.playerName}: ${player1.score}pts.\n`
    scoreboard += `${player2.playerName}: ${player2.score}pts.\n`
    scoreboard += `\n`
    return scoreboard
}

// Creates a function to "run" the game
function runGame(player1, player2) {
    let gameHistory = "Card Game: War\n"; // Creates a string to contain the game output then adds a title immediately
    // Iterates through the total cards in each player's hands and compares them
    for (let i = 0; i < 26; i++) {
        gameHistory += `${player1.cardsInHand[i].describe()} VS. ${player2.cardsInHand[i].describe()}\n`
        if(player1.cardsInHand[i].value > player2.cardsInHand[i].value) { // If player 1's card is better, adds to their score
            player1.score += 1;
            gameHistory += `${player1.playerName} Wins!`
        } else
        if (player2.cardsInHand[i].value > player1.cardsInHand[i].value) { // If player 2's card is better, adds to their score
            player2.score += 1;
            gameHistory += `${player2.playerName} Wins!`
        } else
        if (player1.cardsInHand[i].value === player2.cardsInHand[i].value) { // If the cards tie, no score is added
            gameHistory += `Tie!`
        }
        gameHistory += printScore(player1, player2); // Adds the printScore output to the gameHistory string
    }
    // Generates the final scoreboard and adds it to the gameHistory
    gameHistory += `Final Score:\n================\n`
    gameHistory += `${player1.playerName}: ${player1.score}pts.\n`
    gameHistory += `${player2.playerName}: ${player2.score}pts.\n`
    // Checks for the higher score, says who the winner is, if there is one
    if (player1.score > player2.score) {
        gameHistory += `The Winner is ${player1.playerName}!`
    } else
    if (player2.score > player1.score) {
        gameHistory += `The Winner is ${player2.playerName}!`
    } else {
        gameHistory += `Tie! There is no Winner!`
    }
    console.log(gameHistory); // Outputs the gameHistory to the console
}

// Creates a new deck, adds cards to it, then shows the deck's contents
const deck = new Deck();
deck.addCards();
console.log(deck.describe());

// Shuffles the deck and shows the new order
deck.shuffleCards();
console.log(deck.describe());

// Creates 2 players with names "Carl" and "Mitchell"
const player1 = new Player("Carl");
const player2 = new Player("Mitchell");

// Deals the cards from the deck to the players then checks the contents of the deck
deck.dealCards(player1, player2);
console.log(deck.describe());

// Finally, runs the game with the players.
runGame(player1, player2)

// Refreshing will show a new result each time