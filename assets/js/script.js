
const startBtn = document.querySelector('.start-btn');
const ruleForm = document.querySelector('.form-container');
const quizBox = document.querySelector('.quiz-box')
const optionList = document.querySelector('.option-list');
const resultBox = document.querySelector('.result-box');
const restartBtn = document.getElementById('restart-btn');



startBtn.onclick = () => {
    ruleForm.classList.add('active');
    quizBox.classList.add('active');
    nextBtn.classList.add('active');
    nextBtn.classList.remove('active');  
    questionCount++;
    showQuestions(questionCount);
   
    showQuestions(0);
    questionCounter(1);
}

let questionCount = -1;
let questionNumb = 1; 
const nextBtn = document.querySelector('.next-btn');

    
nextBtn.onclick = () => {
    if (questionCount <questions.length  - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');      
    }
    else {

        showResultBox();
    }

   

}
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;   
        
    optionList.innerHTML = optionTag;
    
    const option = document.querySelectorAll('.option');
    for (let i=0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let selectedIndex = [...answer.parentElement.children].indexOf(answer); // Pega o índice da resposta selecionada
    let character = questions[questionCount].points[selectedIndex]; // Personagem associado à resposta
    let allOptions = optionList.children.length;


    // Atualiza os pontos do personagem
    if (characterPoints[character] !== undefined) {
        characterPoints[character]++;
    }

    // Exibe o estado atual (apenas para debug)
    console.log(characterPoints);

    // Outras ações, como marcar a opção como correta ou incorreta
    answer.classList.add('selected');
    nextBtn.classList.add('active');

    //if user has selected, disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
}


    nextBtn.classList.add('active');


function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total')
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}


function showResultBox() {
    // Determina o personagem com mais pontos
    let maxPoints = 0;
    let selectedCharacter = '';
    for (const character in characterPoints) {
        if (characterPoints[character] > maxPoints) {
            maxPoints = characterPoints[character];
            selectedCharacter = character;
        }
    }

    // Atualiza o conteúdo do resultado
    const resultTitle = document.querySelector('.result-title');
    const resultDescription = document.querySelector('.result-description');
    const resultImage = document.querySelector('.result-image');

    if (selectedCharacter) {
        resultTitle.textContent = characterDescriptions[selectedCharacter].title;
        resultDescription.textContent = characterDescriptions[selectedCharacter].description;
        resultImage.src = characterDescriptions[selectedCharacter].image;
    }

    // Exibe o resultado
    quizBox.classList.remove('active'); // Oculta o quiz
    resultBox.classList.add('active'); // Mostra o resultado
}

restartBtn.addEventListener('click', () => {

    questionCount = -1;
    questionNumb = 1;
    userScore = 0;
    // Redefine os pontos dos personagens
    for (let character in characterPoints) {
        characterPoints[character] = 0;
    }

    // Reinicia o índice da pergunta
    currentQuestion = 0;

    // Oculta a tela de resultado e mostra o quiz novamente
    resultBox.classList.remove('active');
    ruleForm.classList.remove('active');

    // Redefine as opções e mostra a primeira pergunta novamente
    showQuestions(0);
    questionCounter(1); 
});