document.addEventListener('keypress', logKey);

//detection r -> i -> c -> k
var counterRick = 0;
function logKey(e) {
  var key = e.key.toLowerCase();
   switch (counterRick) {
      case 0:
        if(key === 'r')
          counterRick = 1;
        break;
      case 1:
        if(key === 'i')
          counterRick = 2;
        else if (key  === 'r'){}
        else
          counterRick = 0;
        break;
      case 2:
        if(key === 'c')
          counterRick = 3;
        else if (key === 'i'){}
        else
          counterRick = 0;
        break;
      case 3:
        if(key === 'k'){
          rick();
          counterRick = 0;
        }
        else if (key === 'c'){}
        else
          counterRick = 0;
        break;
   }

}

function rick(){
  var el =  document.createElement("iframe")
  el.style ="display:none;"
  el.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  el.frameborder = "0";
  el.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  document.body.appendChild(el);

  setTimeout(escape, 5000);
}

function escape(){
  var el2 = document.createElement("h1")
  el2.innerHTML = "<a href=\"../escape\">Ne clique pas ici!!!</a>";
  document.body.appendChild(el2);
}