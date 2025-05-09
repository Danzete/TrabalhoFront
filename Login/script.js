document.getElementById("meuBotao").addEventListener("click", carregarDadosApi); // Adiciona o evento de clique ao botão


async function carregarDadosApi(event) {
  event.preventDefault();
  var url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/usuarios`;
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  try {
    var response = await fetch(url);
    var dados = await response.json();

    let loginSucesso = false;
    dados.forEach((usuario) => { 
      if (usuario.email === email && usuario.senha === senha) {
        loginSucesso = true;
        alert("Login realizado com sucesso!");

        // Armazena os dados do usuário no localStorage
        localStorage.setItem("nomeUsuario", usuario.nome); 
        localStorage.setItem("idUsuario", usuario.id); 
        localStorage.setItem("endRua", usuario.endRua); 
        localStorage.setItem("endNum", usuario.endNum); 
        localStorage.setItem("endcompl", usuario.endcompl); 
        localStorage.setItem("endBairro", usuario.endBairro); 
        localStorage.setItem("endbairro", usuario.endbairro); 
        localStorage.setItem("endCidade", usuario.endCidade); 
        localStorage.setItem("endCidade", usuario.endUf); 
        localStorage.setItem("endCep", usuario.endCep); 
        localStorage.setItem("telefone", usuario.telefone); 
        
        window.location.href = "../home/index.html"; // Redireciona para a página home após o login


      }
    });
    if (!loginSucesso) {
      alert("E-mail ou senha incorretos.");
      location.reload(); // Reload da página se o login falhar
    }

  } catch (error) {
    alert("Erro de servidor. Tente novamente mais tarde."); 
  }
}
