var knife,knifeImage;
var play=1;
var end=0;
var gamestate,fruit1,fruit2,fruit3,fruit4,enemyImage;
var score;
var enemyGroup,fruitGroup;
var gameover,overSound,cutSound;

function preload(){
  knifeImage=loadImage("knife.png"); 
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  enemyImage=loadAnimation("alien1.png","alien2.png");
  gameover=loadImage("gameover.png");
  overSound=loadSound("gameover.wav");
  cutSound=loadSound("swoosh.wav");
}

function setup(){
  createCanvas(600,500);  
  
  knife=createSprite(40,200,20,20)
  knife.addImage(knifeImage);
  knife.scale=0.7;
  
  enemyGroup=new Group();
  fruitGroup=new Group();
  score=0;
  gamestate=play;
}

function draw(){
  background("lightblue");
  textSize(20);
  fill("white");
  text("Score: "+score,500,20);
  
  if(gamestate===play){
  knife.y=mouseY;
  knife.x=mouseX;
  }
  fruits();
  Enemy();
  
  if(knife.isTouching(fruitGroup)){
    score=score+1;
    fruitGroup.destroyEach();
    cutSound.play();
  }
  
  if(knife.isTouching(enemyGroup)){
    gamestate=end;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    knife.addImage(gameover);
    knife.x=300;
    knife.y=250;
    knife.scale=2;
    overSound.play();
  }
  drawSprites();
}

function fruits(){
  if(frameCount%80===0){
  fruit=createSprite(650,Math.round(random(50,450)),20,20);
  knife.depth=fruit.depth+1;
  fruit.scale=0.2;
  fruit.depth=1;
    random1=Math.round(random(1,2));
    if(random1===1){
      fruit.x=650;
      fruit.velocityX=-7-score/2;
      
    }else{
      fruit.x=-10;
      fruit.velocityX=7+score/2;
    }
    
  r=Math.round(random(1,4));
  switch(r){
    case 1:fruit.addImage(fruit1);
            break;
    case 2:fruit.addImage(fruit2);
            break;
    case 3:fruit.addImage(fruit3);
            break;
    case 4:fruit.addImage(fruit4);
            break;
            default:break;
    
  }
      fruit.lifetime=100;
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(frameCount%100===0){
    enemy=createSprite(650,Math.round(random(50,450)),20,20);
    enemy.lifetime=100;
    enemy.addAnimation("R",enemyImage)
    enemy.velocityX=-7*score/2;
    enemyGroup.add(enemy);
  }
}
