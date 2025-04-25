const mainPage = document.getElementById('mainpage')
const quizPage = document.getElementById('quizpage')
const endPage = document.getElementById('endpage')
const btnMain = document.getElementById('btnmain')
const btnNext = document.getElementById('nextbtn')
const countPageEl = document.getElementById('countpage')
let scoreFinal = document.getElementById('scorefinal')
let maxScoreFinal = document.getElementById('maxscore')
let quizEl = document.getElementById('quiz')
let choice1 = document.getElementById('choice1')
let choice2 = document.getElementById('choice2')
let choice3 = document.getElementById('choice3')
let choice4 = document.getElementById('choice4')
let count = 1;
let countPage = 1;
let allQuiz = ''
let score = 0;
let maxScore=0;
let currentQuiz = ''
let check = true

window.onload=function(){
    maxScore = localStorage.getItem('maxscoreSave')
    maxScoreFinal.innerText=`คะแนนมากที่สุดของคุณเท่ากับ ${maxScore} คะแนน`
}

btnMain.addEventListener('click',function(){
    mainPage.style.display='none'
    quizPage.style.display='flex'
    mainQuiz();
})

btnNext.addEventListener('click',function(){
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if(!selectedOption){
        Swal.fire({
            icon: "error",
            title: `<h1 class="alert">โปรดเลือกคำตอบ</h1>`,
          });
    }
    else if(currentQuiz.choices[selectedOption.value-1] === currentQuiz.answer && check){
        score++
        check = false
        count++
        countPage++
            if(count<=10){
                mainQuiz()
            }
            else{
                endQuiz()
            }
        }
    else{
        count++
        countPage++
            if(count<=10){
                mainQuiz()
            }
            else{
                endQuiz()
            }
        }
    
})

function mainQuiz(){
    check = true
    countPageEl.innerHTML=`${countPage}/10`
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    fetch('quiz.json')
    .then(res => res.json())
    .then(json => {
        allQuiz = json;
        currentQuiz = allQuiz[randomNumber]
        quizEl.innerText = allQuiz[randomNumber].question;
        choice1.innerText= allQuiz[randomNumber].choices[0]
        choice2.innerText= allQuiz[randomNumber].choices[1]
        choice3.innerText= allQuiz[randomNumber].choices[2]
        choice4.innerText= allQuiz[randomNumber].choices[3]
        document.querySelectorAll('input[name="option"]').forEach(input => input.checked = false);
    })
    .catch(err => console.error('Error loading quiz:', err));
}

function endQuiz(){
    quizPage.style.display='none'
    endPage.style.display='flex'
    scoreFinal.innerText = `${score} คะแนน`
    if(score>maxScore){
        maxScore = score
        localStorage.setItem('maxscoreSave',maxScore)
    }
    maxScoreFinal.innerText=`คะแนนมากที่สุดของคุณเท่ากับ ${maxScore} คะแนน`
}

