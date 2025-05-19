// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Smooth scrolling for navigation links
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

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat-item').forEach(el => {
    observer.observe(el);
});

// Form submission handling with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    // Add input validation
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'text':
                isValid = value.length >= 2;
                errorMessage = 'Please enter at least 2 characters';
                break;
            case 'textarea':
                isValid = value.length >= 10;
                errorMessage = 'Please enter at least 10 characters';
                break;
        }

        // Remove existing error message if any
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message if invalid
        if (!isValid && value !== '') {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = errorMessage;
            error.style.color = '#ff4444';
            error.style.fontSize = '0.8rem';
            error.style.marginTop = '0.25rem';
            input.parentElement.appendChild(error);
        }

        return isValid;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Here you would typically send the data to a server
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
            
            // Reset form
            contactForm.reset();
            
            // Show success notification
            showNotification('Message sent successfully!', 'success');
        } catch (error) {
            // Show error message
            submitBtn.textContent = 'Error!';
            submitBtn.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
    } else {
        notification.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-level');
skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
        bar.style.width = width;
    }, 200);
});

// Add parallax effect to hero section
const hero = document.querySelector('#hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Add typing effect to subtitle
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect when page loads
    window.addEventListener('load', typeWriter);
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Add styles for scroll progress bar
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced scroll animations
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// Add scroll animation class to elements
document.querySelectorAll('section').forEach(section => {
    section.classList.add('scroll-animate');
});
handleScrollAnimation(); // Trigger scroll animation on page load

// Throttle scroll event
let throttleTimer;
const throttle = (callback, time) => {
    if (throttleTimer) return;
    throttleTimer = setTimeout(() => {
        callback();
        throttleTimer = null;
    }, time);
};

window.addEventListener('scroll', () => {
    throttle(handleScrollAnimation, 250);
});

// Add parallax effect to background
const createParallaxBackground = () => {
    const background = document.createElement('div');
    background.className = 'parallax-background';
    document.body.appendChild(background);

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;
        
        background.style.transform = `translate(${x}px, ${y}px)`;
    });
};

createParallaxBackground();

// Add styles for new elements
const newStyles = document.createElement('style');
newStyles.textContent = `
    .menu-toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 21px;
        cursor: pointer;
        z-index: 1001;
    }

    .menu-toggle span {
        display: block;
        height: 3px;
        width: 100%;
        background: var(--primary-color);
        border-radius: 3px;
        transition: var(--transition);
    }

    .menu-toggle.active span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }

    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }

    .scroll-animate {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }

    .scroll-animate.scrolled {
        opacity: 1;
        transform: translateY(0);
    }

    .parallax-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, 
            rgba(0, 242, 254, 0.1) 0%,
            rgba(79, 172, 254, 0.05) 50%,
            transparent 100%);
        pointer-events: none;
        z-index: -1;
        transition: transform 0.1s ease-out;
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: flex;
        }
    }
`;
document.head.appendChild(newStyles); 