let inputDir = {x: 0,y: 0};
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
const speed = 5;
let lastPrintTime = 0;
let score = 0;
let hiscoreval = 0;
let snakearr = [
    {x:13,y:15}
]

food = {x:6 , y:7}

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPrintTime)/1000 < 1/speed){
        return;
    }
    lastPrintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //If you bump into yourself.
    for (let i = 2; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //If snake bump into wall.
    if(snake[0].x>=18 || snake[0].x<=0){
        return true;
    }
    if(snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}

function gameEngine(){
    //Updating the snake array and food.
    if(isCollide(snakearr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir  = {x:0 , y:0};
        alert("Game over press any key to play again.");
        snakearr = [{x:13,y:15}];
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }   
    
    //If snake had eaten the food increment the score and regenerate the food.
    if(snakearr[0].y==food.y && snakearr[0].x==food.x){
        score = score + 1;
        scoreBox.innerHTML = "Score: "+ score;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "HighScore: "+hiscoreval;
        }
        foodSound.play();
        snakearr.unshift({x: snakearr[0].x+ inputDir.x , y: snakearr[0].y+ inputDir.y });
        let a = 1;
        let b = 17;  
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    
    //Moving the Snake
    
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i+1] = {...snakearr[i]};
    }
    
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;
    
    board.innerHTML = "";
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add('head'); 
        }
        else{
            snakeElement.classList.add('snake'); 
        }
        board.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food'); 
    board.appendChild(foodElement);
}

//main logic starts here.
musicSound.play();
window.requestAnimationFrame(main);
let hiscore = localStorage.getItem('hiscore');
if(hiscore===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    highscoreval = JSON.parse(hiscore)
    highScoreBox.innerHTML = "HighScore: " + hiscore;
}

window.addEventListener('keydown',e =>{

    inputDir = {x:0 , y:1}//Start game here.
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})

