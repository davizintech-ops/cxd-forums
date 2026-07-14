function cadastrar(){

let nome =
document.getElementById("nome").value;


let senha =
document.getElementById("senha").value;


if(!nome || !senha){

alert("Preencha todos os campos");
return;

}


let usuario = {

nome:nome,
senha:senha

};


localStorage.setItem(
"usuario",
JSON.stringify(usuario)
);


alert("Conta criada!");

window.location.href="login.html";

}




function login(){


let nome =
document.getElementById("loginNome").value;


let senha =
document.getElementById("loginSenha").value;



let usuario =
JSON.parse(
localStorage.getItem("usuario")
);



if(
usuario &&
usuario.nome == nome &&
usuario.senha == senha
){


localStorage.setItem(
"logado",
"true"
);



alert("Login realizado!");

window.location.href="index.html";


}else{


alert("Usuário ou senha incorretos");


}


}




function logout(){


localStorage.removeItem("logado");

alert("Saiu da conta!");

window.location.href="index.html";


}