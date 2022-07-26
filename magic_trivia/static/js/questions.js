const API_URL = "questions.json";
let questions =  [];
let score_question = []
let currentQuestion = 0;
let score = 0;
let url1 = ""
let url2 = ""
let start_time = 0
let end_time = 0

function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
  
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds,)}`;
  }
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

function renderQuestion() {
    let card = "";
    card += /*html*/ `
    <div class="container"  >
        <div class="row justify-content-center" style="text-align: center;" >
            <div class="col-10" style=" padding: 20px 40px; border-radius: 40px; background-image: url('${url1}');   background-position: center;background-size:cover; background-repeat:no-repeat" >
             <h4 style="font-size:2.6rem; margin:10px 0px;"><b>${questions[currentQuestion].category}</b></h4>
            <p class="card-text"  style="font-size:2rem;">  ${questions[currentQuestion].question}</p>
        </div>
    </div>
    </div>
    <div class="container" style="margin:80px 0px 40px 0px">
    <div class="row justify-content-center" style="font-size:1.5rem;">`;

     for (let i = 0; i < questions[currentQuestion].incorrect_answers.length; i++) {
        card += `
        <div class="col-4  form-check"  style=" margin: 50px 40px;padding:30px 0px 30px 30px; border-radius: 40px; background-image: url('${url2}');   background-position: center;background-size:cover; background-repeat:no-repeat">
        <input class="form-check-input " type="radio" style=" width:20px;height:20px";  name="pregunta1" value="${questions[currentQuestion].incorrect_answers[i]}" id="pregunta${i+1}">
        <label class="form-check-label " style="padding: 0px 20px ;" for="pregunta${i+1}">${questions[currentQuestion].incorrect_answers[i]}</label>
        </div>
        `;

     }
     card += `
        </div>
    </div>
    <div class="card-footer container">
    <div class="row">
        <div class="col-2 offset-4" >
        <button type="button" class="btn btn-primary" id="btn_pregunta1" onclick="anterior()"  style="color:black; padding: 20px 40px; border-radius: 40px; background-image: url('${url1}');   background-position: center;background-size:cover; background-repeat:no-repeat">Anterior</button>
        </div>
        <div class="col-2 ">
        <button type="button" class="btn btn-primary" id="btn_pregunta2" onclick="siguiente()"style="color:black; padding: 20px 40px; border-radius: 40px; background-image: url('${url1}');   background-position: center;background-size:cover; background-repeat:no-repeat">Siguiente</button>
        </div>
        </div>
    </div>
    `;
    document.getElementById("card_question").innerHTML = card;
}

function anterior() {
    if (currentQuestion > 0) {
        --currentQuestion
        renderQuestion();
    } else {
        alert("No puedes retroceder");
    }
}

function siguiente() {
    if (currentQuestion < questions.length - 1) {
        checkAnswer();
        ++currentQuestion
       renderQuestion();
    } else {
        console.log(currentQuestion)
        checkAnswer();
        totalScore()
        end_time = performance.now();
        total_time = end_time - start_time
        alert("Terminaste " + score + " Time : "+convertMsToTime(total_time));
    }
}
function totalScore(){
    score = 0
    console.log("SCOREE")
    console.log(score_question)
    for (var i = 0; i < questions.length;i++){
        score += score_question[i]
        
    }

}

function checkAnswer() {
    let answer = document.querySelector('input[name="pregunta1"]:checked').value;
    console.log(answer)
    console.log(htmlDecode(questions[currentQuestion].correct_answer))
    if (answer == htmlDecode(questions[currentQuestion].correct_answer)) {
        score_question[currentQuestion] = 1
        console.log("BIENNN")
    }else{
          score_question[currentQuestion] = 0
    }
}

function existsQuestions() {
    return !!localStorage.getItem('questions');
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  

function main(urlh1,urlh2) { 
    start_time = performance.now();
    score = 0
    url1 = urlh1
    url2 = urlh2
    questions = document.getElementById("questionsList").innerHTML;
    questions = JSON.parse(questions.replaceAll("'","\""))

    for (let i = 0; i < questions.length; i++) {
        questions[i].question = htmlDecode(questions[i].question) 
        questions[i].correct_answer = htmlDecode(questions[i].correct_answer) 
        score_question[i] = 0
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
    }
}


