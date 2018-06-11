'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var message = document.getElementById('message');
var answerHdn = document.getElementById('answer');
var attempt = document.getElementById('attempt');
var input = document.getElementById('user-guess');
var answerArr = [];

var DecisionMaker = function () {
    function DecisionMaker() {
        _classCallCheck(this, DecisionMaker);
    }

    _createClass(DecisionMaker, [{
        key: 'decide',
        value: function decide(guess, answer) {
            if (attempt == 0) {
                showReply();
                showAnswer("failure");
                showMessage("You Lose! :(");
                return;
            }
            if (guess !== answer) showMessage("Incorrect, try again");

            var createdResult = this.createResult();
            this.getResults(createdResult.result);
            if (createdResult.counter == 4) {
                showReply();
                showAnswer("success");
                showMessage("You Win! :)");
            }
        }
    }, {
        key: 'createResult',
        value: function createResult() {
            var result = '';
            var counter = 0;
            var inputValue = input.value;
            for (var i = 0; i < inputValue.length; i++) {
                var className = '';
                if (inputValue[i] === answerArr[i]) {
                    className += "ok";
                    counter++;
                } else if (answerArr.indexOf(inputValue[i]) !== -1) {
                    className += "transfer";
                } else {
                    className += "remove";
                }
                var span = '<span class="glyphicon glyphicon-' + className + '"></span>';
                result += span;
            }

            return { result: result, counter: counter };
        }
    }, {
        key: 'getResults',
        value: function getResults(result) {
            var resultdiv = document.createElement('div');
            resultdiv.innerHTML = '<div class="row"><span class="col-md-6"> ' + input.value + ' </span><div class="col-md-6">' + result + '</div>';
            document.getElementById('results').appendChild(resultdiv);
        }
    }]);

    return DecisionMaker;
}();

var decisionmaker = new DecisionMaker();

var showReply = function showReply() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
};

var showAnswer = function showAnswer(clsName) {
    var codeDiv = document.getElementById('code');
    codeDiv.innerHTML = "";
    var answerDiv = document.createElement('div');
    answerDiv.setAttribute('class', clsName);
    answerDiv.innerHTML = answerArr.join('').toString();
    codeDiv.appendChild(answerDiv);
};

var showMessage = function showMessage(msg) {
    message.innerHTML = msg;
};

var guess = function guess() {
    if (!validateInput()) {
        message.innerHTML = "Guesses must be exactly 4 characters long.";
    } else {
        //add functionality to guess function here
        decisionmaker.decide(input.value, answer);
        attempt--;
    }
};
//implement new functions here

var validateInput = function validateInput() {
    if (input.value.length > 4) {
        return false;
    }

    return true;
};

function setHiddenFields() {

    var answer = Math.floor(Math.random() * 9999);
    var answerString = answer.toString();
    for (var i = 0; i < answerString.length; i++) {
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