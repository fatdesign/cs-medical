document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            document.body.style.overflow = 'auto';
        }, 2000);
    });

    // 3. Sticky Header and Appointment CTA visibility
    const header = document.getElementById('main-header');
    const appointmentBtn = document.querySelector('.appointment-fixed');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            appointmentBtn.classList.add('show');
        } else {
            appointmentBtn.classList.remove('show');
        }
    });

    // 4. Before/After Slider
    const slider = document.querySelector('.comparison-slider');
    if (slider) {
        const handle = slider.querySelector('.slider-handle');
        const beforeImgContainer = slider.querySelector('.image-before-container');
        const beforeImg = slider.querySelector('.image-before');

        const updateImageWidth = () => {
            let rect = slider.getBoundingClientRect();
            beforeImg.style.width = rect.width + 'px';
        };

        const moveSlider = (e) => {
            let x = (e.type.includes('touch')) ? e.touches[0].clientX : e.clientX;
            let rect = slider.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;

            if (pos < 0) pos = 0;
            if (pos > 100) pos = 100;

            handle.style.left = pos + '%';
            beforeImgContainer.style.width = pos + '%';
        };

        window.addEventListener('resize', updateImageWidth);
        updateImageWidth();

        slider.addEventListener('mousemove', moveSlider);
        slider.addEventListener('touchmove', moveSlider);
    }

    // 5. Testimonial Carousel
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    const showNextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    if (slides.length > 0) {
        setInterval(showNextSlide, 5000);
    }

    // 6. Scroll Reveal Animation
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('section, .treatment-card, .grid-item').forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // 7. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
});
