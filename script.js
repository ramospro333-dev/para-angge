
"use strict";

/* =========================================
   1. ELEMENTOS PRINCIPALES
========================================= */

const welcomeScreen = document.getElementById("welcomeScreen");
const enterButton = document.getElementById("enterButton");
const giftScreen = document.getElementById("giftScreen");

const musicButton = document.getElementById("musicButton");
const floatingParticles = document.getElementById("floatingParticles");


/* =========================================
   2. CONFIGURACIÓN GENERAL
========================================= */

const CONFIG = {
    musicSearchUrl:
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent("Sueña Luis Miguel"),

    particleCount: 22,
    leafCount: 12
};

let hasEntered = false;


/* =========================================
   3. ENTRAR AL REGALO
========================================= */

function enterGift() {
    if (hasEntered) return;

    hasEntered = true;

    // Evita que el botón se pulse varias veces.
    enterButton.disabled = true;

    // Inicia la transición de salida.
    welcomeScreen.classList.add("is-leaving");

    // Muestra el contenido principal.
    giftScreen.hidden = false;
    giftScreen.classList.add("is-entering");

    // Evita que la pantalla de bienvenida siga ocupando espacio.
    window.setTimeout(() => {
        welcomeScreen.hidden = true;
        welcomeScreen.classList.remove("is-leaving");

        giftScreen.classList.remove("is-entering");
    }, 850);
}

enterButton.addEventListener("click", enterGift);


/* =========================================
   4. PARTÍCULAS AMBIENTALES
========================================= */

function createParticles() {
    if (!floatingParticles) return;

    // Respeta la preferencia del usuario por reducir movimiento.
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < CONFIG.particleCount; i++) {
        const particle = document.createElement("span");

        particle.className = "ambient-particle";

        // Posiciones y tiempos diferentes para evitar repetición visual.
        particle.style.setProperty(
            "--particle-x",
            `${Math.random() * 100}%`
        );

        particle.style.setProperty(
            "--particle-delay",
            `${Math.random() * -18}s`
        );

        particle.style.setProperty(
            "--particle-duration",
            `${12 + Math.random() * 16}s`
        );

        particle.style.setProperty(
            "--particle-size",
            `${2 + Math.random() * 4}px`
        );

        fragment.appendChild(particle);
    }

    floatingParticles.appendChild(fragment);
}


/* =========================================
   5. HOJAS OTOÑALES
========================================= */

function createAutumnLeaves() {
    if (!giftScreen) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const leavesContainer = document.createElement("div");

    leavesContainer.className = "falling-leaves";
    leavesContainer.setAttribute("aria-hidden", "true");

    const leafColors = [
        "#B85C45",
        "#C77A43",
        "#D4A052",
        "#8F5548",
        "#A8B59A"
    ];

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < CONFIG.leafCount; i++) {
        const leaf = document.createElement("span");

        leaf.className = "falling-leaf";

        // Alternamos hojas naturales y pequeños corazones.
        const isHeart = i % 5 === 0;

        if (isHeart) {
            leaf.classList.add("falling-heart");
            leaf.textContent = "♥";
        }

        leaf.style.setProperty(
            "--leaf-left",
            `${Math.random() * 100}%`
        );

        leaf.style.setProperty(
            "--leaf-delay",
            `${Math.random() * -20}s`
        );

        leaf.style.setProperty(
            "--leaf-duration",
            `${14 + Math.random() * 14}s`
        );

        leaf.style.setProperty(
            "--leaf-size",
            `${10 + Math.random() * 9}px`
        );

        leaf.style.setProperty(
            "--leaf-color",
            leafColors[Math.floor(Math.random() * leafColors.length)]
        );

        fragment.appendChild(leaf);
    }

    leavesContainer.appendChild(fragment);
    giftScreen.appendChild(leavesContainer);
}


/* =========================================
   6. BOTÓN DE MÚSICA
========================================= */

const backgroundMusic = document.getElementById("backgroundMusic");

async function toggleMusic() {
    if (!backgroundMusic) return;

    if (backgroundMusic.paused) {
        try {
            await backgroundMusic.play();
            musicButton.innerHTML = "Pausar canción <span>Ⅱ</span>";
            musicButton.setAttribute("aria-label", "Pausar canción");
        } catch (error) {
            console.error("No se pudo reproducir el audio:", error);
            alert("No se pudo reproducir la canción. Revisa que el archivo suena.mp3 esté en la carpeta del proyecto.");
        }
    } else {
        backgroundMusic.pause();
        musicButton.innerHTML = "Escuchar canción <span>♫</span>";
        musicButton.setAttribute("aria-label", "Reproducir canción");
    }
}

musicButton.addEventListener("click", toggleMusic);


/* =========================================
   7. INICIALIZACIÓN
========================================= */

function initializePage() {
    createParticles();
    createAutumnLeaves();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializePage,
        { once: true }
    );
} else {
    initializePage();
}
