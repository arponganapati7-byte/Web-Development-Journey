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
                
                // Check if user is scrolled to the very bottom
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

    // Click handler
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

    // Scroll Listener: Force "Contact" active when at bottom of page
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
    const inputA = document.getElementById("inputA");
    const inputB = document.getElementById("inputB");
    const gateSelect = document.getElementById("gateSelect");
    const gateOutput = document.getElementById("gateOutput");

    if (inputA && inputB && gateSelect && gateOutput) {
        let valA = 0;
        let valB = 0;

        function updateLogic() {
            const gate = gateSelect.value;
            let res = 0;

            if (gate === "AND") res = valA && valB;
            else if (gate === "OR") res = valA || valB;
            else if (gate === "XOR") res = valA ^ valB;
            else if (gate === "NAND") res = !(valA && valB) ? 1 : 0;
            else if (gate === "NOR") res = !(valA || valB) ? 1 : 0;

            gateOutput.textContent = res;
        }

        inputA.addEventListener("click", () => {
            valA = valA === 0 ? 1 : 0;
            inputA.textContent = `Input A: ${valA}`;
            updateLogic();
        });

        inputB.addEventListener("click", () => {
            valB = valB === 0 ? 1 : 0;
            inputB.textContent = `Input B: ${valB}`;
            updateLogic();
        });

        gateSelect.addEventListener("change", updateLogic);
    }
    // ==========================================
    // 5. PLAYABLE TIC-TAC-TOE DEMO (WITH SMART MINIMAX AI)
    // ==========================================
    const tttCells = document.querySelectorAll(".ttt-cell");
    const tttTurn = document.getElementById("tttTurn");
    const tttReset = document.getElementById("tttReset");
    const tttMode = document.getElementById("tttMode");

    if (tttCells.length > 0) {
        let board = ["", "", "", "", "", "", "", "", ""];
        let human = "X";
        let ai = "O";
        let currentPlayer = "X";
        let gameActive = true;

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

        // Minimax Algorithm for unbeatable AI
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

        function bestMoveAI() {
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

        function makeMove(index, player) {
            board[index] = player;
            tttCells[index].textContent = player;
            
            const winner = checkWinnerState(board);
            if (winner) {
                gameActive = false;
                if (winner === "Tie") {
                    tttTurn.textContent = "It's a Tie! 🤝";
                } else if (winner === human && tttMode.value === "ai") {
                    tttTurn.textContent = "You Win! 🎉";
                } else if (winner === ai && tttMode.value === "ai") {
                    tttTurn.textContent = "Smart AI Wins! 🤖";
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

                if (board[index] === "" && gameActive) {
                    const gameOver = makeMove(index, currentPlayer);

                    if (!gameOver) {
                        if (tttMode.value === "ai") {
                            currentPlayer = ai;
                            tttTurn.textContent = "AI is thinking... 🤖";

                            setTimeout(() => {
                                const aiIndex = bestMoveAI();
                                if (aiIndex !== -1) {
                                    const aiGameOver = makeMove(aiIndex, ai);
                                    if (!aiGameOver) {
                                        currentPlayer = human;
                                        tttTurn.textContent = "Turn: You (X)";
                                    }
                                }
                            }, 300);
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
            tttTurn.textContent = tttMode.value === "ai" ? "Turn: You (X)" : "Turn: X";
            tttCells.forEach((cell) => (cell.textContent = ""));
        }

        tttReset.addEventListener("click", resetGame);
        tttMode.addEventListener("change", resetGame);
    }
});