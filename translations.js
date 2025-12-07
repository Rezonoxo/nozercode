// Centralized translations object
const translations = {
    en: {
        // Navigation
        nav: {
            about: "About",
            aboutPage: "About (details)",
            brand: "Nozer",
            projects: "Projects",
            portfolio: "Portfolio",
            links: "Links",
            discord: "Discord",
            services: "About",
            termsOfService: "Terms of Service"
        },
        
        // Hero section
        hero: {
            specializations: {
                webDeveloper: "I build websites",
                graphicDesigner: "I design graphics",
                contentCreator: "I create videos",
                last: "I share knowledge"
            }
        },
        // Home greeting
        home: {
            greeting: "Hey, I'm"
        ,
            meta: {
                title: "Nozer — About",
                description: "Nozer — personal website with information about achievements and interests.",
                ogTitle: "Nozer — About",
                ogDescription: "Personal page of Nozer — see achievements, interests and links.",
                twitterTitle: "Nozer — About",
                twitterDescription: "Nozer — personal information, achievements and interests."
            }
        },
        
        // Projects section
        projects: {
            title: "Featured Projects",
            items: {
            nozerSite: {
                title: "Nozer Site",
                description: "My personal landing page — the hub for my projects and information."
            },
            youtubeClip1: {
                title: "Content Creator",
                description: "I run a YouTube and TikTok channel where I create dynamic materials based on sharing personal knowledge and emotion. I focus on aesthetics and the value each viewer gains from every video."
            },
            centrum4life: {
                title: "Graphic Design",
                description: "I create creative and aesthetic graphic designs — see my completed works on Behance."
            },
            tribol: {
                title: "Web Development",
                description: "I build responsive and functional websites. On GitHub I publish projects that combine design with functionality."
            },
            kosierbCasino: {
                title: "NozerBin",
                description: "Anonymous live messenger powered by MySQL and PHP."
            },
            nozerTools: {
                title: "NozerTools project",
                description: "This is my mini-projects hub: small, practical online tools and apps that solve specific problems. I focus on simplicity, usefulness and fast performance."
            }
            }
        },
        
        // Services / About section (repurposed to personal "About me")
        services: {
            title: "About",
            items: {
                webDevelopment: {
                    title: "About me",
                    description: "I'm 18 years old, from Poland. I enjoy cycling, traveling, mountains and building projects online. I embrace minimalism, organization and creativity."
                },
                graphicDesign: {
                    title: "My values",
                    description: "I value honesty, calm surroundings and meaningful connections. I focus on personal growth and productivity; I'm inspired by podcasts, films and people's stories."
                },
                contentCreation: {
                    title: "My achievements",
                    description: "Winner of a graphic contest and an Erasmus+ participant. I strive for positive change and continuous improvement."
                },
                discordServices: {
                    title: "My plans",
                    description: "I want to work and live abroad in a job that brings satisfaction and helps others. I am introverted but I embrace challenges and enjoy working with positive people."
                }
            }
        },
        
        // Footer
        footer: {
            copyright: "© 2025 Nozer"
        },
        
        // UI elements
        ui: {
            loading: "Loading...",
            backToTop: "Back to top",
            toggleMusic: "Toggle music",
            switchToPolish: "Switch to Polish",
            switchToEnglish: "Switch to English"
            ,
            viewPortfolio: "Links Hub",
            view: "See",
            links: "Socials"
        }
        ,
        // Portfolio page (English)
        portfolio: {
            meta: {
                title: "Portfolio — Nozer",
                description: "Nozer — projects in web, graphics and editing. Browse the portfolio, filters, search and project details."
            },
            hero: {
                title: "Portfolio Nozer",
                subtitle: "Discover my projects and ideas — check details and live demos.",
                cta: "See projects"
            },
            controls: {
                searchPlaceholder: "Search by title...",
                searchLabel: "Search projects",
                filters: {
                    all: "All",
                    web: "Websites",
                    grafika: "Graphic",
                    video: "Video",
                    inne: "Other"
                },
                sort: {
                    featured: "Featured",
                    dateDesc: "Newest",
                    dateAsc: "Oldest",
                    titleAsc: "Title A–Z",
                    titleDesc: "Title Z–A"
                },
                dateFilter: {
                    all: "All",
                    30: "Last 30 days",
                    90: "Last 90 days",
                    365: "Last 12 months"
                }
            },
            featured: {
                title: "Featured"
            },
            allProjects: "All projects"
        }
    },
    
    pl: {
        // Navigation
        nav: {
            about: "O mnie",
            aboutPage: "O mnie (szczegóły)",
            brand: "Nozer",
            projects: "Projekty",
            portfolio: "Portfolio",
            discord: "Discord",
            links: "Linki",
            services: "O mnie",
            termsOfService: "Regulamin"
        },
        
        // Hero section
        hero: {
            specializations: {
                webDeveloper: "Tworzę strony",
                graphicDesigner: "Projektuję grafiki",
                contentCreator: "Nagrywam filmy",
                last: "Dzielę się wiedzą"
            }
        },
        
        // Home greetings & meta
        home: {
            greeting: "Hej, jestem",
            meta: {
                title: "Nozer — O mnie",
                description: "Strona osobista Nozer — informacje o mnie, moich sukcesach i zainteresowaniach.",
                ogTitle: "Nozer — O mnie",
                ogDescription: "Nozer — informacje o twórcy, jego osiągnięciach i projektach.",
                twitterTitle: "Nozer — O mnie",
                twitterDescription: "Strona osobista Nozer — zobacz moje zainteresowania i osiągnięcia."
            }
        },
        
        // Projects section
        projects: {
            title: "Wybrane projekty",
            items: {
                nozerSite: {
                    title: "Nozer Site",
                    description: "Moja osobista strona landing page — centrum moich projektów i informacji."
                },
                youtubeClip1: {
                    title: "Twórca treści",
                    description: "Prowadzę kanał na YouTube oraz TikTok, gdzie tworzę dynamiczne materiały oparte na przekazywaniu osobistej wiedzy i emocji. Skupiam się na estetyce oraz wartości, jaką widz otrzymuje z każdego filmu."
                },
                centrum4life: {
                    title: "Projekty graficzne",
                    description: "Tworzę kreatywne i estetyczne projekty graficzne — Na Behance swoje gotowe realizacje."
                },
                tribol: {
                    title: "Web Development",
                    description: "Buduję responsywne i funkcjonalne strony. Na GitHubie publikuję projekty łączące design z funkcjonalnością."
                },
                kosierbCasino: {
                    title: "NozerBin",
                    description: "Anonimowy komunikator na żywo oparty na bazie danych MySql oraz PHP."
                },
                nozerTools: {
                    title: "Projekt NozerTools",
                    description: "To moje centrum mini-projektów: małych, praktycznych narzędzi i aplikacji online, które rozwiązują konkretne problemy. Stawiam na prostotę, użyteczność i szybkie działanie."
                }
            }
        },
        
        // Services / About section (repurposed to personal "O mnie")
        services: {
            title: "O mnie",
            items: {
                webDevelopment: {
                    title: "Kim jestem",
                    description: "Mam 18 lat i pochodzę z Polski. Pasjonuję się podróżami, wspinaczką górską, jazdą rowerową i realizowaniem projektów online. Nazywam się Wiktor i lubię poznawać wartościowe osoby."
                },
                graphicDesign: {
                    title: "Moje wartości",
                    description: "Cenię uczciwość, spokojne otoczenie i wartościowe kontakty. Skupiam się na rozwoju osobistym i produktywności, inspirują mnie podcasty, filmy i historie ludzi."
                },
                contentCreation: {
                    title: "Moje osiągnięcia",
                    description: "Zwycięzca konkursu graficznego, uczestnik projektu Erasmus+. Dążę do pozytywnych zmian i ciągle się rozwijam."
                },
                discordServices: {
                    title: "Moje plany",
                    description: "Chcę pracować i mieszkać za granicą w zawodzie, który daje satysfakcję i pozwala pomagać innym."
                }
            }
        },
        
        // Footer
        footer: {
            copyright: "© 2025 Nozer"
        },

        // UI elements
        ui: {
            loading: "Ładowanie…",
            backToTop: "Powrót na górę",
            toggleMusic: "Przełącz muzykę",
            switchToPolish: "Przełącz na polski",
            switchToEnglish: "Przełącz na angielski"
            ,
            viewPortfolio: "Centrum Odnośników",
            links: "Media społecznościowe"
        },
        
        portfolio: {
            meta: {
                title: "Portfolio — Nozer",
                description: "Nozer — projekty z zakresu web, grafiki i montażu. Przeglądaj portfolio, filtry i szczegóły projektów."
            },
            hero: {
                title: "Portfolio Nozer",
                subtitle: "Poznaj moje wszystkie projekty i pomysły oraz sprawdź ich szczegóły.",
                cta: "Zobacz projekty"
            },
            controls: {
                searchPlaceholder: "Szukaj po tytule...",
                searchLabel: "Szukaj projektów",
                filters: {
                    all: "Wszystkie",
                    web: "Strony WWW",
                    grafika: "Grafika",
                    video: "Montaż",
                    inne: "Inne"
                },
                sort: {
                    featured: "Polecane",
                    dateDesc: "Najnowsze",
                    dateAsc: "Najstarsze",
                    titleAsc: "Tytuł A–Z",
                    titleDesc: "Tytuł Z–A"
                },
                dateFilter: {
                    all: "Wszystkie",
                    30: "Ostatnie 30 dni",
                    90: "Ostatnie 90 dni",
                    365: "Ostatnie 12 miesięcy"
                }
            },
            featured: {
                title: "Wyróżnione"
            },
            allProjects: "Wszystkie projekty"
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
