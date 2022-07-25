const API_URL = "questions.json";
let questions =  [];
let currentQuestion = 0;
let score = 0;


function renderQuestion() {
    let card = "";
    card += /*html*/ `
    <div class="card-header">
        <h4 class="card-title">${questions[currentQuestion].category}</h4>
    </div>
    <div class="card-body">
     
        <p class="card-text">${questions[currentQuestion].question}.</p>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="pregunta1" value="${questions[currentQuestion].incorrect_answers[0]}." id="pregunta1">
            <label class="form-check-label" for="pregunta1">${questions[currentQuestion].incorrect_answers[0]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="pregunta1" value="${questions[currentQuestion].incorrect_answers[1]}" id="pregunta2">
            <label class="form-check-label" for="pregunta2">${questions[currentQuestion].incorrect_answers[1]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="pregunta1" value="${questions[currentQuestion].incorrect_answers[2]}" id="pregunta3">
            <label class="form-check-label" for="pregunta3">${questions[currentQuestion].incorrect_answers[2]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="pregunta1" value="${questions[currentQuestion].incorrect_answers[3]}" id="pregunta4">
            <label class="form-check-label" for="pregunta4">${questions[currentQuestion].incorrect_answers[3]}</label>
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
      //  renderQuestion(questions[--currentQuestion]);
    } else {
        alert("No puedes retroceder");
    }
}

function siguiente() {
    if (currentQuestion < questions.length - 1) {
      //  checkAnswer();
        ++currentQuestion
       renderQuestion();
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

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  

function main() { 
    questions = document.getElementById("questionsList").innerHTML;
    questions = JSON.parse(questions.replaceAll("'","\""))

    for (let i = 0; i < questions.length; i++) {
        questions[i].question = htmlDecode(questions[i].question) 
        console.log(htmlDecode(questions[i].question) )
        for(let j =0;j < questions[i].incorrect_answers.length; j++) {
            questions[i].incorrect_answers[j] = htmlDecode(questions[i].incorrect_answers[j])
        }
        
    }
    console.log(questions[0].question);
    console.log(questions);
  //console.log(typeofquestions)
    if (currentQuestion == 0) {
         renderQuestion();
    } else {
 //       cargeQuestions();
    }
   
}


