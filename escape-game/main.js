let timerElement = document.getElementById("timer")

const start = new Date()
const tempMax = new Date('0000-01-01T00:00:01');
const nulle = new Date('0000-01-01T00:00:00');

var loop = setInterval(timer, 750);

function timer(){
  var end = new Date()
  var diff = new Date(end - start)
  var tempsRest = new Date(tempMax - diff)
  timerElement.innerHTML = tempsRest.getMinutes() + ":" + tempsRest.getSeconds();
  if (tempsRest < nulle){
    let game = document.getElementById("game")
    let perdu = document.getElementById("perdu")
    game.style.display = "none"
    perdu.style.display = "block"
    clearTimeout(loop);
  }
}

//erreur
let erreurE1 = document.getElementById("erreurE1")
let erreurE2 = document.getElementById("erreurE2")
let erreurE3 = document.getElementById("erreurE3")
let erreurE4 = document.getElementById("erreurE4")
let erreurE5 = document.getElementById("erreurE5")

function clearErreur(){
  erreurE1.style.display = "none"
  erreurE2.style.display = "none"
  erreurE3.style.display = "none"
  erreurE4.style.display = "none"
  erreurE5.style.display = "none"
}

function reset(){
    let div = document.getElementById("2")
    div.style.display = "none"
    div = document.getElementById("3")
    div.style.display = "none"
    div = document.getElementById("4")
    div.style.display = "none"
    div = document.getElementById("5")
    div.style.display = "none"
}

function e1() {
  let gps = document.getElementById("gps")
  if(gps.value === "43.514660,5.451033"){
    let div2 = document.getElementById("2")
    div2.style.display = "block"
    div2.scrollIntoView(true);
    clearErreur()
  }
  else 
    erreurE1.style.display = "inline"
}

function e2true() {
    let div3 = document.getElementById("3")
    div3.style.display = "block"
    div3.scrollIntoView(true);
    clearErreur()
}
function e2false() {
    erreurE2.style.display = "inline"
    reset();
}

function e3true() {
    let div4 = document.getElementById("4")
    div4.style.display = "block"
    div4.scrollIntoView(true);
    clearErreur()
}
function e3false() {
    erreurE3.style.display = "inline"
    reset();
}

function e4true() {
    let div5 = document.getElementById("5")
    div5.style.display = "block"
    div5.scrollIntoView(true);
    clearErreur()
}
function e4false() {
    erreurE4.style.display = "inline"
    reset();
}

function e5(){
  let deverrou = document.getElementById("deverrou")
  if(deverrou.value === "264537"){
    let fin = document.getElementById("fin")
    fin.style.display = "block"
    fin.scrollIntoView(true);
    clearErreur()
    clearTimeout(loop);
  }
  else {
    erreurE5.style.display = "inline"
    reset();
  }
}

