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
});