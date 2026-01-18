function toggleMenu() {
  const nav = document.getElementById('nav-menu');
  const hamburger = document.querySelector('.hamburger');

  nav.classList.toggle('active'); // Ukáže/skryje menu
  hamburger.classList.toggle('open'); // Změní ikonku na křížek (volitelné)
}
function switchScene() {
  const body = document.body;
  const introWrapper = document.getElementById('intro-wrapper');
  const mainContent = document.getElementById('main-content');

  // Pokud je tma, jdeme rozsvítit a vyměnit obsah
  if (body.classList.contains('dark-start')) {

    // 1. Změna pozadí na bílou (okamžitě)
    body.classList.remove('dark-start');

    // 2. Animace zmizení úvodu (Text + Vypínač)
    // Díky novému CSS se z něj stane absolutní vrstva přes text
    introWrapper.classList.add('fade-out-up');

    // 3. Zobrazení nového textu (OKAMŽITĚ, žádné čekání)
    mainContent.style.display = 'block';
    
    initScrollAnimations();
    
    // Kratičké zpoždění (10ms) jen proto, aby prohlížeč stihl zaregistrovat změnu display:block
    // a spustil CSS transition pro opacity
    setTimeout(() => {
      mainContent.classList.add('content-visible');
    }, 10);

    // 4. Úklid starého obsahu (až po skončení animace zmizení - 0.8s)
    setTimeout(() => {
      introWrapper.style.display = 'none';
    }, 800);
  }
}

/* === SCROLL ANIMATION OBSERVER === */
// Nastavení pozorovatele
const observerOptions = {
  root: null, // Sleduje viewport
  rootMargin: '0px',
  threshold: 0.2 // Spustí se, když je 20% prvku vidět
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Když se prvek objeví, přidáme třídu .is-visible
      entry.target.classList.add('is-visible');
      // A přestaneme ho sledovat (animace proběhne jen jednou)
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Funkce pro spuštění sledování (zavoláme ji po přepnutí scény)
function initScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-trigger');
  elements.forEach(el => observer.observe(el));
}
