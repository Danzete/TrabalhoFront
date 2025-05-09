/* Simulando um usuario */
// const idUser = "1"; // Provisório
// const nome = "Marlos Bianna"; // Provisório
localStorage.setItem("nomeUsuario", nome);  // Provisório
localStorage.setItem("idUsuario", idUser);  // Provisório
document.getElementById("usuario").innerText = localStorage.getItem("nomeUsuario");
// document.getElementById("idUsuario").innerText = localStorage.getItem("idUsuario");

urlUsuarios = 'https://681c9922f74de1d219ad056c.mockapi.io/api/v1'; /* usuario */
urlProdutos = 'https://681caf46f74de1d219ad6b67.mockapi.io/api/v1'; /* produtos */
urlVendas = 'https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas';

async function deletarRegistro(id) {
  const url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas/${id}`
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao deletar o registro");
      }
      return response.json();
    })
    .then(data => console.log("Registro deletado com sucesso!", data))
    .catch(error => console.error("Erro:", error));
}

async function carregarCarrinho(Macao) {
  var listaCompras = document.getElementById("listItens");
  try {
    var response = await fetch(urlVendas);
    var dados = await response.json();
    if (dados.length > 0) {
      var totalpreco = 0;
      dados.forEach((itens) => {
        if (itens.idUsuario === idUser) {
          if (Macao === "INCLUIR") {
            totalpreco += parseFloat(itens.precoProduto)
            listaCompras.innerHTML += `
            <div name="listItens" class="cart-container">
            <span>${itens.nomeProduto}</span>
            <span>${itens.quantProduto}</span>
            <span>${itens.precoProduto}</span>
            </div >
          `;
          }
          if (Macao === "EXCLUIR") {
            console.log("DELETANDO REGISTO: " + itens.id);
            deletarRegistro(itens.id)
            // location.reload();
          }
          console.log("registro de vendas: ", itens.id);
        }
        document.getElementById("valortotal").innerText = `Valor Total: R$ ${totalpreco.toFixed(2)}`;
      }
      );
    } else {
      listaCompras.innerHTML = `< span > Não há itens no Carrinho </span > `;
    }
  } catch (error) {
    listaCompras.innerHTML = `< p > Erro ao carregar os dados</p > `;
  }
}

async function limparCarrinho() {
  const idUsuario = localStorage.getItem('idUsuario'); // Pega o ID do usuário logado
  if (!idUsuario) {
    console.log('Você precisa estar logado para limpar o carrinho.');
    return;
  }
  localStorage.removeItem('carrinho');
  carregarCarrinho("EXCLUIR");
}

async function VerificarCarrinho() {
  const idUsuario = localStorage.getItem('idUsuario'); // Pega o ID do usuário logado
  const url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas?idUsuario=${idUsuario}`
  // var carrinho = false;
  try {
    var response = await fetch(url);
    if (response.status === 200) {
      var dados = await response.json();
      carregarCarrinho("INCLUIR");
    } else {
      console.log("SEM REGISTRO");
    }
  } catch (error) {
    console.log("ERRO");
  }
}

function finalizarCompra() {
  limparCarrinho();
}

VerificarCarrinho();

