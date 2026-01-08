const MOCK_QUESTIONS = [
  { text: "假題目 1（流程測試用）" },
  { text: "假題目 2（流程測試用）" },
  { text: "假題目 3（流程測試用）" }
];
let currentIndex = 0;
let timeLeft = 90;
let timer = null;

function startExam(mode) {
  currentIndex = 0;
  renderQuestion();
  if (mode === "timed") startTimer(onTimeUp);
}
function renderQuestion() {
  const q = MOCK_QUESTIONS[currentIndex];
  document.getElementById("question").innerText =
    `第 ${currentIndex + 1} 題：${q.text}`;
}
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= MOCK_QUESTIONS.length) {
    finishExam();
  } else {
    renderQuestion();
  }
}
function startTimer(onTimeUp) {
  updateTimerUI();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      clearInterval(timer);
      onTimeUp();
    }
  }, 1000);
}
function updateTimerUI() {
  const el = document.getElementById("timer");
  if (el) el.innerText = `剩餘時間：${timeLeft}s`;
}
function stopTimer() {
  clearInterval(timer);
}
function onTimeUp() {
  alert("時間到！");
  finishExam();
}
function finishExam() {
  stopTimer();
  localStorage.setItem("last_score", 0);
  location.href = "result.html";
}
