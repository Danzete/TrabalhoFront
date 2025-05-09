//const idUser = "2";
//localStorage.setItem("idUsuario", idUser); // Provisório

urlUsuarios =
  "https://681c9922f74de1d219ad056c.mockapi.io/api/v1"; /* usuario */
urlProdutos =
  "https://681caf46f74de1d219ad6b67.mockapi.io/api/v1"; /* produtos */
urlVendas = "https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas";

async function carregarDadosApi() {
  idUser = localStorage.getItem("idUsuario"); // Pega o ID do usuário logado
  var url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/usuarios/${idUser}`;

  try {
    var response = await fetch(url);
    var dados = await response.json();

    if (dados != null) {
      document.getElementById("dadosPerfil").innerHTML = `               
        <p>Nome: ${dados.nome} </p>
        <p>Email: ${dados.email}</p>
        <p>Telefone: ${dados.telefone}</p>`;
    } else {
      document.getElementById(
        "dadosPerfil"
      ).innerHTML = `<span> lista não encontrada </span>`;
    }
  } catch (error) {
    document.getElementById(
      "dadosPerfil"
    ).innerHTML = `<p>Erro no servidor, Tente novamente mais tarde!!!</p>`;
  }
}

async function alterarDadosApi() {
  var idUser = localStorage.getItem("idUsuario"); // Pega o ID do usuário logado
  var url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/usuarios/${idUser}`;
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var telefone = document.getElementById("telefone").value;

  var dados = {
    nome: nome,
    email: email,
    telefone: telefone,
  };

  try {
    var response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });
    if (response.ok) {
      alert("Dados alterados com sucesso!");
      carregarDadosApi();
      location.reload();
    } else {
      alert("Erro ao alterar os dados.");
    }
  } catch (error) {
    alert("Erro no servidor, Tente novamente mais tarde!!!");
  }
}

async function deletarUsuario() {
  var idUser = localStorage.getItem("idUsuario"); // Pega o ID do usuário logado
  var nome = document.getElementById("nome").value;
  var url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/usuarios/${idUser}`;

  try {
    var response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("Usuário deletado com sucesso!");
      window.location.href = "./index.html"; // Redireciona para a página inicial
      limparLocalStorage();
    } else {
      alert("Erro ao deletar o usuário.");
    }
  } catch (error) {
    alert("Erro no servidor, Tente novamente mais tarde!!!");
  }
}

function editar(e) {
  e.preventDefault();
  var idUser = localStorage.getItem("idUsuario"); // Pega o ID do usuário logado
  var url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/usuarios/${idUser}`;
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var telefone = document.getElementById("telefone").value;

  var dados = {
    nome: nome,
    email: email,
    telefone: telefone,
  };

  alterarDadosApi(dados);
}
function mostrarFormulario() {
  const formulario = document.getElementById("formAlterar");
  formulario.style.display = "block";
}

function cancelarAlteracao() {
  location.reload();
}

function limparLocalStorage() {
  localStorage.clear();
}

carregarDadosApi();