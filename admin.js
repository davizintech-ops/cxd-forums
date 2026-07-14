async function carregarUsuarios(){

    let eu = await pegarUsuario();

    if(!eu){

        location.href = "login.html";
        return;

    }

    if(!eu.adm){

        alert("Você não é administrador.");

        location.href = "index.html";

        return;

    }


    const { data, error } =
    await window.db
    .from("usuarios")
    .select("*")
    .order("nome");


    if(error){

        console.log(error);
        return;

    }


    let area =
    document.getElementById("usuarios");

    area.innerHTML = "";


    data.forEach(usuario=>{

        area.innerHTML += `

<div class="card">

<b>${usuario.nome}</b>

<br>

ADM:
${usuario.adm ? "✅" : "❌"}

<br>

Banido:
${usuario.banido ? "🚫 Sim" : "✅ Não"}

<br><br>

<button onclick="banir('${usuario.auth_id}', true)">
🚫 Banir
</button>

<button onclick="banir('${usuario.auth_id}', false)">
✅ Desbanir
</button>

<button onclick="adm('${usuario.auth_id}', true)">
👑 Dar ADM
</button>

<button onclick="adm('${usuario.auth_id}', false)">
👤 Remover ADM
</button>

</div>

<br>

`;

    });

}



async function banir(id, estado){

    await window.db
    .from("usuarios")
    .update({
        banido: estado
    })
    .eq("auth_id", id);

    carregarUsuarios();

}



async function adm(id, estado){

    await window.db
    .from("usuarios")
    .update({
        adm: estado
    })
    .eq("auth_id", id);

    carregarUsuarios();

}



carregarUsuarios();
