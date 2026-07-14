// auth.js


// CADASTRO
async function cadastrar(){

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let nome = document.getElementById("nome").value;


    if(!email || !senha || !nome){

        alert("Preencha tudo!");
        return;

    }



    const { data, error } =
    await window.db.auth.signUp({

        email: email,
        password: senha

    });



    if(error){

        console.log(error);

        alert(error.message);

        return;

    }



    let user = data.user;



    if(!user){

        alert("Erro ao criar conta");

        return;

    }



const { error: erroPerfil } =
await window.db
.from("usuarios")
.insert({

    auth_id: user.id,

    nome: nome,

    senha: null,

    foto: null,

    adm: false

});



    if(erroPerfil){

        console.log(erroPerfil);

        alert("Erro ao criar perfil");

        return;

    }



    alert("Conta criada!");

    window.location.href = "login.html";

}






// LOGIN
// LOGIN
async function login(){

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    const { data, error } =
    await window.db.auth.signInWithPassword({

        email: email,
        password: senha

    });

    if(error){

        console.log(error);
        alert("Email ou senha incorretos");
        return;

    }

    // Buscar perfil
    const { data: perfil, error: erroPerfil } =
    await window.db
    .from("usuarios")
    .select("*")
    .eq("auth_id", data.user.id)
    .single();

    if(erroPerfil){

        console.log(erroPerfil);
        alert("Erro ao carregar perfil.");
        return;

    }

    // Verificar banimento
    if(perfil.banido){

        await window.db.auth.signOut();

        alert("Sua conta foi banida.");

        return;

    }

    alert("Login feito!");

    window.location.href = "index.html";

}






// SAIR
async function logout(){

    if(!window.db){

        console.log("Supabase não carregado");
        return;

    }


    await window.db.auth.signOut();


    window.location.href = "login.html";

}






// PEGAR PERFIL DO USUÁRIO LOGADO
async function pegarUsuario(){

    const { data: authData } =
    await window.db.auth.getUser();


    if(!authData.user){

        return null;

    }


    let user = authData.user;



    const { data: perfil, error } =
    await window.db
    .from("usuarios")
    .select("*")
    .eq("auth_id", user.id)
    .maybeSingle();



    // Se não existir perfil, cria
    if(!perfil){

        const { data: novoPerfil, error: erroCriar } =
        await window.db
        .from("usuarios")
        .insert({

            auth_id: user.id,

            nome: user.email.split("@")[0],

            foto: null,

            adm: false

        })
        .select()
        .single();



        if(erroCriar){

            console.log("Erro criando perfil:", erroCriar);

            return null;

        }


        return novoPerfil;

    }



    return perfil;

}
