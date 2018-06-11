let message = document.getElementById('message');
export default class DecisionMaker {

    constructor() {}
    decide(guess, answer) {
        if (guess !== answer) 
            message.innerText = "Incorrect, try again";
        }
}

