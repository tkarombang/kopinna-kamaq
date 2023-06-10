// Tombol Search Start
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
document.querySelector('#search-icon').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};
// Tombol Search End


// Toggle Class Active Hamburger Menu Start
const navbarNav = document.querySelector('.navbar-nav');

// Ketika Hamburger-Menu di-click
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle Class Active Hamburger Menu End

// clik di luar Elemen Start
const hm = document.querySelector('#hamburger-menu');
const si = document.querySelector('#search-icon');
const sc = document.querySelector('.shopping-cart');

document.addEventListener('click', function (e) {
  // kondisi HAMBURGER MENU DAN NAVBAR
  if (!hm.contains(e.target) && (!navbarNav.contains(e.target))) {
    navbarNav.classList.remove('active');
  }

  // kondisi SEARCH ICON DAN SEARCH-FORM
  if (!si.contains(e.target) && (!searchForm.contains(e.target))) {
    searchForm.classList.remove('active');
  }

  // kondisi SHOPPING CART DAN CART ITEM
  if (!sc.contains(e.target) && (!cartItem.contains(e.target))) {
    sc.classList.remove('active-cart');
    cartItem.classList.remove('active-box');
  }
});

// clik di luar Elemen End


// Shopping Cart Active Start
const cartItem = document.querySelector('.cart-box');

document.querySelector('#shopping-cart').onclick = (e) => {
  sc.classList.toggle('active-cart');
  cartItem.classList.toggle('active-box');
  e.preventDefault();
}
document.addEventListener('click', function (e) {

})
// Shopping Cart Active End


// Modal Box Start
const modal = document.querySelector('#item-detail-modal');
const btnDetailProducts = document.querySelectorAll('.btn-detail-product');

btnDetailProducts.forEach((btn) => {
  btn.onclick = (e) => {
    modal.style.display = 'flex';
    e.preventDefault();
  };
});

// klik tombol Close
document.querySelector('.modal-btn-close').onclick = (e) => {
  modal.style.display = 'none';
  e.preventDefault();
}
// klik modal
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}
// Modal Box End