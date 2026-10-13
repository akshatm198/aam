/**
 * ROMANTIC SURPRISE EXPERIENCE - ARCHITA & AKSHAT
 * Populated with extracted photos, voice note, and handwritten birthday letter.
 */

const CONFIG = {
  // Personalization
  recipientName: "Archita",
  senderName: "Akshat",
  specialDate: "February 1, 2026",

  // Section 2: 3D Gift Box Inner Revealed Sentiment
  giftBoxMessage: `I was thinking about you. You are so special for me and I'm also nothing without you 🫠🧿

💗 Happiest birthday meri jaan 🫠 may God bless ki tu mere sth rhe khush rhe 🧿🫶🏻`,

  // Section 4: Photo Gallery with All 8 Uploaded Photos
  galleryPhotos: [
    {
      url: "https://ourmoments.live/wp-content/uploads/om-photos/om_94434419ad4a3fb275685f91ffe94136_1791866407.webp",
      caption: "Our Favorite Memory"
    },
    {
      url: "https://ourmoments.live/wp-content/uploads/om-photos/om_263ae4d7d800c0f5b95abafca022d345_1791866407.webp",
      caption: "Your Beautiful Smile"
    },
    {
      url: "https://ourmoments.live/wp-content/uploads/om-photos/om_d18503ff653eaf85d474d18318444536_1791866407.webp",
      caption: "Every Cherished Second"
    },
    {
      url: "https://ourmoments.live/wp-content/uploads/om-photos/om_6b3698b51fcd79e86405038ec62fe745_1791866407.webp",
      caption: "Purest Happiness"
    },
    {
      url: "https://ourmoments.live/wp-content/uploads/om-photos/om_649bd28df92930f580e296411f9194ee_1791866408.webp",
      caption: "Together In Heart"
    },
    {
      url: "https://ourmoments.live/wp-content/uploads/om-photos/om_d4e95c271b6764cf5fb113393eea5030_1791866408.webp",
      caption: "Late Night Talks"
    },
    {
      url: "https://ourmoments.live/wp-content/uploads/om-photos/om_cc03328a3612d4ec2a7f3442a9b01f94_1791866409.webp",
      caption: "My Whole World"
    },
    {
      url: "https://ourmoments.live/wp-content/uploads/om-photos/om_728b84e1ca4bfd78b1f70bdf035ebbc5_1791866418.webp",
      caption: "Forever & Always"
    }
  ],

  // Section 5: Puzzle Target Image (Photo 1)
  puzzleImageUrl: "https://ourmoments.live/wp-content/uploads/om-photos/om_94434419ad4a3fb275685f91ffe94136_1791866407.webp",

  // Section 6: Personal Birthday Love Letter from Akshat to Archita
  loveLetterText: [
    "Happy Birthday, meri pyaari Archita! 🎂❤️🥹",
    "Tum meri zindagi ka woh khoobsurat ehsaas ho, jise main lafzon mein bayaan nahi kar sakta. Tumhari smile meri khushi hai aur tumhara saath meri sabse pyaari khwahish. 💗",
    "Main tumhare saath khoobsurat yaadein banana aur tumhari khushi ki wajah banna chahta hoon. 💌",
    "I LOVE YOU, ARCHITA! ❤️ Kya tum meri mohabbat ko apnaogi aur meri zindagi ki sabse khoobsurat love story banogi? 🫶🏻",
    "Tum hmesha muskupati rho aur tumhare sare sapne pore ho. Happy birthday meri jaan! 🎂✨"
  ],

  // Section 7: Voice Message Audio URL
  voiceAudioUrl: "https://ourmoments.live/wp-content/uploads/om-photos/omv_c58efd4a16b7656bb64d298949e11b74_1791871442.webm",

  // Section 8: Sacred Promises
  promises: [
    "Never go to bed angry",
    "Say the hard thing, gently",
    "Always share the last bite",
    "Hold your hand in every crowd",
    "Answer the phone at 3am, always"
  ]
};

// Vector Heart Fallback in case any network image fails
const FallbackAssets = {
  createHeartSvgUrl(captionText) {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a0e17"/>
          <stop offset="100%" stop-color="#e63946"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#grad)"/>
      <path d="M300 480 C 140 360, 60 260, 100 160 C 130 90, 230 90, 300 190 C 370 90, 470 90, 500 160 C 540 260, 460 360, 300 480 Z" fill="#ffb3c1" opacity="0.85"/>
      <text x="300" y="530" font-family="sans-serif" font-size="28" fill="#fff0f3" text-anchor="middle">${captionText || 'Archita & Akshat'}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  }
};

// Web Audio API Synthesizer
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) this.audioCtx = new AudioClass();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playChime() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.18, this.audioCtx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + idx * 0.08 + 0.75);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + idx * 0.08);
      osc.stop(this.audioCtx.currentTime + idx * 0.08 + 0.8);
    });
  }

  playSoftRustle() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.audioCtx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.22);
  }
}

const sounds = new SoundEngine();

// Procedural Tree & Petals
class ProceduralLoveTreeEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.maxPetals = 65;
    this.treeBufferCanvas = document.createElement('canvas');
    this.treeBufferCtx = this.treeBufferCanvas.getContext('2d');
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initPetals();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.treeBufferCanvas.width = this.width;
    this.treeBufferCanvas.height = this.height;
    this.drawFractalTreeBuffer();
  }

  drawFractalTreeBuffer() {
    const ctx = this.treeBufferCtx;
    ctx.clearRect(0, 0, this.width, this.height);
    const startX = this.width > 768 ? this.width * 0.82 : this.width * 0.88;
    const startY = this.height;
    const trunkLen = Math.min(this.height * 0.28, 140);
    
    ctx.save();
    ctx.strokeStyle = '#3a0c18';
    ctx.lineCap = 'round';
    this.drawBranch(ctx, startX, startY, trunkLen, -Math.PI / 2, 14);
    ctx.restore();
  }

  drawBranch(ctx, x, y, length, angle, branchWidth) {
    ctx.save();
    ctx.lineWidth = branchWidth;
    ctx.strokeStyle = '#420d1c';
    ctx.beginPath();
    ctx.moveTo(x, y);
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    ctx.lineTo(endX, endY);
    ctx.stroke();

    if (length < 12) {
      this.drawBlossomCluster(ctx, endX, endY);
      ctx.restore();
      return;
    }

    for (let i = 0; i < 2; i++) {
      const angleVariation = (i === 0 ? -1 : 1) * (0.28 + Math.random() * 0.18);
      const nextLength = length * (0.72 + Math.random() * 0.1);
      this.drawBranch(ctx, endX, endY, nextLength, angle + angleVariation, branchWidth * 0.68);
    }
    ctx.restore();
  }

  drawBlossomCluster(ctx, x, y) {
    const petalColors = ['#ff758f', '#ffb3c1', '#e63946', '#ffffff'];
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      const angle = (Math.PI * 2 / 4) * i + Math.random() * 0.3;
      const dist = Math.random() * 10;
      ctx.fillStyle = petalColors[Math.floor(Math.random() * petalColors.length)];
      ctx.globalAlpha = 0.75;
      ctx.arc(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, 3 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  initPetals() {
    this.petals = [];
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createPetal(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -20,
      size: 5 + Math.random() * 9,
      speedY: 0.8 + Math.random() * 1.6,
      speedX: (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      swayFreq: 0.01 + Math.random() * 0.02,
      alpha: 0.4 + Math.random() * 0.55,
      isHeart: Math.random() > 0.45
    };
  }

  burstBlossoms() {
    sounds.playChime();
    for (let i = 0; i < 35; i++) {
      const p = this.createPetal(false);
      p.x = this.width / 2 + (Math.random() - 0.5) * 300;
      p.y = this.height * 0.45 + (Math.random() - 0.5) * 150;
      p.speedY = 1.5 + Math.random() * 3;
      this.petals.push(p);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.treeBufferCanvas, 0, 0);

    const now = Date.now();
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.y += p.speedY;
      p.x += Math.sin(now * p.swayFreq) * 0.8 + p.speedX;
      p.rotation += p.rotSpeed;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.alpha;

      if (p.isHeart) {
        this.ctx.fillStyle = '#ff758f';
        this.ctx.beginPath();
        const s = p.size * 0.6;
        this.ctx.moveTo(0, s * 0.3);
        this.ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.6, 0, s * 1.3);
        this.ctx.bezierCurveTo(s * 1.2, s * 0.6, s, -s * 0.5, 0, s * 0.3);
        this.ctx.fill();
      } else {
        this.ctx.fillStyle = '#ffb3c1';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size * 0.8, p.size * 0.4, 0, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();

      if (p.y > this.height + 30 || p.x < -30 || p.x > this.width + 30) {
        if (this.petals.length > this.maxPetals) {
          this.petals.splice(i, 1);
          i--;
        } else {
          this.petals[i] = this.createPetal(false);
        }
      }
    }

    requestAnimationFrame(this.animate);
  }
}

// 3x3 Photo Puzzle Game
class PhotoPuzzleGame {
  constructor(containerId, previewImgId, statusId, imageUrl) {
    this.container = document.getElementById(containerId);
    this.previewImg = document.getElementById(previewImgId);
    this.statusText = document.getElementById(statusId);
    this.imageUrl = imageUrl;
    this.correctOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.currentOrder = [...this.correctOrder];
    this.selectedTileIndex = null;
    this.isSolved = false;
    this.init();
  }

  init() {
    this.previewImg.src = this.imageUrl;
    this.previewImg.onerror = () => {
      this.imageUrl = FallbackAssets.createHeartSvgUrl("Archita & Akshat");
      this.previewImg.src = this.imageUrl;
      this.render();
    };

    const img = new Image();
    img.src = this.imageUrl;
    img.onload = () => {
      this.scramble();
      this.render();
    };
    img.onerror = () => {
      this.imageUrl = FallbackAssets.createHeartSvgUrl("Archita & Akshat");
      this.scramble();
      this.render();
    };
  }

  scramble() {
    this.isSolved = false;
    this.statusText.textContent = "Tap or drag tiles to restore our photo.";
    this.statusText.style.color = "rgba(255, 240, 243, 0.75)";
    
    for (let i = this.currentOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.currentOrder[i], this.currentOrder[j]] = [this.currentOrder[j], this.currentOrder[i]];
    }

    if (this.checkSolvedState()) {
      [this.currentOrder[0], this.currentOrder[1]] = [this.currentOrder[1], this.currentOrder[0]];
    }
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.currentOrder.forEach((tileValue, gridSlot) => {
      const tile = document.createElement('div');
      tile.className = 'puzzle-tile';
      tile.setAttribute('role', 'button');
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('aria-label', `Puzzle tile at index ${gridSlot + 1}`);

      const row = Math.floor(tileValue / 3);
      const col = tileValue % 3;
      tile.style.backgroundImage = `url("${this.imageUrl}")`;
      tile.style.backgroundSize = '300% 300%';
      tile.style.backgroundPosition = `${col * 50}% ${row * 50}%`;

      tile.draggable = true;
      tile.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', gridSlot);
        tile.classList.add('selected');
      });
      tile.addEventListener('dragend', () => tile.classList.remove('selected'));
      tile.addEventListener('dragover', (e) => e.preventDefault());
      tile.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromSlot = parseInt(e.dataTransfer.getData('text/plain'), 10);
        this.swapSlots(fromSlot, gridSlot);
      });

      tile.addEventListener('click', () => this.handleTileClick(gridSlot));
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleTileClick(gridSlot);
        }
      });

      this.container.appendChild(tile);
    });
  }

  handleTileClick(slotIndex) {
    if (this.isSolved) return;

    sounds.playSoftRustle();
    if (this.selectedTileIndex === null) {
      this.selectedTileIndex = slotIndex;
      this.highlightTile(slotIndex, true);
    } else {
      if (this.selectedTileIndex === slotIndex) {
        this.highlightTile(slotIndex, false);
        this.selectedTileIndex = null;
      } else {
        const prevSlot = this.selectedTileIndex;
        this.selectedTileIndex = null;
        this.swapSlots(prevSlot, slotIndex);
      }
    }
  }

  highlightTile(slot, enable) {
    const tile = this.container.children[slot];
    if (tile) {
      if (enable) tile.classList.add('selected');
      else tile.classList.remove('selected');
    }
  }

  swapSlots(slotA, slotB) {
    [this.currentOrder[slotA], this.currentOrder[slotB]] = [this.currentOrder[slotB], this.currentOrder[slotA]];
    this.render();

    if (this.checkSolvedState()) {
      this.triggerSolvedVictory();
    }
  }

  checkSolvedState() {
    return this.currentOrder.every((val, idx) => val === this.correctOrder[idx]);
  }

  solveInstantly() {
    this.currentOrder = [...this.correctOrder];
    this.render();
    this.triggerSolvedVictory();
  }

  triggerSolvedVictory() {
    this.isSolved = true;
    sounds.playChime();
    this.statusText.textContent = "✨ Beautiful! Our picture is complete, Archita! ✨";
    this.statusText.style.color = "var(--accent-gold)";
    Array.from(this.container.children).forEach(tile => tile.classList.add('tile-solved'));
  }
}

// Lifecycle Initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Synchronize Names & Messages
  document.getElementById('recipient-heading-name').textContent = `For ${CONFIG.recipientName}, Always`;
  document.getElementById('gift-card-recipient-text').textContent = `${CONFIG.recipientName},`;
  document.getElementById('gift-message-text').textContent = CONFIG.giftBoxMessage;
  document.getElementById('letter-recipient-name').textContent = `My Dearest ${CONFIG.recipientName},`;
  document.getElementById('letter-date-display').textContent = `${CONFIG.specialDate} & Always`;

  // 2. Love Tree Engine
  const treeEngine = new ProceduralLoveTreeEngine('tree-canvas');
  document.getElementById('btn-burst-love').addEventListener('click', () => treeEngine.burstBlossoms());

  // 3. Welcome Curtain
  const btnEnter = document.getElementById('btn-enter');
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainWrapper = document.getElementById('main-content');

  btnEnter.addEventListener('click', () => {
    sounds.playChime();
    welcomeScreen.classList.add('curtain-closed');
    mainWrapper.classList.remove('content-concealed');
    mainWrapper.classList.add('content-revealed');
    document.body.classList.remove('loading-state');
  });

  // 4. Sound FX Toggle
  const btnToggleFx = document.getElementById('toggle-fx-sound');
  const iconSoundOn = btnToggleFx.querySelector('.icon-sound-on');
  const iconSoundOff = btnToggleFx.querySelector('.icon-sound-off');

  btnToggleFx.addEventListener('click', () => {
    sounds.soundEnabled = !sounds.soundEnabled;
    iconSoundOn.classList.toggle('hidden', !sounds.soundEnabled);
    iconSoundOff.classList.toggle('hidden', sounds.soundEnabled);
  });

  // 5. 3D Gift Box
  const giftBox = document.getElementById('gift-box');
  const giftHint = document.getElementById('gift-status-hint');

  const toggleGiftBox = () => {
    const isOpened = giftBox.classList.toggle('opened');
    giftBox.setAttribute('aria-expanded', isOpened);
    if (isOpened) {
      sounds.playChime();
      giftHint.textContent = "Your surprise awaits above! ✨";
    } else {
      sounds.playSoftRustle();
      giftHint.textContent = "Tap the box to open ✨";
    }
  };

  giftBox.addEventListener('click', toggleGiftBox);
  giftBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleGiftBox();
    }
  });

  // 6. Photo Gallery & Lightbox
  const galleryContainer = document.getElementById('photo-gallery-container');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');

  CONFIG.galleryPhotos.forEach((item, index) => {
    const rot = ((index % 3) - 1) * 2.5;
    const card = document.createElement('article');
    card.className = 'polaroid-card';
    card.style.setProperty('--rot', `${rot}deg`);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View: ${item.caption}`);

    card.innerHTML = `
      <div class="polaroid-img-frame">
        <img src="${item.url}" alt="${item.caption}" loading="lazy">
      </div>
      <p class="polaroid-caption">${item.caption}</p>
    `;

    const imgEl = card.querySelector('img');
    imgEl.onerror = () => {
      imgEl.src = FallbackAssets.createHeartSvgUrl(item.caption);
    };

    const openPhoto = () => {
      sounds.playSoftRustle();
      lightboxImg.src = imgEl.src;
      lightboxCaption.textContent = item.caption;
      lightbox.classList.remove('hidden');
    };

    card.addEventListener('click', openPhoto);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPhoto();
      }
    });

    galleryContainer.appendChild(card);
  });

  const closeLightbox = () => lightbox.classList.add('hidden');
  btnCloseLightbox.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // 7. Puzzle Initialization
  const puzzle = new PhotoPuzzleGame(
    'puzzle-board',
    'puzzle-preview-image',
    'puzzle-status',
    CONFIG.puzzleImageUrl
  );

  document.getElementById('btn-shuffle-puzzle').addEventListener('click', () => {
    sounds.playSoftRustle();
    puzzle.scramble();
  });

  document.getElementById('btn-solve-puzzle').addEventListener('click', () => {
    puzzle.solveInstantly();
  });

  // 8. Sealed Envelope & Handwritten Letter
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const waxSeal = document.getElementById('wax-seal');
  const envelopeHint = document.getElementById('envelope-hint');
  const letterBodyContainer = document.getElementById('letter-body-container');

  letterBodyContainer.innerHTML = CONFIG.loveLetterText.map(para => `<p>${para}</p>`).join('');

  const toggleEnvelope = () => {
    const isOpen = envelopeWrapper.classList.toggle('open');
    waxSeal.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      sounds.playChime();
      envelopeHint.textContent = "Scroll within the parchment to read every word 💌";
    } else {
      sounds.playSoftRustle();
      envelopeHint.textContent = "Click the heart wax seal to open 💌";
    }
  };

  waxSeal.addEventListener('click', toggleEnvelope);
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleEnvelope();
    }
  });

  // 9. Voice Audio Player (WebM Support)
  const audioEl = document.getElementById('romantic-audio-player');
  const audioSource = document.getElementById('audio-source');
  const btnAudioPlay = document.getElementById('btn-audio-play');
  const playIcon = btnAudioPlay.querySelector('.play-icon');
  const pauseIcon = btnAudioPlay.querySelector('.pause-icon');
  const audioCard = document.querySelector('.audio-player-card');
  const seekSlider = document.getElementById('audio-seek-slider');
  const timeCurrent = document.getElementById('audio-time-current');
  const timeTotal = document.getElementById('audio-time-total');

  audioSource.src = CONFIG.voiceAudioUrl;
  audioEl.load();

  const formatAudioTime = (sec) => {
    if (isNaN(sec)) return "0:00";
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  audioEl.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = formatAudioTime(audioEl.duration);
  });

  const toggleAudio = () => {
    sounds.init();
    if (audioEl.paused) {
      audioEl.play().then(() => {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        audioCard.classList.add('audio-playing');
      }).catch(() => {
        sounds.playChime();
        audioCard.classList.toggle('audio-playing');
      });
    } else {
      audioEl.pause();
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      audioCard.classList.remove('audio-playing');
    }
  };

  btnAudioPlay.addEventListener('click', toggleAudio);

  audioEl.addEventListener('timeupdate', () => {
    if (!isNaN(audioEl.duration) && audioEl.duration > 0) {
      const pct = (audioEl.currentTime / audioEl.duration) * 100;
      seekSlider.value = pct;
      timeCurrent.textContent = formatAudioTime(audioEl.currentTime);
    }
  });

  seekSlider.addEventListener('input', () => {
    if (!isNaN(audioEl.duration) && audioEl.duration > 0) {
      audioEl.currentTime = (seekSlider.value / 100) * audioEl.duration;
    }
  });

  audioEl.addEventListener('ended', () => {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    audioCard.classList.remove('audio-playing');
    seekSlider.value = 0;
  });

  // 10. Promises Checklist & Grand Finale
  const promisesList = document.getElementById('promises-list');
  const progressFill = document.getElementById('promise-progress-fill');
  const statusLabel = document.getElementById('promise-status-label');
  const grandModal = document.getElementById('grand-surprise-modal');
  const btnCelebrateMore = document.getElementById('btn-celebrate-more');
  const btnCloseModal = document.getElementById('btn-close-modal');

  CONFIG.promises.forEach((promiseText, idx) => {
    const li = document.createElement('li');
    li.className = 'promise-item';
    li.innerHTML = `
      <input type="checkbox" id="promise-check-${idx}" class="promise-checkbox" aria-label="Promise: ${promiseText}">
      <label for="promise-check-${idx}" class="promise-text">${promiseText}</label>
    `;
    promisesList.appendChild(li);
  });

  const checkboxes = document.querySelectorAll('.promise-checkbox');
  const evaluatePromises = () => {
    sounds.playSoftRustle();
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    const pct = (checkedCount / total) * 100;

    progressFill.style.width = `${pct}%`;
    statusLabel.textContent = `${checkedCount} of ${total} Promises Sealed`;

    if (checkedCount === total) {
      setTimeout(() => {
        sounds.playChime();
        treeEngine.burstBlossoms();
        grandModal.classList.remove('hidden');
      }, 400);
    }
  };

  checkboxes.forEach(cb => cb.addEventListener('change', evaluatePromises));

  btnCelebrateMore.addEventListener('click', () => {
    treeEngine.burstBlossoms();
    sounds.playChime();
  });

  btnCloseModal.addEventListener('click', () => grandModal.classList.add('hidden'));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      grandModal.classList.add('hidden');
      lightbox.classList.add('hidden');
    }
  });
});