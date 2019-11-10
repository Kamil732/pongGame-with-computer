const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
      
canvas.width = 1400;
canvas.height = 700;
      
const cw = canvas.width;
const ch = canvas.height;
      
const ballSize = 20; // Wielkosc pilki.
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;
      
const paddelHeight = 100;
const paddleWidth = 20;
      
const playerX = 70;
const aiX = 1330;
      
let playerY = 200;
let aiY = 200;
      
const lineWidth = 6;
const lineHeight = 16;
      
let ballSpeedX = 2;
let ballSpeedY = 2;
      
function player() {
   ctx.fillStyle = "#7FFF00";
   ctx.fillRect(playerX, playerY, paddleWidth, paddelHeight);
   
   // ODBIJANIE PILECZKI OD PALETKI
   if(ballX <= playerX + paddleWidth && ballY <= playerY + paddelHeight && ballY >= playerY) {
         ballSpeedX = -ballSpeedX;
         speedUp();
   }
}
      
function AI() {
   ctx.fillStyle = "red";
    ctx.fillRect(aiX, aiY, paddleWidth, paddelHeight);
         
   // ODBIJANIE PILECZKI OD PALETKI
   if(ballX >= aiX - ballSize && ballY <= aiY + paddelHeight && ballY >= aiY) {
        ballSpeedX = -ballSpeedX;
   }
}
function ball() {
   ctx.fillStyle = "white";
   ctx.fillRect(ballX, ballY, ballSize, ballSize);
         
   ballX += ballSpeedX;
   ballY += ballSpeedY;
         
   if(ballY <= 0 || ballY + ballSize >= ch) ballSpeedY = -ballSpeedY;
      if(ballX <= -ballSize || ballX + ballSize >= cw) {
      ballX = cw / 2 - ballSize / 2;
      ballY = ch / 2 - ballSize / 2;
             
      ballSpeedX = 2;
      ballSpeedY = 1;
            
       ballSpeedX  = -ballSpeedX;
   }
}

function table() {
   // STÓŁ
   ctx.fillStyle = "black";
   ctx.fillRect(0, 0, cw, ch);
   // LINIE NA ŚRODKU
   for(let linePosition=20; linePosition<ch; linePosition+=30) {
      ctx.fillStyle = "gray";
      ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight);
   }
         
   topCanvas = canvas.offsetTop;
   //console.log(topCanvas); 
}
      
function playerPosition(Event) {
   //console.log("pozycja myszy to: " + (e.clientY - topCanvas));
   playerY = Event.clientY - topCanvas - paddelHeight / 2;
   
   if(playerY >= ch - paddelHeight) playerY = ch - paddelHeight;
   
   if(playerY <= 0) playerY = 0;
}
      
function speedUp(){
   // console.log(ballSpeedX + " , " + ballSpeedY);
   // predX
   if(ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += 1; 
   }
   else if(ballSpeedX < 0 && ballSpeedX < -16) {
       ballSpeedX -= 1;
   }
            
   // predY
   if(ballSpeedY  > 0 && ballSpeedY  < 16) {
      ballSpeedY  += 1;
   }
   else if(ballSpeedY  < 0 && ballSpeedY  < -16) {
      ballSpeedY -= 1;
   }
}
      
//////////SZTUCZNA INTELIGENCJA//////////
function aiPosision() {
   var middlePaddle = aiY + paddelHeight / 2; 
   var middleBall = ballY + ballSize / 2;
   
      if(ballX > 500)  {
         if(middlePaddle - middleBall > 200) aiY -= 15; //console.log("+200");
         else if(middlePaddle - middleBall > 50) aiY -= 15; //console.log("+50-200");
         else if(middlePaddle - middleBall < -200) aiY += 15; //console.log("<+200");
         else if(middlePaddle - middleBall < -50) aiY += 15; //console.log("-50- (-200)");
      }
      else if(ballX <= 500 && ballX > 150) {
         if(middlePaddle - middleBall > 100) aiY -= 5;
         else if(middlePaddle - middleBall < -100) aiY += 5;
      }
}
    
// DODAJE EVENT NA RUSZENIE MYSZKA I WYWOŁUJE FUNCKCJE playerPosition
canvas.addEventListener("mousemove", playerPosition);
      
function game() {
   table();
   ball();
   player();
   AI();
   aiPosision();
}
      
setInterval(game, 1000/1000);