function toggleMenu() {
 const nav = document.getElementById('nav-menu');
 const hamburger = document.querySelector('.hamburger');

 nav.classList.toggle('active'); // Ukáže/skryje menu
 hamburger.classList.toggle('open'); // Změní ikonku na křížek (volitelné)
}