
const gameBoard = document.getElementById('game-board');
let numsOfGuess = 6;
let numsOfGuessLeft = numsOfGuess;
let currentGuess = [];
let currentLetter = 0;
let correctWord = words[Math.floor(Math.random() * words.length)];
const btns = document.querySelectorAll(".btn");

btns.forEach(e => e.addEventListener("click", () => {
    let btnKey = String(e.innerHTML);

    const btns = document.getElementsByClassName('btn');

    // console.log(btnKey === btns[0].innerHTML.toLocaleLowerCase());

    for (let b = 0; b < btns.length; b++) {
        if (btnKey === btns[b].innerHTML.toLocaleLowerCase()) {
            btns[b].classList.add('btn-bgc');
            removeBgc(btnKey)
        }
    }

    if (btnKey === 'Del' && currentLetter !== 0) {
        removeLet();
        return;
    }

    if (btnKey === 'Enter') {
        enterGuess();
        return;
    }

    let keyPressed = btnKey.match(/[a-z]/gi);
    if (!keyPressed || keyPressed.length > 1) {
        return;
    } else {
        insertLetter(btnKey);
    }
}))

function makeGameBoard() {
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.classList.add('letter-row');
        gameBoard.appendChild(row);

        for (let j = 0; j < 5; j++) {
            const box = document.createElement('div');
            box.classList.add('box');
            row.appendChild(box);
        }
        gameBoard.appendChild(row);
    }
    console.log(correctWord);
}

makeGameBoard();

window.addEventListener('keydown', (e) => {
    let btnKey = String(e.key);

    const btns = document.getElementsByClassName('btn');

    // console.log(btnKey === btns[0].innerHTML.toLocaleLowerCase());

    for (let b = 0; b < btns.length; b++) {
        if (btnKey === btns[b].innerHTML.toLocaleLowerCase()) {
            btns[b].classList.add('btn-bgc');
            removeBgc(btnKey)
        }
    }

    if (btnKey === 'Backspace' && currentLetter !== 0) {
        removeLet();
        return;
    }

    if (btnKey === 'Enter') {
        enterGuess();
        return;
    }

    let keyPressed = btnKey.match(/[a-z]/gi);
    if (!keyPressed || keyPressed.length > 1) {
        return;
    } else {
        insertLetter(btnKey);
    }

    console.log(e);
});



function removeBgc(btnKey) {
    setTimeout(() => {
        const btns = document.getElementsByClassName('btn');
        for (let b = 0; b < btns.length; b++) {
            if (btnKey === btns[b].innerHTML.toLocaleLowerCase()) {
                btns[b].classList.remove('btn-bgc');
            }
        }
    }, 200)
}

function insertLetter(btnKey) {
    if (currentLetter === 5) {
        return;
    }

    btnKey = btnKey.toLowerCase();

    let row = document.getElementsByClassName('letter-row')[6 - numsOfGuessLeft];
    let box = row.children[currentLetter];
    box.textContent = btnKey;
    currentGuess.push(btnKey);
    currentLetter += 1;
}

function removeLet() {
    let row = document.getElementsByClassName('letter-row')[6 - numsOfGuessLeft];
    let box = row.children[currentLetter - 1];
    box.textContent = '';
    currentGuess.pop();
    currentLetter -= 1;
}

function enterGuess() {
    let row = document.getElementsByClassName('letter-row')[6 - numsOfGuessLeft];
    let guessString = '';
    let rightGuess = Array.from(correctWord);

    for (const l of currentGuess) {
        guessString += l;
    }

    if (guessString.length != 5) {
        alert('Not Enough Letters');
    }

    if (!words.includes(guessString)) {
        alert('Word Not in List');
        return;
    }

    let colorFill;

    for (let i = 0; i < 5; i++) {
        let box = row.children[i];
        let letter = currentGuess[i]
        let letPosstion = rightGuess.indexOf(currentGuess[i]);
        if (letPosstion === -1) {
            colorFill = box.style.backgroundColor = 'gray';
            box.style.transition = '400ms';
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                colorFill = box.style.backgroundColor = 'green';
                box.style.transition = '400ms';
            } else {
                colorFill = box.style.backgroundColor = 'yellow';
                box.style.transition = '400ms';
            }
        }
        drawKeys(letter, colorFill);
    }

    if (guessString === correctWord) {
        alert('Correct!');
        numsOfGuessLeft = 0;
        return;
    } else {
        numsOfGuessLeft -= 1;
        currentGuess = [];
        currentLetter = 0;
    }

    if (numsOfGuessLeft === 0) {
        alert(`Game over. The Word was ${correctWord}`);
    }


}

function drawKeys(letter, colorFill) {
    for (const elem of document.getElementsByClassName("btn")) {
        if (elem.textContent.toLocaleLowerCase() === letter) {
            elem.style.backgroundColor = colorFill
        }
    }

}

