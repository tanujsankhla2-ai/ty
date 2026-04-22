document.addEventListener("DOMContentLoaded", () => {
    
    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.nextElementSibling.style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const answer = item.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Booking Form WhatsApp Integration
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = bookingForm.querySelectorAll('input');
            const select = bookingForm.querySelector('select');
            
            const name = inputs[0].value;
            const phone = inputs[1].value;
            const service = select.options[select.selectedIndex].text;
            const date = inputs[2].value;
            const time = inputs[3].value;

            const whatsappNumber = "918949853554"; 
            
            const message = `Hello MRKO Beauty! I'd like to book an elite session:%0A%0A*Name:* ${name}%0A*Elite ID / Phone:* ${phone}%0A*Session:* ${service}%0A*Date:* ${date}%0A*Time:* ${time}`;
            
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            
            bookingForm.reset();
            alert('Redirecting to secure your MRKO session!');
        });
    }

    // 3. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entry Animation
    const tl = gsap.timeline();
    tl.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
    .from(".hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .from(".hero-buttons", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from(".hero-visual-content", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
    }, "-=1");

    // Scroll Reveal for Sections
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                y: 60, 
                opacity: 0 
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none" 
                }
            }
        );
    });

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Subtle parallax for hero photo
    gsap.to(".hero-photo", {
        y: -30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Gallery Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    gsap.fromTo(item, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" });
                } else {
                    item.style.display = 'none';
                }
            });

            ScrollTrigger.refresh();
        });
    });

});
