document.addEventListener('DOMContentLoaded', function () {
  verificarLogin();
  inicializarCarrinho();

});

// Login
function verificarLogin() {
  const nomeUsuario = localStorage.getItem('nomeUsuario');
  const idUsuario = localStorage.getItem('idUsuario');
  const loginItem = document.querySelector('.nav-item a[href="#"]:last-child');// troca de item de login para logout

  if (nomeUsuario && idUsuario) {
    // Transforma em logout e adiciona o botão de perfil com o nome do usuário
    loginItem.parentElement.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
          <a href="#" id="perfil" class="perfil-link nav-link">${nomeUsuario}</a>
          <a href="#" id="logout" class="logout-link nav-link">Logout</a>
      </div>
      <style>
          @media (max-width: 768px) {
          div[style*="display: flex"] {
          gap: 50px;
          }
          }
      </style>
      `;

    // Botão de perfil
    document.getElementById('perfil').addEventListener('click', function () {
      window.location.href = './Perfil/index.html';
    });

    // Botão de logout
    document.getElementById('logout').addEventListener('click', function () {
      localStorage.removeItem('nomeUsuario');
      localStorage.removeItem('idUsuario');
      window.location.reload();
    });
  } else {
    loginItem.textContent = 'Login';
    loginItem.href = './Login/index.html';
  }
}


function adicionarAoCarrinho(botao) {
  const idUsuario = localStorage.getItem('idUsuario'); // Pega o ID do usuário logado

  if (!idUsuario) {
    if (confirm('Você precisa estar logado para adicionar itens ao carrinho. Deseja fazer login agora?')) {
      window.location.href = "./Login/index.html"; // Redireciona para a página de login
    }
    return;
  }

  const cardProduto = botao.closest('.cardproduto'); // Produto
  const quantidadeInput = cardProduto.querySelector('input');
  const quantidade = parseInt(quantidadeInput.value) || 1;

  const preco = parseFloat(botao.getAttribute('data-preco')); // Pega o preço do produto

  // Cria o objeto do produto com o preço total calculado
  const produto = {
    nomeProduto: botao.getAttribute('data-nome'),
    quantProduto: quantidade,
    precoProduto: preco, // Calcula o valor total
    idUsuario: idUsuario, // Inclui o ID do usuário no objeto
    vendaData: new Date().toISOString(), // Data da venda
  };

  // Envia o produto para a API
  fetch('https://681c9922f74de1d219ad056c.mockapi.io/api/v1/Vendas', {
    method: 'POST', // Método HTTP POST
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
  })
    .then(response => {
      if (response.ok) {
        alert('Produto adicionado ao carrinho com sucesso!');
      } else {
        alert('Erro ao adicionar o produto à API.');
      }
    })
    .catch(error => {
      console.error('Erro ao enviar o produto para a API:', error);
      alert('Erro ao enviar o produto para a API.');
    });
}
