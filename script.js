document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualização automática da data do jornal no formato local
    const dateElement = document.getElementById("current-date");
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('pt-BR', options);
    }

    // 2. Sistema de Alternância para o Modo Escuro (Leitura Noturna)
    const toggleButton = document.getElementById("dark-mode-toggle");
    const icon = toggleButton.querySelector("i");

    // Verifica preferência anterior salva no navegador
    if (localStorage.getItem("news-theme") === "dark") {
        document.body.classList.add("dark-theme");
        icon.classList.replace("fa-moon", "fa-sun");
    }

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("news-theme", "dark");
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            localStorage.setItem("news-theme", "light");
            icon.classList.replace("fa-sun", "fa-moon");
        }
    });
});
