// Game Constant
// initial direction of snake 
let inputDir = {
  x: 0,
  y: 0
};

let snakeArr = [{
  x: 13,
  y: 15
}]

food = {
  x: 6,
  y: 9
};


// const foodSound = new Audio('../music/food.mp3');
// const gameOversound = new Audio('../music/gameover.mp3');
// const moveSound = new Audio('../music/move.mp3');
// const musicSound = new Audio('../music/music.mp3');

const foodSound = new Audio('music/food.mp3');
const gameOversound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let speed = 5;
let lastPainttime = 0;
let score = 0;

// Game Function
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime - lastPainttime) / 1000 < 1/speed ){
    return;
  }
  lastPainttime = ctime;
  gameEngine();
  // console.log(ctime);
}
function isCollide(snake){
  // If you bump into yourself
  for(let i = 1; i < snakeArr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      return true;
    }
  }
  // If you bump into wall
  if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
  }
  return false;
}

function gameEngine(){
  // Updating the snake array and food
  if(isCollide(snakeArr)){  
    gameOversound.play();
    musicSound.pause();
    inputDir = {x:0 , y:0};
    alert('Game Over. Press Ok to play Again!');
    snakeArr = [{x: 13, y: 15}];
    musicSound.play();
    score = 0;
  }

  // if snake have eaten food , increment the score and regenerate the foood
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score += 1;
    if(score > hiscoreVal){
      hiscoreVal = score;
      localStorage.setItem("hiScore" , JSON.stringify(hiscoreVal));
      HighScoreBox.innerHTML = "High Score : " + hiscoreVal;
      
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()) , y: Math.round(a + (b-a)* Math.random())}

  }

  //Moving the Snake
  for(let i = snakeArr.length - 2; i >= 0; i--){
    snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // Display the snake and food

  //logic for snake
  board.innerHTML = "";
  snakeArr.forEach((elem,index) =>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = elem.y;
    snakeElement.style.gridColumnStart = elem.x;
    snakeElement.classList.add('snakeHead');
    board.appendChild(snakeElement);
  })

  // logic for food
  
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snakeFood');
    board.appendChild(foodElement);

}



// Logic Starts here
// musicSound.play();
let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
  hiscoreVal = 0;
  localStorage.setItem("hiScore", JSON.stringify(hiscoreVal))
}else{
  hiscoreVal = JSON.parse(hiScore);
  HighScoreBox.innerHTML = "High Score : " + hiScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  inputDir = {x: 0, y: 1} // Start the Game 
  moveSound.play();
  musicSound.play();

  switch(e.key){
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});