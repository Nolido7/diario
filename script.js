// Espera a página inteira carregar para ter certeza que tudo está pronto
$(window).on('load', function() {
    // Verifica se jQuery e Turn.js foram realmente carregados
    if (typeof $ == 'function' && typeof $.fn.turn == 'function') {
        console.log("jQuery e Turn.js foram carregados com sucesso.");

        // Inicia o diário com configurações básicas
        console.log("Iniciando o diário...");
        $('#meu-livro').turn({
            width: 800,
            height: 600,
            autoCenter: true
        });

    } else {
        // Se chegamos aqui, a causa do problema é o carregamento dos scripts
        console.error("ERRO CRÍTICO: jQuery ou Turn.js não foram carregados. Verifique sua conexão com a internet ou a aba 'Network' no console.");
    }
});


// Adiciona controle pelas setas do teclado
$(document).on('keydown', function(e){
    var flipbook = $('#meu-livro');

    if (e.key === 'ArrowLeft') {
        flipbook.turn('previous');
        console.log("Virando para a página anterior.");
    }
    if (e.key === 'ArrowRight') {
        flipbook.turn('next');
        console.log("Virando para a próxima página.");
    }
});
