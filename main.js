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
                // handRiseLoop(); // Bỏ gọi hiệu ứng bàn tay
            }, 1500);
        });

        // DƠI BAY NGẪU NHIÊN, BAY THEO CHUỘT, PHÓNG TO/THU NHỎ KHI BAY XA/GẦN
        const bat = document.getElementById('bat-fly');
        let batTarget = { x: 50, y: 20, scale: 1 };
        let batTimeout = null;
        let mouseActive = false;
        let lastMouse = { x: 50, y: 20 };
        let batMoving = false;

        function randomBatTarget() {
            // Bay trong vùng 10vw-85vw, 8vh-40vh, scale 0.5-1.2
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
            // Tính vị trí chuột theo vw/vh
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            let x = (e.clientX / vw) * 100;
            let y = (e.clientY / vh) * 100;
            // Giới hạn vùng bay
            x = Math.max(5, Math.min(90, x));
            y = Math.max(5, Math.min(60, y));
            // scale nhỏ khi xa giữa màn hình, lớn khi gần giữa
            const dx = Math.abs(x - 50);
            const dy = Math.abs(y - 30);
            let scale = 1.2 - (dx + dy) / 100;
            scale = Math.max(0.5, Math.min(1.2, scale));
            batTarget = { x, y, scale };
            moveBatTo(batTarget, 1200);
            if (batTimeout) clearTimeout(batTimeout);
            // Nếu chuột không di chuyển 2s thì dơi tự bay tiếp
            if (batMoving) batMoving = false;
            if (batTimeout) clearTimeout(batTimeout);
            batTimeout = setTimeout(() => {
                mouseActive = false;
                batAutoFly();
            }, 2000);
        }

        if (bat) {
            // Khởi tạo vị trí dơi
            moveBatTo(batTarget, 0);
            setTimeout(batAutoFly, 800);
            window.addEventListener('mousemove', batFollowMouse);

            // Hiệu ứng cuộn chuột để tăng/giảm kích thước con dơi
            window.addEventListener('wheel', function (e) {
                // Tăng hoặc giảm scale theo deltaY
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
        }

        // Hiệu ứng nâng lên/hạ xuống và lắc ngang cho wibu và mảnh đất
        (function wibuGroundBounce() {
            const ground = document.getElementById('wibu-ground');
            const wibu = document.getElementById('wibu-img');
            if (!ground || !wibu) return;
            let up = true;
            let right = true;
            function animate() {
                // Nâng lên cao hơn và lắc ngang
                const y = up ? -38 : 0; // nâng cao hơn
                const x = right ? 24 : -24; // lắc sang phải/trái
                ground.style.transform = `translateX(-50%) translateY(${y}px)`;
                wibu.style.transform = `translateX(-50%) translateY(${y - 18}px) translateX(${x}px)`;
                up = !up;
                right = !right;
                setTimeout(animate, up ? 1200 : 1200);
            }
            animate();
        })();

        // Nhạc nền phát tự động khi vào trang (nếu trình duyệt cho phép)
        (function wibuMusic() {
            const audio = document.getElementById('wibu-audio');
            if (!audio) return;
            audio.loop = true;
            // Tự động phát khi trang load
            function tryPlay() {
                audio.currentTime = 0;
                const playPromise = audio.play();
                if (playPromise && typeof playPromise.then === 'function') {
                    playPromise.catch(() => {
                        // Nếu bị chặn, sẽ phát lại khi có tương tác
                        window.addEventListener('click', tryPlay, { once: true });
                    });
                }
            }
            window.addEventListener('DOMContentLoaded', () => {
                setTimeout(tryPlay, 300);
            });
        })();