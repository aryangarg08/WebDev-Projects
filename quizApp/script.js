const quizData = [
    {
        question: 'How old is Aviral ? ',
        a:'15',
        b:'17',
        c:'19',
        d:'20',
        correct:'c'
    },{
        question: 'What is the most used programming language in 2019 ? ',
        a:'java',
        b:'C',
        c:'Python',
        d:'JavaScript',
        correct:'d' 
    }
    ,{
        question: 'Who is the Prime Minister of india ?',
        a:'Narendra Modi',
        b:'Rahul Gandhi',
        c:'Arvind Kejriwal',
        d:'None of the above',
        correct:'a' 
    }
    ,{
        question: 'What does HTML stands for ?',
        a:'Hypertext Markup Language',
        b:'Hyeperlanguage text mark lang',
        c:'Cascading style sheets',
        d:'Hyper mark language',
        correct:'a' 
    }
]

const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById('quiz');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submit = document.getElementById('submit');


const questionEl = document.getElementById('question');

let currentQuiz = 0;
let answer = undefined;
let score = 0;


loadQuiz();

function deselect(){
    
    answerEls.forEach((answerEl)=>{
        answerEl.checked = false;
    });
}

function getselected(){
    const answerEls = document.querySelectorAll(".answer");

    let answer = undefined;
    answerEls.forEach((answerEl)=>{
        if (answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;

}

function loadQuiz(){
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

}


submit.addEventListener('click' , ()=>{
    const answer = getselected();
    // console.log(answer)
    deselect();
    if(answer){
        if(answer === quizData[currentQuiz].correct)
            score++;
        currentQuiz++;
        if(currentQuiz < quizData.length)
            loadQuiz();
        else{
            quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions</h2> 
            <button onclick = "location.reload()">Refresh</button>`;
        }
    }
})

