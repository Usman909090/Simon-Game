let gamePattern = [];
let guessed_pattern = [];
let color_array = ["red", "blue", "green", "yellow"];
let level_number = 0;
let started = false;
// A function for generating next random color box
function nextSequence() {
  guessed_pattern = [];
  level_number++;
  $("h1").text(`Level ${level_number}`);
  let random_index = Math.floor(Math.random() * 4);
  let random_color = color_array[random_index]; // Getting random color from the array of colors
  gamePattern.push(random_color);
  playSound(random_color);
  animateFlash(random_color);
}

// A function to play sound related to the color box
function playSound(color) {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

// A functionk to animate the button
function animateFlash(color) {
  $(`#${color}`).addClass("pressed");
  setInterval(() => {
    $(`#${color}`).removeClass("pressed");
  }, 300);
}

// Checking click event on buttons
$(".btn").on("click", function (e) {
  e.preventDefault();
  playSound(e.target.id);
  animateFlash(e.target.id);
  guessed_pattern.push(e.target.id);
  checkAnswer(guessed_pattern.length - 1);
});

// A function to validate user clicked sequence
function checkAnswer(currentLevel) {
  // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === guessed_pattern[currentLevel]) {
    // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (guessed_pattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text(`Game Over, Press Any Key to Restart`);
    $("body").addClass("game-over");
    setInterval(() => {
      $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
    guessed_pattern = [];
    level_number = 0;
    started = false;
  }
}

$(this).keypress(function (e) {
  if (!started) {
    started = true;
    nextSequence();
  }
});
