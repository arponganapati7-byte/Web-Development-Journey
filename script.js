// Dynamic Greeting on Home Page
const greetingElement = document.getElementById("greeting");

if (greetingElement) {
    const hour = new Date().getHours();
    let timeGreeting = "";

    if (hour < 12) {
        timeGreeting = "Good Morning ☀️, I'm Arpon";
    } else if (hour < 18) {
        timeGreeting = "Good Afternoon 🌤️, I'm Arpon";
    } else {
        timeGreeting = "Good Evening 🌙, I'm Arpon";
    }

    greetingElement.innerText = timeGreeting;
}

// Theme Toggle
const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            toggleBtn.innerText = "🌙 Dark Mode";
        } else {
            toggleBtn.innerText = "☀️ Light Mode";
        }
    });
}