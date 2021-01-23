const store = {
  questions: [
    {
      question: 'Question 1 of 5: How do you say the Greek symbol &theta; ?',
      answers: [
        'alpha',
        'beta',
        'gamma',
        'theta'
      ],
      correctAnswer: 'theta'
    },
    {
      question: 'Question 2 of 5: Given a right triangle, which ratio represents tan &theta; ?',
      answers: [
        'opposite/adjacent',
        'opposite/hypotenuse',
        'adjacent/hypotenuse',
        'adjacent/opposite'
      ],
      correctAnswer: 'opposite/adjacent'
    },
    {
      question: 'Question 3 of 5: What trigonometric function does the following graph represent?',
      answers: [
        'y = tan(x)',
        'y = csc(x)',
        'y = sin(x)',
        'y = cos(x)'
      ],
      correctAnswer: 'y = sin(x)'
    },
    {
      question: 'Question 4 of 5: Convert the following expression from radians to degrees.',
      answers: [
        '90 degrees',
        '180 degrees',
        '270 degrees',
        'QT &#928;'
      ],
      correctAnswer: '90 degrees'
    },
    {
      question: 'Question 5 of 5: Which trigonometric function is an even function?',
      answers: [
        'sin(-x) = - sin(x)',
        'csc(-x) = - csc(x)',
        'cos(-x) = cos(x)',
        'tan(-x) = -tan(x)'
      ],
      correctAnswer: 'cos(-x) = cos(x)'
    }
  ]
};

/////////////GLOBAL VARIABLES AND CONSTANTS////////////////////
let quizStarted = false;
let questionNumber = 1;
let score = 0;
const intro = "<h2>How well do you know your trigonometry?</h2><button id='start'>Start Quiz</button>";
//////////////////////////////////////////////////////////////

//*** Responsible for generating the question template
function handleShowProblem() {
  // The question and answers variables change as the questionNumber variable changes
  let { question } = store.questions[questionNumber - 1];
  let { answers }  = store.questions[questionNumber - 1];
  let problem = '';
  for (let i = 0; i < store.questions.length; i++) {
      problem = `<form>
      <h3>${question}</h3>
      <input type="radio" name="question" value="${answers[0]}" class="radio"> ${answers[0]}<br>
      <input type="radio" name="question" value="${answers[1]}" class="radio"> ${answers[1]}<br>
      <input type="radio" name="question"value="${answers[2]}" class="radio"> ${answers[2]}<br>
      <input type="radio" name="question" value="${answers[3]}" class="radio"> ${answers[3]}<br>
      <button id="submit">Submit</button>
      <button id="next">Next Question</button></form>
      <div id="feedback"></div>`
  }
  return problem;
}

function handleShowResults() {
  return `<h3>Your final score is ${score}.</h3><br>
  <h4>Click "Restart Game" to try again!</h4>
  <button id="restart">Restart Game</button>`
}

//***Responsible for rendering the landing page
function renderLandingPage() {
  $("main").html(intro);
  $("#start").on("click", function(e) {
    e.preventDefault();
    quizStarted = true;
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
  console.log("handleSubmit function ran");
  // if any one of the radio inputs is selected
  $("input").on("click", function(e){
    const selectedAnswer = $(this).val();
    const { correctAnswer } = store.questions[questionNumber - 1];
    $("#submit").on("click", function(e){
      e.preventDefault();
      $("#submit").hide();
      $("#next").show();
      if (selectedAnswer === correctAnswer){
        score++;
        $("#feedback").html("<p>Correct!</p>");
        $("#feedback").append(`<p>Score: ${score} </p>`);
      } else {
        $("#feedback").html(`<p>Incorrect. The correct answer was ${correctAnswer}.</p>`)
      }
    });
  });

  // If the user clicks submit without clicking on an answer, then a pop up should appear
  $("#submit").on("click", function(e) {
      e.preventDefault();
      if(!($(".radio").is(':checked'))) {
          alert("Select one before submitting.");
      }
  });

  $("#next").on("click", function(e){
    e.preventDefault();
    if (questionNumber < 5) {
      questionNumber++;
      renderNextQuestion();
    } else {
    $("main").html(handleShowResults());
    $("#restart").on("click", function(e){
      questionNumber = 1;
      score = 0;
      renderLandingPage();
    });
  }
  });
}

$(renderLandingPage);