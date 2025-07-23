let game = null;
class Game{
    constructor(FromLanguage,ToLanguage){
        this.FromLanguage = FromLanguage;//array
        this.ToLanguage = ToLanguage;//array
        
        this.currentIndex = 0;//current index of array
        this.score = 0;
        this.timeLeft = 600;// set 5minutes for timer

        //get html elements
        
        this.startBtn = document.getElementById('start-button');
        this.wordToTranslate = document.getElementById("word");
        this.inputElement = document.getElementById("user-input");
        this.submitBtn = document.getElementById('submit-btn');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById("timer");
        this.finalScoreEl = document.getElementById("final-score");
        this.restartBtn = document.getElementById('restart-button');
        this.homeButton = document.getElementById('home-btn');
        this.showCorrectWord = document.getElementById('show-correct-word');
        this.gameOver = document.getElementById('game-over');
        //wrong answer collector
        this.wrongAnswers = [];
        //wrong answers screen
        this.wrongScreen = document.getElementById('wrong-screen');
        this.showWrongScreenBtn = document.getElementById('show-wrongscreen');
        this.goBackBtn = document.getElementById('back-to-endscreen');
        //for Enter button
        this.inputLocked=false;


        //get screens
        this.startScreen = document.getElementById("start-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.endScreen = document.getElementById("end-screen");

        //timer
        this.timerInterval = null;//variable to store interval of timer,means- not active timer

        //EVENTS
        this.startBtn.addEventListener('click', () => this.start());

        this.restartBtn.addEventListener('click',()=>window.location.reload());
        this.submitBtn.addEventListener('click',()=>this.checkAnswer());

        this.inputElement.addEventListener('keydown', (e) => {//submit with Enter key
        if (e.key === 'Enter'&& !this.inputLocked) {
        this.checkAnswer();
        }
        });
        this.homeButton.addEventListener('click',()=>window.location.reload());

        //wrongScreen   events
        this.showWrongScreenBtn.addEventListener('click',()=>{
            this.switchScreen(this.wrongScreen);
        });
        this.goBackBtn.addEventListener('click',()=>{
            this.switchScreen(this.endScreen);
        })
    }


        //Methods
        shuffleWords() {
           for (let i = this.FromLanguage.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [this.FromLanguage[i], this.FromLanguage[j]] = [this.FromLanguage[j], this.FromLanguage[i]];
           [this.ToLanguage[i], this.ToLanguage[j]] = [this.ToLanguage[j], this.ToLanguage[i]];
        }
    }
        start() {
            //set index,score,time,input
            this.currentIndex=0;
            // this.score=0;
            this.timeLeft=600;
            this.scoreElement.textContent='0';
            this.shuffleWords();
            this.inputElement.value='';//instead textContent, value for input element

            this.switchScreen(this.gameScreen);//when startbutton is on,show gameScreen
            this.showWord();
            this.startTimer();

        }

        //Start Methods

        //switch css style of screen to active, and others are not active
        switchScreen(activeScreen){
            const screensArray = [this.startScreen,this.gameScreen,this.endScreen,this.wrongScreen];//variable for screens array
            screensArray.forEach(screen=>{//go throw array, index of array is 'screen'
                screen.classList.remove('active');//css class active -remove
             })
             activeScreen.classList.add('active');//css class active-add to currentScreen
        }

        //show word to translate
        showWord(){
            this.wordToTranslate.textContent=this.FromLanguage[this.currentIndex];
            this.inputElement.value = '';//nothing inside input
            this.inputElement.focus();//set focus on the text field
        }
        //set format of time

        formatTime() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
        }

        //TIMER
        startTimer(){
            clearInterval(this.timerInterval);//if timer is already on, turn it off
            this.timerElement.textContent = this.formatTime(this.timeLeft);//300
            this.timerInterval = setInterval(()=>{
                this.timeLeft--;//300 -1
                this.timerElement.textContent = this.formatTime(this.timeLeft);//299
                if(this.timeLeft<=0){//if time is over - endGame
                    this.endGame();
                }
            },1000);
        }

        //check answer
        checkAnswer(){
            const errorSound = new Audio('sounds/error.mp3');//soundError
            errorSound.volume = 0.3;
            const correctSound = new Audio('sounds/correct.wav');//soundCorrect
            correctSound.volume = 0.7;
                        
            const userAnswer = this.inputElement.value.trim().toLowerCase();
            const correctAnswer = this.ToLanguage[this.currentIndex].toLowerCase();
             this.inputElement.classList.remove('input-wrong','input-correct');//delete old classes css style
            //add ++ to score
            if(userAnswer===correctAnswer){//correct answer
                this.score++;
                this.scoreElement.textContent=this.score;
                this.inputElement.classList.add('input-correct');//if answer is correct
                correctSound.currentTime = 0;
                correctSound.play();
                if(this.score===100){
                 
                  this.endGame(true);//if player won endGame true
                  return;
                }
            }else{
                // wrong answer
                this.wrongAnswers.push({word:this.FromLanguage[this.currentIndex],
                correct:this.ToLanguage[this.currentIndex]});
                errorSound.currentTime = 0;
                errorSound.play();
                
                this.inputElement.classList.add('input-wrong');//if answer is not correct
                this.showCorrectWord.textContent = `${this.wordToTranslate.textContent} = ${correctAnswer}`;
                this.submitBtn.disabled = true;
                this.inputLocked = true;//for blocking Enter
                setTimeout(()=>{
                  this.submitBtn.disabled = false;
                  this.inputLocked = false;
                },3000);

            }
            setTimeout(() => {
            this.inputElement.classList.remove('input-wrong', 'input-correct');
            this.showCorrectWord.textContent = '';
            }, 3000);
            
            //MOVE TO NEXT WORD 
            this.currentIndex++;
            //if index is less than index of English array- showWord
            //if player gets to end of array endGame
            if(this.currentIndex<this.FromLanguage.length){
                this.showWord();
            }else{
                this.endGame();
            }
        }

        //endGame
        endGame(isWin=false){
            const winSound = new Audio('sounds/win.wav');
            winSound.volume = 0.7;
            clearInterval(this.timerInterval);
            this.finalScoreEl.textContent=this.score;
             if (isWin || this.score === 100) {
             this.gameOver.textContent = 'You win!';
             winSound.play();
             } else if (this.score >= 70) {
             this.gameOver.textContent = 'Perfect!';
             } else if (this.score >= 50) {
             this.gameOver.textContent = 'Well done!';
             } else {
             this.gameOver.textContent = 'Not bad,try again';
             }
             
            this.showWrongAnswersArray();//creates array of WrongAnswers
            this.switchScreen(this.endScreen);
        }
        //method show wrong answers array on wrongScreen
        showWrongAnswersArray(){
        const wrongAnswersContainer=document.getElementById('wrong-answers');
            if(this.wrongAnswers.length===0){
                wrongAnswersContainer.innerHTML="";
             }else{
                let listOfWrongAnswers=this.wrongAnswers.map(function(item){
                    return `<li>${item.word}-${item.correct}</li>`;
                }).join('');
                wrongAnswersContainer.innerHTML="<h3>Your mistakes:</h3><ul>"+
                listOfWrongAnswers+"</ul>";
                
             }
        }
    }
    
window.onload = () => {

const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
    const fromLang = document.getElementById('from-language').value;
    const toLang = document.getElementById('to-language').value;

    if (fromLang === toLang) {//alert if the same language selected
      alert("Please select two different languages.");
      return;
    }

//     let fromYourLanguage, toSelectedLanguage;
// //if player choose languages
//     if (fromLang === "en" && toLang === "nl") {
//       fromYourLanguage = FromLanguage.slice();//make a copy of array
//       toSelectedLanguage = ToLanguage.slice();
//     } else if (fromLang === "nl" && toLang === "en") {
//       fromYourLanguage = ToLanguage.slice();
//       toSelectedLanguage = FromLanguage.slice();
//     }


    let fromWords = null;
    let toWords = null;

    // Простой if-else без Map
    if (fromLang === "en") fromWords = englishWords;
    if (fromLang === "nl") fromWords = dutchWords;
    if (fromLang === "ru") fromWords = russianWords;
    if (fromLang === "uk") fromWords = ukrainianWords;
    if (fromLang === "es") fromWords = spanishWords;
    if (fromLang === "fr") fromWords = frenchWords;

    if (toLang === "en") toWords = englishWords;
    if (toLang === "nl") toWords = dutchWords;
    if (toLang === "ru") toWords = russianWords;
    if (toLang === "uk") toWords = ukrainianWords;
    if (toLang === "es") toWords = spanishWords;
    if (toLang === "fr") toWords = frenchWords;

    if (!fromWords || !toWords || fromWords.length !== toWords.length) {
      alert("Word lists are missing or not matching.");
      return;
    }


    game = new Game(fromWords.slice(), toWords.slice());
    game.start();
  });
 
};
