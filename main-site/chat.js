//selection
let divSelection = document.getElementById("page-selection")
let mode_cherche = document.getElementById("cherche")
let mode_aide = document.getElementById("aide")
let motif = document.getElementById("motif")
let lieu = document.getElementById("lieu")
let validerSelection = document.getElementById("valid-selection")
//pseudo
let divPseudo = document.getElementById("page-pseudo")
let pseudoInput = document.getElementById("pseudo")
let validerPseudo = document.getElementById("valid-pseudo")
divPseudo.style.display = "none"

//chat
let divChat = document.getElementById("page-chat")
let textbox = document.getElementById("textarea")
divChat.style.display = "none"

let divSandbox = document.getElementById("sandbox")


var socket = io();





//selection
function selection(){
  console.log("ah")
  let mode = (mode_cherche.checked)
  console.log(mode); // true : recherche false: aide
  let localisation = lieu.options[lieu.selectedIndex].value
  let pour = motif.options[lieu.selectedIndex].value
  socket.emit("selection",{"mode":mode,"localisation":localisation,"pour":pour})
  divSelection.style.display = "none"
  divPseudo.style.display = "block"

}


validerSelection.onclick = selection









// pseudo

function register(){
  let value = pseudoInput.value
  socket.emit("register",value)
  divPseudo.style.display = "none"
  divChat.style.display = "block"
}
validerPseudo.onclick = register
pseudoInput.addEventListener('keyup', pseudoUp)
function pseudoUp(e){
  if (e.key === "Enter") register()
}



socket.on("openSession",(data)=>{
    if (data.valid){
      console.log(data)
      if(!data.mode){
        document.getElementById("titre").innerHTML = `Salle #${data.roomid} créée`
      }else{
        document.getElementById("titre").innerHTML = `Salle #${data.roomid} rejointe`
      }
      
    }else{
      document.getElementById("titre").innerHTML = "Désolé, aucune salle n'est disponible pour le moment, réessayez plus tard."
      document.getElementById("textarea").style.display = "none"

    }
  })

socket.on("newMessage",(data) =>{
  let p = document.createElement("li")
  let text = document.createTextNode(data.nom + " : " +data.contenu)
  p.appendChild(text)
  divSandbox.appendChild(p)
  console.log(data.number)
  p.scrollIntoView()
  document.getElementById("nb").innerHTML = data.number
})

/*{
            "nom" : socket.pseudo,
            "contenu": data
          }*/


// chat
function sendMessage(){
  let value = textbox.value 
  value = value.slice(0,value.length - 1)
  
  socket.emit("message",value)
  textbox.value = ""
}
textbox.addEventListener('keyup',keyup);
let shifted = false
function keyup(e){
  if (e.key === "Enter"){
    if (!shifted){
      sendMessage()
    }
    shifted = false

  }

}

textbox.addEventListener('keydown',keydown);
function keydown(e){
  var key = e.key;
  if (e.shiftKey){
    if (key === "Enter") shifted = true
  }
}


