async function iniciarSite(){

    let status = document.getElementById("status");


    let usuario = await pegarUsuario();


    if(usuario){

        status.innerHTML =
        "Logado como: <b>" + usuario.nome + "</b>";

    }else{

        status.innerHTML =
        "Você não está logado.";

    }

}


iniciarSite();
