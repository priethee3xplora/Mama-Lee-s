import { state } from './state.js';
import { switchTab, toggleMobileMenu } from './navigation.js';
import { showToast } from './toast.js';
import {
  toggleBasketDropdown,
  addToBasket,
  removeFromBasket,
  updateBasketQuantity,
  updateBasketUI,
} from './basket.js';
import { renderPopularTreats, renderMenu, filterMenuCategory, handleMenuSearch } from './menu.js';
import {
  renderTimeline,
  renderValues,
  renderInspirationGallery,
  renderInstagramShowcase,
  renderQuickBoxes,
} from './helpers.js';
import { switchThemeOption, handleCakeFileUpload, submitCustomCakeForm } from './customCake.js';
import { setFulfillment, processCheckoutForm } from './order.js';
import { submitGeneralContact } from './contact.js';

async function loadComponent(containerId, componentPath) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const res = await fetch(componentPath);
    if (!res.ok) throw new Error(`Failed to fetch ${componentPath}: ${res.status}`);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

async function init() {
  await Promise.all([
    loadComponent('header', '/components/header.html'),
    loadComponent('footer', '/components/footer.html'),
  ]);

  const app = document.getElementById('app');
  if (app) {
    const sections = ['home', 'menu', 'custom', 'about', 'order', 'contact'];
    const htmlParts = await Promise.all(
      sections.map((s) =>
        fetch(`/components/${s}.html`)
          .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
          .catch((e) => { console.error(`Failed to load ${s}:`, e); return ''; })
      )
    );
    app.innerHTML = htmlParts.join('\n');
  }

  const cachedCart = localStorage.getItem('sweet_crumbs_vanilla_cart');
  if (cachedCart) {
    try {
      state.cart = JSON.parse(cachedCart);
    } catch {
      state.cart = [];
    }
  }

  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  renderPopularTreats();
  renderMenu();
  renderTimeline();
  renderValues();
  renderInspirationGallery();
  renderInstagramShowcase();
  renderQuickBoxes();
  updateBasketUI();
  switchTab('home');

  window.switchTab = switchTab;
  window.toggleMobileMenu = toggleMobileMenu;
  window.showToast = showToast;
  window.toggleBasketDropdown = toggleBasketDropdown;
  window.addToBasket = addToBasket;
  window.removeFromBasket = removeFromBasket;
  window.updateBasketQuantity = updateBasketQuantity;
  window.updateBasketUI = updateBasketUI;
  window.renderMenu = renderMenu;
  window.filterMenuCategory = filterMenuCategory;
  window.handleMenuSearch = handleMenuSearch;
  window.switchThemeOption = switchThemeOption;
  window.handleCakeFileUpload = handleCakeFileUpload;
  window.submitCustomCakeForm = submitCustomCakeForm;
  window.setFulfillment = setFulfillment;
  window.processCheckoutForm = processCheckoutForm;
  window.submitGeneralContact = submitGeneralContact;
}

document.addEventListener('DOMContentLoaded', init);
