



// const { value: nickName } = await Swal.fire({
//     title: 'Enter your NickName, please',
//     input: 'text',
//     // inputLabel: 'Your IP address',
//     inputValue: inputValue,
//     showCancelButton: true,
//     inputValidator: (value) => {
//       if (!value) {
//         return 'You need to write something!'
//       }
//     }
//   })
  
//   if (nickName) {
//     Swal.fire(`Your NickName is ${nickName}`)
//   }


// Swal.fire({
//     title: "An input!",
//     text: "Write something interesting:",
//     input: 'text',
//     showCancelButton: true        
// }).then((result) => {
//     if (result.value) {
//         console.log("Result: " + result.value);
//     }
// });

let player = {
    name: prompt("Enter your NickName, please"),
    // name: "Juampi",
    chips: 250
}

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = `${player.name}: $${player.chips}`;

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    if(player.chips > 0){
        isAlive = true;
        hasBlackJack = false;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
        renderGame();
    } else {
        Swal.fire({
            title: "You're out of credit.... Sorry, but if you want to continue must refresh the page!!",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes...I need more...!!',
            denyButtonText: `No...It's enough...`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              location.reload();
            } else if (result.isDenied) {
              Swal.fire('Ok, you had enough...!!', 'Well done', 'error')
            }
          })
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        player.chips += 50;
        hasBlackJack = true;
        Swal.fire(
            'BLACKJACK',
            'Congratulations...!!!',
            'success'
          )
    } else {
        message = "You're out of the game!";
        player.chips -= 50;
        isAlive = false;
    }
    messageEl.textContent = message;
    playerEl.textContent = `${player.name}: $${player.chips}`;
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();   
    }
}