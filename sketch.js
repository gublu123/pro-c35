var balloon1, database, height;
var backgroundImg, balloon2, balloon3;

function preload()
{
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloon1 = loadImage("Hot Air Ballon-02.png");
  balloon2 = loadImage("Hot Air Ballon-03.png");
  balloon3 = loadImage("Hot Air Ballon-04.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  balloon = createSprite(400, 200, 50, 50);
  balloon1.addImage(balloon, "Hot Air Ballon-02.png");
  balloon2.addImage(balloon, "Hot Air Ballon-03.png");
  balloon3.addImage(balloon, "Hot Air Ballon-04.png");

    var balloonPosition = database.ref('balloon/height');
    balloonPosition.on("value", readHeight, showError);
}

function draw() {
  background(backgroundImg); 

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