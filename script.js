// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    const navContent = document.getElementById('navContent');

    // Error handling: Check if navigation elements exist
    if (!hamburgerBtn || !mainNav || !navContent) {
        console.error('Navigation elements not found');
        return;
    }

    const navLinks = navContent.querySelectorAll('a');

    // Toggle mobile menu
    hamburgerBtn.addEventListener('click', () => {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        mainNav.classList.toggle('nav--open');
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        hamburgerBtn.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('nav--open')) {
                mainNav.classList.remove('nav--open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.setAttribute('aria-label', 'Open menu');
            }
        });
    });

    // Close menu if clicked outside
    document.addEventListener('click', (event) => {
        if (!mainNav.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            if (mainNav.classList.contains('nav--open')) {
                mainNav.classList.remove('nav--open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.setAttribute('aria-label', 'Open menu');
            }
        }
    });

    // --- Language Switching ---
    const langButtons = document.querySelectorAll('.language-switcher button');
    const elementsToTranslate = document.querySelectorAll('[data-en]');

    // Function to translate page content
    function translatePage(lang) {
        elementsToTranslate.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation !== null) {
                element.textContent = translation;
            } else {
                // Fallback to English if translation is missing
                element.textContent = element.getAttribute('data-en') || element.textContent;
                console.warn(`Translation missing for '${lang}' in element:`, element);
            }
        });
        // Update HTML lang attribute for accessibility
        document.documentElement.setAttribute('lang', lang);
    }

    // Function to determine user's preferred language
    function getUserPreferredLanguage() {
        const storedLang = localStorage.getItem('preferredLang');
        const validLangs = ['en', 'th', 'ru'];

        // Return stored language if valid
        if (storedLang && validLangs.includes(storedLang)) {
            return storedLang;
        }

        // Detect browser language as fallback
        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (browserLang.startsWith('th')) return 'th';
        if (browserLang.startsWith('ru')) return 'ru';
        return 'en'; // Default to English
    }

    // Set initial language on page load
    const initialLang = getUserPreferredLanguage();
    translatePage(initialLang);

    // Add event listeners for language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            if (selectedLang) {
                translatePage(selectedLang);
                localStorage.setItem('preferredLang', selectedLang);
            }
        });
    });

    // Simulate click on initial language button to ensure consistency
    const initialButton = document.querySelector(`.language-switcher button[data-lang="${initialLang}"]`);
    if (initialButton) initialButton.click();
});
