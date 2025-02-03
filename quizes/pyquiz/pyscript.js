const questions = [
    {
        question: "Which keyword is used to declare a variable in python?",
        answers: [
            { text: "var", correct: false },
            { text: "int", correct: false },
            { text: "float", correct: false },
            { text: "None of the above", correct: true},
        ]
    },
    {
        question: "Which symbol is used for comments in python?",
        answers: [
            { text: "//", correct: false },
            { text: "/* */", correct: false },
            { text: "#", correct: true },
            { text: "--", correct: false },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "alert('Hello World');", correct: false },
            { text: "msg('Hello World');", correct: false },
            { text: "console.log('Hello World');", correct: false },
            { text: "prompt('Hello World');", correct: true },
        ]
    },
    {
        question: "What does 'typeof' return for an array?",
        answers: [
            { text: "'array'", correct: false },
            { text: "'object'", correct: true },
            { text: "'list'", correct: false },
            { text: "'undefined'", correct: false },
        ]
    },
    {
        question: "Which function is used to convert a string to an integer?",
        answers: [
            { text: "int()", correct: true },
            { text: "parseint()", correct: false },
            { text: "Number()", correct: false },
            { text: "toString()", correct: false },
        ]
    }
]

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score= 0 ;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
         const button = document.createElement("button")
         button.innerHTML = answer.text;
         button.classList.add("btn");
         answerButtons.appendChild(button);
         if(answer.correct){
            button.dataset.correct = answer.correct;
         }
         button.addEventListener("click", selectAnswer);     
    });
}

function resetQuestion(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect){
        selectBtn.classList.add("correct");
        score++ ;
    }else{
        selectBtn.classList.add("incorrect");
        score = score - 0.5
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display ="block"

}

function showScore(){
    resetQuestion();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function  handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

})

startQuiz();
