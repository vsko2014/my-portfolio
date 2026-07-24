import { scroll } from 'motion';

const MIN_OPACITY = 0.5; // opacidade inicial, antes de qualquer scroll

export function initBoxReveal({ boxSelector, sectionSelector }) {
    const box = document.querySelector(boxSelector);
    const section = document.querySelector(sectionSelector);
    if (!box || !section) return;

    scroll(
        (progress) => {
            const opacity = MIN_OPACITY + (1 - MIN_OPACITY) * progress;
            box.style.opacity = opacity;
            box.style.transform = `scale(${0.85 + 0.15 * progress})`;
            box.style.setProperty('--glow', progress);
        },
        { target: section, offset: ['start end', 'start 10%'] }
    );
}