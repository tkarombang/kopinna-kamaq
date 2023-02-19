// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');
const hamburgerMenu = document.querySelector('#hamburger-menu');
// ketika hamburger-menu di click
hamburgerMenu.onclick = () => {
  navbarNav.classList.toggle('active');
};

// click diluar sidebar u menghilangkan NAV
document.addEventListener('click', function (e) {
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});