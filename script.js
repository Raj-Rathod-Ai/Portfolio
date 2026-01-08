// ==================== 1. THEME ENGINE ====================
// REMOVED GREEN THEME (Cyberpunk)
const themes = [
    { name: 'Nebula', primary: '#a855f7', secondary: '#d946ef', bg: 'stars', font: 'Segoe UI', radius: '16px', cursor: 'glow' },
    { name: 'Oceanic', primary: '#00d2ff', secondary: '#3a7bd5', bg: 'bubbles', font: 'Verdana', radius: '30px', cursor: 'elastic' },
    { name: 'Sunset', primary: '#ff416c', secondary: '#ff4b2b', bg: 'grid', font: 'Poppins', radius: '10px', cursor: 'fluid' },
    { name: 'Golden', primary: '#ffd700', secondary: '#fdb931', bg: 'stars', font: 'Georgia', radius: '5px', cursor: 'glow' }
];

const currentTheme = themes[Math.floor(Math.random() * themes.length)];

const profileImages = [
    "WhatsApp Image 2025-12-24 at 4.21.19 PM.jpeg",
    "WhatsApp Image 2026-01-05 at 6.51.02 PM.jpeg",
    "sayajibag.jpeg"
];
const currentImage = profileImages[Math.floor(Math.random() * profileImages.length)];
const currentLoader = ['quantum', 'radar'][Math.floor(Math.random() * 2)]; // Removed DNA for simplicity

const root = document.documentElement;
root.style.setProperty('--primary-color', currentTheme.primary);
root.style.setProperty('--secondary-color', currentTheme.secondary);
root.style.setProperty('--main-font', currentTheme.font);
root.style.setProperty('--card-radius', currentTheme.radius);

// ==================== MAIN LOGIC ====================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Image Application (Square Frame Removed) ---
    const heroImg = document.getElementById('hero-profile-img');
    const navImg = document.getElementById('nav-profile-img');
    if(heroImg) heroImg.src = currentImage;
    if(navImg) navImg.src = currentImage;
    // Always circular now, no square check

    // --- Chat Box UI ---
    const chatFab = document.getElementById('chat-fab');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');
    
    if(chatFab && chatBox) {
        chatFab.addEventListener('click', () => chatBox.classList.toggle('active'));
        closeChat.addEventListener('click', () => chatBox.classList.remove('active'));
    }

    // --- FORMSUBMIT.CO SENDING LOGIC (Background) ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop page reload
            
            const btn = contactForm.querySelector('.btn-send');
            const originalText = btn.innerHTML;
            const senderName = document.getElementById('msg-name').value;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // AJAX FETCH to FormSubmit
            fetch("https://formsubmit.co/ajax/rathodraj1504@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: senderName,
                    email: document.getElementById('msg-email').value,
                    message: document.getElementById('msg-content').value
                })
            })
            .then(response => response.json())
            .then(data => {
                // SUCCESS: Show Popup
                showThankYouPopup(senderName);
                contactForm.reset();
                chatBox.classList.remove('active');
                btn.innerHTML = originalText;
                btn.disabled = false;
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong. Please check internet connection.");
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

    // --- Preloader ---
// --- Preloader Logic ---
const preloader = document.getElementById('preloader');
const loaderGraphic = document.getElementById('loader-graphic');
const textWrapper = document.getElementById('loading-text-wrapper');

// 1. Setup the loader appearance immediately
if (loaderGraphic) {
    loaderGraphic.className = (currentLoader === 'quantum') ? 'loader-quantum' : 'loader-radar';
}

if (textWrapper) {
    const text = "Connecting With Raj...";
    textWrapper.innerHTML = ''; // Clear existing
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; 
        span.className = 'wave-letter';
        span.style.animationDelay = `${index * 0.1}s`;
        textWrapper.appendChild(span);
    });
}

// 2. Control the exit
window.addEventListener('load', () => {
    // Give it a minimum of 2 seconds so people actually see your animation
    setTimeout(() => { 
        if (preloader) {
            preloader.style.opacity = '0'; 
            setTimeout(() => { 
                preloader.style.display = 'none'; 
            }, 500); 
        }
    }, 2000); 
});

    // --- Hover Fix ---
    document.querySelectorAll('.touch-card').forEach(card => {
        card.addEventListener('touchstart', () => { card.classList.add('touch-active'); }, {passive: true});
        card.addEventListener('touchend', () => { setTimeout(() => { card.classList.remove('touch-active'); }, 300); }, {passive: true});
    });
});

// ==================== MODAL LOGIC ====================
function showThankYouPopup(name) {
    const modal = document.getElementById('custom-modal');
    const mTitle = document.getElementById('modal-title');
    const mMsg = document.getElementById('modal-message');
    const mIcon = document.getElementById('modal-icon');

    mIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    mTitle.innerText = `Message Sent!`;
    mMsg.innerText = `Thanks ${name}, I will reply to your email shortly.`;
    
    modal.classList.add('active');
}

function closeModal() { document.getElementById('custom-modal').classList.remove('active'); }

function handleLiveDemo(projectType) {
    if (projectType === 'portfolio') window.location.reload();
    else {
        const modal = document.getElementById('custom-modal');
        const mTitle = document.getElementById('modal-title');
        const mMsg = document.getElementById('modal-message');
        const mIcon = document.getElementById('modal-icon');
        
        mIcon.innerHTML = '<i class="fas fa-rocket"></i>';
        modal.classList.add('active');
        
        if(projectType === 'fake_news') { mTitle.innerText = "Training Model"; mMsg.innerText = "Real-Time detection model is currently training."; }
        else if(projectType === 'code_reviewer') { mTitle.innerText = "Development Phase"; mMsg.innerText = "LLM API integration in progress."; }
        else { mTitle.innerText = "In Development"; mMsg.innerText = "This project is currently being built."; }
    }
}

// ==================== BACKGROUND ANIMATION ====================
const bgCanvas = document.getElementById('bg-canvas');
if(bgCanvas) {
    const bgCtx = bgCanvas.getContext('2d');
    let width, height;
    function resizeBg() { width = bgCanvas.width = window.innerWidth; height = bgCanvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeBg);
    resizeBg();
    let bgParticles = [];
    function initBackground() {
        bgParticles = [];
        // Removed Matrix (Green) background check
        if (currentTheme.bg === 'stars') {
            for(let i=0; i<100; i++) bgParticles.push({ x: Math.random() * width, y: Math.random() * height, size: Math.random() * 2, speed: Math.random() * 0.5 + 0.1 });
        } else if (currentTheme.bg === 'bubbles') {
            for(let i=0; i<20; i++) bgParticles.push({ x: Math.random() * width, y: Math.random() * height, size: Math.random() * 20 + 10, speed: Math.random() * 1 + 0.5 });
        } else {
             // Fallback for grid
             // ...
        }
    }
    initBackground();
    function animateBackground() {
        bgCtx.fillStyle = '#000000';
        bgCtx.fillRect(0, 0, width, height);
        if (currentTheme.bg === 'stars') {
            bgCtx.fillStyle = '#fff'; bgParticles.forEach(p => { bgCtx.beginPath(); bgCtx.arc(p.x, p.y, p.size, 0, Math.PI*2); bgCtx.fill(); p.y += p.speed; if(p.y > height) p.y = 0; });
        } else if (currentTheme.bg === 'bubbles') {
            bgCtx.strokeStyle = currentTheme.primary; bgCtx.lineWidth = 1; bgParticles.forEach(p => { bgCtx.beginPath(); bgCtx.arc(p.x, p.y, p.size, 0, Math.PI*2); bgCtx.stroke(); p.y -= p.speed; if(p.y < -50) p.y = height + 50; });
        } else {
            bgCtx.strokeStyle = 'rgba(255,255,255,0.05)'; bgCtx.lineWidth = 1; const time = Date.now() * 0.002;
            for (let x = 0; x < width; x += 50) { bgCtx.beginPath(); bgCtx.moveTo(x, 0); bgCtx.lineTo(x, height); bgCtx.stroke(); }
            for (let y = (time * 30) % 50; y < height; y += 50) { bgCtx.beginPath(); bgCtx.moveTo(0, y); bgCtx.lineTo(width, y); bgCtx.stroke(); }
        }
        requestAnimationFrame(animateBackground);
    }
    animateBackground();
}

// ==================== CURSOR ====================
const cursorCanvas = document.getElementById('cursor-canvas');

if (cursorCanvas) {
    const cCtx = cursorCanvas.getContext('2d');
    let cWidth = cursorCanvas.width = window.innerWidth;
    let cHeight = cursorCanvas.height = window.innerHeight;
    let mouse = { x: -100, y: -100 };
    let trail = [];

    window.addEventListener('resize', () => {
        cWidth = cursorCanvas.width = window.innerWidth;
        cHeight = cursorCanvas.height = window.innerHeight;
    });

    // Function to handle coordinate updates
    const updatePosition = (x, y) => {
        mouse.x = x;
        mouse.y = y;
        trail.push({ x: mouse.x, y: mouse.y, age: 0 });
    };

    // Desktop: Mouse Move
    window.addEventListener('mousemove', (e) => {
        updatePosition(e.clientX, e.clientY);
    });

    // Mobile: Touch Move & Start
    const handleTouch = (e) => {
        // Prevents scrolling while interacting with the canvas
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        }
    };

    // passive: false is required to allow e.preventDefault() if you want to stop scrolling
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    function animateCursor() {
        cCtx.clearRect(0, 0, cWidth, cHeight);
        
        // Draw Main Pointer
        cCtx.beginPath();
        cCtx.fillStyle = currentTheme.primary;
        cCtx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        cCtx.fill();

        for (let i = 0; i < trail.length; i++) {
            const p = trail[i];
            p.age++;

            if (currentTheme.cursor === 'glow') {
                cCtx.beginPath();
                cCtx.fillStyle = currentTheme.secondary;
                cCtx.globalAlpha = 1 - (p.age / 15);
                cCtx.arc(p.x, p.y, 2 + (p.age / 2), 0, Math.PI * 2);
                cCtx.fill();
                cCtx.globalAlpha = 1;
            } else {
                if (i > 0) {
                    cCtx.beginPath();
                    cCtx.strokeStyle = currentTheme.primary;
                    cCtx.lineWidth = 2;
                    cCtx.globalAlpha = 1 - (p.age / 20);
                    cCtx.moveTo(trail[i - 1].x, trail[i - 1].y);
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
}
// ==================== HACKER TEXT ====================
const hackerText = document.querySelector('.hacker-text');
const phrases = ["DSA Expert", "AI Engineer", "Data Scientist", "Problem Solver"];
let phraseIndex = 0;
function runHackerEffect() {
    let iteration = 0; const target = phrases[phraseIndex]; if(!hackerText) return;
    const interval = setInterval(() => {
        hackerText.innerText = target.split("").map((l, i) => { if(i < iteration) return target[i]; return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]; }).join("");
        if(iteration >= target.length) { clearInterval(interval); setTimeout(() => { phraseIndex = (phraseIndex + 1) % phrases.length; runHackerEffect(); }, 2000); }
        iteration += 1 / 3;
    }, 30);
}
runHackerEffect();
