'use strict';
function createNewDeck() {
    let Deck = [],
        k = 0;
        for (let i = 6; i <= 14; i++) {
            for (let j = 1; j <= 4; j++) {
                if(i > 11 && i !== 14){
                    k = i + 1;
                } else if (i === 14) {
                    k = 1;
                } else {
                    k = i;
                }
                Deck[(i-6) + 9*(j - 1)] = {
                    rank: i,
                    suit: j,
                    unicode: String.fromCharCode(parseInt(`1F0${(j+9).toString(16).toUpperCase()}${k.toString(16).toUpperCase()}`, 16))
                }
            }
        }
    return Deck;
}
function shuffleDeck(deck) {
    let shuffledDeck = [];
    for (let i = deck.length - 1; i >= 0; i--) {
        let a = Math.round(Math.random()*i);
        shuffledDeck[i] = deck.splice(a,1).shift();
    }
    return shuffledDeck;
}
function suitChoose() {
    return Math.round(1+Math.random()*3);
}
function equalSuit(vasili, petr, i) {
    if (vasili.cards[i].rank > petr.cards[i].rank) {
        vasili.score++;
    } else if(vasili.cards[i].rank < petr.cards[i].rank) {
        petr.score++;
    }
}

let deck = shuffleDeck(createNewDeck()),
    vasili = {
        name: 'Вася',
        score: 0,
        cards: []
    },
    petr = {
        name: 'Петя',
        score: 0,
        cards: []
    },
    suit = suitChoose(),
    cardsNumber = deck.length,
    suitName = ['spades', 'hearts', 'diamonds', 'clubs'],
    cardName = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    tableBody = document.querySelector('tbody');
for (let i = 0; i < cardsNumber/2; i++){
    vasili.cards[i]=deck[i];
    petr.cards[i]=deck[i+cardsNumber/2];
}

for (let i = cardsNumber/2 - 1; i >= 0 ; i--) {
    let tr = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        vasiliCardSuit = vasili.cards[i].suit,
        petrCardSuit = petr.cards[i].suit;
    td1.textContent = cardName[(petr.cards[i].rank - 6)] + ' of ' +suitName[petrCardSuit - 1] + petr.cards[i].unicode;
    td2.textContent = vasili.cards[i].unicode + cardName[(vasili.cards[i].rank - 6)] + ' of ' + suitName[vasiliCardSuit - 1];
    if (vasiliCardSuit === 2 || vasiliCardSuit === 3) {
        td2.style.color = 'red';
    }
    if (petrCardSuit === 2 || petrCardSuit === 3) {
        td1.style.color = 'red';
    }
    if (suit === vasiliCardSuit) {
        if (suit === petrCardSuit) {
            equalSuit(vasili, petr, i);
        } else {
            vasili.score++;
        }
    } else if(suit === petrCardSuit) {
        petr.score++;
    } else {
        equalSuit(vasili, petr, i);
    }
    tableBody.appendChild(tr).appendChild(td1);
    tr.appendChild(td2);

}

let allP = document.body.querySelectorAll('p'),
    tHead = document.body.querySelector('thead').querySelectorAll('th'),
    winner = '';
if (vasili.score > petr.score) {
    winner =  vasili.name;
} else if (vasili.score < petr.score) {
    winner =  petr.name;
} else { winner = 'дружба'}

tHead[0].textContent = petr.name;
tHead[1].textContent = vasili.name;
allP[0].textContent = `Winner: ${winner}. Suit: ${suitName[suit-1]}`;
allP[1].textContent = `${petr.score} : ${vasili.score}`;



/*console.log(createNewDeck());
console.log(vasili);
console.log(petr);
console.log(suit);*/


