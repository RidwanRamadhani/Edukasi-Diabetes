const sharp = require('sharp');
const fs = require('fs');

const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="50%" stop-color="#0f766e" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#grad)" />
  <g transform="translate(106, 90) scale(12.5)" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </g>
  <text x="256" y="425" font-family="Arial, sans-serif" font-size="56" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="3">DIASERA</text>
</svg>
`;

const desktopSvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="720" fill="#f8fafc" />
  <rect width="1280" height="72" fill="#ffffff" />
  <rect x="60" y="20" width="160" height="32" rx="8" fill="#0f766e" />
  <rect x="60" y="110" width="1160" height="260" rx="24" fill="#0f766e" />
  <text x="100" y="200" font-family="Arial, sans-serif" font-size="38" font-weight="900" fill="#ffffff">DIASERA Health</text>
  <text x="100" y="245" font-family="Arial, sans-serif" font-size="20" fill="#ccfbf1">Edukasi Interaktif &amp; Pemantauan Perilaku Hidup Sehat</text>
  <rect x="60" y="400" width="270" height="180" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
  <rect x="355" y="400" width="270" height="180" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
  <rect x="650" y="400" width="270" height="180" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
  <rect x="945" y="400" width="270" height="180" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
</svg>
`;

const mobileSvg = `
<svg width="720" height="1280" viewBox="0 0 720 1280" xmlns="http://www.w3.org/2000/svg">
  <rect width="720" height="1280" fill="#f8fafc" />
  <rect width="720" height="88" fill="#ffffff" />
  <rect x="40" y="24" width="180" height="40" rx="10" fill="#0f766e" />
  <rect x="30" y="120" width="660" height="320" rx="24" fill="#0f766e" />
  <text x="60" y="220" font-family="Arial, sans-serif" font-size="36" font-weight="900" fill="#ffffff">DIASERA</text>
  <text x="60" y="270" font-family="Arial, sans-serif" font-size="18" fill="#ccfbf1">Edukasi &amp; Pemantauan Diabetes</text>
  <rect x="30" y="470" width="660" height="150" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
  <rect x="30" y="640" width="660" height="150" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
  <rect x="30" y="810" width="660" height="150" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
</svg>
`;

fs.writeFileSync('public/icon.svg', svg.trim());

Promise.all([
  sharp(Buffer.from(svg)).resize(192, 192).png().toFile('public/icon-192.png'),
  sharp(Buffer.from(svg)).resize(512, 512).png().toFile('public/icon-512.png'),
  sharp(Buffer.from(svg)).resize(180, 180).png().toFile('public/apple-touch-icon.png'),
  sharp(Buffer.from(desktopSvg)).resize(1280, 720).png().toFile('public/screenshot-desktop.png'),
  sharp(Buffer.from(mobileSvg)).resize(720, 1280).png().toFile('public/screenshot-mobile.png')
]).then(() => {
  console.log('PWA icons and screenshots created successfully!');
}).catch(err => {
  console.error('Error generating assets:', err);
});
