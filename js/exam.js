// ===== 假題庫（結構已接近正式題庫）=====
const MOCK_QUESTIONS = [
  {
    text: "假題目 1（流程測試）",
    options: ["選項 A", "選項 B", "選項 C", "選項 D"]
  },
  {
    text: "假題目 2（流程測試）",
    options: ["選項 A", "選項 B", "選項 C", "選項 D"]
  },
  {
    text: "假題目 3（流程測試）",
    options: ["選項 A", "選項 B", "選項 C", "選項 D"]
  }
];

let currentIndex = 0;
let selectedOption = null;
let timeLeft = 90;
let timer = null;

// ===== 測驗流程 =====
function startExam(mode) {
  currentIndex = 0;
  renderQuestion();

  if (mode === "timed") {
    startTimer(onTimeUp);
  }
}

function renderQuestion() {
  const q = MOCK_QUESTIONS[currentIndex];

  document.getElementById("question").innerText =
    `第 ${currentIndex + 1} 題：${q.text}`;

  const optionArea = document.getElementById("options");
  optionArea.innerHTML = "";
  selectedOption = null;

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectOption(index, btn);
    btn.style.display = "block";
    btn.style.margin = "8px 0";
    optionArea.appendChild(btn);
  });
}

function selectOption(index, button) {
  selectedOption = index;

  // 重置所有選項樣式
  document.querySelectorAll("#options button").forEach(btn => {
    btn.style.backgroundColor = "";
  });

  // 標示選到的
  button.style.backgroundColor = "#cce5ff";
}

function nextQuestion() {
  if (selectedOption === null) {
    alert("請先選擇一個選項");
    return;
  }

  currentIndex++;

  if (currentIndex >= MOCK_QUESTIONS.length) {
    finishExam();
  } else {
    renderQuestion();
  }
}

// ===== 計時器（原本的 그대로）=====
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

// ===== 結束測驗 =====
function onTimeUp() {
  alert("時間到！");
  finishExam();
}

function finishExam() {
  stopTimer();
  localStorage.setItem("last_score", 0);
  location.href = "result.html";
}
