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
          '90&#176;',
          '180&#176;',
          '270&#176;',
          'QT &#928;'
        ],
        correctAnswer: '90&#176;'
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
        <button id="next">Next Question</button></form>`
    }
    return problem;
}
//////////////////////////////////////////////////////////////

  //***Responsible for rendering the correct page content
  function render() {
    console.log('render function ran');

    $("main").html(intro);
    $("#start").on("click", function(e) {
        e.preventDefault();
        quizStarted = true;
        // Note that questionNumber = 1;
        $("main").html(handleShowProblem());
        $("#next").hide();
        handleSubmit();
    })
  }
  
//***When the user clicks on an answer AND clicks on "Submit" button, the handleFeedback function is fired
  function handleSubmit() {
        console.log("handleSubmit function ran");
        // if any one of the radio inputs is selected
        $("input").click(function(){
            const selectedAnswer = $(this).val();
            const { correctAnswer } = store.questions[questionNumber - 1];
            if ($(".radio").is(":checked")) {
            // on the click of submit, show the feedback.
            $("#submit").on("click", function(e){
                e.preventDefault();

                handleFeedback(selectedAnswer, correctAnswer);
                });
                console.log("The correct answer is", correctAnswer);
                console.log("The selected answer is", selectedAnswer);
            }
        })
        // If the user clicks submit without clicking on an answer, then a pop up should appear
        $("#submit").on("click", function(e) {
            e.preventDefault();
            if(!($(".radio").is(':checked'))) {
                alert("Select one before submitting.");
            }
        });
    }

//***Show feedback box under the choice that the user selected
  function handleFeedback(selectedChoice, correctChoice) {
    console.log("handleFeedback function ran");
    // debugger;
    // If the selection was correct, show "This is correct!" under the correct input
    // If the selection was incorrect, show "That is incorrect. The answer was blah"
    if (selectedChoice === correctChoice) {
        $("main").append("<p>Correct!</p>");
        score++;
    } else {
        $("main").append(`<p>Incorrect. The correct answer was ${correctChoice}.</p>`)
    }
    //  Show the NEXT button
    $("#submit").hide();
    $("#next").show();
  }

//***When the user has clicked on an answer option AND when they click on the "Next Question" button, the next question should show.
  function handleNext() {
      console.log("handleNext function ran");
      $("#next").on("click", function(e){
        e.preventDefault();
        $("#next").hide();
        $("#submit").show();
        questionNumber++;
        console.log("The current question number is", questionNumber);
        $("main").html(handleShowProblem());
        handleSubmit();
      });
      

  }

  function handleResults() {
    //   The final score should show
    // A button to restart the quiz shows
    // When the user clicks on the "Restart Quiz" button, the quiz should re-render from the beginning.
  }

  $(render);
  $(handleNext);
  
  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates
  
  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)