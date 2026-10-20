
/* =========================================
   BIRTHDAY SURPRISE WEBSITE
   Halimatun ♡
   ========================================= */

// PERSONAL SETTINGS
const CONFIG = {
  friendName: "Halimatun",

  message: `Happy birthday, Halimatun! ♡

Weh, tak sangka kan kita dah berkawan dari Form 1 sampai masuk degree. Dari zaman sekolah sampai sekarang, macam-macam kenangan kita dah kumpul sama2. Thank you sebab jadi salah seorang kawan yang buat hidup ni lebih fun, meaningful, and a little less stressful. Thanks gak la sebab selalu dengar n balas satu2 ye mesej aku 🥹

I harap this new chapter brings you happiness, rezeki yang luas, good health, success dalam apa sahaja yang kau impikan, and people who appreciate you the way you deserve. Jangan lupa jaga diri, keep being your lovely self, and remember that I will always be cheering for you.

Semoga friendship kita kekal sampai bila2 and semoga lepas ni ada lagi banyak memories untuk kita gelakkan bila dah tua nanti. Happy birthday, bestie. sawit tak aku HAHAHAHAHA

Itu sahaja sebab takde idea dah. Btw lagu tuh aku pilih sebab tak nak guna lagu birthday hihihi baru rareeee.`,

  signature: "Hanisah",

  photos: [
    {
      src: "./assets/photos/photo1.jpg",
      caption: "A favourite memory ♡"
    },
    {
      src: "./assets/photos/photo2.jpg",
      caption: "The laughs we share"
    }
  ],

  videos: [
    {
      src: "./assets/videos/video2.mp4",
      caption: "Dah 20 an dahhh...DAH TUAAAA"
    },
    {
      src: "./assets/videos/video1.mp4",
      caption: "A little moment I want to keep ✨"
    }
  ]
};


/* =========================================
   PERSONALISE THE BIRTHDAY MESSAGE
   ========================================= */

document.querySelectorAll("[data-name]").forEach(element => {
  element.textContent = CONFIG.friendName;
});

document.querySelectorAll("[data-signature]").forEach(element => {
  element.textContent = CONFIG.signature;
});

document.getElementById("personalMessage").textContent = CONFIG.message;


/* =========================================
   SECTION NAVIGATION
   ========================================= */

const sections = [...document.querySelectorAll(".panel")];
const progressDots = [...document.querySelectorAll(".progress-dot")];

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function showSection(id) {
  sections.forEach(section => {
    const visible = section.id === id;
    section.hidden = !visible;
    section.classList.toggle("active", visible);
  });

  const currentIndex = sections.findIndex(
    section => section.id === id
  );

  progressDots.forEach((dot, index) => {
    dot.classList.toggle("current", index === currentIndex);
    dot.classList.toggle("done", index < currentIndex);
  });

  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? "auto" : "smooth"
  });

  document.querySelector(`#${id} h1, #${id} h2`)
    ?.focus({ preventScroll: true });
}


/* =========================================
   ENTRY GATE: WHO ARE YOU?
   ========================================= */

const entryGate = document.getElementById("entryGate");
const whoAreYouBtn = document.getElementById("whoAreYouBtn");
const visitorForm = document.getElementById("visitorForm");
const visitorNameInput = document.getElementById("visitorName");

whoAreYouBtn.addEventListener("click", () => {
  whoAreYouBtn.hidden = true;
  visitorForm.hidden = false;
  visitorNameInput.focus();
});

visitorForm.addEventListener("submit", async event => {
  event.preventDefault();

  const visitorName = visitorNameInput.value.trim();

  if (!visitorName) {
    visitorNameInput.focus();
    return;
  }

  const intro = document.querySelector("#welcome .intro-copy");

  intro.textContent =
    `Helluuuu ${visitorName}! ♡ Aku ada janji kan kat kau tuk buat special tuk kau, ` +
    `jadinya aku tunaikan. Ready for your little surprise? 🎀`;

  // Try to start the music after the visitor clicks Enter.
  try {
    await music.play();
  } catch (error) {
    musicLabel.textContent = "Tap Play music";
  }

  showSection("welcome");

  entryGate.classList.add("gate-exit");

  setTimeout(() => {
    entryGate.hidden = true;
  }, 650);
});


/* =========================================
   WELCOME AND BIRTHDAY LETTER
   ========================================= */

document.getElementById("startBtn").addEventListener("click", () => {
  showSection("gift");
});

document.getElementById("envelopeBtn").addEventListener("click", event => {
  const button = event.currentTarget;

  button.classList.add("open");
  button.disabled = true;

  setTimeout(() => {
    showSection("letter");
    button.classList.remove("open");
    button.disabled = false;
  }, 650);
});

document.getElementById("galleryBtn").addEventListener("click", () => {
  showSection("gallery");
});

document.getElementById("finalBtn").addEventListener("click", () => {
  showSection("final");
  burstConfetti();
});

document.getElementById("replayBtn").addEventListener("click", () => {
  document.getElementById("confetti").replaceChildren();
  showSection("welcome");
});


/* =========================================
   PHOTO GALLERY
   ========================================= */

const grid = document.getElementById("photoGrid");
const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");

CONFIG.photos.forEach((photo, index) => {
  const card = document.createElement("figure");
  card.className = `photo-card photo-card-${index + 1}`;

  card.style.setProperty(
    "--tilt",
    `${index % 2 ? 2 : -2}deg`
  );

  const image = document.createElement("img");
  image.src = photo.src;
  image.alt = photo.caption;
  image.loading = "lazy";

  image.addEventListener("error", () => {
    const placeholder = document.createElement("div");

    placeholder.className = "photo-placeholder";
    placeholder.textContent = ["📷", "💗", "🌷", "✨"][index % 4];
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", "Add your own photo here");

    image.replaceWith(placeholder);
  }, { once: true });

  const caption = document.createElement("figcaption");
  caption.textContent = photo.caption;

  card.append(image, caption);

  card.addEventListener("click", () => {
    if (!image.isConnected) return;

    photoModal.hidden = false;
    modalImage.src = image.src;
    modalImage.alt = photo.caption;
    modalCaption.textContent = photo.caption;

    document.getElementById("closeModal").focus();
  });

  grid.append(card);
});


/* =========================================
   BACKGROUND MUSIC
   ========================================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

music.volume = 0.35;

musicBtn.addEventListener("click", async () => {
  if (!music.paused) {
    music.pause();
    return;
  }

  try {
    await music.play();
  } catch (error) {
    musicLabel.textContent = "Add MP3 to play";
  }
});

music.addEventListener("play", () => {
  musicLabel.textContent = "Pause music";
  musicBtn.setAttribute("aria-pressed", "true");
});

music.addEventListener("pause", () => {
  musicLabel.textContent = "Play music";
  musicBtn.setAttribute("aria-pressed", "false");
});


/* =========================================
   VIDEO GALLERY + MUSIC CONTROL
   ========================================= */

const videoGrid = document.getElementById("videoGrid");

let activeVideo = null;
let resumeMusicAfterVideo = false;

CONFIG.videos.forEach((video, index) => {
  const card = document.createElement("figure");

  card.className = `video-card video-card-${index + 1}`;

  const player = document.createElement("video");

  player.src = video.src;
  player.controls = true;
  player.preload = "metadata";
  player.playsInline = true;
  player.setAttribute("aria-label", video.caption);

  player.addEventListener("play", () => {
    if (activeVideo !== player) {
      resumeMusicAfterVideo = !music.paused;
    }

    activeVideo = player;

    // Pause other videos.
    document.querySelectorAll("#videoGrid video").forEach(otherVideo => {
      if (otherVideo !== player && !otherVideo.paused) {
        otherVideo.pause();
      }
    });

    // Pause background music while a video plays.
    if (!music.paused) {
      music.pause();
    }
  });

  function finishVideo() {
    if (activeVideo !== player) return;

    activeVideo = null;

    if (resumeMusicAfterVideo) {
      music.play().catch(() => {
        musicLabel.textContent = "Tap Play music";
      });
    }

    resumeMusicAfterVideo = false;
  }

  // Resume music when video finishes.
  player.addEventListener("ended", finishVideo);

  // Resume music if visitor manually pauses the video.
  player.addEventListener("pause", () => {
    if (player.ended) return;
    finishVideo();
  });

  const caption = document.createElement("figcaption");
  caption.textContent = video.caption;

  player.addEventListener("error", () => {
    const placeholder = document.createElement("div");

    placeholder.className = "video-placeholder";

    const icon = document.createElement("span");
    icon.textContent = "▶";

    const heading = document.createElement("strong");
    heading.textContent = "Add your video here";

    const description = document.createElement("small");
    description.textContent = `MP4 · ${video.caption}`;

    placeholder.append(icon, heading, description);
    player.replaceWith(placeholder);
  }, { once: true });

  card.append(player, caption);
  videoGrid.append(card);
});


/* =========================================
   PHOTO MODAL
   ========================================= */

function closePhotoModal() {
  photoModal.hidden = true;
  modalImage.removeAttribute("src");
}

document.getElementById("closeModal").addEventListener(
  "click",
  closePhotoModal
);

photoModal.addEventListener("click", event => {
  if (event.target === photoModal) {
    closePhotoModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !photoModal.hidden) {
    closePhotoModal();
  }
});


/* =========================================
   FLOATING SPARKLES
   ========================================= */

if (!reduceMotion) {
  const sparkleContainer = document.getElementById("sparkles");

  for (let i = 0; i < 17; i++) {
    const item = document.createElement("span");

    item.className = "sparkle";
    item.textContent = i % 3 === 0 ? "♡" : "✦";
    item.style.left = `${(i * 41) % 100}%`;
    item.style.fontSize = `${12 + (i % 5) * 4}px`;
    item.style.animationDuration = `${12 + (i % 6) * 2}s`;
    item.style.animationDelay = `${-i * 1.7}s`;

    sparkleContainer.append(item);
  }
}


/* =========================================
   FINAL SURPRISE CONFETTI
   ========================================= */

function burstConfetti() {
  if (reduceMotion) return;

  const container = document.getElementById("confetti");
  container.replaceChildren();

  const colors = [
    "#f5a7c6",
    "#c5b1f2",
    "#ffdf9d",
    "#a7ded7",
    "#ffffff"
  ];

  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${2.8 + Math.random() * 2.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;

    container.append(piece);
  }

  setTimeout(() => {
    container.replaceChildren();
  }, 6200);
}
