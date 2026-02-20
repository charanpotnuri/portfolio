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

// ========== UPDATED CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject') || 'Contact Form Message',
            message: formData.get('message')
        };
        
        // Get submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send to your Flask backend
            const response = await fetch('http://127.0.0.1:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Success message
                alert('✅ Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                // Server returned error
                alert('❌ Error: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            // Network error or server not running
            console.error('Contact form error:', error);
            alert('❌ Could not send message. Please make sure the backend server is running.\n\nFor local testing: Run your Flask backend first.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
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

// Remove the old duplicate form handler
// (I've removed the second alert that was at the bottom)

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});
// Add this to your contact form JavaScript
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    try {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send to your local backend for testing
        const response = await fetch('http://127.0.0.1:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Message sent successfully!');
            e.target.reset();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
        console.error(error);
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

