// Centralized translations object
const translations = {
    en: {
        // Navigation
        nav: {
            projects: "Projects",
            services: "Services",
            termsOfService: "Terms of Service"
        },
        
        // Hero section
        hero: {
            specializations: {
                webDeveloper: "Web Developer",
                graphicDesigner: "Graphic Designer",
                contentCreator: "Content Creator",
                minecraftExpert: "Minecraft Expert"
            }
        },
        
        // Projects section
        projects: {
            title: "Featured Projects",
            items: {
                centrum4life: {
                    title: "Centrum 4life",
                    description: "Unofficial MTA 4life help center with useful tools and resources."
                },
                tribol: {
                    title: "System TRIBOL",
                    description: "Custom text encryption system based on ternary algorithm."
                },
                kosierbCasino: {
                    title: "Kosierb's Casino",
                    description: "Online casino simulator with virtual free funds instead of real money."
                },
                nozerTools: {
                    title: "NozerTools project",
                    description: "Website with tools, calculators, tests and other useful things."
                }
            }
        },
        
        // Services section
        services: {
            title: "Services",
            items: {
                webDevelopment: {
                    title: "Web Development",
                    description: "I create interesting web projects and web applications."
                },
                graphicDesign: {
                    title: "Graphic Design",
                    description: "I design advertising graphics, YouTube thumbnails, logos and headers."
                },
                contentCreation: {
                    title: "Creative Content Creation",
                    description: "I create various creative content such as writings, videos, scripts, ideas."
                },
                discordServices: {
                    title: "Discord Specialist",
                    description: "I design Discord servers from scratch, manage community and server administration."
                }
            }
        },
        
        // Footer
        footer: {
            copyright: "© 2025 Nozercode"
        },
        
        // UI elements
        ui: {
            loading: "Loading...",
            backToTop: "Back to top",
            toggleMusic: "Toggle music",
            switchToPolish: "Przełącz na polski",
            switchToEnglish: "Switch to English"
        }
    },
    
    pl: {
        // Navigation
        nav: {
            projects: "Projekty",
            services: "Usługi",
            termsOfService: "Regulamin"
        },
        
        // Hero section
        hero: {
            specializations: {
                webDeveloper: "Twórca stron WWW",
                graphicDesigner: "Grafik",
                contentCreator: "Twórca treści",
                minecraftExpert: "Ekspert Minecraft"
            }
        },
        
        // Projects section
        projects: {
            title: "Wybrane projekty",
            items: {
                centrum4life: {
                    title: "Centrum 4life",
                    description: "Nieoficjalne centrum pomocy MTA 4life z przydatnymi narzędziami i zasobami."
                },
                tribol: {
                    title: "System TRIBOL",
                    description: "Autorski system szyfrowania tekstu w oparciu o algorytm trójkowy."
                },
                kosierbCasino: {
                    title: "Kosierb's Casino",
                    description: "Symulator gry kasyna online, wirtualne bezpłatne środki zamiast prawdziwych pieniędzy."
                },
                nozerTools: {
                    title: "Projekt NozerTools",
                    description: "Strona z narzędziami, kalkulatorami, testami i innymi przydatnymi rzeczami."
                }
            }
        },
        
        // Services section
        services: {
            title: "Usługi",
            items: {
                webDevelopment: {
                    title: "Tworzenie stron",
                    description: "Tworzę interesujące projekty stron internetowych i aplikacji webowych."
                },
                graphicDesign: {
                    title: "Projekty graficzne",
                    description: "Projektuję grafiki reklamowe, miniaturki YouTube, logotypy i nagłówki."
                },
                contentCreation: {
                    title: "Tworzenie treści kreatywnych",
                    description: "Tworzę różne treści kreatywne tj. pisma, filmy, scenariusze, pomysły."
                },
                discordServices: {
                    title: "Specjalista Discord",
                    description: "Projektuje serwery Discord od zera, zarządzam społecznością i administracją serwerów."
                }
            }
        },
        
        // Footer
        footer: {
            copyright: "© 2025 NozerCode"
        },
        
        // UI elements
        ui: {
            loading: "Ładowanie…",
            backToTop: "Powrót na górę",
            toggleMusic: "Przełącz muzykę",
            switchToPolish: "Przełącz na polski",
            switchToEnglish: "Switch to English"
        }
    }
};

// Helper function to easily add new translations
function addTranslation(lang, path, value) {
    const keys = path.split('.');
    let current = translations[lang];
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}

// Helper function to get translation with fallback
function getTranslation(path, lang = currentLanguage) {
    const keys = path.split('.');
    let value = translations[lang];
    
    // Try to get value from current language
    for (const key of keys) {
        if (value && value[key] !== undefined) {
            value = value[key];
        } else {
            // Fallback to English
            value = translations['en'];
            for (const fallbackKey of keys) {
                if (value && value[fallbackKey] !== undefined) {
                    value = value[fallbackKey];
                } else {
                    return path; // Return path if translation not found
                }
            }
        }
    }
    
    return value || path;
}
