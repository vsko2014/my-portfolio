export function initParticlesBackground({ canvasSelector, particleCount = 120 }) {
    const canvas = document.querySelector(canvasSelector);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
        // Usa window.innerWidth/Height para garantir a dimensão do ecrã mesmo se o CSS demorar a renderizar
        width = canvas.width = (window.innerWidth || canvas.clientWidth) * window.devicePixelRatio;
        height = canvas.height = (window.innerHeight || canvas.clientHeight) * window.devicePixelRatio;
    }

    function createParticles() {
        particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: (Math.random() * 2 + 1) * window.devicePixelRatio,
        }));
    }

    function update() {
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
            // Movimento natural
            p.x += p.vx;
            p.y += p.vy;

            // Reage ao rato: afasta as partículas próximas
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const influenceRadius = 150 * window.devicePixelRatio;

            // Proteção contra 'NaN' (evita divisão por zero quando a distância é 0)
            if (dist > 0 && dist < influenceRadius) {
                const force = (influenceRadius - dist) / influenceRadius;
                p.x += (dx / dist) * force * 3;
                p.y += (dy / dist) * force * 3;
            }

            // Volta a entrar pelo lado oposto ao sair do ecrã
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            // Desenha a partícula
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }

        requestAnimationFrame(update);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) * window.devicePixelRatio;
        mouse.y = (e.clientY - rect.top) * window.devicePixelRatio;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    // Inicialização garantida
    resize();
    createParticles();
    requestAnimationFrame(update);
}