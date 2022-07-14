var logo, logoImage, title, titleImage;
var bk1Image;
var gameOver, gameOverImage
var s1, s2, s3, s4, swImage; //windows
var g1, g2, g3, g1Image, g2Image, g3Image, r, rImage, shot; //guns and retical and gunshot
var civ1, civ1Image, civ2Image, e1, e1Image, e2Image, h1, h1Image, h2Image, hkiller, hkillerImage; // civ=civilians, e=enemy, h=hostages, hkiller=hostage killer/holder
var civiliang, enemyg, hostageg, hostagekillerg, windowsg; //groups
var score = 0;
var killCount = 0, enemyCount = 0;

var l1winpos

function preload() {
  logoImage = loadImage("Images/TheRavenousWolfLogo.png");
  titleImage = loadImage("Images/HystericalHeatersTitle.png");
  bk1Image = loadImage("Images/PopArtBlueGrungeBrickWall.jpg");
  swImage = loadImage("Images/SingularWindow.png")
  g1Image = loadImage("Images/Pistol (2).png")
  shot = loadSound("Sounds/GunShot.mp3")
  rImage = loadImage("Images/Retical.png")
  civ1Image = loadImage("Images/Civ1.png")
  civ2Image = loadImage("Images/Civ2.png")
  e1Image = loadImage("Images/Enemy1.png")
  e2Image = loadImage("Images/Enemy2.png")
  h1Image = loadImage("Images/Hostage1.png")
  h2Image = loadImage("Images/Hostage2.png")
  hkillerImage = loadImage("Images/HostageKiller.png")
  gameOverImage = loadImage("Images/GameOverPopArt.jpg")

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // w4= createSprite(width/2,height/2)
  //w4.addImage(windowsImg)
  // w4.scale = 1.7;
  frameRate(30)

  civiliang = new Group()
  enemyg = new Group()
  hostageg = new Group()
  hostagekillerg = new Group()
  windowsg = new Group()

  logo = createSprite(55, 55)
  logo.addImage(logoImage)
  logo.scale = 0.20;

  title = createSprite(width / 2, height - 50)
  title.addImage(titleImage)
  title.scale = 1.2;
 

  g1 = createSprite(width / 2, height - 130)
  g1.addImage(g1Image)
  g1.scale = 1.5;

  spot = createSprite(World.mouseX, World.mouseY)
  spot.addImage(rImage)
  spot.scale = 0.25;

  s1 = createSprite(190, height / 2)
  s1.addImage(swImage)
  s1.scale = 0.75;
  s1.depth = g1.depth
  s1.depth = spot.depth
  windowsg.add(s1)

  s2 = createSprite(width / 2 - 200, height / 2)
  s2.addImage(swImage)
  s2.scale = 0.75;
  s2.depth = spot.depth
  windowsg.add(s2)

  s3 = createSprite(width / 2 + 185, height / 2)
  s3.addImage(swImage)
  s3.scale = 0.75;
  s3.depth = g1.depth
  s3.depth = spot.depth
  windowsg.add(s3)

  s4 = createSprite(width - 210, height / 2)
  s4.addImage(swImage)
  s4.scale = 0.75;
  s4.depth = g1.depth
  s4.depth = spot.depth
  windowsg.add(s4)

  g1.depth = g1.depth + 2
  spot.depth = spot.depth + 1


  l1winpos = [{ x: 190, y: height / 2 }, { x: width / 2 - 200, y: height / 2 }, { x: width / 2 + 185, y: height / 2 }, { x: width - 210, y: height / 2 }]

  /*
  civ1 = createSprite(192,height/2+8)
  civ1.addImage(civ1Image)
  civ1.scale = 0.82;
  civ1.depth = g1.depth
  */
  //g1.depth = g1.depth + 1


}

function draw() {

 // console.log(frameCount)
  background(180);
  image(bk1Image, 0, 0, width, height)


  g1.x = mouseX

  spot.x = mouseX;
  spot.y = mouseY;



  var r = Math.round(random(1, 3))
  if (r === 1) {
    spawncivilians()
  } else if (r == 2) {
    spawnenemys()
  }
  else {
    spothostage()
  }

  if (enemyCount - killCount>5) {
    console.log("Game Over")
    image(gameOverImage, 0, 0, width, height)
    windowsg.destroyEach()
    civiliang.destroyEach()
    enemyg.destroyEach()
    hostageg.destroyEach()
    hostagekillerg.destroyEach()
    g1.destroy()
    spot.destroy()

  }

  drawSprites();

  textSize(25);
  fill("black")
  stroke("white")
  strokeWeight(2)
  text("Score: " + score, width - 200, 50)


}

function spawncivilians() {

  if (frameCount % 230 === 0) {
    var pos = random(l1winpos)
    civ1 = createSprite(pos.x, pos.y)
    var rand = Math.round(random(1, 2))
    switch (rand) {
      case 1: civ1.addImage(civ1Image);
        civ1.scale = 0.87;
        break;
      case 2: civ1.addImage(civ2Image);
        civ1.scale = 1.05;
        break;
      default: break;
    }

    civ1.lifetime = 100

    civ1.depth = g1.depth
    g1.depth = g1.depth + 1
    spot.depth = spot.depth + 1

    civiliang.add(civ1)
  }

}

function spawnenemys() {

  if (frameCount % 120 === 0) {
    var pos = random(l1winpos)
    e1 = createSprite(pos.x, pos.y)
    var rand = Math.round(random(1, 2))
    switch (rand) {
      case 1: e1.addImage(e1Image);
        e1.scale = 0.9;
        break;
      case 2: e1.addImage(e2Image);
        e1.scale = 0.9;
        break;
      default: break;
    }
    e1.lifetime = 150

    e1.depth = g1.depth
    g1.depth = g1.depth + 1
    spot.depth = spot.depth + 1

    enemyg.add(e1)
    enemyCount++
  }

}


function spothostage() {

  if (frameCount % 300 === 0) {
    var pos = random(l1winpos)
    h1 = createSprite(pos.x + 35, pos.y + 6)
    hkiller = createSprite(pos.x - 49, pos.y - 20)
    hkiller.addImage(hkillerImage);
    hkiller.scale = 0.5;
    var rand = Math.round(random(1, 2))
    switch (rand) {
      case 1: h1.addImage(h1Image);
        h1.scale = 0.96;
        break;
      case 2: h1.addImage(h2Image);
        h1.scale = 0.91;
        break;
      default: break;
    }

    h1.lifetime = 300
    hkiller.lifetime = 300

    h1.depth = g1.depth
    hkiller.depth = g1.depth
    g1.depth = g1.depth + 1
    spot.depth = spot.depth + 1

    hostageg.add(h1)
    hostagekillerg.add(hkiller)

    enemyCount++
  }

}

function mouseClicked() {

  shot.play()
  shot.setVolume(0.8)

  if (enemyg.isTouching(spot)) {
    score = score + 100
    enemyg.destroyEach()
    killCount++
  }

  if (hostagekillerg.isTouching(spot)) {
    score = score + 100
    hostagekillerg.destroyEach()
    hostageg.destroyEach()
    killCount++
  }

  if (civiliang.isTouching(spot)) {
    score = score - 150
    civiliang.destroyEach()
  }

  if (hostageg.isTouching(spot)) {
    score = score - 150
    hostageg.destroyEach()
    hostagekillerg.destroyEach()
  }



}