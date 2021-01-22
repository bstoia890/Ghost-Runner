var PLAY = 1;
var END = 0;
var gameState = PLAY;
var tower
var towerI
var door
var doorI
var doorGroup
var climber
var climberI
var climberGroup
var ghost
var ghostI
var b
var bG
var spook
function preload(){
  towerI = loadImage("tower.png");
  doorI = loadImage("door.png");
  climberI = loadImage("climber.png");
  ghostI = loadImage("ghost-standing.png");
  spook = loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage(towerI);
  tower.velocityY = 1;
  doorGroup = new Group();
  climberGroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostI);
  ghost.scale = .3
  bG = new Group();
  ghost.debug = true;
climberGroup.debug = true;
  spook.loop();
}

function draw(){
  background("black");
  
    
  
  
  if (gameState === PLAY){
    if(tower.y>600){
    tower.y = 300;
    }
      if(bG.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
        gameState = END;
     }
     if (climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  if (keyDown("right")){
    ghost.x = ghost.x + 4;
  }
  if (keyDown("left")){
    ghost.x = ghost.x - 4;
  }
  if (keyWentDown("space")){
    ghost.velocityY = -10;

  }
    ghost.velocityY = ghost.velocityY + .5;
  spawnDoors();
    drawSprites();
    
  }
  else if (gameState === END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250)
    
  }
  
  

  
 
  
  
}
function spawnDoors(){
  if (frameCount%240 === 0){
     
  
  door = createSprite(Math.round(random(120,400)),-50);
    
  door.addImage(doorI);
  door.velocityY = 1;
    doorGroup.add(door);
    climber = createSprite(200,10);
    climber.addImage(climberI);
    climber.x = door.x;
    climber.velocityY = 1;
    climberGroup.add(climber);
    door.lifetime = 600;
    climber.lifetime = 600;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    b = createSprite(200,15);
    b.width = climber.width
    b.height = 2;
    b.x = door.x;
    b.velocityY = 1;
    b.debug = true;
    bG.add(b);
  }
}