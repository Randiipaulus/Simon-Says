window.onload = function() {
    document.body.style.zoom = "150%";
  };

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

var currentScore = 0;

var bestScore = 0;

function startGame() {
    if (!started) {
        $(".start").hide();
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".tiles").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            currentScore++;
            $(".current-score").text("Your Score: " + currentScore);
            if (currentScore > bestScore) {
                bestScore = currentScore;
                $(".best-score").text("Best Score: " + bestScore);
            }
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press 'Restart Game' to Play Again");
        $(".restart").show();
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    currentScore = 0;
}

$(".start").click(startGame);


$(".restart").click(function () {
    $(".restart").hide();
    $(".start").show();
    $("#level-title").text("Press 'Start Game' to Play");
    $(".current-score").text("Your Score: 0");
    $(".best-score").text("Best Score: " + bestScore);
    startOver();
});
