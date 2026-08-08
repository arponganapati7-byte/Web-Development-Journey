document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. DYNAMIC TIME-BASED GREETING
    // ==========================================
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingText = "Hello";
        let emoji = "👋";

        if (hour >= 5 && hour < 12) {
            greetingText = "Good Morning";
            emoji = "☀️";
        } else if (hour >= 12 && hour < 18) {
            greetingText = "Good Afternoon";
            emoji = "🌤️";
        } else {
            greetingText = "Good Evening";
            emoji = "🌙";
        }

        greetingElement.textContent = `${greetingText} ${emoji}, I'm Arpon`;
    }

    // ==========================================
    // 2. ACCURATE ACTIVE NAV HIGHLIGHT
    // ==========================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let isClickScrolling = false;

    const navObserverOptions = {
        root: null,
        rootMargin: "-10% 0px -65% 0px", 
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        if (isClickScrolling) return;

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 40);
                
                if (!isAtBottom) {
                    navLinks.forEach((link) => {
                        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
                    });
                }
            }
        });
    }, navObserverOptions);

    sections.forEach((section) => navObserver.observe(section));

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
            
            isClickScrolling = true;
            setTimeout(() => {
                isClickScrolling = false;
            }, 800);
        });
    });

    window.addEventListener("scroll", () => {
        if (isClickScrolling) return;

        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 40);
        if (isAtBottom) {
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === "#contact");
            });
        }
    });

    // ==========================================
    // 3. ANIMATE SKILL BARS
    // ==========================================
    const skillSection = document.getElementById("skills");
    const progressBars = document.querySelectorAll(".progress");

    if (skillSection) {
        const skillObserverOptions = {
            root: null,
            threshold: 0.3
        };

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    progressBars.forEach((bar) => {
                        const targetWidth = bar.dataset.width;
                        bar.style.width = "0%";
                        
                        setTimeout(() => {
                            bar.style.transition = "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)";
                            bar.style.width = `${targetWidth}%`;
                        }, 100);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, skillObserverOptions);

        skillObserver.observe(skillSection);
    }

    // ==========================================
    // 4. INTERACTIVE LOGIC GATE SIMULATOR
    // ==========================================
    const inputABtn = document.getElementById("inputA");
    const inputBBtn = document.getElementById("inputB");
    const gateSelect = document.getElementById("gateSelect");
    const gateOutput = document.getElementById("gateOutput");
    const gateFormula = document.getElementById("gateFormula");

    if (inputABtn && inputBBtn && gateSelect && gateOutput) {
        let valA = 0;
        let valB = 0;

        function evaluateGate() {
            const gate = gateSelect.value;
            let result = 0;

            if (gate === "NOT") {
                inputBBtn.style.opacity = "0.4";
                inputBBtn.style.pointerEvents = "none";
                result = valA === 0 ? 1 : 0;
                if (gateFormula) gateFormula.textContent = `Formula: NOT (${valA}) = ${result}`;
            } else {
                inputBBtn.style.opacity = "1";
                inputBBtn.style.pointerEvents = "auto";

                if (gate === "AND") result = valA && valB;
                else if (gate === "OR") result = valA || valB;
                else if (gate === "XOR") result = valA ^ valB;
                else if (gate === "NAND") result = !(valA && valB) ? 1 : 0;
                else if (gate === "NOR") result = !(valA || valB) ? 1 : 0;

                if (gateFormula) gateFormula.textContent = `Formula: ${valA} ${gate} ${valB} = ${result}`;
            }

            gateOutput.textContent = result;
            if (result === 1) {
                gateOutput.classList.remove("off");
                gateOutput.classList.add("on");
            } else {
                gateOutput.classList.remove("on");
                gateOutput.classList.add("off");
            }
        }

        inputABtn.addEventListener("click", () => {
            valA = valA === 0 ? 1 : 0;
            inputABtn.querySelector(".bit-val").textContent = valA;
            inputABtn.classList.toggle("active", valA === 1);
            evaluateGate();
        });

        inputBBtn.addEventListener("click", () => {
            valB = valB === 0 ? 1 : 0;
            inputBBtn.querySelector(".bit-val").textContent = valB;
            inputBBtn.classList.toggle("active", valB === 1);
            evaluateGate();
        });

        gateSelect.addEventListener("change", evaluateGate);
        evaluateGate();
    }

    // ==========================================
    // 5. PLAYABLE TIC-TAC-TOE DEMO
    // ==========================================
    const tttCells = document.querySelectorAll(".ttt-cell");
    const tttTurn = document.getElementById("tttTurn");
    const tttReset = document.getElementById("tttReset");
    const tttMode = document.getElementById("tttMode");

    if (tttCells.length > 0 && tttMode) {
        let board = ["", "", "", "", "", "", "", "", ""];
        let human = "X";
        let ai = "O";
        let currentPlayer = "X";
        let gameActive = true;
        let isAiTurn = false;

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        function checkWinnerState(b) {
            for (let pattern of winPatterns) {
                const [a, bIdx, c] = pattern;
                if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
                    return b[a];
                }
            }
            return b.includes("") ? null : "Tie";
        }

        function minimax(newBoard, depth, isMaximizing) {
            let result = checkWinnerState(newBoard);
            if (result === ai) return 10 - depth;
            if (result === human) return depth - 10;
            if (result === "Tie") return 0;

            if (isMaximizing) {
                let bestScore = -Infinity;
                for (let i = 0; i < 9; i++) {
                    if (newBoard[i] === "") {
                        newBoard[i] = ai;
                        let score = minimax(newBoard, depth + 1, false);
                        newBoard[i] = "";
                        bestScore = Math.max(score, bestScore);
                    }
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < 9; i++) {
                    if (newBoard[i] === "") {
                        newBoard[i] = human;
                        let score = minimax(newBoard, depth + 1, true);
                        newBoard[i] = "";
                        bestScore = Math.min(score, bestScore);
                    }
                }
                return bestScore;
            }
        }

        function getBestMove() {
            let bestScore = -Infinity;
            let move = -1;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = ai;
                    let score = minimax(board, 0, false);
                    board[i] = "";
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            return move;
        }

        function getDefensiveMove() {
            const emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);

            for (let idx of emptyIndices) {
                board[idx] = ai;
                if (checkWinnerState(board) === ai) {
                    board[idx] = "";
                    return idx;
                }
                board[idx] = "";
            }

            for (let idx of emptyIndices) {
                board[idx] = human;
                if (checkWinnerState(board) === human) {
                    board[idx] = "";
                    return idx;
                }
                board[idx] = "";
            }

            if (board[4] === "") return 4;
            return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        }

        function getEasyMove() {
            const emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
            return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        }

        function decideAIMove() {
            const mode = tttMode.value;
            if (mode === "unbeatable") return getBestMove();
            if (mode === "defensive") return getDefensiveMove();
            if (mode === "easy") return getEasyMove();
            return -1;
        }

        function makeMove(index, player) {
            board[index] = player;
            tttCells[index].textContent = player;
            
            const winner = checkWinnerState(board);
            if (winner) {
                gameActive = false;
                if (winner === "Tie") {
                    tttTurn.textContent = "It's a Tie! 🤝";
                } else if (winner === human && tttMode.value !== "pvp") {
                    tttTurn.textContent = "You Win! 🎉";
                } else if (winner === ai && tttMode.value !== "pvp") {
                    tttTurn.textContent = "AI Wins! 🤖";
                } else {
                    tttTurn.textContent = `Player ${winner} Wins! 🎉`;
                }
                return true;
            }
            return false;
        }

        tttCells.forEach((cell) => {
            cell.addEventListener("click", () => {
                const index = cell.dataset.index;

                if (board[index] === "" && gameActive && !isAiTurn) {
                    const gameOver = makeMove(index, currentPlayer);

                    if (!gameOver) {
                        if (tttMode.value !== "pvp") {
                            isAiTurn = true;
                            tttTurn.textContent = "AI is thinking... 🤖";

                            setTimeout(() => {
                                const aiIndex = decideAIMove();
                                if (aiIndex !== -1 && board[aiIndex] === "") {
                                    const aiGameOver = makeMove(aiIndex, ai);
                                    if (!aiGameOver) {
                                        currentPlayer = human;
                                        tttTurn.textContent = "Turn: You (X)";
                                    }
                                }
                                isAiTurn = false;
                            }, 250);
                        } else {
                            currentPlayer = currentPlayer === "X" ? "O" : "X";
                            tttTurn.textContent = `Turn: ${currentPlayer}`;
                        }
                    }
                }
            });
        });

        function resetGame() {
            board = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            gameActive = true;
            isAiTurn = false;
            tttTurn.textContent = tttMode.value !== "pvp" ? "Turn: You (X)" : "Turn: X";
            tttCells.forEach((cell) => (cell.textContent = ""));
        }

        tttReset.addEventListener("click", resetGame);
        tttMode.addEventListener("change", resetGame);
    }
});