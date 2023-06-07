//code for main html page and to render quiz questions
//question variables
let container = document.querySelector('#container')
let questionContainer = document.querySelector("#question");
let score = 0;
let index = 0;
let newElement = document.createElement("ul");
let questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];


//timer variables
//this variable is the current time
let timeEl = document.querySelector("#time");
//starts the time
let timer = document.querySelector("#timer");
let totaltime = 75;
let penalty = 7;
let holdInterval = 0;


//event listener that sets off the timer
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            totaltime--;
            timeEl.textContent = "Time: " + totaltime;

            if (totaltime <= 0) {
                clearInterval(holdInterval);
                finished();
            }
        }, 
        //this controls the speed of the timer
        1000);
    }
    generate(index);
});

//
function generate(index) {
    // removes main html 
    container.innerHTML = "";
    newElement.innerHTML = "";
        //this for loop is in charge of pulling data from the array
    for (var i = 0; i < questions.length; i++) {
        //this pulls the questions from the array
        var userQuestion = questions[index].title;
        //this pulls the answer choices from the array
        var userChoices = questions[index].choices;
        questionContainer.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionContainer.appendChild(newElement);
        newElement.appendChild(listItem);
        listItem.addEventListener("click", (findCorrect));
    })
}
//this function will determine the correct answer
function findCorrect(answer) {
    var choice = answer.target;

    if (choice.matches("li")) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");
        // Correct condition 
        if (choice.textContent == questions[index].answer) {
            score++; 
        } else {
            //will remove 7 seconds for wrong answers
            totaltime = totaltime - penalty;
        }

    }
    //tells the user which question it is on
    index++;
    //else if statement will end the quiz and give the user their score
    if (index >= questions.length) {
        //this condition triggers the score page
        finished();
    } else {
        generate(index);
    }
    questionContainer.appendChild(newDiv);

}
//this function triggers the calculation of the score as well as generates the score page
function finished() {
    questionContainer.innerHTML = "";
    timeEl.innerHTML = "";

    //score header
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Your Score"

    questionContainer.appendChild(createH1);

    //box to hold text for the score page
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionContainer.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (totaltime >= 0) {
        var timeLeft = totaltime;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Final Score:" + timeLeft;
        questionContainer.appendChild(createP2);
    }

    //this renders the text for the score page
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your name: ";

    questionContainer.appendChild(createLabel);

    //this allows you to enter the users name
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "name");
    createInput.textContent = "";

    questionContainer.appendChild(createInput);

    //button to save info to totalScores
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionContainer.appendChild(createSubmit);

    //local storage to hold names and scores
    createSubmit.addEventListener("click", function () {
        var name = createInput.value;

        if (name === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                name: name,
                score: timeLeft
            }
            console.log(finalScore);
            var totalScores = localStorage.getItem("totalScores");
            if (totalScores === null) {
                totalScores = [];
            } else {
                totalScores = JSON.parse(totalScores);
            }
            totalScores.push(finalScore);
            var newScore = JSON.stringify(totalScores);
            localStorage.setItem("totalScores", newScore);
            window.location.replace("./score.html");
        }
    });

}
