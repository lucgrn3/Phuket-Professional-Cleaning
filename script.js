document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentLangSpan = document.getElementById('current-lang');
    const langButtons = langDropdown.querySelectorAll('button');
    const elementsToTranslate = document.querySelectorAll('[data-en]');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'th', name: 'ไทย' },
        { code: 'ru', name: 'Русский' }
    ];

    function translatePage(lang) {
        elementsToTranslate.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            element.textContent = translation || element.getAttribute('data-en');
        });
        document.documentElement.setAttribute('lang', lang);
        currentLangSpan.textContent = languages.find(l => l.code === lang).name;
    }

    function getUserPreferredLanguage() {
        const storedLang = localStorage.getItem('preferredLang');
        const validLangs = ['en', 'th', 'ru'];
        if (storedLang && validLangs.includes(storedLang)) return storedLang;
        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (browserLang.startsWith('th')) return 'th';
        if (browserLang.startsWith('ru')) return 'ru';
        return 'en';
    }

    // Initial setup
    const initialLang = getUserPreferredLanguage();
    translatePage(initialLang);

    // Toggle dropdown
    langToggle.addEventListener('click', () => {
        langDropdown.classList.toggle('show');
    });

    // Language selection
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            translatePage(selectedLang);
            localStorage.setItem('preferredLang', selectedLang);
            langDropdown.classList.remove('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!langToggle.contains(event.target) && !langDropdown.contains(event.target)) {
            langDropdown.classList.remove('show');
        }
    });
});
