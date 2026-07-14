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





// MOSTRAR TÓPICOS NA PÁGINA INICIAL

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
                style="max-width:300px;
                border-radius:10px;">`

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





// ABRIR PÁGINA DO TÓPICO

function abrirPagina(id){

    window.location.href =
    "topico.html?id=" + id;

}





// MOSTRAR UM TÓPICO

async function abrirTopico(){


    let area = document.getElementById("topico");


    if(!area) return;



    let params = new URLSearchParams(
        window.location.search
    );


    let id = params.get("id");



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



    let post = data;



    area.innerHTML = `


    <h1>

    ${post.titulo}

    </h1>



    ${
        post.imagem

        ?

        `<img src="${post.imagem}"
        style="max-width:400px;
        border-radius:10px;">`

        :

        ""

    }



    <p>

    ${post.texto.replace(/\n/g,"<br>")}

    </p>



    <hr>



    👤 ${post.autor}<br>

    🆔 ${post.id}<br>

    🔥 ${post.curtidas}


    `;


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





carregarPosts();

abrirTopico();
