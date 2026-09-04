document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    gsap.registerPlugin(ScrollTrigger);

    // Lock page scrolling while loading
    document.body.classList.add("loading");

    const preloader = document.getElementById("preloader");
    const loaderCount = document.getElementById("loaderCount");
    const loaderName = document.getElementById("loaderName");

    // Helper function to trigger/reset the smooth circular ripple
    function triggerRipple() {
        if (!loaderCount) return;
        loaderCount.classList.remove('ripple-effect');
        void loaderCount.offsetWidth; // Force reflow to reset CSS animation
        loaderCount.classList.add('ripple-effect');
    }

    // ============================================================
    // SMOOTH EASE-OUT PRELOADER (CUBIC EASE OUT)
    // ============================================================
    if (preloader && loaderCount) {
        loaderCount.textContent = "0";
        let rippleTriggered = false;

        // Subtitle (Name) Fade-in Sync
        if (loaderName) {
            setTimeout(() => {
                loaderName.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                loaderName.style.opacity = "1";
                loaderName.style.transform = "translateY(0)";
            }, 500);
        }

        // Initial Ripple Effect
        setTimeout(() => {
            triggerRipple();
        }, 150);

        // Easing Function: Starts fast, decelerates naturally
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        function startSmoothCountdown(duration) {
            let startTime = null;

            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);
                const currentCount = Math.floor(easedProgress * 100);

                loaderCount.textContent = currentCount;

                // Organic ripple trigger around 90-95%
                if (currentCount >= 90 && !rippleTriggered) {
                    rippleTriggered = true;
                    triggerRipple();
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    finalizePreloader();
                }
            }

            requestAnimationFrame(animate);
        }

        function finalizePreloader() {
            setTimeout(() => {
                preloader.classList.add("preloader-hidden");
                document.body.classList.remove("loading");
                
                setTimeout(() => {
                    preloader.style.display = "none";
                }, 700);

                // Start website GSAP animations after preloader leaves
                initHeroAnimations();
            }, 600);
        }

        // 3500ms duration for ultra-smooth countdown
        setTimeout(() => {
            startSmoothCountdown(3500); 
        }, 800);

    } else {
        document.body.classList.remove("loading");
        initHeroAnimations();
    }

    /* Dynamic Greeting Logic */
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        const hour = new Date().getHours();
        let text = "Hello 👋, I'm Arpon";
        if (hour >= 5 && hour < 12) text = "Good Morning ☀️, I'm Arpon";
        else if (hour >= 12 && hour < 18) text = "Good Afternoon 🌤️, I'm Arpon";
        else text = "Good Evening 🌙, I'm Arpon";
        greetingElement.textContent = text;
    }

    /* ================= GSAP HERO & SCROLL ANIMATIONS ================= */
    function initHeroAnimations() {
        const tl = gsap.timeline();
        tl.from("#hero-img", { scale: 0.5, opacity: 0, duration: 1, ease: "back.out(1.7)" })
          .from("#hero-title", { y: 40, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.5")
          .from("#hero-subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from("#hero-cta", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

        gsap.from(".bento-reveal", {
            scrollTrigger: { trigger: "#about", start: "top 80%" },
            y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
        });

        gsap.from(".project-card-reveal", {
            scrollTrigger: { trigger: "#projects", start: "top 80%" },
            y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out"
        });

        gsap.utils.toArray(".skill-progress").forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: "top 90%" },
                width: bar.getAttribute("data-width"),
                duration: 1.5,
                ease: "power2.out"
            });
        });
    }

    /* Initialize Interactive Demos */
    calculateGate();
    createBoard();
    initSortingVisualizer();
    initWeb3Forms();
});

/* ================= LOGIC GATE SIMULATOR ================= */
let stateA = 0;
let stateB = 0;

function toggleInput(id) {
    if (id === 'inputA') {
        stateA = stateA === 0 ? 1 : 0;
    } else {
        stateB = stateB === 0 ? 1 : 0;
    }
    calculateGate();
}

function calculateGate() {
    const gateSelect = document.getElementById('gateSelect');
    if(!gateSelect) return;
    const gate = gateSelect.value;
    const btnA = document.getElementById('btnInputA');
    const valA = document.getElementById('valA');
    const btnB = document.getElementById('btnInputB');
    const valB = document.getElementById('valB');
    const gateFormula = document.getElementById('gateFormula');

    valA.innerText = stateA;
    if (stateA === 1) {
        valA.className = "text-4xl font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]";
        btnA.className = "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all cursor-pointer bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
    } else {
        valA.className = "text-4xl font-bold text-slate-500";
        btnA.className = "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all cursor-pointer bg-slate-900/50 border-white/10";
    }

    if (gate === "NOT") {
        btnB.style.opacity = "0.3";
        btnB.style.pointerEvents = "none";
    } else {
        btnB.style.opacity = "1";
        btnB.style.pointerEvents = "auto";
    }

    valB.innerText = stateB;
    if (stateB === 1) {
        valB.className = "text-4xl font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]";
        btnB.className = "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all cursor-pointer bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
    } else {
        valB.className = "text-4xl font-bold text-slate-500";
        btnB.className = "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all cursor-pointer bg-slate-900/50 border-white/10";
    }

    let result = 0;
    if (gate === "NOT") {
        result = stateA === 0 ? 1 : 0;
        if (gateFormula) gateFormula.textContent = `Formula: NOT (${stateA}) = ${result}`;
    } else {
        if (gate === "AND") result = stateA && stateB;
        else if (gate === "OR") result = stateA || stateB;
        else if (gate === "XOR") result = stateA ^ stateB;
        else if (gate === "NAND") result = !(stateA && stateB) ? 1 : 0;
        else if (gate === "NOR") result = !(stateA || stateB) ? 1 : 0;

        if (gateFormula) gateFormula.textContent = `Formula: ${stateA} ${gate} ${stateB} = ${result}`;
    }

    const outputEl = document.getElementById('gateOutput');
    const light = document.getElementById('statusLight');
    outputEl.innerText = result;
    
    if (result === 1) {
        outputEl.className = "text-3xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]";
        light.className = "w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] transition-all";
    } else {
        outputEl.className = "text-3xl font-black text-slate-600";
        light.className = "w-3 h-3 rounded-full bg-slate-700 transition-all";
    }
}

/* ================= TIC-TAC-TOE AI ================= */
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "X";
const player = "X";
const ai = "O";

function createBoard() {
    const boardEl = document.getElementById("tttBoard");
    if(!boardEl) return;
    boardEl.innerHTML = "";
    board.forEach((cell, index) => {
        const btn = document.createElement("button");
        btn.classList.add("ttt-cell", "glass-card", "rounded-xl");
        btn.dataset.index = index;
        btn.innerText = cell;
        if(cell === 'X') btn.classList.add("text-indigo-400");
        if(cell === 'O') btn.classList.add("text-cyan-400");
        btn.onclick = () => playerMove(index);
        boardEl.appendChild(btn);
    });
}

function playerMove(index) {
    const mode = document.getElementById('tttMode').value;
    if (board[index] === "" && gameActive) {
        makeMove(index, currentPlayer);
        
        if (gameActive) {
            if (mode !== 'pvp') {
                currentPlayer = ai;
                document.getElementById('tttTurn').innerText = "AI is thinking... 🤖";
                setTimeout(() => {
                    if (gameActive) aiMove();
                }, 250);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                document.getElementById('tttTurn').innerText = `Turn: Player ${currentPlayer}`;
            }
        }
    }
}

function makeMove(index, symbol) {
    board[index] = symbol;
    createBoard();
    checkWinner();
}

function aiMove() {
    const mode = document.getElementById('tttMode').value;
    let move;
    if (mode === 'unbeatable') {
        move = minimax(board, ai).index;
    } else {
        let available = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
        move = available[Math.floor(Math.random() * available.length)];
    }
    if (move !== undefined && move !== null) {
        makeMove(move, ai);
        if (gameActive) {
            currentPlayer = player;
            document.getElementById('tttTurn').innerText = "Your Turn (X)";
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            const mode = document.getElementById('tttMode').value;
            let text = `Player ${board[a]} Wins! 🎉`;
            if (mode !== 'pvp') {
                text = board[a] === player ? "You Win! 🎉" : "AI Wins! 🤖";
            }
            document.getElementById('tttTurn').innerText = text;
            document.getElementById('tttTurn').className = "text-sm font-bold text-emerald-400 animate-bounce";
            return;
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        document.getElementById('tttTurn').innerText = "It's a Draw! 🤝";
        document.getElementById('tttTurn').className = "text-sm font-bold text-amber-400";
    }
}

function minimax(newBoard, playerChar) {
    let availSpots = newBoard.map((v, i) => v === "" ? i : null).filter(v => v !== null);

    if (checkMinimaxWinner(newBoard, player)) return {score: -10};
    if (checkMinimaxWinner(newBoard, ai)) return {score: 10};
    if (availSpots.length === 0) return {score: 0};

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = playerChar;

        if (playerChar === ai) {
            move.score = minimax(newBoard, player).score;
        } else {
            move.score = minimax(newBoard, ai).score;
        }

        newBoard[availSpots[i]] = "";
        moves.push(move);
    }

    let bestMove;
    if (playerChar === ai) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

function checkMinimaxWinner(b, p) {
    return (
        (b[0] == p && b[1] == p && b[2] == p) || (b[3] == p && b[4] == p && b[5] == p) || (b[6] == p && b[7] == p && b[8] == p) ||
        (b[0] == p && b[3] == p && b[6] == p) || (b[1] == p && b[4] == p && b[7] == p) || (b[2] == p && b[5] == p && b[8] == p) ||
        (b[0] == p && b[4] == p && b[8] == p) || (b[2] == p && b[4] == p && b[6] == p)
    );
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.getElementById('tttTurn').innerText = "Your Turn (X)";
    document.getElementById('tttTurn').className = "text-sm font-bold text-brand-secondary";
    createBoard();
}

/* ================= SORTING VISUALIZER ================= */
function initSortingVisualizer() {
    const arrayContainer = document.getElementById("arrayContainer");
    const generateBtn = document.getElementById("generateBtn");
    const sortBtn = document.getElementById("sortBtn");
    const stopBtn = document.getElementById("stopBtn");
    const algorithmSelect = document.getElementById("algorithmSelect");
    const speedSlider = document.getElementById("speedSlider");

    if (!arrayContainer) return;

    let array = [];
    let isSorting = false;
    
    const getArraySize = () => window.innerWidth < 640 ? 20 : 35;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getDelay() {
        return Math.max(16, 510 - speedSlider.value);
    }

    function generateNewArray() {
        if (isSorting) return;
        array = [];
        arrayContainer.innerHTML = "";
        const size = getArraySize();

        for (let i = 0; i < size; i++) {
            const value = Math.floor(Math.random() * 210) + 20;
            array.push(value);

            const bar = document.createElement("div");
            bar.classList.add("array-bar");
            bar.style.height = `${value}px`;
            arrayContainer.appendChild(bar);
        }
    }

    function resetBarStyles() {
        const bars = arrayContainer.querySelectorAll(".array-bar");
        bars.forEach(bar => bar.className = "array-bar");
    }

    async function bubbleSort() {
        const bars = arrayContainer.querySelectorAll(".array-bar");
        const len = array.length;
        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (!isSorting) return;
                bars[j].classList.add("comparing");
                bars[j + 1].classList.add("comparing");
                
                await sleep(getDelay());

                if (array[j] > array[j + 1]) {
                    if (!isSorting) return;
                    bars[j].classList.remove("comparing");
                    bars[j + 1].classList.remove("comparing");
                    bars[j].classList.add("swapping");
                    bars[j + 1].classList.add("swapping");

                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    bars[j].style.height = `${array[j]}px`;
                    bars[j + 1].style.height = `${array[j + 1]}px`;
                    
                    await sleep(getDelay());
                }
                bars[j].classList.remove("comparing", "swapping");
                bars[j + 1].classList.remove("comparing", "swapping");
            }
            if (isSorting) bars[len - 1 - i].classList.add("sorted");
        }
        if (isSorting) bars[0].classList.add("sorted");
    }

    async function selectionSort() {
        const bars = arrayContainer.querySelectorAll(".array-bar");
        const len = array.length;
        for (let i = 0; i < len; i++) {
            let minIndex = i;
            bars[minIndex].classList.add("comparing");

            for (let j = i + 1; j < len; j++) {
                if (!isSorting) return;
                bars[j].classList.add("comparing");
                await sleep(getDelay());

                if (array[j] < array[minIndex]) {
                    bars[minIndex].classList.remove("comparing");
                    minIndex = j;
                    bars[minIndex].classList.add("comparing");
                } else {
                    bars[j].classList.remove("comparing");
                }
            }

            if (minIndex !== i) {
                if (!isSorting) return;
                bars[i].classList.add("swapping");
                bars[minIndex].classList.add("swapping");
                await sleep(getDelay());

                let temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;

                bars[i].style.height = `${array[i]}px`;
                bars[minIndex].style.height = `${array[minIndex]}px`;
                bars[minIndex].classList.remove("swapping", "comparing");
            }
            bars[i].classList.remove("comparing", "swapping");
            if (isSorting) bars[i].classList.add("sorted");
        }
    }

    async function insertionSort() {
        const bars = arrayContainer.querySelectorAll(".array-bar");
        const len = array.length;
        bars[0].classList.add("sorted");

        for (let i = 1; i < len; i++) {
            if (!isSorting) return;
            let key = array[i];
            let j = i - 1;

            bars[i].classList.add("swapping");
            await sleep(getDelay());

            while (j >= 0 && array[j] > key) {
                if (!isSorting) return;
                bars[j].classList.add("comparing");
                await sleep(getDelay());

                array[j + 1] = array[j];
                bars[j + 1].style.height = `${array[j]}px`;
                bars[j].classList.remove("comparing");
                j--;
            }

            array[j + 1] = key;
            bars[j + 1].style.height = `${key}px`;
            bars[i].classList.remove("swapping");

            if (isSorting) {
                for (let k = 0; k <= i; k++) {
                    bars[k].classList.add("sorted");
                }
            }
        }
    }

    async function startSorting() {
        if (isSorting) return;
        const firstBar = arrayContainer.querySelector(".array-bar");
        if (firstBar && firstBar.classList.contains("sorted")) {
            generateNewArray();
        }

        isSorting = true;
        generateBtn.disabled = true;
        sortBtn.disabled = true;
        algorithmSelect.disabled = true;
        stopBtn.disabled = false;

        const algorithm = algorithmSelect.value;
        if (algorithm === "bubble") await bubbleSort();
        else if (algorithm === "selection") await selectionSort();
        else if (algorithm === "insertion") await insertionSort();

        finishSorting();
    }

    function stopSorting() {
        isSorting = false;
        resetBarStyles();
        finishSorting();
    }

    function finishSorting() {
        isSorting = false;
        generateBtn.disabled = false;
        sortBtn.disabled = false;
        algorithmSelect.disabled = false;
        stopBtn.disabled = true;
    }

    generateBtn.addEventListener("click", generateNewArray);
    sortBtn.addEventListener("click", startSorting);
    stopBtn.addEventListener("click", stopSorting);
    
    window.addEventListener("resize", () => {
        if (!isSorting) generateNewArray();
    });

    generateNewArray();
}

/* ================= WEB3FORMS SUBMISSION ================= */
function initWeb3Forms() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('formSubmitBtn');
    const formResponse = document.getElementById('formResponse');

    if (!form || !submitBtn) return;

    const btnTextSpan = submitBtn.querySelector('span');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const originalText = btnTextSpan ? btnTextSpan.textContent : "Send Message";

        if (formResponse) {
            formResponse.classList.add('hidden');
            formResponse.className = "text-center text-sm font-mono mt-4 p-3 rounded-xl hidden";
        }

        if (btnTextSpan) btnTextSpan.textContent = "Sending...";
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (formResponse) {
                    formResponse.textContent = "Success! Your message has been sent directly to Gmail.";
                    formResponse.classList.remove('hidden');
                    formResponse.classList.add('bg-emerald-500/10', 'border', 'border-emerald-500/30', 'text-emerald-400');
                }
                form.reset();
            } else {
                if (formResponse) {
                    formResponse.textContent = "Error: " + (data.message || "Failed to send message.");
                    formResponse.classList.remove('hidden');
                    formResponse.classList.add('bg-rose-500/10', 'border', 'border-rose-500/30', 'text-rose-400');
                }
            }

        } catch (error) {
            if (formResponse) {
                formResponse.textContent = "Something went wrong. Please check your connection.";
                formResponse.classList.remove('hidden');
                formResponse.classList.add('bg-rose-500/10', 'border', 'border-rose-500/30', 'text-rose-400');
            }
        } finally {
            if (btnTextSpan) btnTextSpan.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    });
    // Dynamic Dhaka Local Time Clock
function updateDhakaTime() {
    const clockElement = document.getElementById('dhakaClock');
    if (!clockElement) return;

    const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    clockElement.textContent = formatter.format(new Date());
}

// Run clock every second
setInterval(updateDhakaTime, 1000);
updateDhakaTime(); // Initial call
}