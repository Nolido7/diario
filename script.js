$(document).ready(function() {
    let currentUser = null;
    const totalPages = 50; // Total de páginas do nosso diário

    const loginContainer = $('#login-container');
    const diarioContainer = $('#diario-container');
    const loginBtn = $('#login-btn');
    const logoutBtn = $('#logout-btn');
    const usernameInput = $('#username');
    const book = $('#livro');

    // Evento do botão de Login
    loginBtn.on('click', function() {
        const username = usernameInput.val().trim();
        if (username) {
            currentUser = username;
            loginContainer.hide();
            diarioContainer.show();
            initializeDiary();
        } else {
            alert('Por favor, digite seu nome.');
        }
    });

    // Evento do botão de Trocar Usuário (Logout)
    logoutBtn.on('click', function() {
        if (confirm('Tem certeza que deseja sair? Suas anotações estão salvas.')) {
            // Destrói a instância do Turn.js para poder recriá-la
            book.turn('destroy');
            diarioContainer.hide();
            loginContainer.show();
            usernameInput.val('');
            currentUser = null;
        }
    });
    
    function initializeDiary() {
        // Inicializa o Turn.js
        book.turn({
            width: 800,
            height: 550,
            elevation: 50,
            gradients: true,
            autoCenter: true,
            pages: totalPages + 2 // 50 páginas + 2 de capa
        });

        // Carrega os textos salvos para o usuário atual
        loadSavedText();

        // Salva o texto automaticamente ao digitar
        $('textarea').on('keyup', function() {
            const pageId = $(this).attr('id');
            const content = $(this).val();
            // Chave de salvamento individual: "nomeDoUsuario_idDaPagina"
            localStorage.setItem(`${currentUser}_${pageId}`, content);
        });
    }

    function loadSavedText() {
        for (let i = 1; i <= totalPages; i++) {
            const pageId = `text-${i}`;
            const savedContent = localStorage.getItem(`${currentUser}_${pageId}`);
            if (savedContent) {
                $(`#${pageId}`).val(savedContent);
            } else {
                // Limpa o textarea se não houver conteúdo salvo para este usuário
                 $(`#${pageId}`).val('');
            }
        }
    }

    // Permite navegar com as setas do teclado
    $(window).on('keydown', function(e){
        if (e.key === 'ArrowLeft') book.turn('previous');
        if (e.key === 'ArrowRight') book.turn('next');
    });
});
