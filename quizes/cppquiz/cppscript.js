const questions = [
    {
        question: "Which keyword is used to declare a variable in C++?",
        answers: [
            { text: "int", correct: true },
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: false },
        ]
    },
    {
        question: "Which symbol is used for single-line comments in C++?",
        answers: [
            { text: "//", correct: true },
            { text: "/* */", correct: false },
            { text: "#", correct: false },
            { text: "--", correct: false },
        ]
    },
    {
        question: "How do you print 'Hello World' in C++?",
        answers: [
            { text: "cout << 'Hello World';", correct: true },
            { text: "print('Hello World');", correct: false },
            { text: "echo 'Hello World';", correct: false },
            { text: "Console.WriteLine('Hello World');", correct: false },
        ]
    },
    {
        question: "What is the default return type of the main() function in C++?",
        answers: [
            { text: "int", correct: true },
            { text: "void", correct: false },
            { text: "string", correct: false },
            { text: "float", correct: false },
        ]
    },
    {
        question: "Which function is used to read input from the user in C++?",
        answers: [
            { text: "cin >>", correct: true },
            { text: "scanf()", correct: false },
            { text: "input()", correct: false },
            { text: "gets()", correct: false },
        ]
    }
];


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
