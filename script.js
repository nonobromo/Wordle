
const gameBoard = document.getElementById('game-board');
let numsOfGuess = 6;
let numsOfGuessLeft = numsOfGuess;
let currentGuess = [];
let currentLetter = 0;
let correctWord = words[Math.floor(Math.random() * words.length)];
const btns = document.querySelectorAll(".btn");
const textShow = document.querySelector(".text-state");


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

    if (numsOfGuessLeft === 0) {
        return;
    } else if (btnKey === 'Enter') {
        enterGuess();
        return;
    }


    let keyPressed = btnKey.match(/[a-z]/gi);
    if (!keyPressed || keyPressed.length > 1) {
        return;
    } else {
        insertLetter(btnKey);
    }

});


btns.forEach(e => e.addEventListener("click", () => {
    let btnKey = String(e.innerHTML);

    const btns = document.getElementsByClassName('btn');

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
    if (numsOfGuessLeft === 0) {
        return
    } else {
        btnKey = btnKey.toLowerCase();

        let row = document.getElementsByClassName('letter-row')[6 - numsOfGuessLeft];
        let box = row.children[currentLetter];
        box.textContent = btnKey;
        currentGuess.push(btnKey);
        currentLetter += 1;
    }

}

function removeLet() {
    if (numsOfGuessLeft === 0) {
        return;
    } else {
        let row = document.getElementsByClassName('letter-row')[6 - numsOfGuessLeft];
        let box = row.children[currentLetter - 1];
        box.textContent = '';
        currentGuess.pop();
        currentLetter -= 1;
    }
}

function enterGuess() {
    let row = document.getElementsByClassName('letter-row')[6 - numsOfGuessLeft];
    let guessString = '';
    let rightGuess = Array.from(correctWord);

    for (const l of currentGuess) {
        guessString += l;
    }

    if (guessString.length != 5) {
        textAnimation()
        textShow.innerHTML = "Not enough letters";
        return;
    }

    if (!words.includes(guessString)) {
        textAnimation()
        textShow.innerHTML = "Word not in list";
        return;
    }

    let colorFill;

    for (let i = 0; i < 5; i++) {
        let letterColor = "";
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
        textShow.innerHTML = "Correct!";
        textAnimation()
        numsOfGuessLeft = 0;
        return;
    } else {
        numsOfGuessLeft -= 1;
        currentGuess = [];
        currentLetter = 0;
    }

    if (numsOfGuessLeft === 0) {
        textShow.style.display = "block";
        textShow.innerHTML = `The Correct Word was ${correctWord}`;
        return;
    }


}

function drawKeys(letter, colorFill) {
    for (const elem of document.getElementsByClassName("btn")) {
        if (elem.textContent.toLocaleLowerCase() === letter) {
            let oldColor = elem.style.backgroundColor;
            if (oldColor === "green") {
                return;
            }
            if (oldColor === "yellow" && colorFill !== "green") {
                return;
            }
            elem.style.backgroundColor = colorFill;
            break
        }
    }
}

function textAnimation() {
    setTimeout(() => {
        textShow.style.display = "block";
    }, 100)

    setTimeout(() => {
        textShow.style.display = "none"
        textShow.textContent = "";
    }, 1500)
}

