const questions = [
  {
    text: "AIとは何の略ですか？",
    options: ["Artificial Intelligence", "Automated Interface", "Advanced Innovation", "Analog Integration"],
    answer: "Artificial Intelligence",
    explanation: "AIは『Artificial Intelligence（人工知能）』の略です。"
  },
  {
    text: "AIにできないことはどれ？",
    options: ["画像認識", "感情を持つこと", "言語翻訳", "自動運転"],
    answer: "感情を持つこと",
    explanation: "AIは人間のように本当の意味で感情を持つことはできません。"
  },
  {
    text: "機械学習とは？",
    options: ["AIの自己修復機能", "データから学習して判断する仕組み", "物理的な進化", "AIの感情処理"],
    answer: "データから学習して判断する仕組み",
    explanation: "機械学習はAIの中核的技術で、データから学ぶ能力です。"
  },
  // ...必要に応じて問4〜問9を追加
];

let current = 0;
let answers = Array(questions.length).fill(null);

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionTitle = document.getElementById("question-title");
const optionsForm = document.getElementById("options-form");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

document.getElementById("start-btn").addEventListener("click", () => {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
  current = 0;
  answers.fill(null);
});

nextBtn.addEventListener("click", () => {
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    showQuestion();
  }
});

function showQuestion() {
  const q = questions[current];
  questionTitle.textContent = `問${current + 1}：${q.text}`;
  optionsForm.innerHTML = "";

  const shuffled = [...q.options].sort(() => Math.random() - 0.5);
  shuffled.forEach(opt => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = opt;
    if (answers[current] === opt) input.checked = true;

    input.addEventListener("change", () => {
      answers[current] = opt;
    });

    label.appendChild(input);
    label.append(opt);
    optionsForm.appendChild(label);
  });

  prevBtn.style.display = current === 0 ? "none" : "inline-block";
  nextBtn.textContent = current === questions.length - 1 ? "結果を送信する" : "次の問題へ";
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  let score = 0;
  const explanations = document.getElementById("explanations");
  explanations.innerHTML = "";

  questions.forEach((q, idx) => {
    const isCorrect = answers[idx] === q.answer;
    if (isCorrect) score++;
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>問${idx + 1}：${q.text}</h3>
      <p>あなたの回答：${answers[idx] || "未回答"}</p>
      <p>正解：${q.answer}</p>
      <p>${q.explanation}</p>
      <hr />
    `;
    explanations.appendChild(div);
  });

  document.getElementById("score-text").textContent = `あなたのスコアは ${score} / ${questions.length} 点です。`;
}
