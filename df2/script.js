document.addEventListener('DOMContentLoaded', () => {
    const resolutionSpan = document.getElementById('resolution');
    const diagonalSpan = document.getElementById('diagonal');

    function updateScreenInfo() {
        const width = window.screen.width;
        const height = window.screen.height;
        const diagonal = Math.sqrt(width * width + height * height).toFixed(2); // Calcula a diagonal

        resolutionSpan.textContent = `${width}px x ${height}px`;
        diagonalSpan.textContent = `${diagonal}px`;
    }

    // Atualiza as informações ao carregar a página
    updateScreenInfo();

    // Atualiza as informações quando a janela é redimensionada
    window.addEventListener('resize', updateScreenInfo);
});