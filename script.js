document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Inteligente
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.hasAttribute('data-theme');
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 2. Barra de progresso de leitura dinâmica
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        document.getElementById('progress-bar').style.width = scrolled + '%';
    });

    // 3. Sistema de busca em tempo real refinado
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');
    const sections = document.querySelectorAll('.blog-section');
    const noResults = document.getElementById('no-results');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        let hasVisibleCards = false;

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const text = card.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(term) || text.includes(term);

            if (matches) {
                card.classList.remove('hidden');
                card.classList.add('visible'); // Garante visibilidade ao pesquisar
                hasVisibleCards = true;
            } else {
                card.classList.add('hidden');
            }
        });

        // Oculta seções vazias de forma fluida
        sections.forEach(section => {
            const visibleCardsInSection = section.querySelectorAll('.card:not(.hidden)').length;
            if (visibleCardsInSection === 0 && term !== '') {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        });

        if (!hasVisibleCards && term !== '') {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    });

    // 4. Animação de Scroll via Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    cards.forEach(card => observer.observe(card));

    // 5. Links ativos na barra de navegação com escopo atualizado
    const navItems = document.querySelectorAll('.nav-item');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(currentSection)) {
                item.classList.add('active');
            }
        });
    });
});
