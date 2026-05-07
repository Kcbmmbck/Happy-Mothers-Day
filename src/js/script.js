
// HERO BACKGROUND
(function () {
    const bg = document.getElementById('heroBg');
    const colors = ['#f7c5d0', '#e8dff5', '#f5e8c0', '#fce8ed', '#d4c5ee', '#e6c97a'];
    const petals = ['🌸', '🌷', '🌺', '🌼', '🌻', '💮'];
    for (let i = 0; i < 22; i++) {
        const el = document.createElement('div');
        el.className = 'petal';
        const size = Math.random() * 50 + 20;
        const left = Math.random() * 100;
        const dur = Math.random() * 12 + 8;
        const delay = Math.random() * 10;
        el.style.cssText = `width:${size}px;height:${size}px;left:${left}%;background:${colors[i % colors.length]};animation-duration:${dur}s;animation-delay:-${delay}s;transform-origin:center;`;
        bg.appendChild(el);
    }
    const heroContent = document.querySelector('.hero-content');
    for (let i = 0; i < 12; i++) {
        const h = document.createElement('div');
        h.className = 'heart-float';
        h.textContent = '💗';
        h.style.cssText = `left:${Math.random() * 90 + 5}%;top:${Math.random() * 80 + 10}%;animation-duration:${Math.random() * 3 + 3}s;animation-delay:${Math.random() * 2}s;font-size:${Math.random() * .8 + .8}rem;`;
        bg.appendChild(h);
    }
})();


function burstHearts() {
    const c = document.getElementById('burstContainer');
    const emojis = ['💗', '🌸', '✨', '💕', '🌷', '💖', '⭐'];
    for (let i = 0; i < 40; i++) {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const x = 20 + Math.random() * 60;
        const startY = 40 + Math.random() * 20;
        span.style.cssText = `position:absolute;left:${x}%;top:${startY}%;font-size:${1 + Math.random() * 1.5}rem;pointer-events:none;animation:burstAnim ${1.5 + Math.random()}s ease-out forwards;animation-delay:${Math.random() * .6}s;`;
        c.appendChild(span);
        setTimeout(() => span.remove(), 3000);
    }
    const style = document.getElementById('burstStyle') || document.createElement('style');
    style.id = 'burstStyle';
    style.textContent = `@keyframes burstAnim{0%{opacity:1;transform:translateY(0) scale(0);}20%{opacity:1;transform:translateY(-20px) scale(1.2);}100%{opacity:0;transform:translateY(-120px) scale(.6);}}`;
    document.head.appendChild(style);
}



(function () {
    const wrap = document.getElementById('petals-load');
    const icons = ['🌸', '💕', '✨', '🌷', '💖', '🌺', '⭐', '🩷'];
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('span');
        el.className = 'petal';
        el.textContent = icons[i % icons.length];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (3.5 + Math.random() * 4.5) + 's';
        el.style.animationDelay = (Math.random() * 5) + 's';
        el.style.fontSize = (0.75 + Math.random() * 1.3) + 'rem';
        wrap.appendChild(el);
    }
})();


(function () {
    const c = document.getElementById('particles-canvas');
    const ctx = c.getContext('2d');
    let W, H, pts = [];
    const resize = () => { W = c.width = innerWidth; H = c.height = innerHeight; };
    window.addEventListener('resize', resize); resize();
    function Pt() {
        this.reset = () => {
            this.x = Math.random() * W; this.y = Math.random() * H;
            this.vx = (Math.random() - .5) * .35; this.vy = -.25 - Math.random() * .45;
            this.r = 1 + Math.random() * 2; this.a = .25 + Math.random() * .4;
            this.col = ['#f2a7b8', '#e8d5a3', '#d4b8e0', '#f8c4a0', '#fde8ee'][Math.floor(Math.random() * 5)];
        }; this.reset();
    }
    for (let i = 0; i < 70; i++) pts.push(new Pt());
    (function draw() {
        ctx.clearRect(0, 0, W, H);
        pts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.y < -10 || p.x < -10 || p.x > W + 10) p.reset();
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.col; ctx.globalAlpha = p.a; ctx.fill(); ctx.globalAlpha = 1;
        }); requestAnimationFrame(draw);
    })();
})();


const sparkCanvas = document.getElementById('sparkle-canvas');
const sparkCtx = sparkCanvas.getContext('2d');
let sparkParticles = [];
function resizeSpark() {
    const scene = document.getElementById('envScene');
    sparkCanvas.width = scene.offsetWidth;
    sparkCanvas.height = scene.offsetHeight;
}
function spawnSparkBurst(cx, cy) {
    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        sparkParticles.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            r: 2 + Math.random() * 3,
            alpha: 1,
            col: ['#f2a7b8', '#c9a96e', '#d4b8e0', '#e8748a', '#fff', '#f8c4a0'][Math.floor(Math.random() * 6)],
            life: 0, maxLife: 40 + Math.random() * 30,
            shape: Math.random() > .5 ? 'circle' : 'star'
        });
    }
}
function drawSpark() {
    sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    sparkParticles = sparkParticles.filter(p => {
        p.x += p.vx; p.y += p.vy; p.vy += .08; p.life++;
        p.alpha = 1 - (p.life / p.maxLife);
        if (p.alpha <= 0) return false;
        sparkCtx.save();
        sparkCtx.globalAlpha = p.alpha;
        if (p.shape === 'star') {
            sparkCtx.translate(p.x, p.y);
            sparkCtx.fillStyle = p.col;
            drawStar(sparkCtx, 0, 0, p.r, p.r * 2.2, 5);
            sparkCtx.fill();
        } else {
            sparkCtx.beginPath(); sparkCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            sparkCtx.fillStyle = p.col; sparkCtx.fill();
        }
        sparkCtx.restore();
        return true;
    });
    requestAnimationFrame(drawSpark);
}
function drawStar(ctx, cx, cy, ir, or, pts) {
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
        const r = i % 2 === 0 ? or : ir;
        const a = (i * Math.PI) / pts - Math.PI / 2;
        i === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
            : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath();
}
drawSpark();


function spawnConfetti() {
    const wrap = document.getElementById('confettiWrap');
    wrap.innerHTML = '';
    const colors = ['#f2a7b8', '#c9a96e', '#d4b8e0', '#e8748a', '#f8c4a0', '#fde8ee', '#b8e4f2'];
    for (let i = 0; i < 36; i++) {
        const el = document.createElement('div');
        el.className = Math.random() > .5 ? 'conf-dot' : 'conf-rect';
        const angle = (i / 36) * 360;
        const dist = 80 + Math.random() * 100;
        const vx = Math.cos(angle * Math.PI / 180) * dist;
        const vy = Math.sin(angle * Math.PI / 180) * dist - 60;
        el.style.setProperty('--cx', `translateX(${vx}px)`);
        el.style.setProperty('--cy', `translateY(${vy}px)`);
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDelay = (Math.random() * .4) + 's';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
        wrap.appendChild(el);
    }
}


window.addEventListener('load', () => {
    resizeSpark();
    window.addEventListener('resize', resizeSpark);
    setTimeout(() => document.getElementById('loading').classList.add('hide'), 2700);
});


let opened = false;
let scratchProgress = 0;
let scratchInterval = null;

document.getElementById('envScene').addEventListener('click', startScratch);
document.getElementById('envScene').addEventListener('touchstart', startScratch, { passive: true });

function startScratch() {
    if (opened) return;
    if (scratchInterval) return;


    document.getElementById('envBob').classList.add('no-bob');


    const strip = document.getElementById('topStrip');
    const hint = document.getElementById('envHint');
    hint.textContent = '✦ Tearing open… ✦';


    const body = document.getElementById('envBody');
    body.style.animation = 'scratch-shake .4s ease';
    body.style.setProperty('animation-fill-mode', 'forwards');


    let prog = 0;
    strip.style.background = `linear-gradient(180deg,#fce4ed,#f7cdd8)`;

    scratchInterval = setInterval(() => {
        prog += 3.5;

        strip.style.background = `linear-gradient(90deg, 
    rgba(232,116,138,0.25) ${prog - 10}%, 
    rgba(255,240,245,0.9) ${prog}%, 
    #fce4ed ${prog + 5}%)`;

        if (prog >= 100) {
            clearInterval(scratchInterval);
            scratchInterval = null;
            doTear();
        }
    }, 18);
}

function doTear() {
    opened = true;
    const envBox = document.getElementById('envBox');
    const hint = document.getElementById('envHint');


    envBox.classList.add('tearing', 'cracked');


    spawnHeartBurst();


    spawnConfetti();
    const scene = document.getElementById('envScene');
    const cx = scene.offsetWidth / 2;
    const cy = scene.offsetHeight * .22;
    spawnSparkBurst(cx, cy);

    hint.textContent = '✦ Surprise! ✦';

    setTimeout(showLetterPage, 3000);
}

function spawnHeartBurst() {
    const envBox = document.getElementById('envBox');
    const burstWrap = document.getElementById('heartBurst');
    const driftWrap = document.getElementById('driftHearts');
    burstWrap.innerHTML = '';
    driftWrap.innerHTML = '';

    const hearts = ['💖', '💕', '💗', '💓', '💞', '🩷', '❤️', '💝', '💘', '✨', '🌸', '⭐', '🌷', '💫'];
    const drifters = ['💖', '💕', '💗', '🩷', '🌸', '💞', '✨', '💓'];

    // Burst hearts fly outward from center
    const cx = envBox.offsetWidth / 2;
    const cy = envBox.offsetHeight / 2;

    for (let i = 0; i < 22; i++) {
        const el = document.createElement('span');
        el.className = 'burst-heart';
        const angle = (i / 22) * Math.PI * 2;
        const dist = 60 + Math.random() * 110;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 20;
        const r1 = (Math.random() * 40 - 20) + 'deg';
        const r2 = (Math.random() * 60 - 30) + 'deg';
        const dur = (.9 + Math.random() * .7) + 's';
        const delay = (Math.random() * .4) + 's';
        el.textContent = hearts[i % hearts.length];
        el.style.cssText = `
        position:absolute;
        left:${cx}px; top:${cy}px;
        --tx:${tx}px; --ty:${ty}px;
        --r1:${r1}; --r2:${r2};
        --dur:${dur}; --delay:${delay};
        font-size:${1.1 + Math.random() * 1.2}rem;
      `;
        burstWrap.appendChild(el);
    }


    for (let i = 0; i < 12; i++) {
        const el = document.createElement('span');
        el.className = 'drift-heart';
        const dx = (Math.random() * 160 - 80) + 'px';
        const wobble = (Math.random() * 30 - 15) + 'px';
        const ddur = (1.4 + Math.random() * 1.2) + 's';
        const ddelay = (.2 + Math.random() * .9) + 's';
        el.textContent = drifters[i % drifters.length];
        el.style.cssText = `
        position:absolute;
        left:${cx}px; bottom:${envBox.offsetHeight * .5}px;
        --dx:${dx}; --wobble:${wobble};
        --ddur:${ddur}; --ddelay:${ddelay};
        font-size:${.9 + Math.random() * .9}rem;
      `;
        driftWrap.appendChild(el);
    }


    void burstWrap.offsetWidth;
}

function showLetterPage() {

    document.getElementById('page-envelope').classList.add('hide');


    document.body.classList.remove('intro');
    document.documentElement.classList.remove('intro-scroll');


    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });


    initScrollReveal();
}


function readAgain() {
    opened = false;
    scratchProgress = 0;
    if (scratchInterval) { clearInterval(scratchInterval); scratchInterval = null; }

    const lp = document.getElementById('page-letter');
    lp.classList.remove('visible');
    setTimeout(() => lp.classList.remove('show'), 700);

    document.documentElement.classList.add('intro-scroll');
    document.body.classList.add('intro');
    document.getElementById('page-envelope').classList.remove('hide');


    const envBox = document.getElementById('envBox');
    envBox.classList.remove('tearing', 'cracked');
    document.getElementById('envBob').classList.remove('no-bob');
    document.getElementById('topStrip').style.background = '';
    document.getElementById('topStrip').style.animation = '';
    document.getElementById('envHint').textContent = '✦ Click the envelope to scratch it open ✦';
    document.getElementById('confettiWrap').innerHTML = '';
    document.getElementById('heartBurst').innerHTML = '';
    document.getElementById('driftHearts').innerHTML = '';
    sparkParticles = [];

    window.scrollTo(0, 0);
}


function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: .12 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

(function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('show');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
})();


const targetDate = new Date("May 10, 2026 00:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        document.querySelector(".subtitle").textContent =
            "Today is the special day filled with love!";

        setTimeout(() => {
            window.location.href = "src/secret/happymothersday.html";
        }, 2000);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);



const icons = ["❤", "💐", "🌸", "✨", "🌷", "💖"];

function createFloatingIcon() {
    const icon = document.createElement("div");
    icon.className = "floating";
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];

    icon.style.left = Math.random() * 100 + "vw";
    icon.style.fontSize = Math.random() * 18 + 18 + "px";
    icon.style.animationDuration = Math.random() * 7 + 8 + "s";

    document.body.appendChild(icon);

    setTimeout(() => {
        icon.remove();
    }, 15000);
}

setInterval(createFloatingIcon, 550);

function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

setInterval(createSparkle, 350);


