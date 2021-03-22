const question = document.getElementById("question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};

let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = {};

let questions = [
  {
    question: "2 + 3 kaçtır?",
    choice1: "2",
    choice2: "5",
    choice3: "3",
    choice4: "7",
    answer: 2,
  },
  {
    question: "Dünyanın merkezi neresidir?",
    choice1: "Erzurum",
    choice2: "İstanbul",
    choice3: "Ankara",
    choice4: "Çorum",
    answer: 4,
  },
  {
    question: "Tanzanya'nın başkenti neresidir?",
    choice1: "Zanzibar",
    choice2: "Cape Town",
    choice3: "Nairobi",
    choice4: "Ankara",
    answer: 1,
  },
  {
    question: "Adana'nın plaka kodu nedir?",
    choice1: "65",
    choice2: "34",
    choice3: "01",
    choice4: "07",
    answer: 3,
  },
  {
    question: "Twitter kaç yıl önce kurulmuştur?",
    choice1: "11",
    choice2: "19",
    choice3: "15",
    choice4: "13",
    answer: 3,
  },
  {
    question: "Quiz güzel miydi?",
    choice1: "Evet",
    choice2: "A",
    choice3: "B",
    choice4: "C",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  avaliableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `${MAX_QUESTIONS} sorunun ${questionCounter}sı`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  avaliableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
