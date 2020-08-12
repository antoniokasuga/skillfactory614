const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let mistakes = 0;

function round() {
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);
  if (hits === 0) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let totalPoints = 10 - mistakes;
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-mistakes").text(mistakes);
  $("#total-points").text(totalPoints);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    $(".game-field").text("");
    hits = hits + 1;
    round();
  }else{
    $(event.target).addClass("miss");
    mistakes++;
  }
}

function init() {
  $("#button-start").click(round);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
