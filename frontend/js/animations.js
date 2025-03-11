document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in, .slide-up");
    
    elements.forEach(element => {
        setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }, 300);
    });
});
