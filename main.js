document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------
       SLIDER
    --------------------------- */
    let currentSlide = 0;

    window.moveSlide = function (direction) {
        const slider = document.getElementById("referenceSlider");
        if (!slider) return;

        const slides = slider.children.length;

        currentSlide += direction;

        if (currentSlide < 0) currentSlide = slides - 1;
        if (currentSlide >= slides) currentSlide = 0;

        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    /* ---------------------------
       FOOTER YEAR
    --------------------------- */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------------------------
       NAV MENU (FIXED)
    --------------------------- */
    const menu = document.getElementById("navMenu");
    const toggleBtn = document.getElementById("menuToggle");

    if (menu && toggleBtn) {

        // Toggle menu
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation(); // prevents immediate close
            menu.classList.toggle("open");

            toggleBtn.textContent = menu.classList.contains("open") ? "✕" : "☰";
        });

        // Close when clicking a link
        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("open");
                toggleBtn.textContent = "☰";
            });
        });

        // Close when clicking outside
        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !toggleBtn.contains(event.target)) {
                menu.classList.remove("open");
                toggleBtn.textContent = "☰";
            }
        });
    }

});
/* ---------------------------
   SCROLL ANIMATION
--------------------------- */
const faders = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {

    const appearOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
        });
    }, {
        threshold: 0.1
    });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

} else {
    // Fallback (older browsers)
    faders.forEach(fader => fader.classList.add('visible'));
}
document.body.classList.add("loaded");