import { scroll, animate, inView } from 'motion';

export function initScrollAnimations() {
  // ==========================================
  // 1. PRIMEIRA SECÇÃO (Who is Vasco?): Scroll Progressivo
  // ==========================================
  const aboutSection = document.querySelector('#about-section');
  const glassCard = document.querySelector('.glass-card');

  if (aboutSection && glassCard) {
    scroll(
      animate(glassCard, {
        opacity: [0, 1, 1, 0],
        transform: [
          'translateY(150px) scale(0.05)',
          'translateY(0px) scale(1)',
          'translateY(0px) scale(1)',
          'translateY(-80px) scale(0.9)'
        ],
        borderRadius: ['50%', '20px', '20px', '20px']
      }),
      {
        target: aboutSection,
        offset: ['start end', 'end start']
      }
    );
  }

  // ==========================================
  // 2. SECÇÃO DE PROJETOS: Scroll Progressivo (Moldura Fixa + Livros a Arrastar)
  // ==========================================
  const projectsSection = document.querySelector('.projects-section');
  const shelfContainer = document.querySelector('.shelf-container');
  const projectBooks = document.querySelectorAll('.project-book');
  const projectTitle = document.querySelector('.projects-section .section-title');

  if (projectsSection) {
    // A) Entrada/Saída suave de toda a moldura (sem arrasto lateral)
    if (shelfContainer) {
      scroll(
        animate(shelfContainer, {
          opacity: [0, 1, 1, 0],
          transform: [
            'translateY(80px) scale(0.95)',
            'translateY(0px) scale(1)',
            'translateY(0px) scale(1)',
            'translateY(-50px) scale(0.95)'
          ]
        }),
        {
          target: projectsSection,
          offset: ['start end', 'end start']
        }
      );
    }

    // B) SOMENTE OS LIVROS deslizam da Direita -> Esquerda mantendo a linha fixa abaixo
    if (projectBooks.length > 0) {
      scroll(
        animate(projectBooks, {
          transform: [
            'translateX(120px)',
            'translateX(0px)',
            'translateX(0px)',
            'translateX(-120px)'
          ],
          opacity: [0, 1, 1, 0]
        }),
        {
          target: projectsSection,
          offset: ['start end', 'end start']
        }
      );
    }

    // C) Título da Secção
    if (projectTitle) {
      scroll(
        animate(projectTitle, {
          opacity: [0, 1, 1, 0],
          transform: [
            'translateY(40px)',
            'translateY(0px)',
            'translateY(0px)',
            'translateY(-30px)'
          ]
        }),
        {
          target: projectsSection,
          offset: ['start end', 'end start']
        }
      );
    }
  }

  // ==========================================
  // 3. RESTANTES SECÇÕES: Aparição Standard
  // ==========================================
  const revealSections = document.querySelectorAll(
    '[data-animate="fade-up"]:not(#about-section):not(.projects-section):not(#other-world-section):not(#socials-section)'
  );

  revealSections.forEach((section) => {
    inView(section, () => {
      animate(
        section,
        { opacity: 1, transform: 'translateY(0)' },
        { duration: 0.8, easing: 'ease-out' }
      );
    });
  });


  // ==========================================
  // 4. GAMING SECTION: Scroll Progressivo + Stagger dos Cards Sociais
  // ==========================================
  const otherWorldSection = document.querySelector('#other-world-section');
  const gamingCard = document.querySelector('.gaming-card');
  const socialCards = document.querySelectorAll('.social-card');

  if (otherWorldSection && gamingCard) {
    scroll(
      animate(gamingCard, {
        opacity: [0, 1, 1, 0],
        transform: [
          'translateY(100px) scale(0.9)',
          'translateY(0px) scale(1)',
          'translateY(0px) scale(1)',
          'translateY(-60px) scale(0.95)'
        ]
      }),
      {
        target: otherWorldSection,
        offset: ['start end', 'end start']
      }
    );

    // Stagger: cada card social (TikTok, Instagram) entra com um pequeno atraso
    if (socialCards.length > 0) {
      inView(otherWorldSection, () => {
        socialCards.forEach((card, i) => {
          animate(
            card,
            { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
            { duration: 0.5, delay: i * 0.1, easing: [0.22, 1, 0.36, 1] }
          );
        });
      }, { amount: 0.4 });
    }
  }

  // ==========================================
  // 5. SOCIALS SECTION: Scroll Progressivo + Stagger dos Botões
  // ==========================================
  const socialsSection = document.querySelector('#socials-section');
  const socialsCard = document.querySelector('.socials-card');
  const socialBtns = document.querySelectorAll('.social-btn');

  if (socialsSection && socialsCard) {
    scroll(
      animate(socialsCard, {
        opacity: [0, 1, 1, 0],
        transform: [
          'translateY(100px) scale(0.9)',
          'translateY(0px) scale(1)',
          'translateY(0px) scale(1)',
          'translateY(-60px) scale(0.95)'
        ]
      }),
      {
        target: socialsSection,
        offset: ['start end', 'end start']
      }
    );

    // Stagger: os 4 botões (GitHub, LinkedIn, Instagram, Email) entram um a um
    if (socialBtns.length > 0) {
      inView(socialsSection, () => {
        socialBtns.forEach((btn, i) => {
          animate(
            btn,
            { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
            { duration: 0.5, delay: i * 0.1, easing: [0.22, 1, 0.36, 1] }
          );
        });
      }, { amount: 0.4 });
    }
  }
}