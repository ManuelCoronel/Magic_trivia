const API_URL = "questions.json";
let questions = [];
let currentQuestion = 0;
let score = 0;

renderQuestion(questions)

function renderQuestion(question) {
    let card = "";
    card += /*html*/ `
    <div class="card-header">
        <h4 class="card-title">${question.category}</h4>
    </div>
    <div class="card-body">
        <h6 class="card-title">Pregunta ${currentQuestion}.</h6>
        <p class="card-text">${question.question}</p>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="pregunta1" value="${question.options[0]}" id="pregunta1">
            <label class="form-check-label" for="pregunta1">${question.options[0]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="pregunta1" value="${question.options[1]}" id="pregunta2">
            <label class="form-check-label" for="pregunta2">${question.options[1]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="pregunta1" value="${question.options[2]}" id="pregunta3">
            <label class="form-check-label" for="pregunta3">${question.options[2]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="pregunta1" value="${question.options[3]}" id="pregunta4">
            <label class="form-check-label" for="pregunta4">${question.options[3]}</label>
        </div>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-primary" id="btn_pregunta1" onclick="anterior()">Anterior</button>
        <button type="button" class="btn btn-primary" id="btn_pregunta2" onclick="siguiente()">Siguiente</button>
    </div>
    `;
    document.getElementById("card_question").innerHTML = card;
}

function anterior() {
    if (currentQuestion > 0) {
        renderQuestion(questions[--currentQuestion]);
    } else {
        alert("No puedes retroceder");
    }
}

function siguiente() {
    if (currentQuestion < questions.length - 1) {
        checkAnswer();
        renderQuestion(questions[++currentQuestion]);
    } else {
        alert("Terminaste " + score);
    }
}

function checkAnswer() {
    let answer = document.querySelector('input[name="pregunta1"]:checked').value;
    if (answer == questions[currentQuestion].answer) {
        score++;
    }
}

function existsQuestions() {
    return !!localStorage.getItem('questions');
}

function main() {
    if (existsQuestions()) {
        questions = JSON.parse(localStorage.getItem('questions'));
    } else {
        cargeQuestions();
    }
    renderQuestion(questions[currentQuestion]);
}

main();