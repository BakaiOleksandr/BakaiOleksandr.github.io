let game = null;
/////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////

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
                 // Show balloons at specific scores
                if ([30, 50, 70].includes(this.score)) {
                this.callBallons();
                }

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
                this.currentIndex = 0; // начинаем с начала
                this.shuffleWords(); // перемешиваем
                this.showWord();
            }
        }
        //Create ballons method
        callBallons(duration =2100){
        // Удаляем старый контейнер, если он есть    
        let oldContainer = document.getElementById("balloon-container");
            if (oldContainer) oldContainer.remove();
        // Create new ballons container
        const balloonContainer = document.createElement("div");
        balloonContainer.id = "balloon-container";
        document.body.appendChild(balloonContainer);
        // Styles of ballonsContainer
        Object.assign(balloonContainer.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        display: "flex",
        flexWrap: "wrap",
        overflow: "hidden",
        zIndex: 9999
        });

        function random(num) {
        return Math.floor(Math.random() * num);
        }

        function getRandomStyles() {
        let r = random(255);
        let g = random(255);
        let b = random(255);
        let mt = random(200);
        let ml = random(50);
        let dur = duration/1000;
        return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7); 
        box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite
        `;
        }

        function createBalloons(num) {
        for (let i = num; i > 0; i--) {
        let balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.append(balloon);
        }
        }

        createBalloons(20);
        // Удаляем контейнер через 2.1 сек
        setTimeout(() => {
        balloonContainer.remove();
        }, duration);

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
             this.callBallons(10000);
             
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
