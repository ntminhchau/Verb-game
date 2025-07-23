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

const screens = {
  home: document.getElementById("home"),
  participle: document.getElementById("participle-game"),
  passive: document.getElementById("passive-game"),
  result: document.getElementById("result-screen")
};

let currentGame = null;

function showScreen(screenName) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[screenName].classList.add("active");
}

function startGame(game) {
  currentGame = game;
  if (game === "participle") {
    initParticipleGame();
  } else if (game === "passive") {
    initPassiveGame();
  }
}

function goHome() {
  location.reload();
}

// -------------- Participle Game --------------
let partQuestions = [];
let currentIndex = 0;
let correctCount = 0;
let timer;
let retryList = [];
let totalRetries = 0;
let totalTime = 0;

function initParticipleGame() {
  partQuestions = [...verbList];
  shuffle(partQuestions);
  correctCount = 0;
  currentIndex = 0;
  retryList = [];
  totalRetries = 0;
  totalTime = 0;
  showScreen("participle");
  askNextParticiple();
}

function askNextParticiple() {
  if (currentIndex >= partQuestions.length) {
    if (retryList.length > 0) {
      partQuestions = [...retryList];
      retryList = [];
      currentIndex = 0;
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
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      retryList.push(verb);
      totalRetries++;
      currentIndex++;
      askNextParticiple();
    }
  }, 1000);

  document.getElementById("answer-input").onkeydown = e => {
    if (e.key === "Enter") checkAnswer();
  };
}

function checkAnswer() {
  const input = document.getElementById("answer-input").value.trim().toLowerCase();
  const correct = partQuestions[currentIndex].past.toLowerCase();
  if (input === correct) {
    correctCount++;
    currentIndex++;
    clearInterval(timer);
    askNextParticiple();
  } else {
    document.getElementById("feedback").innerHTML = `❌ Correct answer: <strong>${correct}</strong>`;
    totalRetries++;
    retryList.push(partQuestions[currentIndex]);
    currentIndex++;
    clearInterval(timer);
    setTimeout(askNextParticiple, 1500);
  }
}

function showParticipleResults() {
  showScreen("result");
  document.getElementById("results-summary").innerHTML = `✅ Finished!<br>Total correct: ${verbList.length}<br>Retries: ${totalRetries}`;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const passiveQuestions = [
  { q: "The documents ______ to the office yesterday.", a: "were brought", choices: ["are brought", "were brought", "brought", "had bring"] },
  { q: "A new bridge ______ across the river.", a: "has been built", choices: ["has been built", "was grow", "is building", "had build"] },
  { q: "The homework ______ already ______ by the students.", a: "has / been done", choices: ["is / gave", "has / done", "has / been done", "was / eat"] },
  { q: "The cake ______ by my sister this morning.", a: "was baked", choices: ["wrote", "was baked", "is draw", "were taken"] },
  { q: "The email ______ before the meeting started.", a: "had been sent", choices: ["had been sent", "was steal", "has wrote", "is sent"] },
  { q: "All the money ______ last night.", a: "was stolen", choices: ["was steal", "was stolen", "were lost", "taken"] },
  { q: "The book ______ into many languages.", a: "has been translated", choices: ["has made", "is speaking", "has been translated", "had thrown"] },
  { q: "The invitation cards ______ by the designer yesterday.", a: "were designed", choices: ["chosen", "were build", "were designed", "has been written"] },
  { q: "My phone ______ while I was at the gym.", a: "was lost", choices: ["is lost", "was lost", "were hidden", "had take"] },
  { q: "All the files ______ carefully before being submitted.", a: "were checked", choices: ["were checked", "was kept", "had catch", "is made"] },
  { q: "The song ______ by Adele.", a: "was sung", choices: ["is sang", "was sung", "has gave", "sang"] },
  { q: "The room ______ every day.", a: "is cleaned", choices: ["breaks", "is cleaned", "was known", "has written"] },
  { q: "All the clothes ______ by the time we arrived.", a: "were folded", choices: ["were found", "were folded", "had taken", "are worn"] },
  { q: "The results ______ on the website yesterday.", a: "were posted", choices: ["put", "were posted", "has been made", "are sent"] },
  { q: "The movie ______ in 2001.", a: "was released", choices: ["was released", "has shown", "is given", "made"] },
  { q: "A message ______ on the board.", a: "was left", choices: ["left", "was left", "is grown", "has eat"] },
  { q: "The thief ______ by the police last night.", a: "was caught", choices: ["caught", "is caught", "was caught", "has throw"] },
  { q: "The final decision ______ yet.", a: "has not been made", choices: ["has not been made", "is not taken", "has not wrote", "did not write"] },
  { q: "All the cookies ______ before we arrived.", a: "had been eaten", choices: ["are eaten", "had been eaten", "have took", "was wore"] },
  { q: "These problems ______ seriously by the team.", a: "are being considered", choices: ["is considered", "has been taken", "are being considered", "were being win"] },
];

let passiveQueue = [];
let passiveRetry = [];
let passiveCorrect = 0;
let passiveTotal = 0;
let passiveTimer;

function initPassiveGame() {
  passiveQueue = [...passiveQuestions];
  shuffle(passiveQueue);
  passiveRetry = [];
  passiveCorrect = 0;
  passiveTotal = 0;
  showScreen("passive");
  askNextPassive();
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
  document.getElementById("question-progress").textContent = `Question ${passiveTotal + 1}`;

  const choiceBox = document.getElementById("choices");
  choiceBox.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice-btn";
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
      passiveRetry.push(q);
      passiveQueue.shift();
      passiveTotal++;
      setTimeout(askNextPassive, 800);
    }
  }, 1000);
}

function handlePassiveSelection(btn, choice, q) {
  clearInterval(passiveTimer);
  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(b => b.disabled = true);

  if (choice === q.a) {
    btn.classList.add("correct");
    passiveCorrect++;
  } else {
    btn.classList.add("wrong");
    buttons.forEach(b => {
      if (b.textContent === q.a) b.classList.add("correct");
    });
    passiveRetry.push(q);
  }

  passiveQueue.shift();
  passiveTotal++;
  setTimeout(askNextPassive, 1200);
}

function showPassiveResults() {
  showScreen("result");
  document.getElementById("results-summary").innerHTML = `✅ Finished Passive Voice!<br>Correct: ${passiveCorrect}/${passiveTotal}<br>Retries: ${passiveRetry.length}`;
}

function showPassiveResults() {
  showScreen("result");
  document.getElementById("results-summary").innerHTML = `✅ Finished Passive Voice!<br>Correct: ${passiveCorrect}/${passiveQuestions.length}<br>Retries: ${passiveRetries}`;
}
