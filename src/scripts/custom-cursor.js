export function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function render() {
        const ease = 0.3;
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

        requestAnimationFrame(render);
    }
    render();

    const interactiveEls = document.querySelectorAll(
        'a, button, .project-book, [data-cursor-hover]'
    );

    interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('custom-cursor--hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('custom-cursor--hover'));
    });

    document.addEventListener('mouseleave', () => cursor.classList.add('custom-cursor--hidden'));
    document.addEventListener('mouseenter', () => cursor.classList.remove('custom-cursor--hidden'));

    // Enquanto o lightbox está aberto, o cursor passa a viver DENTRO do <dialog>
    // (herda a "top layer" por ser descendente, sem depender da Popover API).
    // Ao fechar, volta para o <body>.
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        const observer = new MutationObserver(() => {
            if (lightbox.open) {
                lightbox.appendChild(cursor);
            } else {
                document.body.appendChild(cursor);
            }
        });
        observer.observe(lightbox, { attributes: true, attributeFilter: ['open'] });
    }
}