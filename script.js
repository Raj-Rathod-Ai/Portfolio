// ==================== 1. PRELOADER LOGIC ====================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0'; 
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); 
    }, 3000); 
});

// ==================== 2. TYPING EFFECT ====================
const typingText = document.querySelector('.typing-text');
const words = ["DSA Expert", "AI & Data Science", "Data Analysis", "Aspiring AI Specialist"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    typingText.textContent = currentChars;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 80);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 40);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        }
        setTimeout(typeEffect, 1200);
    }
}
typeEffect();

// ==================== 3. MOUSE DRAWING ====================
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    particles.push({ x: e.clientX, y: e.clientY, age: 0 });
});

function animateCursor() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(168, 85, 247, 0.5)"; 
    ctx.lineCap = "round";
    
    for (let i = 0; i < particles.length - 1; i++) {
        const p = particles[i];
        const nextP = particles[i+1];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nextP.x, nextP.y);
        ctx.globalAlpha = 1 - (p.age / 20); 
        ctx.stroke();
        p.age++;
    }
    
    particles = particles.filter(p => p.age < 20);
    requestAnimationFrame(animateCursor);
}
animateCursor();

// ==================== 4. SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});