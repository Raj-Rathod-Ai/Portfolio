// ==================== 1. RANDOMIZATION ENGINE ====================

const themes = [
    { name: 'Cyberpunk', primary: '#00ff41', secondary: '#008f11', bg: 'matrix', font: 'Courier New', radius: '0px', cursor: 'fluid' },
    { name: 'Nebula', primary: '#a855f7', secondary: '#d946ef', bg: 'stars', font: 'Segoe UI', radius: '16px', cursor: 'glow' },
    { name: 'Oceanic', primary: '#00d2ff', secondary: '#3a7bd5', bg: 'bubbles', font: 'Verdana', radius: '30px', cursor: 'elastic' },
    { name: 'Sunset', primary: '#ff416c', secondary: '#ff4b2b', bg: 'grid', font: 'Poppins', radius: '10px', cursor: 'fluid' },
    { name: 'Golden', primary: '#ffd700', secondary: '#fdb931', bg: 'stars', font: 'Georgia', radius: '5px', cursor: 'glow' }
];

// Pick Random Theme
const currentTheme = themes[Math.floor(Math.random() * themes.length)];

// Pick Random Image (Includes ALL your images)
const profileImages = [
    "WhatsApp Image 2025-12-24 at 4.21.19 PM.jpeg",
    "WhatsApp Image 2026-01-05 at 6.51.02 PM.jpeg",
    "sayajibag.jpeg"
];
const currentImage = profileImages[Math.floor(Math.random() * profileImages.length)];

// Pick Random Loader Type
const loaderTypes = ['quantum', 'radar', 'dna'];
const currentLoader = loaderTypes[Math.floor(Math.random() * loaderTypes.length)];

// Apply Variables
const root = document.documentElement;
root.style.setProperty('--primary-color', currentTheme.primary);
root.style.setProperty('--secondary-color', currentTheme.secondary);
root.style.setProperty('--main-font', currentTheme.font);
root.style.setProperty('--card-radius', currentTheme.radius);

// Apply Image
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('hero-profile-img').src = currentImage;
    document.getElementById('nav-profile-img').src = currentImage;
    if(currentTheme.radius === '0px') {
        document.querySelector('.profile-main-img').style.borderRadius = '0';
    } else {
        document.querySelector('.profile-main-img').style.borderRadius = '50%';
    }
});

// ==================== 2. PRELOADER & WAVY TEXT ====================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const loaderGraphic = document.getElementById('loader-graphic');
    
    // Inject Random Loader
    if (currentLoader === 'quantum') {
        loaderGraphic.className = 'loader-quantum';
    } else if (currentLoader === 'radar') {
        loaderGraphic.className = 'loader-radar';
    } else {
        loaderGraphic.className = 'loader-dna';
        loaderGraphic.innerHTML = '<div class="dna-dot"></div><div class="dna-dot"></div><div class="dna-dot"></div><div class="dna-dot"></div>';
    }

    // Wavy Text Animation ("Connecting With Raj...")
    const textWrapper = document.getElementById('loading-text-wrapper');
    const text = "Connecting With Raj...";
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Handle spaces
        span.className = 'wave-letter';
        span.style.animationDelay = `${index * 0.1}s`;
        textWrapper.appendChild(span);
    });

    // Fade Out
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 2500); // 2.5s duration
});

// ==================== 3. BACKGROUND EFFECTS ====================
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let width, height;

function resizeBg() {
    width = bgCanvas.width = window.innerWidth;
    height = bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeBg);
resizeBg();

let bgParticles = [];

function initBackground() {
    bgParticles = [];
    if (currentTheme.bg === 'matrix') {
        const columns = Math.floor(width / 20);
        for (let i = 0; i < columns; i++) {
            bgParticles.push({ x: i * 20, y: Math.random() * -100, speed: Math.random() * 2 + 1 });
        }
    } else if (currentTheme.bg === 'stars') {
        for(let i=0; i<100; i++) {
            bgParticles.push({
                x: Math.random() * width, y: Math.random() * height,
                size: Math.random() * 2, speed: Math.random() * 0.5 + 0.1
            });
        }
    } else if (currentTheme.bg === 'bubbles') {
        for(let i=0; i<20; i++) {
            bgParticles.push({
                x: Math.random() * width, y: Math.random() * height,
                size: Math.random() * 20 + 10, speed: Math.random() * 1 + 0.5
            });
        }
    }
}
initBackground();

function animateBackground() {
    bgCtx.fillStyle = currentTheme.bg === 'matrix' ? 'rgba(0, 0, 0, 0.1)' : '#000000';
    bgCtx.fillRect(0, 0, width, height);

    if (currentTheme.bg === 'matrix') {
        bgCtx.fillStyle = currentTheme.primary;
        bgCtx.font = '15px monospace';
        bgParticles.forEach(p => {
            bgCtx.fillText(String.fromCharCode(0x30A0 + Math.random() * 96), p.x, p.y);
            p.y += p.speed;
            if (p.y > height) p.y = Math.random() * -100;
        });
    } else if (currentTheme.bg === 'stars') {
        bgCtx.fillStyle = '#fff';
        bgParticles.forEach(p => {
            bgCtx.beginPath();
            bgCtx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            bgCtx.fill();
            p.y += p.speed;
            if(p.y > height) p.y = 0;
        });
    } else if (currentTheme.bg === 'bubbles') {
        bgCtx.strokeStyle = currentTheme.primary;
        bgCtx.lineWidth = 1;
        bgParticles.forEach(p => {
            bgCtx.beginPath();
            bgCtx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            bgCtx.stroke();
            p.y -= p.speed;
            if(p.y < -50) p.y = height + 50;
        });
    } else {
        bgCtx.strokeStyle = 'rgba(255,255,255,0.05)';
        bgCtx.lineWidth = 1;
        const time = Date.now() * 0.002;
        for (let x = 0; x < width; x += 50) { bgCtx.beginPath(); bgCtx.moveTo(x, 0); bgCtx.lineTo(x, height); bgCtx.stroke(); }
        for (let y = (time * 30) % 50; y < height; y += 50) { bgCtx.beginPath(); bgCtx.moveTo(0, y); bgCtx.lineTo(width, y); bgCtx.stroke(); }
    }
    requestAnimationFrame(animateBackground);
}
animateBackground();

// ==================== 4. DYNAMIC CURSOR ====================
const cursorCanvas = document.getElementById('cursor-canvas');
const cCtx = cursorCanvas.getContext('2d');
let cWidth = cursorCanvas.width = window.innerWidth;
let cHeight = cursorCanvas.height = window.innerHeight;
let mouse = { x: -100, y: -100 };
let trail = [];

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    trail.push({ x: mouse.x, y: mouse.y, age: 0 });
});

function animateCursor() {
    cCtx.clearRect(0, 0, cWidth, cHeight);
    cCtx.beginPath();
    cCtx.fillStyle = currentTheme.primary;
    cCtx.arc(mouse.x, mouse.y, 5, 0, Math.PI*2);
    cCtx.fill();

    for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        p.age++;
        
        if (currentTheme.cursor === 'glow') {
            cCtx.beginPath();
            cCtx.fillStyle = currentTheme.secondary;
            cCtx.globalAlpha = 1 - (p.age / 15);
            cCtx.arc(p.x, p.y, 2 + (p.age/2), 0, Math.PI*2);
            cCtx.fill();
            cCtx.globalAlpha = 1;
        } else if (currentTheme.cursor === 'elastic') {
             if (i > 0) {
                cCtx.beginPath();
                cCtx.strokeStyle = currentTheme.secondary;
                cCtx.lineWidth = 4 - (p.age/4);
                cCtx.globalAlpha = 1 - (p.age / 10);
                cCtx.moveTo(trail[i-1].x, trail[i-1].y);
                cCtx.lineTo(p.x, p.y);
                cCtx.stroke();
                cCtx.globalAlpha = 1;
            }
        } else {
            if (i > 0) {
                cCtx.beginPath();
                cCtx.strokeStyle = currentTheme.primary;
                cCtx.lineWidth = 2;
                cCtx.globalAlpha = 1 - (p.age / 20);
                cCtx.moveTo(trail[i-1].x, trail[i-1].y);
                cCtx.lineTo(p.x, p.y);
                cCtx.stroke();
                cCtx.globalAlpha = 1;
            }
        }
    }
    trail = trail.filter(p => p.age < 15);
    requestAnimationFrame(animateCursor);
}
animateCursor();

// ==================== 5. NAVBAR SCROLL & HACKER TEXT ====================
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 100)) current = section.getAttribute('id');
    });
    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === '#' + current) li.classList.add('active');
    });
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const hackerText = document.querySelector('.hacker-text');
// REPLACED "MLOps Specialist" with "Data Scientist" as requested
const phrases = ["DSA Expert", "AI Engineer", "Data Scientist", "Problem Solver"];
let phraseIndex = 0;

function runHackerEffect() {
    let iteration = 0;
    const target = phrases[phraseIndex];
    clearInterval(hackerText.dataset.interval);
    
    const interval = setInterval(() => {
        hackerText.innerText = target.split("").map((l, i) => {
            if(i < iteration) return target[i];
            return letters[Math.floor(Math.random() * 36)];
        }).join("");
        if(iteration >= target.length) {
            clearInterval(interval);
            setTimeout(() => {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                runHackerEffect();
            }, 2000);
        }
        iteration += 1 / 3;
    }, 30);
    hackerText.dataset.interval = interval;
}
runHackerEffect();

// Modal Logic
const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');

function handleLiveDemo(projectType) {
    if (projectType === 'portfolio') window.location.reload();
    else {
        modal.classList.add('active');
        if(projectType === 'fake_news') {
             modalTitle.innerText = "Training Model";
             modalMessage.innerText = "Real-Time detection model is currently training.";
        } else if(projectType === 'code_reviewer') {
             modalTitle.innerText = "Integration Phase";
             modalMessage.innerText = "LLM API integration in progress.";
        } else {
             modalTitle.innerText = "In Development";
             modalMessage.innerText = "This project is currently being built.";
        }
    }
}
function closeModal() { modal.classList.remove('active'); }
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
