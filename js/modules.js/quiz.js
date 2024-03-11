// Define the Quiz class
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.totalQuestions = this.questions.length;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  answerQuestion(selectedOption) {
    const currentQuestion = this.getCurrentQuestion();
    if (selectedOption === currentQuestion.correct_option) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }

  isQuizFinished() {
    return this.currentQuestionIndex === this.totalQuestions;
  }

  resetQuiz() {
    console.log("reset quiz called");
    this.currentQuestionIndex = 0;
    this.score = 0;
  }
}

// Create a new instance of the Quiz class
const quizData = [
  {
    question: 'Who is known as "The Rock" in WWE?',
    options: [
      "John Cena",
      "Dwayne Johnson",
      "Stone Cold Steve Austin",
      "Randy Orton",
    ],
    correct_option: "Dwayne Johnson",
  },
  {
    question: 'Which WWE superstar is known as "The Deadman"?',
    options: ["John Cena", "The Undertaker", "Triple H", "Roman Reigns"],
    correct_option: "The Undertaker",
  },
  {
    question: "Who is the longest-reigning WWE Champion of the modern era?",
    options: ["John Cena", "CM Punk", "Brock Lesnar", "Randy Orton"],
    correct_option: "CM Punk",
  },
  {
    question: 'Which WWE event is known as "The Grandest Stage of Them All"?',
    options: ["WrestleMania", "Royal Rumble", "SummerSlam", "Survivor Series"],
    correct_option: "WrestleMania",
  },
  {
    question: "Who holds the record for the most Royal Rumble match victories?",
    options: [
      "Stone Cold Steve Austin",
      "Hulk Hogan",
      "Shawn Michaels",
      "The Rock",
    ],
    correct_option: "Stone Cold Steve Austin",
  },
  {
    question: 'Which WWE superstar is known as "The Beast Incarnate"?',
    options: ["Roman Reigns", "John Cena", "Brock Lesnar", "Randy Orton"],
    correct_option: "Brock Lesnar",
  },
  {
    question:
      "Who is the only wrestler to win the WWE Championship, Intercontinental Championship, and Tag Team Championship in their debut match?",
    options: ["Kurt Angle", "Brock Lesnar", "The Rock", "Randy Orton"],
    correct_option: "Kurt Angle",
  },
  {
    question: "Who was the first-ever WWE Universal Champion?",
    options: ["Roman Reigns", "Seth Rollins", "Finn Bálor", "Kevin Owens"],
    correct_option: "Finn Bálor",
  },
  {
    question: 'Which WWE superstar is known as "The Viper"?',
    options: ["Randy Orton", "Edge", "John Cena", "Triple H"],
    correct_option: "Randy Orton",
  },
  {
    question: 'Who is known as "The Phenom" in WWE?',
    options: ["John Cena", "The Undertaker", "Shawn Michaels", "Triple H"],
    correct_option: "The Undertaker",
  },
];

const quiz = new Quiz(quizData);

// Function to render all questions and options
export function renderQuestions() {
  const questionsContainer = document.getElementById("questions-container");
  questionsContainer.innerHTML = "";

  quizData.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = `
          <p>${index + 1}. ${question.question}</p>
          <div class="options-container">
            ${question.options
              .map(
                (option, optionIndex) => `
              <input type="radio" id="option-${index}-${optionIndex}" name="option-${index}" value="${option}">
              <label for="option-${index}-${optionIndex}">${option}</label><br>
            `
              )
              .join("")}
          </div>
        `;
    questionsContainer.appendChild(questionElement);
  });

  document.getElementById("submit-btn").style.display = "block";
}

// Function to submit all answers
export function submitAnswers() {
  const forms = document.querySelectorAll("#quiz-form .options-container");
  forms.forEach((form, index) => {
    const selectedOption = form.querySelector(
      `input[name="option-${index}"]:checked`
    );
    if (selectedOption) {
      quiz.answerQuestion(selectedOption.value);
    }
  });

  renderResult();
}

// Function to render the result of the quiz

function renderResult() {
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";
  resultContainer.textContent = `Score: ${quiz.score}/${quiz.totalQuestions}`;

  document.getElementById("submit-btn").style.display = "none";

  // Allow quiz to be submitted again after showing result
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });
  quiz.resetQuiz();
}

export function resetQuiz() {
  console.log("hellllo");
  renderResult();
  document.getElementById("submit-btn").style.display = "block";
}

// Initial render
