    //Global Variables
  var 
    monkeyImg,groundImg,bananaImg,bananaGroup,stoneImg,
  bananaGroup,stoneGroup,ground,ground1,monkey,stone,banana,survival,gameState,PLAY,END,bg,bgImg,monkey_1;


  function preload(){
                
    bgImg=loadImage("jungle.jpg");
  monkeyImg=loadAnimation  ("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");


    bananaImg=loadImage("banana.png");

    stoneImg=loadImage("stone.png");
  
  
  
}


  function setup() {
    createCanvas(400,400);
    
    
  
    survival=0;
 
    bg = createSprite(0,0,400,400);
    bg.addImage("jungle",bgImg);  
    
    monkey = createSprite(40,300,10,10);
    monkey.addAnimation("monkey1",monkeyImg);
    monkey.scale = 0.9;

    ground1 = createSprite(0, 390,2000, 10);
    
    ground = createSprite(400, 390,400,10);
    bg.x = bg.width /2;
  
    bananaGroup = new Group();
    stoneGroup = new Group();
  
    PLAY=1;
    END=0;
    
    gameState=PLAY;
}


function draw(){
   background(255);
 stroke("black");
  fill("white");
  textFont("Courier");
  textSize(23);

    if (bg.x < 0){
      bg.x = bg.width/2;
    }
 

  
  
  monkey.setCollider("rectangle",40,50,260,500);
  monkey.debug=true;
 
  
  if (stoneGroup.isTouching(monkey)){
    monkey.scale=0.2;
    gameState=END
  }
  
  if (bananaGroup.isTouching(monkey)){
   banana.visible=false; 
  }
  
  if(gameState === PLAY){
    
  if (bg.x < 0){
      bg.x =bg.width/2;
  }
  if (keyDown("space") && (monkey.y >= 320.95)) {
      monkey.velocityY = -13;
  }
  monkey.velocityY = monkey.velocityY+0.7;
    bg.velocityX=-2;
  ground.visible = false;


  
  spawnbanana();
  spawnstone();
    
  
    switch(survival){
    case 1: monkey.scale=0.13;
      break;
    case 2: monkey.scale=0.15;
      break;
    case 3:monkey.scale=0.17;
      break;
      case 4: monkey.scale=0.20;
      break;
      default: break;
  }
  }
    
  else if(gameState === END) {
    

    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
   stoneGroup.setVelocityXEach(0);
    
       

    bananaGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
    
  
  }
  monkey.collide(ground1); 
  drawSprites();
  
  
    survival=Math.ceil(frameCount/30);
  text("Survival Time:"+ survival, 150, 50);
      
  
}

function spawnbanana(){
  if (frameCount % 75 ===0) {
    
        banana = createSprite(200, 250,10,10);
    banana.scale = 0.1;
    banana.addImage("banana1",bananaImg);
      banana.y = Math.round(random(100,270));
      banana.velocityX = -4;
      banana.lifetime = 300;
      banana.visible=true;
      bananaGroup.add(banana);

  }
  
}

function spawnstone(){

  if (frameCount % 300 === 0) {

   
    stone = createSprite(390, 350,10,10);
    stone.scale = 0.3;
    stone.addImage("stone1",stoneImg);
    stone.y = 390;
    stone.lifetime = 200;
    stone.velocityX = -5;
    stoneGroup.add(stone);
    stone.visible=true;
     
    stone.setCollider("circle",40,70,230);
    stone.debug=true;
    

   }
}