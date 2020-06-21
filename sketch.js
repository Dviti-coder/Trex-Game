var trexCollided,trexRunning,trex;
var groundImg,ground,invisibleGround;
var cloudsGroup,cloudsImage
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score=0
var PLAY=1
var END=0
var gameState=PLAY
var gameOver,gameOverImg
var restart,restartImg
function preload(){
trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
 trexCollided=loadImage("trex_collided.png")
 groundImg=loadImage("ground2.png");
 cloudImage=loadImage('cloud.png');  
 obstacle1=loadImage('obstacle1.png');
 obstacle2=loadImage('obstacle2.png');  
 obstacle3=loadImage('obstacle3.png');
 obstacle4=loadImage('obstacle4.png');
 obstacle5=loadImage('obstacle5.png');
 obstacle6=loadImage('obstacle6.png');
 gameOverImg=loadImage('gameOver.png');
 restartImg=loadImage('restart.png'); 
}
function setup() {
  createCanvas(600, 200);
  ground=createSprite(300,180,600,20)
  ground.addImage("ground",groundImg)
  trex=createSprite(50,180,20,20)
  trex.addAnimation('running',trexRunning)
  trex.addAnimation('collided',trexCollided)
  trex.scale=0.5;
  invisibleGround=createSprite(300,190,600,10)
  invisibleGround.visible=false;
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
  gameOver=createSprite(300,50,10,10);
  gameOver.addImage('gameOver',gameOverImg)
  gameOver.scale=0.5; 
  gameOver.visible=false;
  restart=createSprite(300,100,10,10);
  restart.addImage('restart',restartImg)
  restart.scale=0.5; 
  restart.visible=false;
}

function draw() {            
  background('black');
  if(gameState===PLAY){
  score=score+Math.round(getFrameRate()/60)
 if(keyDown('space')&&trex.isTouching(ground)){
  trex.velocityY=-10;
 }
 trex.velocityY=trex.velocityY+0.5;
   if(ground.x<0){
  ground.x=ground.width/2
  }
  ground.velocityX=-6; 
  spawnObstacles();
  spawnClouds();
  if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }  
  }
  else if (gameState===END){
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX=0;
  trex.velocityY=0;
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  trex.changeAnimation("collided",trexCollided);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
    
  }
  text("Score: "+ score, 500, 50);
  
  
  trex.collide(invisibleGround)
  
  if(mousePressedOver(restart)) {
    reset();
 
  }
  
  
  drawSprites();
}

function spawnClouds() { 
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage('cloud',cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
    
  }
  
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6 
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage('obstacle',obstacle1)
        break;
      case 2:obstacle.addImage('obstacle',obstacle2)
        break;
      case 3:obstacle.addImage('obstacle',obstacle3)
        break;
      case 4:obstacle.addImage('obstacle',obstacle4)
        break;
      case 5:obstacle.addImage('obstacle',obstacle5)
        break;
      case 6:obstacle.addImage('obstacle',obstacle6)
        break;
        
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime =200 ;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trexRunning);
  
  score = 0;
  
}