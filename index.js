const express = require('express');
const app = express();
const http = require('http').createServer(app)

// TO-DO : meilleur score 404 stocké sur le serveur










// partie chat
const io = require('socket.io')(http)

let rooms = []



var count = 0;
let nextID = 1;
io.on('connection', function(socket){
  count ++;
  console.log('a client connected ', count);
  socket.on('disconnect', function(){
    console.log('client disconnected');
  });
  socket.on('message',function(data){
    console.log(`l'utilisateur ${socket.pseudo}#${socket.uid} a envoyé : \n ${data} \n dans le salon #${socket.roomid}`)
    for (let i = 0; i< rooms[socket.roomid].length ; ++i){
          rooms[socket.roomid][i].emit("newMessage",{
            "nom" : socket.pseudo,
            "contenu": data,
            "number": rooms[socket.roomid].length
          })
        }
  })
  socket.on('register', function(data){
    socket.pseudo = data
    socket.uid = nextID
    ++nextID
    console.log(`${socket.pseudo} s'est connecté avec l'id #${socket.uid}`)
    console.log(socket.mode)
    if (!socket.mode){
      console.log(rooms.length)
      socket.roomid = rooms.length
      rooms.push([socket])
      socket.emit("openSession",{
          "valid":true,
          "roomid" : socket.roomid,
          "noms": "",
          "mode":socket.mode
        })
    } 
    else
    {
      let dispo = []
      let trouve = false;
      for(let i = 0; i < rooms.length; ++i){
        if ( rooms[i][0].localisation === socket.localisation && rooms[i][0].pour === socket.pour )
        {
          dispo.push(i)
          trouve = true
        }
      }
      if (trouve){
        let salle = dispo[Math.floor( Math.random() * dispo.length)]
        socket.roomid = salle
        rooms[salle].push(socket)
        noms =""
        for (let i = 0; i< rooms[socket.roomid].length ; ++i){
          noms+=rooms[socket.roomid][i].pseudo+" "
        }
        socket.emit("openSession", {
          "valid":true,
          "roomid" : socket.roomid,
          "noms": noms,
          "mode":socket.mode
        })
        for (let i = 0; i< rooms[socket.roomid].length ; ++i){
          rooms[socket.roomid][i].emit("newMessage",{
            "nom" : "serveur",
            "contenu":`${socket.pseudo} a rejoint la salle`,
            "number": rooms[socket.roomid].length
          })
        }
      }else{
        socket.emit("openSession", {
          valid:false
        })
      }
    }
  })
  socket.on('selection',function(data){
    // true : recherche false: aide
    console.log(data)

    socket.mode = data.mode
    socket.localisation = data.localisation
    socket.pour = data.pour
  })
  

});

























app.use('/404', express.static(__dirname + '/404-game'));
app.use('/escape', express.static(__dirname + '/escape-game'));
app.use('/', express.static(__dirname + '/main-site'));


app.use(function(req, res, next) {
  res.redirect( '/404')
});
/*
app.get('/', (req, res) => {
  res.send("Hello Express app! :) <a>main</a>")
});*/

http.listen(3000, () => {
  console.log('server started');
});