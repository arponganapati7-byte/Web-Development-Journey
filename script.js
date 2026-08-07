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
    // 2. ACCURATE ACTIVE NAV LINK HIGHLIGHT
    // ==========================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // Create an observer that triggers when a section is visible
    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -50% 0px", // Triggers when section enters viewport mid-screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    // Observe each card/section
    sections.forEach((section) => observer.observe(section));

    // Special check: Force "Contact" active if user reaches bottom of page
    window.addEventListener("scroll", () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
            navLinks.forEach((link) => link.classList.remove("active"));
            const contactLink = document.querySelector('a[href="#contact"]');
            if (contactLink) contactLink.classList.add("active");
        }
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