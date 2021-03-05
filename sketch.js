var balloonImage1, database, height;
var backgroundImg, balloonImage2, balloonImage3;

function preload()
{
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonImage1 = loadAnimation("images/Hot Air Ballon-02.png");
  balloonImage2 = loadAnimation("images/Hot Air Ballon-02.png", "images/Hot Air Ballon-02.png",
  "images/Hot Air Ballon-03.png", "images/Hot Air Ballon-03.png",
  "images/Hot Air Ballon-04.png", "images/Hot Air Ballon-04.png");
  
}

function setup() {
  database = firebase.database();
  createCanvas(1500, 700);
  
  balloon = createSprite(250, 650, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

    var balloonHeight = database.ref('balloon/height');
    balloonHeight.on("value", readHeight, showError);
    textSize(20);

}

function draw() {
  background(backgroundImg);

  textSize(4);
  fill("grey");
  stroke("white");

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
}
else if(keyDown(RIGHT_ARROW)){
  balloon.x = balloon.x + 10;
}
else if(keyDown(UP_ARROW)){
  updateHeight(0, -10);
  balloon.addAnimation("hotAirBalloon", balloonImage2);
  balloon.scale = balloon.scale - 0.01;
}
else if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y + 10;
}
  drawSprites();
}

function updateHeight(x, y)
{
  database.ref('balloon/height').set({
    'x':height.x + x,
    'y':height.y + y
  })
}

function readHeight(data)
{
    height = data.val();

    balloon.x = height.x;
    balloon.y = height.y;
}

function showError()
{
    console.log("Error in writing to the database");
}