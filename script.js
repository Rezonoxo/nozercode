// Debounce helper
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
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Theme Toggle with localStorage
const themeCheckbox = document.querySelector('.theme-checkbox');
function updateTheme(isLight) {
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
if (themeCheckbox) {
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
}

// Register GSAP if available
if (window.gsap) {
    gsap.registerPlugin?.(window.ScrollTrigger);
}

// Simple typing/rotate effect for specializations
const specializations = document.querySelectorAll('.specialization');
let currentIndex = 0;
function rotateSpecializations() {
    if (!specializations.length) return;
    specializations.forEach((spec, index) => {
        if (index === currentIndex) {
            gsap.to(spec, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
        } else {
            gsap.to(spec, { opacity: 0, y: 20, duration: 0.45, ease: 'power2.out' });
        }
    });
    currentIndex = (currentIndex + 1) % specializations.length;
}
rotateSpecializations();
setInterval(rotateSpecializations, 3000);

// Smooth rotating name in header: "Hej, jestem <Name>"
(function(){
    const nameEl = document.querySelector('.name-rotator');
    if(!nameEl) return;

    const names = ['Nozer','Wiktor','Heaven','Rezonoxo'];
    let nIdx = names.indexOf(nameEl.textContent.trim());
    if(nIdx < 0) nIdx = 0;

    function rotateName(){
        nameEl.classList.add('out');
        setTimeout(()=>{
            nIdx = (nIdx + 1) % names.length;
            nameEl.textContent = names[nIdx];
            nameEl.classList.remove('out');
        }, 420);
    }

    // start after a short delay to allow page paint
    setTimeout(()=> setInterval(rotateName, 3000), 800);
})();

// Simple GSAP entrance animations (safe if GSAP not present)
if (window.gsap) {
    gsap.from('.main-title', { duration: 0.9, y: 40, opacity: 0, ease: 'power3.out' });
    gsap.from('.specialization', { duration: 0.7, y: 20, opacity: 0, stagger: 0.15, ease: 'power3.out', delay: 0.4 });
}

// Menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', debounce((e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }, 120));
}

// Smooth scroll for in-page anchors (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            if (menuToggle && navLinks) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');
function updateBackToTopButton() {
    if (!backToTopButton) return;
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}
updateBackToTopButton();
window.addEventListener('scroll', debounce(() => {
    updateBackToTopButton();
    // Scroll progress bar
    const bar = document.getElementById('scrollProgressBar');
    if (bar) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = scrolled + '%';
    }
}, 60));

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Add small interaction sounds removed to keep page lightweight and friendly (no automatic audio)

// -----------------------------
// Language switcher / i18n wiring
// -----------------------------
// Prefer page <html lang> first, then saved user choice in localStorage, then fallback to 'pl'
let currentLanguage = document.documentElement.lang || localStorage.getItem('lang') || 'pl';

function applyTranslations(lang) {
    // keep a globally visible currentLanguage used by getTranslation fallback
    currentLanguage = lang;
    // set html lang attribute
    try { document.documentElement.lang = lang; } catch (e) {}

    // Update elements marked with data-translate
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (!key) return;
        const translation = getTranslation(key, lang);

        // If element is an input/textarea use placeholder where appropriate
        const tag = element.tagName && element.tagName.toLowerCase();
        // Special handling for head/meta/title/img
        if (tag === 'meta') {
            element.setAttribute('content', translation);
            return;
        }
        if (tag === 'title') {
            document.title = translation;
            return;
        }
        if (tag === 'img') {
            if (element.hasAttribute('alt')) element.alt = translation;
            return;
        }

        if (tag === 'input' || tag === 'textarea') {
            if (element.hasAttribute('placeholder')) element.placeholder = translation;
            else element.value = translation;
        } else {
            // If the element has a title attribute, update it (tooltip) but don't overwrite children
            if (element.hasAttribute('title')) element.title = translation;

            // If element contains a child label we prefer to update that text node to avoid stomping icons/structure
            const labelSelectors = ['.footer-link-label', '.title', '.subtitle', '.footer-link-label', '.link-label', '.muted', '.section-title', 'h3', 'p'];
            let updated = false;
            if (element.children && element.children.length > 0) {
                for (const sel of labelSelectors) {
                    const child = element.querySelector(sel);
                    if (child) {
                        child.textContent = translation;
                        updated = true;
                        break;
                    }
                }
            }

            // fallback: if there are no child elements (plain leaf), replace text
            if (!updated) {
                if (!element.children || element.children.length === 0) {
                    element.textContent = translation;
                }
                // otherwise: element has children but we didn't find a suitable target — skip to avoid breaking layout
            }
        }
    });

    // Update lang switch button title if present
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.setAttribute('data-lang', lang);
        const titleKey = lang === 'pl' ? 'ui.switchToEnglish' : 'ui.switchToPolish';
        langSwitch.title = getTranslation(titleKey, lang);
    }

    // persist choice
    try { localStorage.setItem('lang', lang); } catch (e) {}
}

// attach toggle handler
const langSwitchBtn = document.getElementById('langSwitch');
if (langSwitchBtn) {
    // set initial title
    applyTranslations(currentLanguage);
    langSwitchBtn.addEventListener('click', () => {
        const newLang = currentLanguage === 'en' ? 'pl' : 'en';
        applyTranslations(newLang);
    });
} else {
    // still apply translations on load even without button
    applyTranslations(currentLanguage);
}
