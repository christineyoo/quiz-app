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
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };

  function render() {
    //   As soon as the page loads, the landing page should appear.
    console.log('render function ran');

    const intro = "<h2>How well do you know your trigonometry?</h2><button id='start'>Start Quiz</button>";

    $("main").html(intro);
  }

  function handleStart() {
    //   When the user clicks on the "Start Quiz" button, the first question should show

    console.log("handleStart function ran");

    $("#start").on("click", function(e) {
        e.preventDefault();

        const firstQ = store.questions[0].question;

        // Array of answers
        const firstQAnswers = store.questions[0].answers;

        const htmlFirstQ = `<form>
        <h3>${firstQ}</h3>
        <input type="radio" name="question1" value="${firstQAnswers[0]}" class="radio"><label for="question1"> ${firstQAnswers[0]}</label><br>
        <input type="radio" name="question1" value="${firstQAnswers[2]}" class="radio"> ${firstQAnswers[1]}<br>
        <input type="radio" name="question1"value="${firstQAnswers[2]}" class="radio"> ${firstQAnswers[2]}<br>
        <input type="radio" name="question1" value="${firstQAnswers[3]}" class="radio"> ${firstQAnswers[3]}<br>
        <button id="submit">Submit</button></form>`;

        $("main").html(htmlFirstQ);
        handleSubmit();
    })
  }

  function handleSubmit() {
    //   When the user clicks on an answer AND clicks on "Submit" button, the handleFeedback function is fired
    console.log("handleSubmit function ran");
    // if any one of the radio inputs is selected
    $("input").click(function(){
        if ($(".radio").is(':checked')) {
        // on the click of submit, show the feedback.
        $("button").on("click", function(e){
            e.preventDefault();

            handleFeedback();
        })
        }
    });
    // If the user clicks submit without clicking on an answer, then a pop up should appear
    $("button").on("click", function(e) {
        e.preventDefault();
        if(!$(".radio").is(':checked')) {
            alert("Select one before submitting.");
        }
    });
  }

  function handleFeedback() {
      //   Show feedback box under the choice that the user selected
      console.log("handleFeedback function ran")
    // If the selection was correct, show "This is correct!" under the correct input

    const { correctAnswer } = store.questions[3];
    console.log(correctAnswer);
    console.log($(".radio").val());
    if ($(".radio").val().trim() === correctAnswer.trim()) {
        $(".radio").html("<p>That is correct!</p>");
        console.log("wow")
    }

    // If the selection was incorrect, show "That is incorrect. The answer was blah"


    // Change the Submit button to a Next button
    $("button").html("Next Question");
    
  }

  function handleNext() {
      // When the user has clicked on an answer option AND when they click on the "Next Question" button, the next question should show.
    //   The question number should be updated
    // The score should also be updated
  }

  function handleResults() {
    //   The final score should show
    // A button to restart the quiz shows
    // When the user clicks on the "Restart Quiz" button, the quiz should re-render from the beginning.
  }

  $(render);
  $(handleStart);
  
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