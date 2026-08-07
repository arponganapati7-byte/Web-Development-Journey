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
    // 2. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150; // Offset for fixed nav
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================
    // 3. ANIMATE SKILL BARS ON SCROLL
    // ==========================================
    const skillSection = document.getElementById("skills");
    const progressBars = document.querySelectorAll(".progress");
    let animated = false;

    if (skillSection) {
        window.addEventListener("scroll", () => {
            const sectionPos = skillSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;

            if (sectionPos < screenPos && !animated) {
                progressBars.forEach((bar) => {
                    const targetWidth = bar.style.width;
                    bar.style.width = "0%"; // Start at 0
                    setTimeout(() => {
                        bar.style.transition = "width 1.2s ease-in-out";
                        bar.style.width = targetWidth; // Animate to target percentage
                    }, 100);
                });
                animated = true; // Prevents re-animating repeatedly
            }
        });
    }
});