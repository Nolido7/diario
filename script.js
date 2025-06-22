document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pages = document.querySelectorAll('.page');
    const textareas = document.querySelectorAll('textarea');

    const totalPages = pages.length;
    let currentPage = 0;

    // Abrir o livro ao clicar na capa
    document.querySelector('.cover').addEventListener('click', () => {
        book.classList.add('open');
        // A capa é a página 0, a primeira folha é a 1
        currentPage = 1; 
        updateButtons();
        updateZIndex();
    });

    // Função para virar para a próxima página
    nextBtn.addEventListener('click', () => {
        if (currentPage <= totalPages) {
            pages[currentPage - 1].classList.add('flipped');
            currentPage++;
            updateButtons();
            updateZIndex();
        }
    });

    // Função para virar para a página anterior
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            pages[currentPage - 1].classList.remove('flipped');
            updateButtons();
            updateZIndex();
        } else if (currentPage === 1) {
            // Fechar o livro se estiver na primeira página
            book.classList.remove('open');
            currentPage = 0;
            updateButtons();
        }
    });

    function updateButtons() {
        prevBtn.disabled = currentPage <= 0;
        nextBtn.disabled = currentPage > totalPages;
    }

    function updateZIndex() {
        setTimeout(() => {
            pages.forEach((page, index) => {
                if (index < currentPage - 1) {
                    page.style.zIndex = index + 1;
                } else {
                    page.style.zIndex = totalPages - index;
                }
            });
        }, 500); // Metade do tempo da animação CSS
    }
    
    // --- Lógica para Salvar e Carregar o Texto ---

    // Salvar o texto sempre que o usuário parar de digitar
    textareas.forEach(textarea => {
        textarea.addEventListener('keyup', () => {
            // Salva no localStorage do navegador. O dado fica salvo mesmo se fechar a aba!
            localStorage.setItem(textarea.id, textarea.value);
        });
    });

    // Carregar o texto salvo quando a página é aberta
    function loadSavedText() {
        textareas.forEach(textarea => {
            const savedText = localStorage.getItem(textarea.id);
            if (savedText) {
                textarea.value = savedText;
            }
        });
    }

    // Carrega tudo ao iniciar
    loadSavedText();
    updateButtons();
});
