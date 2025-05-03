const quizData = [
  {
    question: "問題1: 櫻坂46が欅坂46から改名することを発表したライブの正式名称は何ですか？",
    options: ["KEYAKIZAKA46 Live Online, but with YOU!", "櫻坂46 Debut Countdown Live!!", "W-KEYAKI FES. 2021", "櫻坂46 1st TOUR 2021"],
    answer: "KEYAKIZAKA46 Live Online, but with YOU!"
  },
  {
    question: "問題2: 櫻坂46が櫻坂46として活動を正式に開始した日はいつですか？",
    options: ["2020年7月16日", "2020年10月12日", "2020年10月14日", "2020年12月9日"],
    answer: "2020年10月14日"
  },
  {
    question: "問題3: 櫻坂46として初めてリリースされたシングルのタイトルは何ですか？",
    options: ["Nobody's fault", "BAN", "流れ弾", "五月雨よ"],
    answer: "Nobody's fault"
  },
  {
    question: "問題4: 櫻坂46がグループ名改名後に初めて開催した「TOUR」という名称が含まれる全国ツアーは、いつの期間に開催されましたか？",
    options: ["2020年12月8日 - 2020年12月9日", "2021年4月17日 - 2021年5月9日", "2021年9月11日 - 10月31日", "2022年1月8日 - 2022年3月6日"],
    answer: "2021年9月11日 - 10月31日"
  },
  {
    question: "問題5: 櫻坂46の現在のキャプテンは誰ですか？",
    options: ["菅井友香", "守屋茜", "松田里奈", "田村保乃"],
    answer: "松田里奈"
  },
  {
    question: "問題6: 櫻坂46が1stシングルから5thシングルまで導入していた、1列目と2列目を担当するメンバーを固定する選抜制度の名称は何ですか？",
    options: ["櫻フロント", "櫻セブン", "櫻エイト制度", "センター固定制"],
    answer: "櫻エイト制度"
  },
  {
    question: "問題7: 欅坂46時代に結成された派生ユニットで、フォークギターデュオである「ゆいちゃんず」のメンバーは誰ですか？",
    options: ["平手友梨奈、長濱ねる", "菅井友香、守屋茜", "今泉佑唯、小林由依", "渡邉理佐、田村保乃"],
    answer: "今泉佑唯、小林由依"
  },
  {
    question: "問題8: 2025年2月21日(金)発売の雑誌「BRODY」4月号の表紙・巻頭に登場する櫻坂46のメンバーは誰ですか？",
    options: ["森田ひかる", "山下瞳月", "小林由依", "大園玲"],
    answer: "山下瞳月"
  },
  {
    question: "問題9: 櫻坂46が現在レギュラー出演しているラジオ番組のうち、ニッポン放送で放送されている番組名は何ですか？",
    options: ["櫻坂46のオールナイトニッポンX(クロス)", "櫻坂46 こちら有楽町星空放送局", "SCHOOL OF LOCK! GIRLS LOCKS!", "レコメン！"],
    answer: "櫻坂46 こちら有楽町星空放送局"
  },
  {
    question: "問題10: 2016年10月22日に欅坂46が出演したハロウィンイベントで発生し、衣装がナチス・ドイツの軍服に似ているとして批判された出来事は、一般的に何と呼ばれていますか？",
    options: ["ハロウィン衣装騒動", "ナチス風衣装問題", "欅坂46炎上事件", "軍服コスプレ批判"],
    answer: "ナチス風衣装問題"
  }
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.getElementById('result-container');
const scoreDisplay = document.getElementById('score');
const retryButton = document.getElementById('retry-button');

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function displayQuestion() {
  quizContainer.innerHTML = ''; // 1問ずつクリアして表示
  const currentQuestion = quizData[currentQuestionIndex];
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('quiz-item');
  questionDiv.innerHTML = `<p class="question">${currentQuestion.question}</p>`;

  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('options');

  currentQuestion.options.forEach((option) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="question-${currentQuestionIndex}" value="${option}"> ${option}`;
    optionsDiv.appendChild(label);
  });

  questionDiv.appendChild(optionsDiv);
  quizContainer.appendChild(questionDiv);
}

function checkAnswer() {
  const selectedOption = document.querySelector(`input[name="question-${currentQuestionIndex}"]:checked`);
  userAnswers[currentQuestionIndex] = selectedOption ? selectedOption.value : null;
}

function showResults() {
  score = 0;
  quizData.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });
  scoreDisplay.textContent = `正解数: ${score} / ${quizData.length}`;
  quizContainer.classList.add('hidden');
  submitButton.classList.add('hidden');
  resultContainer.classList.remove('hidden');
}

function nextQuestion() {
  checkAnswer();
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

submitButton.addEventListener('click', nextQuestion);

retryButton.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  quizContainer.innerHTML = '';
  resultContainer.classList.add('hidden');
  submitButton.classList.remove('hidden');
  quizContainer.classList.remove('hidden');
  displayQuestion();
});

displayQuestion(); // 初回表示
