// game.js

const mode = "doubles";
const modeTimers = { doubles: 6000 };

const doubles = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10]];
const nearDoubles = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11]];

const animations = [
  "Sugarplum bucking.mp4",
  "Sugarplum cheeky.mp4",
  "Sugarplum doing leg kicks.mp4",
  "Sugarplum romping.mp4",
  "Sugarplum turning.mp4"
];

const animationBasePath = "/assets/animal-animations/";

let sessionScore = 0;
let lifetimeScore = parseInt(localStorage.getItem("lifetimeScore") || "0", 10);
let problems = [];
let currentProblemIndex = 0;
let streak = 0;
let startTime = 0;

const sessionScoreEl = document.getElementById("sessionScore");
const lifetimeScoreEl = document.getElementById("lifetimeScore");
const problemEl = document.getElementById("problem");
const answerEl = document.getElementById("answer");
const animationEl = document.getElementById("animation");

function shuffleProblems() {
  problems = [];
  for (let i = 0; i < doubles.length; i++) {
    problems.push(doubles[i], nearDoubles[i]);
  }
  problems = problems.sort(() => Math.random() - 0.5);
  currentProblemIndex = 0;
}

function getRandomAnimation() {
  const file = animations[Math.floor(Math.random() * animations.length)];
  return animationBasePath + encodeURIComponent(file);
}

function triggerStreakEffect(streak) {
  if ([3, 5, 10].includes(streak)) {
    console.log(`Streak bonus: ${streak} correct in a row!`);
    // Add streak effect here
  }
}

function showProblem() {
  if (currentProblemIndex >= problems.length) shuffleProblems();
  const pair = problems[currentProblemIndex];
  problemEl.textContent = `${pair[0]} + ${pair[1]} =`;
  answerEl.value = "";
  answerEl.focus();
  animationEl.style.display = "none";
  startTime = Date.now();
}

function checkAnswer() {
  const userAnswer = parseInt(answerEl.value);
  const pair = problems[currentProblemIndex];
  const correct = pair[0] + pair[1];
  const timeTaken = Date.now() - startTime;

  if (userAnswer === correct && timeTaken <= modeTimers[mode]) {
    sessionScore++;
    streak++;
    triggerStreakEffect(streak);
    sessionScoreEl.textContent = sessionScore;
    lifetimeScore++;
    localStorage.setItem("lifetimeScore", lifetimeScore);
    lifetimeScoreEl.textContent = lifetimeScore;
    animationEl.src = getRandomAnimation();
    animationEl.load();
    animationEl.style.display = "block";
  } else {
    streak = 0;
  }

  currentProblemIndex++;
  setTimeout(showProblem, 2000);
}

answerEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

lifetimeScoreEl.textContent = lifetimeScore;
shuffleProblems();
showProblem();