
        const dog = document.getElementById('dog');
        const dogLight = document.getElementById('dog-light');
        const ghost1 = document.getElementById('ghost1');
        const forestContainer = document.querySelector('.forest-container');
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

        // MẮT NHẤP NHÁY BẰNG CODE, MÀU NGẪU NHIÊN
        const eyesUnder = document.getElementById('eyes-under');
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

        // Hiệu ứng bàn tay chồi lên
        function handRiseLoop() {
            const hand = document.getElementById('hand-rise');
            if (!hand) return;
            hand.classList.add('visible', 'hand-shake');
            hand.classList.remove('hand-rotate-left', 'hand-rotate-right', 'hand-hide');
            setTimeout(() => {
                hand.classList.add('hand-rotate-left', 'hand-shake');
                hand.classList.remove('hand-rotate-right', 'hand-hide');
                setTimeout(() => {
                    hand.classList.remove('hand-rotate-left');
                    hand.classList.add('hand-rotate-right', 'hand-shake');
                    setTimeout(() => {
                        hand.classList.remove('hand-rotate-right');
                        hand.classList.add('hand-rotate-left', 'hand-shake');
                        setTimeout(() => {
                            hand.classList.remove('hand-rotate-left');
                            hand.classList.add('hand-rotate-right', 'hand-shake');
                            setTimeout(() => {
                                hand.classList.remove('hand-rotate-right', 'visible');
                                hand.classList.add('hand-shake', 'hand-hide');
                                setTimeout(() => {
                                    hand.classList.remove('hand-shake', 'hand-hide');
                                    setTimeout(handRiseLoop, 3000);
                                }, 1200);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 700);
        }

        window.addEventListener('DOMContentLoaded', () => {
            // Hiệu ứng mặt trăng mọc từ dưới lên
            setTimeout(() => {
                const moon = document.getElementById('moon');
                if (moon) moon.classList.add('visible');
            }, 100);

            // Hiệu ứng phù thủy bay từ phải vào
            setTimeout(() => {
                const witch = document.getElementById('witch');
                if (witch) witch.classList.add('visible');
            }, 800);

            setTimeout(() => {
                const castle = document.getElementById('castle');
                if (castle) castle.classList.add('visible');
                const pumpkin = document.getElementById('pumpkin-group');
                if (pumpkin) pumpkin.classList.add('visible');
                handRiseLoop();
            }, 1500);
        });