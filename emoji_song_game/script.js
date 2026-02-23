const songs = {
    easy: [
        { emoji: "🌧️👗🧣", answer: "cardigan", hint: "Taylor Swift song" },
        { emoji: "🌊👀", answer: "ocean eyes", hint: "Billie Eilish song" }
    ],
    medium: [
        { emoji: "🕛🌃", answer: "midnight city", hint: "M83 song" },
        { emoji: "🔥👦", answer: "heat waves", hint: "Glass Animals song" }
    ],
    hard: [
        { emoji: "🪐🚀💔", answer: "space oddity", hint: "David Bowie song" },
        { emoji: "🖤👕🌫️", answer: "sweater weather", hint: "The Neighbourhood song" }
    ]
};

let currentSong;
let score = 0;
let streak = 0;
let timeLeft = 20;
let timerInterval;

const emojiDisplay = document.getElementById("emoji-display");
const scoreDisplay = document.getElementById("score");
const streakDisplay = document.getElementById("streak");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("message");

function startGame() {
    score = 0;
    streak = 0;
    updateStats();
    nextSong();
}

function nextSong() {
    const difficulty = document.getElementById("difficulty").value;
    const pool = songs[difficulty];

    currentSong = pool[Math.floor(Math.random() * pool.length)];
    emojiDisplay.textContent = currentSong.emoji;
    document.getElementById("guess").value = "";
    message.textContent = "";

    startTimer();
}

function submitGuess() {
    const guess = document.getElementById("guess").value.toLowerCase().trim();

    if (guess === currentSong.answer) {
        score += 5;
        streak++;
        message.textContent = "🔥 Correct!";
    } else {
        streak = 0;
        message.textContent = "❌ Wrong!";
    }

    updateStats();
    nextSong();
}

function showHint() {
    score -= 2;
    message.textContent = "Hint: " + currentSong.hint;
    updateStats();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 20;
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            streak = 0;
            message.textContent = "⏰ Time's up!";
            updateStats();
            nextSong();
        }
    }, 1000);
}

function updateStats() {
    scoreDisplay.textContent = score;
    streakDisplay.textContent = streak;
}