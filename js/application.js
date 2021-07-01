$(document).ready(function () {
  var interval;
  var score = 0;

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  var currentQuestion;
  var timeLeft = 10;

  //Function for generating math questions

  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  };

  currentQuestion = questionGenerator();

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $("#equation").text(currentQuestion.equation);
  };

  // Checking user input against answer
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $("#user-input").val("");
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  $("#user-input").on("keyup", function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  // TIMER

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $("#time-left").text(timeLeft);
  };

  var updateScore = function (amount) {
    score += amount;
    $("#score").text(score);
  };

  renderNewQuestion();
  updateTimeLeft(0);
});
