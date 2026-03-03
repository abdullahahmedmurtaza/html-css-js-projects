const score = JSON.parse(localStorage.getItem('score')) || {wins:0,losses:0,ties:0};
const jsScoreElement = document.querySelector('.js-score');
const jsResultElement = document.querySelector('.js-result');
const jsMovesElement = document.querySelector('.js-moves');
updateScoreElement();
function playGame(userChoice){  
    const computerChoice = checkComputerMove();
    let result = '';

    if(userChoice === 'Rock'){
        if(computerChoice === 'Rock'){
        result = 'Tie.';
    }else if(computerChoice === 'Paper'){
        result = 'You Lose.';
    }else {
        result = 'You Win.';
    }
    }else if(userChoice === 'Paper'){
    if(computerChoice === 'Rock'){
        result = 'You Win.';
    }else if(computerChoice === 'Paper'){
        result = 'Tie.';
    }else {
        result = 'You Lose.';
    }
    }else if(userChoice === 'Scissors'){
        if(computerChoice === 'Rock'){
        result = 'You Lose.';
    }else if(computerChoice === 'Paper'){
        result = 'You Win.';
    }else {
        result = 'Tie.';
    }
    }
    if(result === 'You Win.'){
        score.wins += 1;
    }else if(result === 'You Lose.'){
        score.losses += 1
    }else if(result === 'Tie.'){
        score.ties += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));
    jsResultElement.innerText = `${result}`;
    jsMovesElement.innerHTML = `
    <div class="result-moves">
        <div class = "move-box">
    <img src="images/${userChoice}-emoji.png" alt="rock-emoji" class="move-icon">
        You
        </div>
        <div class="move-box">
    <img src="images/${computerChoice}-emoji.png" alt="rock-emoji" class="move-icon">
    Computer
    </div>
    </div>`;
    updateScoreElement();

    // alert(`You
    // <img src="/images/rock-emoji.png" alt="rock-emoji" class="move-icon">
    // <img src="/images/scissors-emoji.png" alt="rock-emoji" class="move-icon">
    // Computer`);

    }

function updateScoreElement(){
    jsScoreElement.innerText = `Wins : ${score.wins} Losses : ${score.losses} Ties : ${score.ties}`;
    }

function checkComputerMove(){
    const randomNumber = Math.random();
    let computerChoice = '';
    if(randomNumber>=0 && randomNumber<1/3){
        computerChoice = 'Rock';
    }else if(randomNumber>=1/3 && randomNumber<2/3){
        computerChoice = 'Paper';
    }else{
        computerChoice = 'Scissors';
    }
    return computerChoice;
    }

    function changeTheme(){
        const changeThemeElement = document.querySelector('.js-change-theme');
        const bodyElement = document.querySelector('body');
        const resetButtonElement = document.querySelector('.js-reset-button');
        const moveButtonElements = document.querySelectorAll('.js-move-button');
        const resultTextElement = document.querySelector('.js-result');
        const themeImageSunElement = document.querySelector('.js-theme-change-icon-sun');
        if(changeThemeElement.innerHTML === `<img src="images/sun-solid.png" alt="sun-solid" class="js-theme-change-icon-sun theme-change-icon-sun">`){
                
        // console.log(moveButtonElements);
        
        for(const element of moveButtonElements){
            element.classList.add('move-button-light');
        }
            
        bodyElement.classList.add('light-mode');
        resetButtonElement.classList.add('reset-light-mode');
        resultTextElement.classList.add('result-light');

        themeImageSunElement.classList.replace('theme-change-icon-sun','theme-change-icon-moon'); 
        changeThemeElement.classList.replace('change-theme-button-sun','change-theme-button-moon'); 
        changeThemeElement.innerHTML = `<img src="images/moon-solid.png" alt="moon-solid" class="js-theme-change-icon-moon theme-change-icon-moon">`;
        
        }else{
            const themeImageMoonElement = document.querySelector('.js-theme-change-icon-moon');
            for(const element of moveButtonElements){
            element.classList.remove('move-button-light');
        }
        
        bodyElement.classList.remove('light-mode');
        resetButtonElement.classList.remove('reset-light-mode');
        resultTextElement.classList.remove('result-light');
        // console.log(themeImageMoonElement);
        
        themeImageMoonElement.classList.replace('theme-change-icon-moon','theme-change-icon-sun'); 
        changeThemeElement.classList.replace('change-theme-button-moon','change-theme-button-sun'); 
        changeThemeElement.innerHTML = `<img src="images/sun-solid.png" alt="sun-solid" class="js-theme-change-icon-sun theme-change-icon-sun">`;
        }

        
    }

  
        