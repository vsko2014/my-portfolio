export function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';

    // Promove o cursor para a "top layer" do browser (mesma camada
    // onde o <dialog> em fullscreen é renderizado), para nunca ficar
    // escondido atrás da imagem.
    cursor.setAttribute('popover', 'manual');
    document.body.appendChild(cursor);

    if (cursor.showPopover) {
        cursor.showPopover();
    }

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

    // Sempre que o lightbox (ou qualquer <dialog>) abre, ele entra
    // também na "top layer" e ficaria por cima do cursor. Ao re-promover
    // o cursor (hide + show) depois disso, ele volta a ficar no topo.
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox && cursor.showPopover) {
        const observer = new MutationObserver(() => {
            if (lightbox.open) {
                cursor.hidePopover();
                cursor.showPopover();
            }
        });
        observer.observe(lightbox, { attributes: true, attributeFilter: ['open'] });
    }
}