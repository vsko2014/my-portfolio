import { animate } from 'motion';

export function initProjectsModal() {
    // ==========================================
    // 1. LÓGICA DOS MODAIS DOS PROJETOS
    // ==========================================
    const books = document.querySelectorAll('.project-book');
    const overlay = document.querySelector('#modal-overlay');
    const modals = document.querySelectorAll('.folder-modal');
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    function openModal(modalId) {
        // Se o Lightbox fullscreen estiver aberto, ignora
        if (lightbox && lightbox.open) return;

        const targetModal = document.getElementById(modalId);
        if (!targetModal || targetModal.classList.contains('active')) return;

        // Bloqueia o scroll do fundo enquanto o modal está aberto
        document.body.classList.add('modal-open');

        modals.forEach(m => {
            if (m !== targetModal && m.classList.contains('active')) {
                m.classList.remove('active');
                m.style.display = 'none';
            }
        });

        overlay.classList.add('active');
        targetModal.style.display = 'block';
        targetModal.classList.add('active');

        animate(
            targetModal,
            {
                scale: [0.85, 1],
                opacity: [0, 1],
                y: [30, 0],
                filter: ['blur(6px)', 'blur(0px)']
            },
            { type: 'spring', stiffness: 300, damping: 22 }
        );
    }

    function closeModal() {
        // Se o lightbox em fullscreen estiver aberto, não fecha o modal do projeto
        if (lightbox && lightbox.open) return;

        const activeModal = document.querySelector('.folder-modal.active');
        if (activeModal) {
            animate(
                activeModal,
                { scale: 0.9, opacity: 0, y: 15, filter: 'blur(4px)' },
                { duration: 0.18, easing: 'ease-out' }
            ).finished.then(() => {
                activeModal.classList.remove('active');
                activeModal.style.display = 'none';
                overlay.classList.remove('active');

                // Só desbloqueia o scroll do fundo DEPOIS da animação terminar
                document.body.classList.remove('modal-open');
            });
        } else {
            overlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    // Eventos dos Livros — clicar dentro abre o modal
    books.forEach(book => {
        const modalId = book.getAttribute('data-modal');
        book.addEventListener('click', () => openModal(modalId));
    });

    // Botão de fechar a janela do modal (X)
    document.querySelectorAll('.win-btn.close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    });

    // Clicar fora do modal (no fundo desfocado) para fechar
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }

    // ==========================================
    // 2. FUNCIONALIDADE FULLSCREEN / LIGHTBOX
    // ==========================================
    if (lightbox && lightboxImg) {
        // Abrir ao clicar em qualquer foto de galeria
        document.addEventListener('click', (e) => {
            if (e.target.matches('.project-gallery img')) {
                lightboxImg.src = e.target.src;
                lightboxImg.alt = e.target.alt;
                lightbox.showModal();
            }
        });

        // Fechar no botão X do lightbox
        if (closeBtn) {
            closeBtn.addEventListener('click', () => lightbox.close());
        }

        // Fechar ao clicar no fundo fora da imagem
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.close();
            }
        });
    }

    // ==========================================
    // 3. SCROLL HORIZONTAL DA GALERIA
    // ==========================================
    document.querySelectorAll('.project-gallery').forEach((gallery) => {
        gallery.addEventListener('wheel', (e) => {
            if (gallery.scrollWidth > gallery.clientWidth) {
                e.preventDefault();
                e.stopPropagation(); // Impede o evento de passar para o elemento pai
                gallery.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    });
}