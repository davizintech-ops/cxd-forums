function iniciarSite(){

let usuario = localStorage.getItem("usuario");


let status = document.getElementById("status");


if(usuario){

status.innerHTML =
"Logado como: <b>"+usuario+"</b>";

}else{

status.innerHTML =
"Você não está logado.";

}

}


iniciarSite();