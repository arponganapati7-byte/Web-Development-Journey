document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Theme Toggle Functionality
    const toggleBtn = document.getElementById("theme-toggle");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                toggleBtn.innerText = "🌙 Dark";
            } else {
                toggleBtn.innerText = "☀️ Light";
            }
        });
    } else {
        console.warn("Element with id='theme-toggle' was not found in the DOM.");
    }

    // 2. Dynamic Time-Based Greeting
    const greetingElement = document.getElementById("greeting");
    
    if (greetingElement) {
        const hour = new Date().getHours();
        let timeGreeting = "Hello, I'm Arpon";

        if (hour < 12) {
            timeGreeting = "Good Morning ☀️, I'm Arpon";
        } else if (hour < 18) {
            timeGreeting = "Good Afternoon 🌤️, I'm Arpon";
        } else {
            timeGreeting = "Good Evening 🌙, I'm Arpon";
        }

        greetingElement.innerText = timeGreeting;
    }
});