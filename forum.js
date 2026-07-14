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




async function carregarPosts(){


    let area = document.getElementById("posts");


    if(!area) return;



    const { data, error } = await window.db
    .from("posts")
    .select("*")
    .order("data", {ascending:false});



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


            <p>
                ${post.texto}
            </p>


            ${
                post.imagem
                ?
                `<img src="${post.imagem}" 
                style="max-width:300px;border-radius:10px;">`
                :
                ""
            }


            <small>
                👤 ${post.autor}<br>
                🆔 ${post.id}<br>
                📅 ${post.data}
            </small>


            <br><br>


            🔥 ${post.curtidas}

        </div>

        `;

    });


}





function abrirPagina(id){

    window.location.href =
    "topico.html?id=" + id;

}





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