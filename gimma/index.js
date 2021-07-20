//document.getElementById('gameScreen').width = window.innerWidth;
//document.getElementById('gameScreen').height = window.innerHeight/2;
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');
let img = document.getElementById("image");
let div = document.getElementById("scoreDiv");

//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight/2;
let gameWidth = canvas.width;
let gameHeight = canvas.height;
let percentageGW = (gameWidth/100);
let percentageGH = (gameHeight/100);

let interval;
let spf = 1000 / 60;
let tempoNI = 3;
let tempo = 3;
let score = 0;
let scoreInt = 0;

let maxHole = percentageGW * 30;
let minHole = percentageGH * 25;
let maxTile = percentageGH * 60;
let minTile = percentageGH * 30;

let startS = false;
let endS = false;

let startB = false;

let jump = false;
let jumping = false;
let fall = false;
let jumpHeight = percentageGH * 20;

//let stay;
let falling = false;

let totalWidth = 0;

let saveDiv = false;
function closeSaveDiv() {
    div.style.display = 'none';
    saveDiv = false;
}

class Player {
    constructor() {
        this.width = percentageGH * 20;
        this.height = this.width;
        this.pos = {
            x: percentageGH * 30,
            y: percentageGH * 60,
        }
        this.y = 0;
    }
    update(){
        if (jump) this.jump();
        if (fall) this.fall();
        if (falling) this.falling();
    }
    draw() {
        //ctx.fillStyle = "#FF0000";
        //ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.drawImage(img, this.pos.x, this.pos.y, this.width, this.height);
    }
    clear() {
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    jump() {
        if (this.pos.y > jumpHeight) {
            if (this.pos.y > 50) {
                this.pos.y -= 6;
            }
            else if (this.pos.y > 42) {
                this.pos.y -= 4;
            }
            else if (this.pos.y > 36) {
                this.pos.y -= 2;
            }
            else {
                this.pos.y --;
            }
        }
        else if (this.pos.y <= jumpHeight) {
            jump = false;
            fall = true;
        }
        //console.log(this.pos.y, jumpHeight, scoreInt);
    }
    fall() {
        //this.pos.y += 1;
        if (this.pos.y <= 84) {
            if (this.pos.y >= 48) {
                this.pos.y += 6;
            }
            else if (this.pos.y >= 40) this.pos.y += 4;
            else {
                this.pos.y ++;
            }
        }
        else {
            fall = false;
        }
        //console.log(this.pos.y, jumpHeight, scoreInt);
    }
    falling() {
        //this.pos.x -= tempo;
        this.pos.y += 3;
        //if (stay) this.pos.x -= tempo;
        //if (stay) console.log("stay = " + stay);
        if (player.pos.y > gameHeight) {
            clearInterval(interval);
            falling = false;
            endScreen();
        }
    }
}

class Tile {
    constructor(h) {
        this.hole = h;
        this.height = percentageGH * 20;
        this.pos = {
            y: gameHeight - this.height,
        }
    }
    set(r = false) {
        if (r) totalWidth -= this.width;
        this.pos.x = totalWidth;
        let x = parseInt(Math.floor(Math.random() * maxHole) + minHole);
        let y = parseInt(Math.floor(Math.random() * maxTile) + minTile);
        if (this.hole) {
            this.width = x;//parseInt((Math.floor(Math.random() * 28) + 20) * percentageGW);
            //console.log(this.width);
        }
        else {
            if (totalWidth == 0) this.width = gameWidth;
            else this.width = y;//parseInt((Math.floor(Math.random() * 30) + 20) * percentageGW);
        }
        totalWidth += this.width;
    }
    update() {
        this.pos.x -= tempo;
        if (this.pos.x + this.width <= 0) {
            this.set(true);
        }
        if (this.hole && this.pos.x < player.pos.x && this.pos.x + this.width > player.pos.x + player.width && !jump && !fall) {
            /*if (this.pos.x - this.width <= player.pos.x + player.width) stay = true;
            else stay = false;*/
            falling = true;
        }
    }
    draw() {
        if (!this.hole) {
            ctx.fillStyle = "rgb(129, 25, 183)";
            ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
            ctx.fillStyle = "rgb(165, 50, 232)";
            ctx.fillRect(this.pos.x, this.pos.y, this.width, 3 * percentageGH);
            //console.log("tile" + this.width, this.pos.x);
        }
        else {
            ctx.fillStyle = "none";
            ctx.fillRect(this.pos.x, this.pos.y, this.width, 0);
            //console.log(this.width);
        }

    }
    clear() {
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

function setGame() {
    //startT.width = gameWidth;
    //startT.pos.x = 0;
    //totalWidth += startT.width;
    t0.set();
    h0.set();
    t1.set();
    h1.set();
    t2.set();
    h2.set();
    t3.set();
    h3.set();
    t4.set();
    h4.set();
}

function clearGame() {
    
    t0.clear();
    h0.clear();
    t1.clear();
    h1.clear();
    t2.clear();
    h2.clear();
    t3.clear();
    h3.clear();
    t4.clear();
    h4.clear();
    player.clear();
}
function updateGame() {
    score += tempo/50;
    scoreInt = parseInt(score);
    let intCheck = parseInt(score + 1)/20;
    if (Number.isInteger(intCheck)) tempoNI *= 1.005;
    tempo = Math.round( tempoNI * 10 ) / 10;
    //console.log(tempoNI);
    //console.log(scoreInt);
    
    //SCORE
    ctx.fillStyle = "rgb(75, 10, 110)";
    ctx.fillRect( 0, 0, 100, 25);
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(scoreInt, 10, 20);

    t0.update();
    h0.update();
    t1.update();
    h1.update();
    t2.update();
    h2.update();
    t3.update();
    h3.update();
    t4.update();
    h4.update();
    player.update();
}
function drawGame() {
    h0.draw();
    h1.draw();
    h2.draw();
    h3.draw();
    h4.draw();
    player.draw();
    t0.draw();
    t1.draw();
    t2.draw();
    t3.draw();
    t4.draw();
}

document.body.onkeydown = function(e){
    if (e.keyCode == 32 || e.keyCode == 1){
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
        if (!jump && !fall && !falling) jump = true;
        if (startS) {
            startS = false;
            score = 0;
            ctx.fillStyle = "rgb(75, 10, 110)";
            ctx.fillRect( 0, 30, gameWidth, 25);
            interval = setInterval (gameLoop, spf);
        }
        if (endS && !saveDiv) {
            endS = false;
            score = 0;
            tempoNI = 3;
            totalWidth = 0;
            ctx.fillStyle = "rgb(75, 10, 110)";
            ctx.fillRect( 0, 30, gameWidth, 25);
            clearGame();
            setGame();
            drawGame();
            interval = setInterval (gameLoop, spf);
        }
    }
}
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27 && saveDiv) {
        closeSaveDiv();
    }
};
document.body.addEventListener('touchstart', function(e) {
    if (!jump && !fall && !falling) jump = true;
        if (startS) {
            startS = false;
            score = 0;
            ctx.fillStyle = "rgb(75, 10, 110)";
            ctx.fillRect( 0, 30, gameWidth, 25);
            interval = setInterval (gameLoop, spf);
        }
        if (endS) {
            endS = false;
            score = 0;
            tempoNI = 3;
            totalWidth = 0;
            ctx.fillStyle = "rgb(75, 10, 110)";
            ctx.fillRect( 0, 30, gameWidth, 25);
            clearGame();
            setGame();
            drawGame();
            interval = setInterval (gameLoop, spf);
        }
 }, false);

function gameLoop() {
    clearGame();
    updateGame();
    drawGame();
}
function startScreen() {
    startS = true;
    setGame(); 
    drawGame();
    ctx.font = "20px Arial";
    ctx.fillText("PRESS SPACE TO START", 27, 50);
}
// Function to create the cookie 
function createCookie(name, value, days) { 
    var expires; 
      
    if (days) { 
        var date = new Date(); 
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
        expires = "; expires=" + date.toGMTString(); 
    } 
    else { 
        expires = ""; 
    } 
      
    document.cookie = escape(name) + "=" +  
        escape(value) + expires + "; path=/"; 
} 
function endScreen() {
    saveDiv = true;
    createCookie("score", scoreInt, 2);
    //document.getElementById('scoreInput').value = "101010";
    //document.forms['formId']['scoreInput'].value = "1234567";
    //document.getElementById("scoreInput").setAttribute(555555,9);
    div.style.display = 'block';
    endS = true;
    if (scoreInt == 69 || scoreInt == 420) {
        ctx.fillStyle = "rgb(75, 10, 110)";
        ctx.fillRect( 0, 0, 100, 25);
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.fillText(scoreInt + " <-- EPIC", 10, 20);
    }
    ctx.font = "20px Arial";
    ctx.fillText("PRESS SPACE TO START", 27, 50);
}

let player = new Player();

//let startT = new Tile(false);

let t0 = new Tile(false);
let h0 = new Tile(true);
let t1 = new Tile(false);
let h1 = new Tile(true);
let t2 = new Tile(false);
let h2 = new Tile(true);
let t3 = new Tile(false);
let h3 = new Tile(true);
let t4 = new Tile(false);
let h4 = new Tile(true);


//setInterval (gameLoop, spf);
startScreen();