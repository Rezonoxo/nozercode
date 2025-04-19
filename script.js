// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loader screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Custom Cursor initialization
const cursor = document.querySelector('.cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .social-link, .theme-toggle');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Theme Toggle with localStorage
const themeCheckbox = document.querySelector('.theme-checkbox');

function updateTheme(isLight) {
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

themeCheckbox.addEventListener('change', () => {
    updateTheme(themeCheckbox.checked);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    const isLight = savedTheme === 'light';
    themeCheckbox.checked = isLight;
    updateTheme(isLight);
}

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Typing effect for specializations with performance optimization
const specializations = document.querySelectorAll('.specialization');
let currentIndex = 0;

function rotateSpecializations() {
    specializations.forEach((spec, index) => {
        if (index === currentIndex) {
            gsap.to(spec, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        } else {
            gsap.to(spec, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
    
    currentIndex = (currentIndex + 1) % specializations.length;
}

// Initial state
rotateSpecializations();
setInterval(rotateSpecializations, 3000);

// Enhanced GSAP Animations
gsap.from('.main-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.specialization', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 0.5
});

// Enhanced scroll animations for sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Enhanced project card animations with optimized parallax
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const image = card.querySelector('.project-image img');
    if (image) {
        image.style.transform = 'none';
        image.style.transition = 'none';
    }
});

// Enhanced service card animations
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out'
    });

    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Smooth scroll for navigation links with performance optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Mobile Menu with performance optimization
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside with performance optimization
document.addEventListener('click', debounce((e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
}, 100));

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to Top Button with performance optimization
const backToTopButton = document.querySelector('.back-to-top');

function updateBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

// Initial check
updateBackToTopButton();

// Update on scroll with debounce
window.addEventListener('scroll', debounce(updateBackToTopButton, 100));

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Music Player with fade effect and error handling
const musicToggle = document.querySelector('.music-toggle');
const audio = new Audio('music/background-music.mp3');
audio.loop = true;
let isMusicPlaying = true; // Changed to true by default
let fadeInterval;
let hasUserInteracted = false;

// Function to handle audio errors
function handleAudioError(error) {
    console.error('Audio error:', error);
    musicToggle.classList.remove('active');
    isMusicPlaying = false;
    saveMusicPreference(false);
}

// Function to safely set volume
function setSafeVolume(volume) {
    audio.volume = Math.max(0, Math.min(1, volume));
}

// Function to save music preference
function saveMusicPreference(playing) {
    localStorage.setItem('musicPreference', playing ? 'enabled' : 'disabled');
    localStorage.setItem('musicPlaying', playing);
}

// Function to load music preference
function loadMusicPreference() {
    const preference = localStorage.getItem('musicPreference');
    const playing = localStorage.getItem('musicPlaying');
    
    // If no preference is set, default to enabled
    if (preference === null) {
        saveMusicPreference(true);
        return true;
    }
    
    return preference === 'enabled' && playing === 'true';
}

function fadeIn() {
    let volume = 0;
    setSafeVolume(volume);
    
    try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(handleAudioError);
        }
    } catch (error) {
        handleAudioError(error);
        return;
    }
    
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
        if (volume < 1) {
            volume += 0.1;
            setSafeVolume(volume);
        } else {
            clearInterval(fadeInterval);
        }
    }, 100);
}

function fadeOut() {
    let volume = audio.volume;
    
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
        if (volume > 0) {
            volume -= 0.1;
            setSafeVolume(volume);
        } else {
            audio.pause();
            clearInterval(fadeInterval);
        }
    }, 100);
}

// Set initial volume
setSafeVolume(0);

// Load saved music state and attempt to play
const savedMusicState = localStorage.getItem('musicPlaying');
if (savedMusicState === 'true') {
    isMusicPlaying = true;
    musicToggle.classList.add('active');
    
    // Try to play music after a short delay to allow page interaction
    setTimeout(() => {
        if (isMusicPlaying) {
            fadeIn();
        }
    }, 1000);
}

// Add user interaction handler
document.addEventListener('click', () => {
    hasUserInteracted = true;
    // If music should be playing but isn't, start it
    if (isMusicPlaying && audio.paused) {
        fadeIn();
    }
}, { once: true });

musicToggle.addEventListener('click', () => {
    if (!hasUserInteracted) {
        hasUserInteracted = true;
    }
    
    isMusicPlaying = !isMusicPlaying;
    
    if (isMusicPlaying) {
        fadeIn();
        musicToggle.classList.add('active');
    } else {
        fadeOut();
        musicToggle.classList.remove('active');
    }
    
    localStorage.setItem('musicPlaying', isMusicPlaying);
});

// Pause music when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isMusicPlaying) {
        fadeOut();
    } else if (!document.hidden && isMusicPlaying) {
        fadeIn();
    }
});
