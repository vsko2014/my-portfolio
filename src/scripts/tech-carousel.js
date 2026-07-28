
// Ícones disponíveis em: https://devicon.dev/
const TECHS = [
    { name: 'HTML5', icon: 'html5/html5-original' },
    { name: 'CSS3', icon: 'css3/css3-original' },
    { name: 'JavaScript', icon: 'javascript/javascript-original' },
    { name: 'React', icon: 'react/react-original' },
    { name: 'Node.js', icon: 'nodejs/nodejs-original' },
    { name: 'Flutter', icon: 'flutter/flutter-original' },
    { name: 'PostgreSQL', icon: 'postgresql/postgresql-original' },
    { name: 'C', icon: 'c/c-original' },
    { name: 'Git', icon: 'git/git-original' },
    { name: 'GitHub', icon: 'github/github-original' },
];

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

export function initTechCarousel() {
    const track = document.querySelector('.tech-carousel__track');
    if (!track) return;

    const iconsHtml = TECHS.map(
        (t) =>
            `<img src="${CDN_BASE}/${t.icon}.svg" alt="${t.name}" title="${t.name}" class="tech-carousel__icon" loading="lazy" />`
    ).join('');

    // Duplica a lista para o loop infinito ficar contínuo (sem "salto" no fim)
    track.innerHTML = iconsHtml + iconsHtml;
}