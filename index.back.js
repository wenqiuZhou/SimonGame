var level = 1;
var gameSequence = [];
var isGameStarted=false

gameStartOver();

function gameStartOver() {
  if(!isGameStarted){
  $(document).keypress(function() {
    var nextButton = generateGameSequence();
    gameSequence.push(nextButton);
    var isGameOver = false;
    while (!isGameOver) {
      isGameOver = playGame(level, gameSequence)
      level++;
      nextButton = generateGameSequence();
      gameSequence.push(nextButton);
    }
    gameOver();

  });}
}


function generateGameSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  buttons = ["red", "green", "yellow", "blue"];
  nextButton = buttons[randomNumber];
  //add animation for next button
  animatePressed(nextButton);
  //add sound for next buttons

  playAudio(nextButton);
  return (nextButton);

}

function animatePressed(button) {
  $("." + button).addClass("pressed");
  setTimeout(function() {
    $("." + button).removeClass("pressed");
  }, 100);
}

function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
}

function playGame(level, gameSequence) {
  $("h1").text("Level " + level);
  var clickSquenceNumber = 0; //To count the steps User has clicked
  $(".btn").on('click', function() {
    var t = (this.id);
    //TO add animation below
    animatePressed(t);
    playAudio(t);
    if (t !== gameSequence[clickSquenceNumber]) {
      playAudio("wrong");
      return true;
    } else {
      clickSquenceNumber++;
      console.log("successed");
    }
    return false;
  })

}

function gameOver() {
  $("h1").text("Game over,press any key to restart.");
  animateGameOver();
  isGameStarted=false;

}

function levelUp() {

}
