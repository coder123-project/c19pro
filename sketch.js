var backGround, backgroundImg;

var superHero, superHeroImg;
var villian;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var laserGroup;
var score;
var Text1;

function preload(){
  backgroundImg = loadImage("background.png");
  superHeroImg = loadImage("superhero.png");
  superVillianImg = loadImage("supervillian.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  youWonImg = loadImage("youWon.png");
}

function setup() {
  createCanvas(1000,600);
  backGround = createSprite(300,300);
  backGround.addImage("background", backgroundImg);
  
  backGround.x = backGround.width/2;
  
  superHero = createSprite(120,300);
  superHero.addImage("superhero", superHeroImg);
  superHero.scale = 0.2;
  superVillian = createSprite(900,300);
  superVillian.addImage("supervillian", superVillianImg);
  superVillian.scale = 0.5;
  laserGroup = createGroup();
  

  gameOver = createSprite(500,250);
  gameOver.addImage("gameover", gameOverImg);
  gameOver.scale = 0.4;

  restart = createSprite(500, 400);
  restart.addImage("restart", restartImg);
  restart.scale = 0.4;

  youWon = createSprite(500,300);
  youWon.addImage("youWin", youWonImg);
  

  score = 0;
}

function draw() {
 
 
  lasers();
 
   if (gameState === PLAY) {
    superHero.visible = true;
    superVillian.visible = true;
    gameOver.visible = false;
    restart.visible = false;
    youWon.visible = false;
    
    backGround.velocityX = -4;
    if (backGround.x < 0) {
      backGround.x = backGround.width/2;
    }

    
    if (keyDown(UP_ARROW)) {
      superHero.y=superHero.y-4;
    }
    if (keyDown(DOWN_ARROW)) {
      superHero.y=superHero.y+4;
    }
    if (keyDown(LEFT_ARROW)) {
      superHero.x = superHero.x -4;
    }
    if (keyDown(RIGHT_ARROW)) {
      superHero.x = superHero.x + 4;
    }
    superVillian.y = superHero.y;
    
    if (score === 10) {
      laser.velocityX = -200;
    }
    if (superHero.isTouching(superVillian)) {
      youWon.visible = true;
      backGround.velocityX = 0;
      laserGroup.destroyEach();
      laserGroup.setLifetimeEach(-1);
      laserGroup.setVelocityEach(0);
      superHero.visible = false;
      superVillian.visible = false;
    }
    if (laserGroup.isTouching(superHero)) {
      gameState = END;
    }
    if (laserGroup.x < 0) {
      score = score +1;
      
    }
    
  }
  
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    backGround.velocityX = 0;
    laserGroup.destroyEach();
    laserGroup.setLifetimeEach(-1);
    laserGroup.setVelocityEach(0);
    superHero.visible = false;
    superVillian.visible = false;
    superHero.x = 120;
    superHero.y = 300;
  }
  if(mousePressedOver(restart)) {
    gameState = PLAY;
    score = 0;
  }
  
  
 drawSprites();
 
}

function lasers() {
  if (frameCount % 60 === 0) {
    var laser = createSprite(890, superVillian.y, 120, 10);
    laser.velocityX = -9;
    laser.shapeColor = "red";
    laser.lifetime = 300;
    
    laserGroup.add(laser);

  }
  
}

function reset() {
  gamestate = PLAY;

}