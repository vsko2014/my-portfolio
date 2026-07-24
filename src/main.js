import './styles/main.css';
import { initSmoothScroll } from './scripts/smooth-scroll.js';
import { initScrollAnimations } from './scripts/animations.js';
import { initParticlesBackground } from './scripts/particles-background.js';
import { initProjectsModal } from './scripts/projects-modal.js';
import { initCustomCursor } from './scripts/custom-cursor.js';
// import { initBoxReveal } from './scripts/box-reveal.js';

// 1. Ativa o scroll suave (Lenis)
initSmoothScroll();

// 2. Ativa as animações ligadas ao scroll (Motion)
initScrollAnimations();

// 3. Ativa apenas o fundo interativo de partículas
initParticlesBackground({
  canvasSelector: '#bg-canvas',
  particleCount: 120,
});

initProjectsModal();

initCustomCursor();

const emailBtn = document.getElementById('copy-email-btn');
const emailTitle = document.getElementById('email-btn-title');
const emailSub = document.getElementById('email-btn-sub');
const emailArrow = document.getElementById('email-btn-arrow');

if (emailBtn) {
  emailBtn.addEventListener('click', async () => {
    const emailToCopy = emailBtn.getAttribute('data-email');

    try {
      // Copia para a área de transferência do sistema
      await navigator.clipboard.writeText(emailToCopy);

      // Feedback visual ao utilizador
      emailTitle.textContent = 'Copied!';
      emailSub.textContent = emailToCopy;
      emailArrow.textContent = '✓';
      emailBtn.classList.add('copied');

      // Restaura o estado original após 2.5 segundos
      setTimeout(() => {
        emailTitle.textContent = 'Email Me';
        emailSub.textContent = 'Click to copy address';
        emailArrow.innerHTML = '&rarr;';
        emailBtn.classList.remove('copied');
      }, 2500);

    } catch (err) {
      // Fallback caso o navegador bloqueie a Clipboard API
      window.location.href = `mailto:${emailToCopy}`;
    }
  });
}

// Lógica para mostrar o Floating CV Button perto do fundo da página
const floatingCvBtn = document.getElementById('floating-cv-btn');

if (floatingCvBtn) {
  window.addEventListener('scroll', () => {
    // Calcula quanto o utilizador já percorreu
    const scrollPosition = window.scrollY + window.innerHeight;
    const threshold = document.documentElement.scrollHeight - 600;
    // Mostra o botão quando estiver a ~600px do fundo da página

    if (scrollPosition >= threshold) {
      floatingCvBtn.classList.add('visible');
    } else {
      floatingCvBtn.classList.remove('visible');
    }
  });
}

// initBoxReveal({
//   boxSelector: '.bg-sequence__box',
//   sectionSelector: '.bg-sequence',
// });
