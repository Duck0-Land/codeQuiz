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
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionContainer.appendChild(newElement);
        newElement.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(answer) {
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
        //will apend the last page with the users score
        finished();
    } else {
        generate(index);
    }
    questionContainer.appendChild(newDiv);

}
