var level = 0;
var gameSequence = [];
var isGameStarted = false;



$(document).keypress(function() {
  if (!isGameStarted) {
    nextSequence();
    isGameStarted = true;
  }
});

function nextSequence() {
  level++;
  var nextButton = generateGameSequence();
  gameSequence.push(nextButton);
  $("h1").text("Level " + level);
  console.log(gameSequence);
}

var clickSquenceNumber = 0; //To count the steps User has clicked
$(".btn").on('click', function() {
  var t = (this.id);
  //TO add animation below
  animatePressed(t);
  playAudio(t);

  if (t !== gameSequence[clickSquenceNumber]) {
    playAudio("wrong");
    gameOver()
  } else {
    clickSquenceNumber++;
    if(clickSquenceNumber===gameSequence.length){
      clickSquenceNumber = 0;
      nextSequence();
    }
    console.log("successed");
  }
});

function generateGameSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  buttons = ["red", "green", "yellow", "blue"];
  nextButton = buttons[randomNumber];
  //add animation for next button
  animateNewSequence(nextButton);
  //add sound for next buttons

  playAudio(nextButton);
  return (nextButton);

}
function animateNewSequence(button) {
setTimeout(function(){
  $("." + button).addClass("pressed");
},800) ;
  setTimeout(function() {
    $("." + button).removeClass("pressed");
  }, 1000);
}

function animatePressed(button) {
  $("." + button).addClass("pressed");
  setTimeout(function() {
    $("." + button).removeClass("pressed");
  }, 200);
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



function gameOver() {
  $("h1").text("Game over,press any key to restart.");
  animateGameOver();
  clickSquenceNumber=0;
  isGameStarted = false;
  level = 0;
  gameSequence = [];

}
