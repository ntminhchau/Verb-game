const verbList = [
    { base: "make", past: "made" },
    { base: "do", past: "done" },
    { base: "say", past: "said" },
    { base: "take", past: "taken" },
    { base: "give", past: "given" },
    { base: "see", past: "seen" },
    { base: "know", past: "known" },
    { base: "find", past: "found" },
    { base: "tell", past: "told" },
    { base: "think", past: "thought" },
    { base: "show", past: "shown" },
    { base: "leave", past: "left" },
    { base: "put", past: "put" },
    { base: "bring", past: "brought" },
    { base: "write", past: "written" },
    { base: "read", past: "read" },
    { base: "hear", past: "heard" },
    { base: "lose", past: "lost" },
    { base: "pay", past: "paid" },
    { base: "meet", past: "met" },
    { base: "keep", past: "kept" },
    { base: "build", past: "built" },
    { base: "send", past: "sent" },
    { base: "catch", past: "caught" },
    { base: "choose", past: "chosen" },
    { base: "eat", past: "eaten" },
    { base: "hold", past: "held" },
    { base: "draw", past: "drawn" },
    { base: "wear", past: "worn" },
    { base: "understand", past: "understood" },
    { base: "teach", past: "taught" },
    { base: "break", past: "broken" },
    { base: "grow", past: "grown" },
    { base: "win", past: "won" },
    { base: "buy", past: "bought" },
    { base: "throw", past: "thrown" },
    { base: "lend", past: "lent" },
    { base: "steal", past: "stolen" },
    { base: "hide", past: "hidden" },
];

const passiveQuestions = [
    { q: "The documents ______ to the office yesterday.", a: "were brought", choices: ["are brought", "were brought", "brought", "had bring"] },
    { q: "A new bridge ______ across the river.", a: "has been built", choices: ["has been built", "was grow", "is building", "had build"] },
    { q: "The homework ______ already ______ by the students.", a: "has / been done", choices: ["is / gave", "has / done", "has / been done", "was / eat"] },
    { q: "The film Titanic ______ by James Cameron in 1997.", a: "was directed", choices: ["directed", "was directed", "is directed", "were directed"] },
    { q: "The email ______ before the meeting started.", a: "had been sent", choices: ["had been sent", "was steal", "has wrote", "is sent"] },
    { q: "All the money ______ last night.", a: "was stolen", choices: ["was steal", "was stolen", "were lost", "taken"] },
    { q: "The book ______ into many languages.", a: "has been translated", choices: ["has made", "is speaking", "has been translated", "had thrown"] },
    { q: "The invitation cards ______ by the designer yesterday.", a: "were designed", choices: ["chosen", "were build", "were designed", "has been written"] },
    { q: "My phone ______ while I was at the gym.", a: "was lost", choices: ["is lost", "was lost", "were hidden", "had take"] },
    { q: "All the files ______ carefully before being submitted.", a: "were checked", choices: ["were checked", "was kept", "had catch", "is made"] },
    { q: "The song ______ by Adele.", a: "was sung", choices: ["is sang", "was sung", "has gave", "sang"] },
    { q: "The room ______ every day.", a: "is cleaned", choices: ["breaks", "is cleaned", "was known", "has written"] },
    { q: "The sculpture ______ from a single block of marble.", a: "was made", choices: ["was made", "was painted", "was released", "was published"] },
    { q: "The results ______ on the website yesterday.", a: "were posted", choices: ["put", "were posted", "has been made", "are sent"] },
    { q: "The movie ______ in 2001.", a: "was released", choices: ["was released", "has shown", "is given", "made"] },
    { q: "A message ______ on the board.", a: "was left", choices: ["left", "was left", "is grown", "has eat"] },
    { q: "The thief ______ by the police last night.", a: "was caught", choices: ["caught", "is caught", "was caught", "has throw"] },
    { q: "His first novel ______ after he died.", a: "was published", choices: ["was published", "was taken", "was written", "was directed"] },
    { q: "The main points of his speech ______ clearly in the diagram.", a: "were illustrated", choices: ["illustrated", "was illustrate", "were illustrated", "have illustrated"] },
    { q: "These problems ______ seriously by the team.", a: "are being considered", choices: ["is considered", "has been taken", "are being considered", "were being win"] },
];

const screens = {
    home: document.getElementById("home"),
    participle: document.getElementById("participle-game"),
    passive: document.getElementById("passive-game"),
    result: document.getElementById("result-screen")
};

// ===================== CÁC HÀM CHUNG =====================
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    if (screens[screenName]) {
        screens[screenName].classList.add("active");
    }
}

// GỘP 2 HÀM startGame LÀM MỘT
function startGame(gameType) {
    if (gameType === "participle") {
        initParticipleGame();
        askNextParticiple();
    } else if (gameType === "passive") {
        initPassiveGame();
        askNextPassive();
    }
}

// XÓA HÀM goHome bị trùng, chỉ giữ lại 1 hàm
function goHome() {
    location.reload(); // Cách đơn giản và hiệu quả nhất để reset game
}

// XÓA HÀM shuffle bị trùng, chỉ giữ lại 1 hàm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ===================== PARTICIPLE GAME =====================
let partQuestions = [];
let currentIndex = 0;
let correctCount = 0;
let partTimer;
let retryList = [];
let totalRetries = 0;

function initParticipleGame() {
    partQuestions = [...verbList];
    shuffle(partQuestions);
    correctCount = 0;
    currentIndex = 0;
    retryList = [];
    totalRetries = 0;
    showScreen("participle");
}

function askNextParticiple() {
    if (currentIndex >= partQuestions.length) {
        if (retryList.length > 0) {
            partQuestions = [...retryList];
            retryList = [];
            currentIndex = 0;
            shuffle(partQuestions); // Xáo trộn lại các câu hỏi cần làm lại
        } else {
            showParticipleResults();
            return;
        }
    }

    const verb = partQuestions[currentIndex];
    document.getElementById("verb-prompt").textContent = verb.base;
    document.getElementById("answer-input").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("progress").textContent = `${correctCount}/${verbList.length}`;
    document.getElementById("answer-input").focus();

    let timeLeft = 10;
    document.getElementById("timer").textContent = timeLeft;
    clearInterval(partTimer);
    partTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(partTimer);
            document.getElementById("feedback").innerHTML = `❌ Hết giờ! Đáp án đúng: <strong>${verb.past}</strong>`;
            retryList.push(verb);
            totalRetries++;
            currentIndex++;
            setTimeout(askNextParticiple, 1500);
        }
    }, 1000);

    document.getElementById("answer-input").onkeydown = e => {
        if (e.key === "Enter") checkParticipleAnswer();
    };
}

function checkParticipleAnswer() {
    clearInterval(partTimer);
    const input = document.getElementById("answer-input").value.trim().toLowerCase();
    const correct = partQuestions[currentIndex].past.toLowerCase();

    if (input === correct) {
        correctCount++;
        document.getElementById("feedback").innerHTML = `✅ Chính xác!`;
        currentIndex++;
        setTimeout(askNextParticiple, 800);
    } else {
        document.getElementById("feedback").innerHTML = `❌ Sai rồi! Đáp án đúng: <strong>${correct}</strong>`;
        totalRetries++;
        retryList.push(partQuestions[currentIndex]);
        currentIndex++;
        setTimeout(askNextParticiple, 1500);
    }
}

function showParticipleResults() {
    showScreen("result");
    document.getElementById("results-summary").innerHTML = `
      <h3>Kết quả game Past Participle</h3>
      ✅ Tổng số câu đúng: ${correctCount} / ${verbList.length}<br>
      🔁 Số lần trả lời lại: ${totalRetries}
    `;
}

// ===================== PASSIVE VOICE GAME =====================
let passiveQueue = [];
let passiveRetry = [];
let passiveCorrect = 0;
let passiveRetries = 0;
let passiveTimer;

function initPassiveGame() {
    passiveQueue = [...passiveQuestions];
    shuffle(passiveQueue);
    passiveRetry = [];
    passiveCorrect = 0;
    passiveRetries = 0;
    showScreen("passive");
}

function askNextPassive() {
    if (passiveQueue.length === 0) {
        if (passiveRetry.length > 0) {
            passiveQueue = [...passiveRetry];
            shuffle(passiveQueue);
            passiveRetry = [];
        } else {
            return showPassiveResults();
        }
    }

    const q = passiveQueue[0];
    document.getElementById("question-text").textContent = q.q;
    document.getElementById("question-progress").textContent = `Question ${passiveCorrect + 1} / ${passiveQuestions.length}`;

    const choiceBox = document.getElementById("choices");
    choiceBox.innerHTML = "";

    shuffle(q.choices).forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.className = "choice-btn";
        btn.disabled = false;
        btn.onclick = () => handlePassiveSelection(btn, choice, q);
        choiceBox.appendChild(btn);
    });

    let timeLeft = 15;
    document.getElementById("timer-passive").textContent = timeLeft;
    clearInterval(passiveTimer);
    passiveTimer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-passive").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(passiveTimer);
            handleTimeOutPassive(q);
        }
    }, 1000);
}

function handlePassiveSelection(selectedBtn, choice, question) {
    clearInterval(passiveTimer);
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach(btn => btn.disabled = true);

    if (choice === question.a) {
        selectedBtn.classList.add("correct");
        passiveQueue.shift();
        passiveCorrect++;
    } else {
        selectedBtn.classList.add("wrong");
        buttons.forEach(btn => {
            if (btn.textContent === question.a) {
                btn.classList.add("correct");
            }
        });
        passiveRetry.push(passiveQueue.shift());
        passiveRetries++;
    }
    setTimeout(askNextPassive, 1200);
}

function handleTimeOutPassive(question) {
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === question.a) {
            btn.classList.add("correct");
        }
    });
    passiveRetry.push(passiveQueue.shift());
    passiveRetries++;
    setTimeout(askNextPassive, 1200);
}

function showPassiveResults() {
    showScreen("result");
    document.getElementById("results-summary").innerHTML = `
      <h3>Kết quả game Passive Voice</h3>
      ✅ Số câu đúng: ${passiveCorrect} / ${passiveQuestions.length}<br>
      🔁 Số lần trả lời lại: ${passiveRetries}
    `;
}
