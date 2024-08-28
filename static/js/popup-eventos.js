function showPopup(message) {
    
    console.log(window.location.pathname)
    // Criar o fundo escurecido
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '9998';

    // Criar o contêiner do pop-up
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '9999';
    popup.style.borderRadius = '8px';
    popup.style.textAlign = 'center';

    // Adicionar a mensagem ao pop-up
    let messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.style.marginBottom = '20px';
    popup.appendChild(messageElement);

    // Botão de fechar
    let closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#007BFF';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';

    // Função para remover o pop-up e o fundo escurecido
    closeButton.addEventListener('click', function() {
        document.body.removeChild(popup);
        document.body.removeChild(overlay);
    });

    popup.appendChild(closeButton);

    // Adicionar o pop-up e o fundo escurecido ao body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}



// Exemplo de uso: Chamar a função para exibir o pop-up
if (window.location.pathname == "/"){
    showPopup('<h2> </h2> <img style="width:30vw;height:auto"src="../img/Eventos/Programa-Seminario-A-Engenharia-Transformando-O-Pais/banner.jpg"> <p>Acesse a programação <a href="../arquivos-eventos/Programa-Seminario-A-Engenharia-Transformando-o-pais/Programa Simpósio ANE vdb 15 Ago 24 (1).docx">aqui</a></p> ');

}
