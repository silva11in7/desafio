document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Staggered fade-in effect for reveal items on scroll
    const revealItems = document.querySelectorAll('.reveal-item');

    const springEasing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // Custom spring-like easing

    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Array.from(entry.target.children).forEach((child, index) => {
                    if (child.classList.contains('reveal-item')) {
                        if (!prefersReducedMotion) {
                            child.style.transition = `opacity 0.8s ${springEasing} ${index * 0.1}s, transform 0.8s ${springEasing} ${index * 0.1}s`;
                            child.style.opacity = 1;
                            child.style.transform = 'translateY(0)';
                        } else {
                            child.style.opacity = 1;
                            child.style.transform = 'translateY(0)';
                        }
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(fadeInOnScroll, {
        root: null, // viewport
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px'
    });

    document.querySelectorAll('section').forEach(section => {
        Array.from(section.children).forEach(child => {
            if (child.classList.contains('reveal-item')) {
                child.style.opacity = 0;
                child.style.transform = 'translateY(20px)';
            }
        });
        sectionObserver.observe(section);
    });
});