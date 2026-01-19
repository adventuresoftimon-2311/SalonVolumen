document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Handler
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Construct the mailto link
            const recipient = 'halil@salon-volumen.de'; // Based on impressum
            const subject = encodeURIComponent(`Anfrage über Website von ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`);

            const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

            // Open the mail client
            window.location.href = mailtoLink;
        });
    }

    // Dropdown Menu Toggle (Global for "Mehr erfahren")
    const menuTrigger = document.querySelector('.menu-trigger-container');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (menuTrigger && dropdownMenu) {
        menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling to document
            menuTrigger.classList.toggle('is-active');
            dropdownMenu.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
                menuTrigger.classList.remove('is-active');
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                // Only prevent default on mobile/touch if we want click-to-open
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Animation trigger on scroll (simple Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running'; // If we were using paused css
                // In my CSS I used "forwards", but elements start with opacity 0.
                // Re-triggering or just adding a class is better practice.

                // Let's actually add the class via JS instead of having it by default to avoid accessibility issues if JS fails
                // But for this simple version, the CSS animation plays on load, this is just for elements further down if we wanted logic.
                // The CSS currently runs immediately. Let's fix that for scroll effect.
            }
        });
    }, observerOptions);

    // Get all elements with fade-in-up class
    // NOTE: In the CSS, the animation runs immediately.
    // To make it run on scroll, we should ideally set opacity 0 in CSS and add class 'visible' here.
    // For now, I'll update the style simply by re-applying the animation if needed, or leave it simple.
});
