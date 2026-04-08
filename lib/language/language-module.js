// ==============================================================
// FICHIER : language-module.js
// ==============================================================

// --- 1. Les Fonctions (Logique Pure) ---

/**
 * Helper: Crée un handler de changement de langue pour un code de langue donné.
 * @param {string} langCode - Code de la langue (ex: 'fr', 'en', 'de', etc.)
 * @returns {Function} - Handler de changement de langue
 */
function createLanguageChangeHandler(langCode) {
    return function (event) {
        console.log(`[Language] Exécution: Change Language to ${langCode.toUpperCase()}`);
        changeLanguage(langCode);
        // Met à jour l'état visuel du menu radio
        if (w2ui.mainMenu) {
            w2ui.mainMenu.check(langCode);
        }
    }
}

// Handlers spécifiques pour chaque langue
const changeLanguageFR = createLanguageChangeHandler('fr');
const changeLanguageEN = createLanguageChangeHandler('en');
const changeLanguageDE = createLanguageChangeHandler('de');
const changeLanguageAR = createLanguageChangeHandler('ar');
const changeLanguageZH = createLanguageChangeHandler('zh');
const changeLanguageES = createLanguageChangeHandler('es');
const changeLanguageIT = createLanguageChangeHandler('it');

// --- 2. Le Manifeste Holon (Le Fichier de Déclaration) ---
var MODULE_ID = 'Language';

var LanguageMetadata = {
    metadata: { 
        id: MODULE_ID, 
        archimateElement: 'Application Component',
        description: 'Module de gestion de la langue de l\'interface utilisateur'
    },
    
    // Registre des Fonctions
    functions: [
        { 
            id: 'ChangeLanguageFR', 
            handler: changeLanguageFR, 
            description: 'Changer la langue de l\'application en français.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ChangeLanguageEN', 
            handler: changeLanguageEN, 
            description: 'Change the application language to English.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ChangeLanguageDE', 
            handler: changeLanguageDE, 
            description: 'Ändere die Anwendungssprache zu Deutsch.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ChangeLanguageAR', 
            handler: changeLanguageAR, 
            description: 'تغيير لغة التطبيق إلى العربية.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ChangeLanguageZH', 
            handler: changeLanguageZH, 
            description: '将应用程序语言更改为中文.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ChangeLanguageES', 
            handler: changeLanguageES, 
            description: 'Cambiar el idioma de la aplicación a español.',
            archimateElement: 'Application Function'
        },
        { 
            id: 'ChangeLanguageIT', 
            handler: changeLanguageIT, 
            description: 'Cambiare la lingua dell\'applicazione in italiano.',
            archimateElement: 'Application Function'
        }
    ],

    // Déclaration du Menu
    menuItems: [
        {
            type: "menu-radio", 
            id: "language", 
            textKey: "menu.language", 
            icon: "fa fa-language",
            selected: "fr",
            items: [
                { 
                    id: "fr", 
                    textKey: "menu.fr", 
                    functionId: 'ChangeLanguageFR' 
                },
                { 
                    id: "en", 
                    textKey: "menu.en", 
                    functionId: 'ChangeLanguageEN' 
                },
                { 
                    id: "de", 
                    textKey: "menu.de", 
                    functionId: 'ChangeLanguageDE' 
                },
                { 
                    id: "ar", 
                    textKey: "menu.ar", 
                    functionId: 'ChangeLanguageAR' 
                },
                { 
                    id: "zh", 
                    textKey: "menu.zh", 
                    functionId: 'ChangeLanguageZH' 
                },
                { 
                    id: "es", 
                    textKey: "menu.es", 
                    functionId: 'ChangeLanguageES' 
                },
                { 
                    id: "it", 
                    textKey: "menu.it", 
                    functionId: 'ChangeLanguageIT' 
                }
            ]
        }
    ],
    
    // === Ressources I18n COMPLÈTES pour toutes les langues ===
    i18n: {
        en: { 
            menu: { 
                language: "Language",
                fr: "🇫🇷 French",
                en: "🇬🇧 English",
                de: "🇩🇪 German",
                ar: "🇸🇦 Arabic",
                zh: "🇨🇳 Chinese",
                es: "🇪🇸 Spanish",
                it: "🇮🇹 Italian"
            } 
        },
        fr: { 
            menu: { 
                language: "Langage",
                fr: "🇫🇷 Français",
                en: "🇬🇧 Anglais",
                de: "🇩🇪 Allemand",
                ar: "🇸🇦 Arabe",
                zh: "🇨🇳 Chinois",
                es: "🇪🇸 Espagnol",
                it: "🇮🇹 Italien"
            } 
        },
        de: {
            menu: {
                language: "Sprache",
                fr: "🇫🇷 Französisch",
                en: "🇬🇧 Englisch",
                de: "🇩🇪 Deutsch",
                ar: "🇸🇦 Arabisch",
                zh: "🇨🇳 Chinesisch",
                es: "🇪🇸 Spanisch",
                it: "🇮🇹 Italienisch"
            }
        },
        ar: {
            menu: {
                language: "اللغة",
                fr: "🇫🇷 الفرنسية",
                en: "🇬🇧 الإنجليزية",
                de: "🇩🇪 الألمانية",
                ar: "🇸🇦 العربية",
                zh: "🇨🇳 الصينية",
                es: "🇪🇸 الإسبانية",
                it: "🇮🇹 الإيطالية"
            }
        },
        zh: {
            menu: {
                language: "语言",
                fr: "🇫🇷 法语",
                en: "🇬🇧 英语",
                de: "🇩🇪 德语",
                ar: "🇸🇦 阿拉伯语",
                zh: "🇨🇳 中文",
                es: "🇪🇸 西班牙语",
                it: "🇮🇹 意大利语"
            }
        },
        es: {
            menu: {
                language: "Idioma",
                fr: "🇫🇷 Francés",
                en: "🇬🇧 Inglés",
                de: "🇩🇪 Alemán",
                ar: "🇸🇦 Árabe",
                zh: "🇨🇳 Chino",
                es: "🇪🇸 Español",
                it: "🇮🇹 Italiano"
            }
        },
        it: {
            menu: {
                language: "Lingua",
                fr: "🇫🇷 Francese",
                en: "🇬🇧 Inglese",
                de: "🇩🇪 Tedesco",
                ar: "🇸🇦 Arabo",
                zh: "🇨🇳 Cinese",
                es: "🇪🇸 Spagnolo",
                it: "🇮🇹 Italiano"
            }
        }
    }
};

console.log("[Language Module] Registering module...");
registerModule(LanguageMetadata);