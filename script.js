// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav'); // Target the nav container
    const navContent = document.getElementById('navContent'); // The actual content to show/hide
    const navLinks = navContent.querySelectorAll('a');

    if (hamburgerBtn && mainNav && navContent) {
        hamburgerBtn.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            mainNav.classList.toggle('nav--open'); // Toggle class on the nav container
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('nav--open')) {
                    mainNav.classList.remove('nav--open');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Optional: Close menu if clicked outside
        document.addEventListener('click', (event) => {
             // Check if the click is outside the nav container AND outside the button
            if (!mainNav.contains(event.target) && !hamburgerBtn.contains(event.target)) {
                if (mainNav.classList.contains('nav--open')) {
                    mainNav.classList.remove('nav--open');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }


    // --- Language Translation ---
    const translateElements = document.querySelectorAll('[data-en]');
    const langButtons = document.querySelectorAll('.language-switcher button');

    // Function to translate text based on selected language
    function translatePage(lang) {
        translateElements.forEach(element => {
            const translation = element.dataset[lang];
            if (translation !== undefined) { // Check if translation exists
                // Handle elements that might contain child elements (like links in contact) carefully
                // This simple version assumes textContent is sufficient for most cases
                element.textContent = translation;
            } else {
                // Fallback to English if translation is missing for the selected language
                 element.textContent = element.dataset['en'] || element.textContent;
                 // console.warn(`Translation missing for lang '${lang}'`, element);
            }
        });
        // Update html lang attribute
        document.documentElement.lang = lang;

        // Optionally: Highlight the active language button (add later if needed)
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Function to get user's preferred language (improved)
    function getUserPreferredLanguage() {
        const storedLang = localStorage.getItem('preferredLanguage');
        if (storedLang && ['en', 'th', 'ru'].includes(storedLang)) { // Validate stored lang
            return storedLang;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('th')) {
            return 'th';
        } else if (browserLang.startsWith('ru')) {
            return 'ru';
        } else {
            return 'en'; // Default to English
        }
    }

    // Set initial language on page load
    const initialLang = getUserPreferredLanguage();
    translatePage(initialLang);

    // Add event listeners to language switchers
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            if (selectedLang) {
                translatePage(selectedLang);
                // Store preference
                localStorage.setItem('preferredLanguage', selectedLang);
            }
        });
    });

}); // End DOMContentLoaded