// code to save and clear the scoreboard
// variables
let scores = document.querySelector("#scores");
let clear = document.querySelector("#clear");
let returnB = document.querySelector("#return");
//button to clear the scoreboard
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
//local stroage 
var totalScores = localStorage.getItem("totalScores");
totalScores = JSON.parse(totalScores);

if (totalScores !== null) {

    for (var i = 0; i < totalScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = totalScores[i].name + " " + totalScores[i].score;
        scores.appendChild(createLi);

    }
}
//return button for the index page
returnB.addEventListener("click", function () {
    window.location.replace("./index.html");
});