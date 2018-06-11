let message = document.getElementById('message');
let answerHdn = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let input = document.getElementById('user-guess');
let answerArr = [];

class DecisionMaker {

    constructor() {}
    decide(guess, answer) {
        if (attempt == 0) {
            showReply();
            showAnswer("failure");
            showMessage("You Lose! :(");
            return;
        }
        if (guess !== answer) 
              showMessage("Incorrect, try again");

        let createdResult = this.createResult();
        this.getResults(createdResult.result);
        if (createdResult.counter == 4) {
            showReply();
            showAnswer("success");
            showMessage("You Win! :)");
        }
    }

    createResult() {
        let result = '';
        let counter = 0;
        let inputValue = input.value;
        for (let i = 0; i < inputValue.length; i++) {
            let className = '';
            if (inputValue[i] === answerArr[i]) {
                className += "ok";
                counter++;
            } else if (answerArr.indexOf(inputValue[i]) !== -1) {
                className += "transfer";
            } else {
                className += "remove";
            }
            let span = `<span class="glyphicon glyphicon-${className}"></span>`;
            result += span;
        }

        return {result, counter};
    }

    getResults(result) {
        let resultdiv = document.createElement('div');
        resultdiv.innerHTML = `<div class="row"><span class="col-md-6"> ${input.value} </span><div class="col-md-6">${result}</div>`;
        document
            .getElementById('results')
            .appendChild(resultdiv);
    }
}
let decisionmaker = new DecisionMaker();

let showReply = () => {
    document
        .getElementById('guessing-div')
        .style
        .display = 'none';
    document
        .getElementById('replay-div')
        .style
        .display = 'block';
}

let showAnswer = (clsName) => {
    let codeDiv = document.getElementById('code');
    codeDiv.innerHTML = "";
    let answerDiv = document.createElement('div');
    answerDiv.setAttribute('class', clsName);
    answerDiv.innerHTML = answerArr
                            .join('')
                            .toString();
    codeDiv.appendChild(answerDiv);
}

let showMessage = (msg) => {
    message.innerHTML = msg;
}

let guess = () => {
    if (!validateInput()) {
        message.innerHTML = "Guesses must be exactly 4 characters long.";
    } else {
        //add functionality to guess function here
        decisionmaker.decide(input.value, answer);
        attempt--;
    }

}
//implement new functions here

let validateInput = () => {
    if (input.value.length > 4) {
        return false;
    }

    return true;
}

function setHiddenFields() {

    let answer = Math.floor(Math.random() * 9999);
    let answerString = answer.toString();
    for (let i = 0; i < answerString.length; i++) {
        answerArr.push(answerString[i]);
    }

    while (answerArr.length != 4) {
        answerArr.unshift(0);
    }
}

function start() {
    setHiddenFields();
    attempt = 10;
}

start();
