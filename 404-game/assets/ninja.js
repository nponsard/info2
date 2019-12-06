var xpos = 0
var ypos = 400
var score = 0.0
var deplacement = -2
var posxwalls = [2]
var posywalls = [0]
var state = "play"
var timerjump = 0
var r = 0
var g = 0
var b = 0

var c = document.getElementById("canvas")
var ctx = c.getContext("2d")
var ninja_1_left = document.getElementById("ninja_1_left")
var ninja_1_right = document.getElementById("ninja_1_right")
var ninja_2_left = document.getElementById("ninja_2_left")
var ninja_2_right = document.getElementById("ninja_2_right")
var ninja_3_left = document.getElementById("ninja_3_left")
var ninja_3_right = document.getElementById("ninja_3_right")
var wall = document.getElementById("wall")
var wall2 = document.getElementById("wall2")


document.addEventListener('keydown', logKey);
document.addEventListener('click' , logKey);


function drawninja() {
  
  if (xpos != 0 && xpos != 288)
    timerjump = 50

  if (xpos == 0 || xpos == 288)
    --timerjump

  if (xpos != 0 && xpos != 288 && deplacement > 0)
    ctx.drawImage(ninja_2_left, xpos, ypos)
  if (xpos != 0 && xpos != 288 && deplacement < 0)
    ctx.drawImage(ninja_2_right, xpos, ypos)
  if (xpos == 0 && timerjump <= 0)
    ctx.drawImage(ninja_1_left, xpos, ypos)
  if (xpos == 288 && timerjump <= 0)
    ctx.drawImage(ninja_1_right, xpos, ypos)
  if (xpos == 0 && timerjump > 0)
    ctx.drawImage(ninja_3_right, xpos, ypos)
  if (xpos == 288 && timerjump > 0)
    ctx.drawImage(ninja_3_left, xpos, ypos)
  
  xpos+= deplacement
  if (xpos >= 288)
    xpos=288
  if (xpos <= 0)
    xpos=0
  }

function scrolling() {
    if (Math.floor(score)%100 == 0){
      posxwalls.push(Math.floor(Math.random() * 15)*16 + 34)
      posywalls.push(0)
      if (deplacement < 0)
        deplacement -= 0.0001
      if (deplacement > 0)
        deplacement += 0.0001

    }
    for (var i = 0; i < posxwalls.length; ++i){
      posywalls[i] += score/5000 + 1
      if (posywalls[i] >= 500) {
        posywalls.shift()
        posxwalls.shift()
      }
      if (score % 30 <15)
        ctx.drawImage(wall, posxwalls[i], posywalls[i])
      else 
        ctx.drawImage(wall2, posxwalls[i], posywalls[i])
    }
}

function collidetest() {
  for (var i = 0; i < posxwalls.length && state == "play"; ++i){
    state = "lose"
    if ((xpos >= (posxwalls[i] + wall.width)) || ((xpos + ninja_1_left.width) <= posxwalls[i]) || (ypos >= (posywalls[i] + wall.height)) || ((ypos + ninja_1_left.height) <= posywalls[i]))
      state = "play"
  }
}

function update() {
  if (state == "play"){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawninja()
    scrolling()
    document.getElementById('score').innerHTML = Math.floor(score/20)
    document.getElementById('score').style = "color:rgb(" + r + "," + g + "," + b + ")"
    if (Math.floor(score/20) >= 404 && score%50 == 0) {
      r = Math.floor(Math.random()*256)
      g = Math.floor(Math.random()*256)
      b = Math.floor(Math.random()*256)
    }
    collidetest()
    ++score
  }
  if (state == "lose")
    document.getElementById('score').innerHTML = "Dommage, vous avez perdu ... Mais votre score est tout de même de " + Math.floor(score/20) + " !"
}

setInterval(update, 10)

function logKey(e) {
  if (state == "play") {
    if (deplacement < 0 && xpos == 0){
      deplacement = -1 * deplacement;
      posxwalls.push(290)
      posywalls.push(0)
    }
      
      
    if (deplacement > 0 && xpos == 288){
      deplacement = -1 * deplacement;
      posxwalls.push(2)
      posywalls.push(0)
    }
  }

  if (state == "lose") {
    xpos = 10
    ypos = 400
    score = 0.0
    deplacement = -2
    posxwalls = [2]
    posywalls = [0]
    state = "play"
    timerjump = 0
    r = 0
    g = 0
    b = 0
  }
    
}