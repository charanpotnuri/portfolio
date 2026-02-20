// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add active class to current page in navigation
const currentLocation = window.location.pathname;
document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
        link.classList.add('active');
    } else if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
        if (linkPath === 'index.html') {
            link.classList.add('active');
        }
    }
});

// Animate stats counting (if you want numbers to count up)
const stats = document.querySelectorAll('.stat-number');
if (stats.length > 0) {
    stats.forEach(stat => {
        const targetNumber = parseFloat(stat.textContent);
        if (!isNaN(targetNumber)) {
            let currentNumber = 0;
            const increment = targetNumber / 50; // Divide animation into 50 steps
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    stat.textContent = stat.textContent.includes('.') 
                        ? targetNumber.toFixed(2) 
                        : targetNumber.toString();
                    clearInterval(timer);
                } else {
                    stat.textContent = stat.textContent.includes('.')
                        ? currentNumber.toFixed(2)
                        : Math.floor(currentNumber).toString();
                }
            }, 30); // Update every 30ms
        }
    });
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add fade-in animation when scrolling
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .achievement-card, .timeline-item');
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for scroll animations
document.querySelectorAll('.project-card, .achievement-card, .timeline-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s, transform 0.6s';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Prevent default behavior for contact form if it exists
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('This is a demo form. In a real website, this would send an email.');
    });
}

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});