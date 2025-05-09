async function cadastrar(e) {
  e.preventDefault();

  var nomeInput = document.getElementById("nomeUser").value;
  var emailInput = document.getElementById("emailUser").value;
  var telefoneInput =document.getElementById("telefoneUser").value;
  var senhaInput = document.getElementById("senhaUser").value;
  var confirmarSenhaInput = document.getElementById("confirmar-senha").value;
    
  var urlBaseUsuarios = `https://681c9922f74de1d219ad056c.mockapi.io/api/v1/usuarios`;
    
  if (!nomeInput || !emailInput || !telefoneInput || !senhaInput || !confirmarSenhaInput) {
    mostrarAlerta("Preencha os campos necessários!!", "aviso");
    return;
  }
  
  if (senhaInput.length < 6) {
    mostrarAlerta("A senha deve ter pelo menos 6 caracteres!", "aviso");
    return;
  }
  
  if (senhaInput !== confirmarSenhaInput) {
    mostrarAlerta("As senha digitadas não são iguais!", "aviso");
    return;
  }

  const emailJaCadastrado = await verificarEmail(emailInput, urlBaseUsuarios);
  if (emailJaCadastrado) {
    return;
  }
 
  var usuario = {
    nome: nomeInput,
    email: emailInput,
    telefone: telefoneInput,
    senha: senhaInput,
  };

  try {
    var response = await fetch(urlBaseUsuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
  } catch (error) {
    mostrarAlerta("Erro de conexão com o servidor.", "erro");
  }

    if(!response.ok) {
      const errorData = await response.json(); 
      console.error('Erro na resposta:', errorData); 
      mostrarAlerta("Erro ao cadastrar. Tente novamente!", "erro");
    } else {
      mostrarAlerta("Usuário cadastrado com sucesso!", "sucesso");
      document.getElementById("cadastro-box").reset();
      setTimeout(() => {
        window.location.href = "../Login/index.html";
      }, 1000);
    };

    
}


function mostrarAlerta(mensagem, tipo = "info") {
  const alerta = document.getElementById("alerta");
  alerta.textContent = mensagem;
  alerta.className = `alerta show alerta-${tipo}`
      
  setTimeout(() => {
    alerta.className = "alerta";
  }, 3000);

}

async function verificarEmail(emailInput, urlBaseUsuarios) {
  try {
    const respostaUsuarios = await fetch(urlBaseUsuarios);
    
    if (!respostaUsuarios.ok) {
      mostrarAlerta("Erro ao verificar email.", "erro");
      return true; 
    }
    const usuarios = await respostaUsuarios.json();
    const emailJaCadastrado = usuarios.some(user => user.email.toLowerCase() === emailInput.toLowerCase());
    
    if (emailJaCadastrado) {
      mostrarAlerta("Este e-mail já está cadastrado!", "erro");
      return true;
    }
    return false;
  } catch (error) {
    mostrarAlerta("Erro de conexão ao verificar e-mail.", "erro");
    return true;
  }
}
