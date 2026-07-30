document.addEventListener("DOMContentLoaded", () => {
    // Inicialização da Data Editorial Local
    const inicializarDataPortal = () => {
        const elementoData = document.getElementById("data-atual");
        if (elementoData) {
            const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dataHoje = new Date();
            elementoData.textContent = dataHoje.toLocaleDateString('pt-BR', opcoesData);
        }
    };

    // Controle e Persistência do Tema de Leitura
    const inicializarGerenciadorTema = () => {
        const botaoAlternar = document.getElementById("alternar-tema");
        if (!botaoAlternar) return;

        const iconeBotao = botaoAlternar.querySelector("i");
        const chaveArmazenamento = "portal-tema-preferido";

        // Verifica estado salvo ou preferência do sistema operacional
        const obterTemaSalvo = () => {
            const salvo = localStorage.getItem(chaveArmazenamento);
            if (salvo) return salvo;
            
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        };

        const aplicarTema = (tema) => {
            if (tema === "dark") {
                document.body.classList.add("tema-escuro");
                iconeBotao.classList.replace("fa-moon", "fa-sun");
            } else {
                document.body.classList.remove("tema-escuro");
                iconeBotao.classList.replace("fa-sun", "fa-moon");
            }
        };

        // Execução inicial
        let temaAtual = obterTemaSalvo();
        aplicarTema(temaAtual);

        // Ouvinte do evento de clique
        botaoAlternar.addEventListener("click", () => {
            temaAtual = document.body.classList.contains("tema-escuro") ? "light" : "dark";
            aplicarTema(temaAtual);
            localStorage.setItem(chaveArmazenamento, temaAtual);
        });
    };

    // Inicialização dos módulos
    inicializarDataPortal();
    inicializarGerenciadorTema();
});
