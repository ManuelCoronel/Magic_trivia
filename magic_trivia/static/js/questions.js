let questions =  [];
let score_question = []
let currentQuestion = 0;
let score = 0;
let url_image_question = ""
let url_image_answer = ""
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
            <div class="col-10" style=" padding: 20px 40px; border-radius: 40px; background-image: url('${url_image_question}');   background-position: center;background-size:cover; background-repeat:no-repeat" >
             <h4 style="font-size:2.6rem; margin:10px 0px;"><b>${htmlDecode(questions[currentQuestion].category)}</b></h4>
            <p class="card-text"  style="font-size:2rem;">  ${htmlDecode(questions[currentQuestion].question)}</p>
        </div>
    </div>
    </div>
    <div class="container" style="margin:80px 0px 40px 0px">
    <div class="row justify-content-center" style="font-size:1.5rem;">`;

     for (let i = 0; i < questions[currentQuestion].incorrect_answers.length; i++) {
        card += `
        <div class="col-4  form-check"  style=" margin: 50px 40px;padding:30px 0px 30px 30px; border-radius: 40px; background-image: url('${url_image_answer}');   background-position: center;background-size:cover; background-repeat:no-repeat">
        <input class="form-check-input " type="radio" style=" width:20px;height:20px";  name="pregunta1" value="${htmlDecode(questions[currentQuestion].incorrect_answers[i])}" id="pregunta${i+1}">
        <label class="form-check-label " style="padding: 0px 20px ;" for="pregunta${i+1}">${htmlDecode(questions[currentQuestion].incorrect_answers[i])}</label>
        </div>
        `;
     }
     card +=  `</div>
     </div> `;
        
     card += draw_options()  
         document.getElementById("card_question").innerHTML = card;
}

function draw_options(){

    label = "";
    style = "";
    col = "";

    if (currentQuestion == 0){
        style = "hidden"
        col = "1"
    }else{
        col="2"
    }
    card = `

     <div class="card-footer container">
            <div class="row">
                <div class="col-sm-${col} offset-4" >
                <button type="button" class="btn btn-primary" id="btn_pregunta1" onclick="go_back()"  ${style} style="color:black; padding: 20px 40px; border-radius: 40px; background-image: url('${url_image_question}');   background-position: center;background-size:cover; background-repeat:no-repeat">Back</button>
            </div>
`;

    if (currentQuestion < questions.length - 1){
        function_name = "go_next()";
        label = "Next";
    }else{
        function_name = "finish()";
        label = "Finish";

    }
    card += `
            <div class="col-sm-2">
             <button type="button" class="btn btn-primary" id="btn_pregunta2" onclick="${function_name}"style="color:black; padding: 20px 40px; border-radius: 40px; background-image: url('${url_image_question}');   background-position: center;background-size:cover; background-repeat:no-repeat">${label}</button>
        </div>
    </div>
    </div>
    `;
    return card;

}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



function finish(){
    checkAnswer()
    let data = {'answer_selected': score_question};

    fetch("http://127.0.0.1:8000/questions/validate/", {
      method: "POST",
      headers: {'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken')}, 
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Request complete! response:", res);
    });

    location.href="/questions/game_over"

}

function go_back() {
    if (currentQuestion > 0) {
        --currentQuestion
        renderQuestion();
    } else {
        alert("No puedes retroceder");
    }
}

function go_next() {
    if (currentQuestion < questions.length - 1) {
        checkAnswer();
        ++currentQuestion
       renderQuestion();
    } else {
        checkAnswer();
        end_time = performance.now();
        alert(" Time : "+convertMsToTime(end_time - start_time));
    }
}

function checkAnswer() {
    let answer = document.querySelector('input[name="pregunta1"]:checked').value;
    score_question[currentQuestion] = answer;
    
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }
  

function main(url_image_questiona,url_image_answera) { 
    
    start_time = performance.now();
    score = 0
    url_image_question = url_image_questiona
    url_image_answer = url_image_answera
    questions = document.getElementById("questionsList").innerHTML;
    questions = JSON.parse(questions.replaceAll("'","\""))
    
    renderQuestion();

}


