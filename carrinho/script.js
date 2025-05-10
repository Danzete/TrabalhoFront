const idUser = localStorage.getItem("idUsuario"); // Pega o ID do usuário logado
document.getElementById("usuario").innerText = localStorage.getItem("nomeUsuario");
// urlUsuarios = 'https://681c9922f74de1d219ad056c.mockapi.io/api/v1'; /* usuario */
// urlProdutos = 'https://681caf46f74de1d219ad6b67.mockapi.io/api/v1'; /* produtos */
 urlVendas = 'https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas';

async function endUsuario(id) {
  var endUsuarioDados = document.getElementById("endEntrega");
  const url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas/${id}`
  var endEntrega = document.getElementById("endEntrega");
  const endRua = localStorage.getItem("endRua");
  const endNum = localStorage.getItem("endNum");
  const endbairro = localStorage.getItem("endBairro");
  const endCidade = localStorage.getItem("endCidade");
  const endCep = localStorage.getItem("endCep");
  // <div id="endEntrega" class="card">
  try {
    var response = await fetch(url);
    if (response.status === 200) {
      var dados = await response.json();

      /* Carregando dados do Usuário para entrega */
      endEntrega.innerHTML = `
      < div id = "endEntrega" >
      <h2>Endereço</h2>
      <p>${endRua}, ${endNum}</p>
      <p>Bairro: ${endbairro}</p>
      <p>${endCidade} - ${endCidade}</p>
      <p>${endCep}</p>
       </ >
        `;
    } else {
      console.log("SEM REGISTRO");
    }
  } catch (error) {
    console.log("ERRO");
  }
}

async function deletarRegistro(id) {
  const url =` https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas/${id}`
  // const url = `${urlVendas}/${id}`
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

async function CarrinhoDeCompras(Macao) {
  var listaCompras = document.getElementById("listItens");
  try {
    var response = await fetch(urlVendas);
    var dados = await response.json();
    if (dados.length > 0) {
      var totalpreco = 0;
      var qtItens = 0;
      dados.forEach((itens) => {
        if (itens.idUsuario === idUser) {
          if (Macao === "INCLUIR") {
            totalpreco += parseFloat(itens.quantProduto * itens.precoProduto)
            qtItens = qtItens + 1
            listaCompras.innerHTML += `
            <div name="listItens" class="cart-container">
            <span>${itens.nomeProduto}</span>
            <span>${itens.quantProduto}</span>
            <span>${itens.precoProduto}</span>
            <span>${(itens.quantProduto * itens.precoProduto)}</span>
            </div >
          `;
          }
          if (Macao === "EXCLUIR" || Macao === "FINALIZAR") {
            setTimeout(async () => {
              console.log("DELETANDO REGISTO: " + itens.id);
              deletarRegistro(itens.id)
              console.log("REGISTRO DELETADO")
              console.log("EFETUADO COM SUCESSO")
              //  location.reload();
            }, 3000); // Timeout de 1 segundos

            if (Macao === "FINALIZAR") {
              ALERT("Compra finalizada com Sucesso!")
            }
          }
          console.log("Registro de vendas: ", itens.id);
        }
        document.getElementById("valortotal").innerText = `Quantidade de itens: ${qtItens}, Valor Total: R$ ${totalpreco.toFixed(2)}`;
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
    alert('Você precisa estar logado para limpar o carrinho.');
    return;
  }
  localStorage.removeItem('carrinho');
  CarrinhoDeCompras("EXCLUIR");
}

function irParaHome() {
  window.location.href = "../index.html";
}

async function finalizarCompra() {
  carregarCarrinho("FINALIZAR");
}

async function verificarCarrinho() {
  const idUsuario = localStorage.getItem('idUsuario'); // Pega o ID do usuário logado
  const url = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas?idUsuario=${idUsuario}`
  try {
    var response = await fetch(url);
    if (response.status === 200) {
      var dados = await response.json();
      CarrinhoDeCompras("INCLUIR");
      endUsuario(idUsuario);
    } else {
      console.log("SEM REGISTRO");
      irParaHome();
    }
  } catch (error) {
    console.log("ERRO");
  }
}

// Verifica se há carregarCarrinho()? Segue para Pagina do Carrinho : Volta para Home;
verificarCarrinho()