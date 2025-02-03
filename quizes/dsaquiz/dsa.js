const questions = [
    {
        question: "Which data structure follows the First In First Out (FIFO) principle?",
        answers: [
            { text: "Stack", correct: false },
            { text: "Queue", correct: true },
            { text: "Linked List", correct: false },
            { text: "Tree", correct: false},
        ]
    },
    {
        question: "What is the time complexity of searching for an element in an unsorted array?",
        answers: [
            { text: "0(1)", correct: false },
            { text: "0(n)", correct: true },
            { text: "0(log n)", correct: false },
            { text: "0(n log n)", correct: false },
        ]
    },
    {
        question: "Which sorting algorithm has the worst-case time complexity of O(n^2)?",
        answers: [
            { text: "Merge Sort", correct: false },
            { text: "Quick Sort", correct: false },
            { text: "Bubble Sort", correct: true  },
            { text: "Heap Sort", correct:false},
        ]
    },
    {
        question: "Which data structure is best suited for implementing recursion?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Array", correct: false },
            { text: "Linked List", correct: false },
        ]
    },
    {
        question: "What is the height of a balanced binary search tree with n nodes?",
        answers: [
            { text: "0(n)", correct: false },
            { text: "0(n)", correct: false },
            { text: "0(log n)", correct: true },
            { text: "0(n log n)", correct: false },
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
