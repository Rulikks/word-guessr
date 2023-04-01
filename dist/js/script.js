// Kelime listesi
const words = ["Java",
    "Python",
    "JavaScript",
    "C++",
    "Ruby",
    "Swift",
    "Go",
    "Kotlin",
    "Rust",
    "Scala"];

// Rastgele kelime seç
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Tahmin edilen harfleri tut
let guessedLetters = [];

// Tahmin edilen kelimeleri tut
let guessedWords = [];

window.onload = () => {
    const programmingLanguages = [
        "Java",
        "Python",
        "JavaScript",
        "C++",
        "Ruby",
        "Swift",
        "Go",
        "Kotlin",
        "Rust",
        "Scala"
    ];

    const randomProgrammingLanguages = [];

    while (randomProgrammingLanguages.length < 10) {
        const randomIndex = Math.floor(Math.random() * programmingLanguages.length);
        const randomLanguage = programmingLanguages[randomIndex];
        if (!randomProgrammingLanguages.includes(randomLanguage)) {
            randomProgrammingLanguages.push(randomLanguage);
        }
    }
    const listParent = document.querySelector('.word-list')
    for (const programmingLanguage of randomProgrammingLanguages) {
        const li = document.createElement('li')
        li.textContent = programmingLanguage
        listParent.appendChild(li)
    }
    console.log(randomProgrammingLanguages);

}
// Mesajları görüntüle
function displayMessage(message) {
    document.getElementById("message").innerHTML = message;
}

// Kelimeyi görüntüle
function displayWord() {
    document.querySelector(".word-display").innerHTML = `
    ${selectedWord
            .split("")
            .map(
                letter =>
                    `<span class="letter">
            ${guessedLetters.includes(letter) ? letter : ""}
          </span>`
            )
            .join("")}
  `;
}

// Tahminleri kontrol et
function checkGuess(guess) {
    if (guess.length === 1) {
        if (selectedWord.includes(guess)) {
            if (!guessedLetters.includes(guess)) {
                guessedLetters.push(guess);
                displayWord();
                if (!selectedWord.split("").some(letter => !guessedLetters.includes(letter))) {
                    displayMessage("Tebrikler! Kazandınız.");
                }
            } else {
                displayMessage("Bu harfi zaten tahmin ettiniz.");
            }
        } else {
            displayMessage("Bu harf kelime içinde yok.");
        }
    } else {
        if (guess.toLowerCase() === selectedWord.toLowerCase()) {
            guessedWords.push(guess);
            document.querySelector("#guess-input").setAttribute('disabled', 'true')
            displayMessage("Tebrikler! Kazandınız.");
            setInterval(changeBgColor, 500);
            setTimeout(function () {
                if (confirm("Tekrar oynamak ister misiniz?")) {
                    location.reload();
                }
            }, 700);
        } else {
            displayMessage("Bu kelime yanlış.");
        }
    }
}

function updateProgressBar() {
    let word = wordList[randomIndex];
    let guessedWord = getGuessedWord(word, guessedLetters);
    let percentage = (guessedWord.length / word.length) * 100;

    let progressBar = document.getElementById("progress-bar");
    progressBar.style.width = percentage + "%";
}
function handleGuess(letter) {
    guessedLetters.push(letter);
    updateWord();
    updateWrongLetters();
    updateProgressBar();
}
function changeBgColor() {
    // rastgele renk oluşturmak için rgb renk kodu kullanıyoruz
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `rgb(${r}, ${g}, ${b})`;

    // body elementinin arkaplan rengini değiştiriyoruz
    document.body.style.backgroundColor = color;
}
function kelimeYuzdeOrani(kelime1, kelime2) {
    let harfSayisi = kelime1.length;
    let ortakHarfSayisi = 0;

    for (let i = 0; i < harfSayisi; i++) {
        if (kelime2.includes(kelime1[i])) {
            ortakHarfSayisi++;
        }
    }

    let yuzde = (ortakHarfSayisi / harfSayisi) * 100;
    document.querySelector('#percentage').innerHTML = yuzde.toFixed(1) + '%'
    return yuzde.toFixed(2);
}


// Tahmin formu
document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    let guess = document.getElementById("guess-input").value.toLowerCase();
    kelimeYuzdeOrani(guess.toLowerCase(), selectedWord.toLowerCase())
    checkGuess(guess);
    document.getElementById("guess-input").value = "";
});

// Oyunu başlat
displayWord();


