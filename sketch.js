var house , houseImg;
var car,carImg
var candy ,candyImg, obstacle, obstacleImg;
var candyGroup, obstacleGroup; 

var score = 0;

function preload(){
  house = loadImage("haunted-house.jpeg");  
  carImg = loadImage("car.png");  
  candyImg = loadImage("candy.png");
  obstacleImg = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(800,400);
  
  house = createSprite(0,0,800,400);
  house.addImage(houseImg);
  house.scale = 0.5;
  house.x=400;
  house.velocityX=-3.5; 
  
  car = createSprite(120,340,20,50);
  car.addImg(carImg);
  car.scale = 0.1;
  car.setCollider("rectangle",0,0,car.width,car.height);
  car.debug = false;
  
  ground = createSprite(400,340,800,10);
  ground.velocityX=-4;
  ground.x =400;
  ground.visible=false;
  
  candyGroup = new Group();
  obstacleGroup = new Group();
}

function draw() { 
  background(220);
 
  
  if(ground.x < 0){
    ground.x = ground.width/2
  }
  if(house.x<100){
    house.x=400;
  }

  if(candyGroup.isTouching(car)){
    candyGroup.destroyEach();
    score = score+1;
  }

  if(keyDown("space")){
    car.velocityY = -12;     
  }
  car.collide(ground);
  car.velocityY = car.velocityY+0.8;
   
   candy();
   spawnObstacle();
  
  if(obstacleGroup.isTouching(car)){
    car.velocityX = 0
  }

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: ", score,500,50);
  
}

function candy(){
  if(frameCount%80 === 0){
    var candy = createSprite(500,5,40,10);
    candy.y = Math.round(random(120,200));
    candy.addImage(candyImg);
    candy.scale = 0.05;
    candy.velocityX = -10;
    candy.lifetime = 200;
    
    candyGroup.add(candy);
    
  }
}

function spawnObstacle(){
  if(frameCount% 300 === 0){
    var obstacle = createSprite(500,315,40,10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -10;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);

  }
}