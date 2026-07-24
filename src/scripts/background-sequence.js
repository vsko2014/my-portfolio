import { scroll } from 'motion';

/**
 * Cria um efeito de "vídeo scrubado pelo scroll" desenhando uma sequência
 * de imagens num <canvas>, à semelhança do hero do site do GTA VI.
 *
 * @param {Object} opts
 * @param {string} opts.canvasSelector  - seletor do elemento <canvas>
 * @param {string} opts.sectionSelector - seletor da secção "alta" que dá espaço ao scroll
 * @param {string} opts.framesPath      - pasta com os frames (relativa a /public)
 * @param {number} opts.frameCount      - número total de frames
 * @param {(i:number)=>string} [opts.frameName] - como gerar o nome de cada ficheiro
 */
export function initBackgroundSequence({
  canvasSelector,
  sectionSelector,
  framesPath,
  frameCount,
  frameName = (i) => `ezgif-frame-${String(i).padStart(3, '0')}.jpg`,
}) {
  const canvas = document.querySelector(canvasSelector);
  const section = document.querySelector(sectionSelector);
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  const images = new Array(frameCount);
  let currentFrame = 0;
  let loadedCount = 0;

  // Pré-carrega todas as imagens da sequência
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}${framesPath}/${frameName(i + 1)}`;
    img.onload = () => {
      loadedCount++;
      if (i === currentFrame) render();
    };
    images[i] = img;
  }

  function resizeCanvas() {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    render();
  }

  // Desenha a imagem em modo "cover" (preenche o canvas sem distorcer)
  function render() {
    const img = images[currentFrame];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = img.naturalWidth * (canvas.height / img.naturalHeight);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.naturalHeight * (canvas.width / img.naturalWidth);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Liga o progresso do scroll dentro da secção ao índice do frame
  scroll(
    (progress) => {
      currentFrame = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      render();
    },
    { target: section, offset: ['start start', 'end end'] }
  );
}
