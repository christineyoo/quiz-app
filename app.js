const store = {
  questions: [
    {
      question: "Question 1 of 5: How do you say the Greek symbol &theta; ?",
      answers: ["alpha", "beta", "gamma", "theta"],
      correctAnswer: "theta",
    },
    {
      question: "Question 2 of 5: Which ratio represents tan &theta; ?",
      answers: [
        "opposite/adjacent",
        "opposite/hypotenuse",
        "adjacent/hypotenuse",
        "adjacent/opposite",
      ],
      correctAnswer: "opposite/adjacent",
    },
    {
      question: "Question 3 of 5: Which ratio represents sin &theta; ?",
      answers: [
        "opposite/adjacent",
        "opposite/hypotenuse",
        "adjacent/hypotenuse",
        "adjacent/opposite",
      ],
      correctAnswer: "opposite/hypotenuse",
    },
    {
      question: "Question 4 of 5: Convert &#928;/2 from radians to degrees.",
      answers: ["90 degrees", "180 degrees", "270 degrees", "QT &#928;"],
      correctAnswer: "90 degrees",
    },
    {
      question:
        "Question 5 of 5: Which trigonometric function is an even function?",
      answers: [
        "sin(-x) = - sin(x)",
        "csc(-x) = - csc(x)",
        "cos(-x) = cos(x)",
        "tan(-x) = -tan(x)",
      ],
      correctAnswer: "cos(-x) = cos(x)",
    },
  ],
  quizStarted: false,
  questionNumber: 1,
  score: 0,
};

const intro =
  "<h2>How well do you know your trigonometry?</h2><button id='start'>Start Quiz</button>";

//*** Responsible for generating the question template
function handleShowProblem() {
  // The question and answers variables change as the questionNumber variable changes
  let { question } = store.questions[store.questionNumber - 1];
  let { answers } = store.questions[store.questionNumber - 1];
  let problem = "";
  for (let i = 0; i < store.questions.length; i++) {
    problem = `<form>
      <h3>${question}</h3>
      <input type="radio" name="question" value="${answers[0]}" class="radio" id="answer-1"><label for="answer-1"> ${answers[0]}</label><br>
      <input type="radio" name="question" value="${answers[1]}" class="radio" id="answer-2"><label for="answer-2"> ${answers[1]}</label><br>
      <input type="radio" name="question"value="${answers[2]}" class="radio" id="answer-3"><label for="answer-3"> ${answers[2]}</label><br>
      <input type="radio" name="question" value="${answers[3]}" class="radio" id="answer-4"><label for="answer-4"> ${answers[3]}</label><br>
      <button id="submit" disabled>Submit</button>
      <button id="next">Next Question</button></form>
      <p>Score: ${store.score} </p>
      <div id="feedback"></div>
      `;
  }
  return problem;
}

function handleShowResults() {
  return `<form><h3>Your final score is ${store.score} out of 5.</h3><br>
  <h4>Click "Restart Game" to try again!</h4>
  <button id="restart">Restart Game</button></form>`;
}

//***Responsible for rendering the landing page
function renderLandingPage() {
  $("main").html(intro);
  $("#start").on("click", function (e) {
    e.preventDefault();
    store.quizStarted = true;
    $("main").html(handleShowProblem());
    $("#next").hide();
    handleSubmit();
  });
}

//***Responsible for rendering the next question on the page
function renderNextQuestion() {
  $("main").html(handleShowProblem());
  $("#next").hide();
  handleSubmit();
}

//***When the user clicks on an answer AND clicks on "Submit" button, the handleFeedback function is fired
function handleSubmit() {
  // if any one of the radio inputs is selected
  $("input").on("click", function (e) {
    const selectedAnswer = $(this).val();
    const { correctAnswer } = store.questions[store.questionNumber - 1];
    $("#submit").removeAttr("disabled");
    $("#submit").on("click", function (e) {
      e.preventDefault();
      $("#submit").hide();
      $("#next").show();
      if (selectedAnswer === correctAnswer) {
        store.score++;
        $("#feedback").html("<p>Correct!</p>");
      } else {
        $("#feedback").html(
          `<p>Incorrect. The correct answer was ${correctAnswer}.</p>`
        );
      }
    });
  });

  $("#next").on("click", function (e) {
    e.preventDefault();
    if (store.questionNumber < 5) {
      store.questionNumber++;
      renderNextQuestion();
    } else {
      $("main").html(handleShowResults());
      $("#restart").on("click", function (e) {
        store.questionNumber = 1;
        store.score = 0;
        renderLandingPage();
      });
    }
  });
}

$(renderLandingPage);
