//code for main html page and to render quiz questions
//question variables
let questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c."
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["a. quotes", "b. curly brackets", "c. parentheses", "d. square brackets"],
        answer: "c."
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["a. Javascript", "b. terminal / bash", "c. for loops", "d. console log"],
        answer: "d."
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
    allDone();
            }
        }, 
        //this controls the speed of the timer
        1000);
    }
    clear(container);
});

//function to remove the main page html
function clear(container) {
    container.innerHTML = ""
    generate(questions)
};

function generate(questions) {
    container.innerHTML = questions
}


