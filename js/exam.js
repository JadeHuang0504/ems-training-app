let QUESTIONS = [];
let currentIndex = 0;
let selectedOption = null;
let timeLeft = 90;
let timer = null;

// 根據模組選題庫（防呆）
function getQuestionsByModule(module) {
  if (module === "OHCA" && typeof OHCA_QUESTIONS !== "undefined") {
    return OHCA_QUESTIONS;
  }
  return [];
}

// ===== 啟動測驗 =====
function startExam(mode) {
  const module = localStorage.getItem("current_module");
  QUESTIONS = getQuestionsByModule(module);

  if (QUESTIONS.length === 0) {
    alert("題庫載入失敗，請重新整理或確認題庫檔案");
    return;
  }

  currentIndex = 0;
  renderQuestion();

  if (mode === "timed") {
    startTimer(onTimeUp);
  }
}

// ===== 顯示題目 =====
function renderQuestion() {
  const q = QUESTIONS[currentIndex];

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

// ===== 選項點擊 =====
function selectOption(index, button) {
  selectedOption = index;

  document.querySelectorAll("#options button").forEach(btn => {
    btn.style.backgroundColor = "";
  });

  button.style.backgroundColor = "#cce5ff";
}

// ===== 下一題 =====
function nextQuestion() {
  if (selectedOption === null) {
    alert("請先選擇一個選項");
    return;
  }

  currentIndex++;

  if (currentIndex >= QUESTIONS.length) {
    finishExam();
  } else {
    renderQuestion();
  }
}

// ===== 計時器 =====
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

// ===== 結束 =====
function onTimeUp() {
  alert("時間到！");
  finishExam();
}

function finishExam() {
  stopTimer();
  localStorage.setItem("last_score", 0);
  location.href = "result.html";
}
