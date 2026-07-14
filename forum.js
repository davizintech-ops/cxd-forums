let postAtual = null;


// CRIAR TÓPICO
async function criarPost(){

    let titulo = document.getElementById("titulo").value;
    let texto = document.getElementById("texto").value;
    let imagem = document.getElementById("imagem").files[0];


    if(!titulo || !texto){
        alert("Preencha tudo!");
        return;
    }


    let usuario = JSON.parse(
        localStorage.getItem("usuario")
    );


    let imagemUrl = null;


    if(imagem){
        imagemUrl = await converterImagem(imagem);
    }


    const { error } = await window.db
    .from("posts")
    .insert({

        titulo: titulo,
        texto: texto,
        imagem: imagemUrl,
        autor: usuario ? usuario.nome : "Anônimo",
        curtidas: 0,
        respostas: []

    });


    if(error){

        console.log(error);
        alert("Erro ao criar tópico");
        return;

    }


    alert("Tópico criado!");

    window.location.href = "index.html";

}




// MOSTRAR TÓPICOS
async function carregarPosts(){

    let area = document.getElementById("posts");

    if(!area) return;



    const { data, error } = await window.db
    .from("posts")
    .select("*")
    .order("data", {
        ascending:false
    });



    if(error){

        console.log(error);
        return;

    }



    area.innerHTML = "";



    data.forEach(post=>{


        area.innerHTML += `

        <div class="post">


            <h2 onclick="abrirPagina(${post.id})">
                ${post.titulo}
            </h2>



            ${
                post.imagem
                ?
                `<img src="${post.imagem}" 
                style="max-width:300px;border-radius:10px;">`
                :
                ""
            }



            <br>


            <small>
            👤 ${post.autor}<br>
            🆔 ${post.id}
            </small>


        </div>

        `;


    });


}





// IR PARA O TÓPICO
function abrirPagina(id){

    window.location.href =
    "topico.html?id=" + id;

}





// ABRIR TÓPICO
async function abrirTopico(){


    let area = document.getElementById("topico");


    if(!area) return;



    let id = new URLSearchParams(
        window.location.search
    ).get("id");



    const { data, error } = await window.db
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();



    if(error){

        console.log(error);

        area.innerHTML =
        "Tópico não encontrado";

        return;

    }



    postAtual = data;



    area.innerHTML = `


    <h1>
    ${data.titulo}
    </h1>


    ${
        data.imagem
        ?
        `<img src="${data.imagem}" 
        style="max-width:400px;border-radius:10px;">`
        :
        ""
    }



    <p>
    ${data.texto.replace(/\n/g,"<br>")}
    </p>



    <small>
    👤 ${data.autor}<br>
    🆔 ${data.id}<br>
    🔥 ${data.curtidas}
    </small>


    `;



    mostrarRespostas();

}





// MOSTRAR RESPOSTAS
function mostrarRespostas(){


    let area = document.getElementById("respostas");


    if(!area) return;



    area.innerHTML = "";



    if(!postAtual.respostas || postAtual.respostas.length === 0){

        area.innerHTML =
        "Nenhuma resposta ainda.";

        return;

    }



    postAtual.respostas.forEach(r=>{


        area.innerHTML += `

        <div class="resposta">

            <b>
            👤 ${r.autor}
            </b>


            <p>
            ${transformarLinks(data.texto).replace(/\n/g,"<br>")}
            </p>


            <small>
            ${r.data}
            </small>


        </div>


        <hr>

        `;


    });


}





// ENVIAR RESPOSTA
async function enviarResposta(){


    let texto =
    document.getElementById("resposta").value;



    if(!texto){

        alert("Digite uma resposta!");

        return;

    }



    let usuario = JSON.parse(
        localStorage.getItem("usuario")
    );



    let respostasAtuais =
    postAtual.respostas || [];



    respostasAtuais.push({

        autor: usuario ? usuario.nome : "Anônimo",

        texto: texto,

        data: new Date().toISOString()

    });



    const { error } = await window.db
    .from("posts")
    .update({

        respostas: respostasAtuais

    })
    .eq("id", postAtual.id);



    if(error){

        console.log(error);

        alert("Erro ao salvar resposta");

        return;

    }



    alert("Resposta enviada!");

    location.reload();

}





// CONVERTER IMAGEM
function converterImagem(arquivo){


    return new Promise(resolve=>{


        let leitor = new FileReader();



        leitor.onload = e=>{

            resolve(e.target.result);

        };


        leitor.readAsDataURL(arquivo);


    });


}




function transformarLinks(texto){

    return texto.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank">$1</a>'
    );

}





carregarPosts();

abrirTopico();
