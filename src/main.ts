const basketDropdown = document.getElementById('basket-dropdown');
const mobilePanel = document.getElementById('mobile-nav-panel');

(document.querySelector('[title="View Basket"]') as HTMLButtonElement | null)?.addEventListener('click', () => {
  basketDropdown?.classList.toggle('hidden');
});

(document.querySelector('[aria-label="Toggle menu"]') as HTMLButtonElement | null)?.addEventListener('click', () => {
  mobilePanel?.classList.toggle('hidden');
});

document.getElementById('footer-year')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));

// Dynamic menu/order functions were referenced by the supplied HTML but their implementation was not included.
