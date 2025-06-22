$(document).ready(function() {
    let currentUser = null;
    let saveTimeout; // Variável para controlar o tempo de salvamento

    const loginContainer = $('#login-container');
    const diarioContainer = $('#diario-container');
    const loginBtn = $('#login-btn');
    const logoutBtn = $('#logout-btn');
    const usernameInput = $('#username');
    const book = $('#livro');
    const saveStatus = $('#save-status');

    // Evento do botão de Login
    loginBtn.on('click', function() {
        const username = usernameInput.val().trim().replace(/[^a-zA-Z0-9]/g, ''); // Limpa o nome para evitar erros
        if (username) {
            currentUser = username;
            loginContainer.hide();
            diarioContainer.show();
            initializeDiary();
        } else {
            alert('Por favor, digite seu nome ou apelido.');
        }
    });

    // Evento do botão de Trocar Usuário (Logout)
    logoutBtn.on('click', function() {
        if (confirm('Tem certeza que deseja sair? Suas anotações estão salvas.')) {
            book.turn('destroy'); // Destrói a instância do Turn.js
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
            // O número de páginas é detectado automaticamente pelo Turn.js a partir dos divs
        });

        loadSavedText();

        // Salva o texto e mostra a notificação
        $('textarea').on('input', function() {
            clearTimeout(saveTimeout); // Cancela o salvamento anterior se ainda estiver digitando
            saveStatus.text('Salvando...').removeClass('hidden');

            const textarea = $(this);
            saveTimeout = setTimeout(function() {
                const pageId = textarea.attr('id');
                const content = textarea.val();
                localStorage.setItem(`${currentUser}_${pageId}`, content);
                
                // Mostra "Salvo!" e depois esconde
                saveStatus.text('Salvo!').removeClass('hidden');
                setTimeout(() => saveStatus.addClass('hidden'), 2000);

            }, 1000); // Salva 1 segundo depois que o usuário para de digitar
        });
    }

    function loadSavedText() {
        // Turn.js numera as páginas de 1 em diante
        const pageCount = book.turn('pages');

        for (let i = 1; i <= (pageCount - 2) / 2 + 1; i++) { // Ajustado para 50 páginas de texto
            const pageId = `text-${i}`;
            const savedContent = localStorage.getItem(`${currentUser}_${pageId}`);
            const textarea = $(`#${pageId}`);
            if (textarea.length) {
                if (savedContent) {
                    textarea.val(savedContent);
                } else {
                    textarea.val('');
                }
            }
        }
    }

    // Navegação com as setas do teclado
    $(window).on('keydown', function(e){
        if (e.key === 'ArrowLeft') book.turn('previous');
        if (e.key === 'ArrowRight') book.turn('next');
    });
});
