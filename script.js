document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const alertBtn = document.getElementById('alert-btn');

    // Funcionalidade de Alternar Modo Claro/Escuro
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeToggle.textContent = 'Modo Escuro';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Modo Claro';
        }
    });

    // Evento de Clique no Botão de Alerta Interativo
    alertBtn.addEventListener('click', () => {
        alert(
            "Alerta Humanitário 2026:\n\n" +
            "De acordo com relatórios recentes das Nações Unidas, o Afeganistão enfrenta o maior retrocesso global em direitos das mulheres deste século. " +
            "A comunidade internacional apela por canais de apoio urgentes e proteção a ativistas locais."
        );
    });
});
