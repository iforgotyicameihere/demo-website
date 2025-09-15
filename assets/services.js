document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject CSS for the background video
  const style = document.createElement('style');
  style.textContent = `
    .bg-video {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
      filter: brightness(0.8);
      background: #000; /* prevents white flash */
      pointer-events: none;
    }
    body > *:not(.bg-video) {
      position: relative;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);

  // 2. Create the video element
  const vid = document.createElement('video');
  vid.className = 'bg-video';
  vid.setAttribute('autoplay', '');
  vid.setAttribute('muted', '');       // muted required for autoplay
  vid.setAttribute('loop', '');
  vid.setAttribute('playsinline', ''); // mobile
  const src = document.createElement('source');
  src.src = 'assets/20250914_2217_Mushroom Spore Art_storyboard_01k55jjtfveghrq9r6jdmw3emp.mp4';
  src.type = 'video/mp4';
  vid.appendChild(src);

  // 3. Insert into the page
  document.body.prepend(vid);

  // 4. Try to force playback (for Safari/Chrome quirks)
  const tryPlay = () => vid.play().catch(() => {});
  vid.addEventListener('canplay', tryPlay, { once: true });
  window.addEventListener('load', tryPlay);
});
