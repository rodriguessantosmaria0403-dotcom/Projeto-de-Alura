document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. BARRA DE PROGRESSO DE LEITURA (Injeção via Runtime)
    // ==========================================================================
    const createProgressBar = () => {
        const bar = document.createElement('div');
        bar.id = 'reading-progress-indicator';
        bar.style.position = 'fixed';
        bar.style.top = '0';
        bar.style.left = '0';
        bar.style.height = '4px';
        bar.style.backgroundColor = 'var(--accent-color)';
        bar.style.width = '0%';
        bar.style.zIndex = '5000';
        bar.style.transition = 'width 0.1s linear';
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScrollableHeight > 0) {
                const currentProgressPercentage = (window.scrollY / totalScrollableHeight) * 100;
                bar.style.width = `${currentProgressPercentage}%`;
            }
        });
    };
    createProgressBar();

    // ==========================================================================
    // 2. GERENCIADOR DE TEMA VISUAL (Modo Escuro / Claro estável)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    
    // Verifica se há escolha salva anteriormente localmente no navegador
    const currentActiveTheme = localStorage.getItem('user-selected-theme');
    if (currentActiveTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Modo Claro';
    }

    themeToggle.addEventListener('click', () => {
        const isCurrentlyDark = document.body.getAttribute('data-theme') === 'dark';
        
        if (isCurrentlyDark) {
            document.body.removeAttribute('data-theme');
            themeToggle.textContent = 'Modo Escuro';
            localStorage.setItem('user-selected-theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Modo Claro';
            localStorage.setItem('user-selected-theme', 'dark');
        }
    });

    // ==========================================================================
    // 3. ANIMAÇÃO DRAMÁTICA DE REGRESSÃO ESTATÍSTICA (Intersection Observer)
    // ==========================================================================
    const metricElement = document.getElementById('animated-metric');

    const startRegressiveCounter = () => {
        if (!metricElement) return;

        let initialValue = 100;
        
        // Efeito decrescente que vai de 100% até 0% para ilustrar o corte de acessos
        const continuousTimer = setInterval(() => {
            initialValue -= 2; // Passo da redução rápida
            metricElement.textContent = `${initialValue}%`;
            
            if (initialValue <= 0) {
                clearInterval(continuousTimer);
                metricElement.textContent = '0%'; // Garante a cravação exata no zero
            }
        }, 25); // Velocidade da transição de atualização
    };

    // Ativa o contador somente quando o painel estiver de fato na área visível
    const panelObserver = new IntersectionObserver((observedEntries) => {
        observedEntries.forEach(entry => {
            if (entry.isIntersecting) {
                startRegressiveCounter();
                panelObserver.unobserve(entry.target); // Impede disparos repetidos
            }
        });
    }, { threshold: 0.3 }); // Exige que ao menos 30% do painel esteja em tela

    const interactiveSection = document.querySelector('.interactive-panel');
    if (interactiveSection) {
        panelObserver.observe(interactiveSection);
    }

    // ==========================================================================
    // 4. GERENCIAMENTO DE EXIBIÇÃO DO MODAL EDITORIAL
    // ==========================================================================
    const alertButton = document.getElementById('alert-btn');
    const modalWindow = document.getElementById('custom-modal');
    const modalCloseButton = document.getElementById('modal-close-btn');

    const openEditorialModal = () => {
        if (modalWindow) {
            modalWindow.classList.add('active');
            modalWindow.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Evita scroll ao ler modal
        }
    };

    const closeEditorialModal = () => {
        if (modalWindow) {
            modalWindow.classList.remove('active');
            modalWindow.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Devolve o scroll normal
        }
    };

    // Ouvintes de Eventos para interações no modal
    if (alertButton) alertButton.addEventListener('click', openEditorialModal);
    if (modalCloseButton) modalCloseButton.addEventListener('click', closeEditorialModal);

    // Fecha o modal caso clique fora da caixa interna de conteúdo (no fundo escuro)
    if (modalWindow) {
        modalWindow.addEventListener('click', (event) => {
            if (event.target === modalWindow) {
                closeEditorialModal();
            }
        });
    }

    // Acessibilidade extra: fecha pressionando a tecla 'Escape' do teclado
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalWindow.classList.contains('active')) {
            closeEditorialModal();
        }
    });
});
