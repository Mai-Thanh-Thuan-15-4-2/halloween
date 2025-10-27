document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('halloween-modal');
    const playButton = document.getElementById('halloween-play-btn');

    // Ensure modal is visible on page load
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.remove('hide'); }, 10);

    // Handle PLAY button click
    playButton.addEventListener('click', () => {
        // Hide modal
        modal.classList.add('hide');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            // Start Halloween UI
            startHalloweenUI();
        }, 300); // Match CSS transition duration
    });
});

function startHalloweenUI() {
    // Create DOM elements dynamically
    const body = document.body;

    // Add stylesheet dynamically (as fallback)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'style.css';
    link.onerror = () => console.error('Failed to load stylesheet: style.css');
    link.onload = () => console.log('Stylesheet loaded successfully');
    document.head.appendChild(link);

    // Create background
    const bgAnimated = document.createElement('div');
    bgAnimated.className = 'bg-animated';
    body.appendChild(bgAnimated);

    // Create SVG waves
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.className = 'bg-waves';
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('preserveAspectRatio', 'none');

    // SVG definitions
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.id = 'waveGrad';
    linearGradient.setAttribute('x1', '0');
    linearGradient.setAttribute('y1', '0');
    linearGradient.setAttribute('x2', '1');
    linearGradient.setAttribute('y2', '1');
    const stops = [
        { offset: '0%', color: '#4b206b' },
        { offset: '50%', color: '#2d1b3d' },
        { offset: '100%', color: '#1a0826' }
    ];
    stops.forEach(stop => {
        const stopEl = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stopEl.setAttribute('offset', stop.offset);
        stopEl.setAttribute('stop-color', stop.color);
        linearGradient.appendChild(stopEl);
    });
    defs.appendChild(linearGradient);

    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.id = 'blur1';
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '30');
    filter.appendChild(feGaussianBlur);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // SVG paths
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M0,800 Q480,900 960,800 T1920,800 V1080 H0 Z');
    path1.setAttribute('fill', 'url(#waveGrad)');
    path1.setAttribute('filter', 'url(#blur1)');
    svg.appendChild(path1);

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M0,850 Q600,950 1200,850 T1920,850 V1080 H0 Z');
    path2.setAttribute('fill', 'url(#waveGrad)');
    path2.setAttribute('opacity', '0.7');
    svg.appendChild(path2);
    body.appendChild(svg);

    // Create forest container
    const forestContainer = document.createElement('div');
    forestContainer.className = 'forest-container';
    body.appendChild(forestContainer);

    // Create moon
    const moon = document.createElement('div');
    moon.className = 'moon rise';
    moon.id = 'moon';
    const craters = ['crater1', 'crater2', 'crater3', 'crater4', 'crater5', 'crater6', 'crater7'];
    craters.forEach(crater => {
        const craterDiv = document.createElement('div');
        craterDiv.className = `moon-crater ${crater}`;
        moon.appendChild(craterDiv);
    });
    forestContainer.appendChild(moon);

    // Create other elements with error handling
    const elements = [
        { tag: 'img', src: 'images/castle.png', alt: 'Lâu đài', class: 'castle', id: 'castle' },
        { tag: 'img', src: 'images/tree-right-1.gif', alt: 'Cây góc phải', class: 'tree-right' },
        { tag: 'img', src: 'images/witch.gif', alt: 'Phù thủy bay', class: 'witch enter', id: 'witch' },
        { tag: 'div', class: 'dog-light', id: 'dog-light' },
        { tag: 'img', src: 'images/ghost.gif', alt: 'Ma bay', class: 'ghost-float', id: 'ghost1' },
        { tag: 'div', class: 'grass' },
        { tag: 'div', class: 'wibu-ground', id: 'wibu-ground' },
        { tag: 'img', src: 'images/wibu-1.gif', alt: 'Wibu', class: 'wibu-img', id: 'wibu-img' },
        { tag: 'audio', src: 'sounds/wibu.mp3', id: 'wibu-audio' },
        { tag: 'img', src: 'images/pumpkin.gif', alt: 'Bí ngô', class: 'pumpkin-group', id: 'pumpkin-group' },
        { tag: 'img', src: 'images/dog.gif', alt: 'Chó chạy', class: 'dog', id: 'dog' },
        { tag: 'div', class: 'eyes-under', id: 'eyes-under' },
        { tag: 'img', src: 'images/bat.gif', alt: 'Dơi bay', class: 'bat-fly', id: 'bat-fly' }
    ];

    // Toggle wibu image between 'images/wibu-1.gif' and 'images/wibu.gif' when Space is pressed
    (function setupWibuToggle() {
        const SRC_A = 'images/wibu-1.gif';
        const SRC_B = 'images/wibu.gif'; // đổi tên file nếu khác
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault(); // tránh cuộn trang khi nhấn Space
                const wibu = document.getElementById('wibu-img');
                if (!wibu) {
                    console.warn('wibu-img chưa được tạo hoặc không tồn tại');
                    return;
                }
                const current = wibu.getAttribute('src') || '';
                const next = current.includes('wibu-1') ? SRC_B : SRC_A;
                wibu.src = next;
                wibu.onerror = () => console.error('Failed to load wibu image:', next);
                wibu.onload = () => console.log('Wibu image switched to:', next);
            }
        });
    })();

    elements.forEach(el => {
        const element = document.createElement(el.tag);
        if (el.src) {
            element.src = el.src;
            element.onerror = () => console.error(`Failed to load ${el.tag} resource: ${el.src}`);
            element.onload = () => console.log(`Successfully loaded ${el.tag} resource: ${el.src}`);
        }
        if (el.alt) element.alt = el.alt;
        if (el.class) element.className = el.class;
        if (el.id) element.id = el.id;
        forestContainer.appendChild(element);
    });

    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Initialize animations
    const dog = document.getElementById('dog');
    const dogLight = document.getElementById('dog-light');
    const ghost1 = document.getElementById('ghost1');
    const eyesUnder = document.getElementById('eyes-under');
    const bat = document.getElementById('bat-fly');

    if (!dog || !dogLight || !ghost1 || !eyesUnder || !bat) {
        console.error('One or more critical elements failed to load:', {
            dog: !!dog,
            dogLight: !!dogLight,
            ghost1: !!ghost1,
            eyesUnder: !!eyesUnder,
            bat: !!bat
        });
        return; // Stop execution if critical elements are missing
    }

    const runDuration = 7000;
    const interval = 10000;
    const offset = 7;
    let extraGhosts = [];
    let direction = true;

    function createExtraGhost(id) {
        const ghost = document.createElement('img');
        ghost.src = 'images/ghost.gif';
        ghost.alt = 'Ma bay';
        ghost.className = 'ghost-float';
        ghost.id = id;
        ghost.onerror = () => console.error(`Failed to load extra ghost: images/ghost.gif`);
        ghost.onload = () => console.log(`Successfully loaded extra ghost: images/ghost.gif`);
        forestContainer.appendChild(ghost);
        return ghost;
    }

    function removeExtraGhosts() {
        extraGhosts.forEach(ghost => ghost.remove());
        extraGhosts = [];
    }

    function runDogAndGhost(nextDirection, delay = 50) {
        removeExtraGhosts();

        if (nextDirection) {
            dog.style.left = '-20vw';
            dog.style.transform = 'scaleX(-1)';
            dogLight.style.left = '-14vw';
            dogLight.style.transform = 'translate(-50%, 0) scaleX(-1)';
            ghost1.style.left = `calc(-14vw + ${offset}vw)`;
            ghost1.style.transform = 'translate(-50%, 0) scaleX(-1)';
            void dog.offsetWidth;
            setTimeout(() => {
                dog.style.left = '110vw';
                dogLight.style.left = '116vw';
                ghost1.style.left = `calc(116vw + ${offset}vw)`;
                setTimeout(() => runDogAndGhost(false), runDuration);
            }, delay);
        } else {
            dog.style.left = '110vw';
            dog.style.transform = 'scaleX(1)';
            dogLight.style.left = '116vw';
            dogLight.style.transform = 'translate(-50%, 0) scaleX(1)';
            ghost1.style.left = `calc(116vw + ${offset}vw)`;
            ghost1.style.transform = 'translate(-50%, 0) scaleX(1)';
            const ghost2 = createExtraGhost('ghost2');
            const ghost3 = createExtraGhost('ghost3');
            extraGhosts = [ghost2, ghost3];
            ghost2.style.left = `calc(116vw + ${offset + 2}vw)`;
            ghost2.style.transform = 'translate(-50%, 0) scaleX(1)';
            ghost3.style.left = `calc(116vw + ${offset + 4}vw)`;
            ghost3.style.transform = 'translate(-50%, 0) scaleX(1)';
            void dog.offsetWidth;
            setTimeout(() => {
                dog.style.left = '-20vw';
                dogLight.style.left = '-14vw';
                ghost1.style.left = `calc(-14vw + ${offset}vw)`;
                ghost2.style.left = `calc(-14vw + ${offset + 2}vw)`;
                ghost3.style.left = `calc(-14vw + ${offset + 4}vw)`;
                setTimeout(() => runDogAndGhost(true), interval);
            }, delay);
        }
    }

    dog.style.left = '-20vw';
    dog.style.transform = 'scaleX(-1)';
    dogLight.style.left = '-14vw';
    dogLight.style.transform = 'translate(-50%, 0) scaleX(-1)';
    ghost1.style.left = `calc(-14vw + ${offset}vw)`;
    ghost1.style.transform = 'translate(-50%, 0) scaleX(-1)';

    setTimeout(() => runDogAndGhost(true), 1000);

    // Eyes blinking effect
    const EYES_COUNT = 1;
    const EYES_SHOW_TIME = 3000;
    const EYES_HIDE_TIME = 1200;
    const EYE_COLORS = ['red', 'purple', 'yellow'];

    function randomEyesPosition() {
        const left = Math.random() * 85 + 5;
        const bottom = Math.random() * 12 + 3;
        return { left: `${left}%`, bottom: `${bottom}%` };
    }

    function createEyesPair(colorClass) {
        const container = document.createElement('div');
        container.className = 'eyes-blink';
        const pos = randomEyesPosition();
        container.style.left = pos.left;
        container.style.bottom = pos.bottom;
        const scale = 0.4 + Math.random() * 0.8;
        container.style.transform = `scale(${scale})`;

        const eye1 = document.createElement('div');
        eye1.className = `eye-dot ${colorClass}`;
        const eye2 = document.createElement('div');
        eye2.className = `eye-dot ${colorClass}`;

        container.appendChild(eye1);
        container.appendChild(eye2);

        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                eye1.classList.add('blink');
                eye2.classList.add('blink');
                setTimeout(() => {
                    eye1.classList.remove('blink');
                    eye2.classList.remove('blink');
                }, 150);
            }
        }, 800 + Math.random() * 1200);

        container.dataset.blinkInterval = blinkInterval;
        return container;
    }

    function showEyesLoop() {
        eyesUnder.innerHTML = '';
        const n = 1 + Math.floor(Math.random() * EYES_COUNT);
        const shuffledColors = EYE_COLORS.slice().sort(() => Math.random() - 0.5);

        for (let i = 0; i < n; i++) {
            const eyes = createEyesPair(shuffledColors[i % shuffledColors.length]);
            eyesUnder.appendChild(eyes);
            setTimeout(() => eyes.classList.add('visible'), 50 * i);
        }

        setTimeout(() => {
            const allEyes = eyesUnder.querySelectorAll('.eyes-blink');
            allEyes.forEach(eyes => {
                eyes.classList.remove('visible');
                clearInterval(eyes.dataset.blinkInterval);
            });
            setTimeout(() => {
                eyesUnder.innerHTML = '';
                setTimeout(showEyesLoop, EYES_HIDE_TIME + Math.random() * 1000);
            }, 400);
        }, EYES_SHOW_TIME);
    }

    setTimeout(showEyesLoop, 2000);

    // Moon, witch, castle, and pumpkin animations
    setTimeout(() => {
        const moon = document.getElementById('moon');
        if (moon) moon.classList.add('visible');
        else console.error('Moon element not found');
    }, 100);

    setTimeout(() => {
        const witch = document.getElementById('witch');
        if (witch) witch.classList.add('visible');
        else console.error('Witch element not found');
    }, 800);

    setTimeout(() => {
        const castle = document.getElementById('castle');
        if (castle) castle.classList.add('visible');
        else console.error('Castle element not found');
        const pumpkin = document.getElementById('pumpkin-group');
        if (pumpkin) pumpkin.classList.add('visible');
        else console.error('Pumpkin element not found');
    }, 1500);

    // Bat flying effect
    let batTarget = { x: 50, y: 20, scale: 1 };
    let batTimeout = null;
    let mouseActive = false;
    let batMoving = false;

    function randomBatTarget() {
        return {
            x: Math.random() * 75 + 10,
            y: Math.random() * 32 + 8,
            scale: 0.5 + Math.random() * 0.7
        };
    }

    function moveBatTo(target, duration = 2200) {
        bat.style.left = target.x + 'vw';
        bat.style.top = target.y + 'vh';
        bat.style.transform = `scale(${target.scale})`;
        bat.style.width = (7 * target.scale) + 'vw';
    }

    function batAutoFly() {
        if (mouseActive) return;
        batMoving = true;
        batTarget = randomBatTarget();
        moveBatTo(batTarget);
        batTimeout = setTimeout(batAutoFly, 2200 + Math.random() * 1200);
    }

    function batFollowMouse(e) {
        mouseActive = true;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        let x = (e.clientX / vw) * 100;
        let y = (e.clientY / vh) * 100;
        x = Math.max(5, Math.min(90, x));
        y = Math.max(5, Math.min(60, y));
        const dx = Math.abs(x - 50);
        const dy = Math.abs(y - 30);
        let scale = 1.2 - (dx + dy) / 100;
        scale = Math.max(0.5, Math.min(1.2, scale));
        batTarget = { x, y, scale };
        moveBatTo(batTarget, 1200);
        if (batTimeout) clearTimeout(batTimeout);
        batTimeout = setTimeout(() => {
            mouseActive = false;
            batAutoFly();
        }, 2000);
    }

    moveBatTo(batTarget, 0);
    setTimeout(batAutoFly, 800);
    window.addEventListener('mousemove', batFollowMouse);

    window.addEventListener('wheel', function (e) {
        let scale = batTarget.scale || 1;
        if (e.deltaY < 0) {
            scale += 0.08;
        } else {
            scale -= 0.08;
        }
        scale = Math.max(0.4, Math.min(2, scale));
        batTarget.scale = scale;
        moveBatTo(batTarget, 400);
    });

    // Wibu ground bounce effect
    (function wibuGroundBounce() {
        const ground = document.getElementById('wibu-ground');
        const wibu = document.getElementById('wibu-img');
        if (!ground || !wibu) {
            console.error('Wibu ground or image not found:', { ground: !!ground, wibu: !!wibu });
            return;
        }
        let up = true;
        let right = true;
        function animate() {
            const y = up ? -38 : 0;
            const x = right ? 24 : -24;
            ground.style.transform = `translateX(-50%) translateY(${y}px)`;
            wibu.style.transform = `translateX(-50%) translateY(${y - 18}px) translateX(${x}px)`;
            up = !up;
            right = !right;
            setTimeout(animate, up ? 1200 : 1200);
        }
        animate();
    })();

    // Background music
    (function wibuMusic() {
        const audio = document.getElementById('wibu-audio');
        if (!audio) {
            console.error('Audio element not found: sounds/wibu.mp3');
            return;
        }
        audio.loop = true;
        audio.onerror = () => console.error('Failed to load audio: sounds/wibu.mp3');
        audio.onloadeddata = () => console.log('Successfully loaded audio: sounds/wibu.mp3');
        function tryPlay() {
            audio.currentTime = 0;
            const playPromise = audio.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise.catch(error => {
                    console.error('Audio playback failed:', error);
                    window.addEventListener('click', tryPlay, { once: true });
                });
            }
        }
        setTimeout(tryPlay, 300);
    })();
}