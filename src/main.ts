/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { POPULAR_TREATS, MENU_ITEMS, ABOUT_TIMELINE, BAKERY_VALUES, INSPIRATION_GALLERY, INSTAGRAM_POSTS } from './data';
import { CartItem, MenuItem, TabId } from './types';

// Global State
let currentTab: TabId = 'home';
let cart: CartItem[] = [];
let selectedCategory: string = 'All';
let searchQuery: string = '';
let selectedFulfillment: 'collection' | 'delivery' = 'collection';
let uploadedFileName: string = '';

// Initialize on Window Load
window.addEventListener('DOMContentLoaded', () => {
  // Load Cart from LocalStorage
  const cachedCart = localStorage.getItem('sweet_crumbs_vanilla_cart');
  if (cachedCart) {
    try {
      cart = JSON.parse(cachedCart);
    } catch (e) {
      cart = [];
    }
  }

  // Set initial footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Render static data
  renderPopularTreats();
  renderMenu();
  renderTimeline();
  renderValues();
  renderInspirationGallery();
  renderInstagramShowcase();
  renderQuickBoxes();

  // Initial Sync with Basket UI
  updateBasketUI();

  // Reset visual tab active indicators
  switchTab('home');
});

// ==================== TABS NAVIGATION ====================
function switchTab(tabId: TabId) {
  currentTab = tabId;

  // Toggle active views
  const tabViews = document.querySelectorAll('.tab-view');
  tabViews.forEach((view) => {
    if (view.id === `section-${tabId}`) {
      view.classList.remove('hidden');
    } else {
      view.classList.add('hidden');
    }
  });

  // Toggle Desktop Active Nav classes
  const navIds: Record<TabId, string> = {
    home: 'nav-home',
    menu: 'nav-menu',
    custom: 'nav-custom',
    about: 'nav-about',
    order: 'nav-order',
    contact: 'nav-contact',
  };

  Object.entries(navIds).forEach(([tId, elementId]) => {
    const navBtn = document.getElementById(elementId);
    if (navBtn) {
      const isSelected = tId === tabId;
      const indicator = navBtn.querySelector('.header-indicator');

      if (isSelected) {
        navBtn.classList.remove('text-[#3D292B]/80', 'hover:text-[#DE7281]');
        navBtn.classList.add('text-[#9B2D3C]', 'font-semibold');
        if (indicator) indicator.classList.remove('hidden');
      } else {
        navBtn.classList.remove('text-[#9B2D3C]', 'font-semibold');
        navBtn.classList.add('text-[#3D292B]/80', 'hover:text-[#DE7281]');
        if (indicator) indicator.classList.add('hidden');
      }
    }
  });

  // Toggle Mobile active Nav classes
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  if (mobileNavPanel) {
    const buttons = mobileNavPanel.querySelectorAll('.mobile-nav-btn');
    buttons.forEach((btn, index) => {
      const orderOfTabs: TabId[] = ['home', 'menu', 'custom', 'about', 'order', 'contact'];
      if (orderOfTabs[index] === tabId) {
        btn.classList.add('bg-[#FAECE8]', 'text-[#9B2D3C]', 'font-semibold');
        btn.classList.remove('text-[#3D292B]/80');
      } else {
        btn.classList.remove('bg-[#FAECE8]', 'text-[#9B2D3C]', 'font-semibold');
        btn.classList.add('text-[#3D292B]/80');
      }
    });

    // Close mobile menu panel automatically on switch
    mobileNavPanel.classList.add('hidden');
    const openIcon = document.getElementById('mobile-menu-open-icon');
    const closeIcon = document.getElementById('mobile-menu-close-icon');
    if (openIcon && closeIcon) {
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  // Scroll to page top cleanly
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
}

// Mobile Menu Bar Toggle
function toggleMobileMenu() {
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const openIcon = document.getElementById('mobile-menu-open-icon');
  const closeIcon = document.getElementById('mobile-menu-close-icon');

  if (mobileNavPanel && openIcon && closeIcon) {
    const isHidden = mobileNavPanel.classList.contains('hidden');
    if (isHidden) {
      mobileNavPanel.classList.remove('hidden');
      openIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      mobileNavPanel.classList.add('hidden');
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }
}

// ==================== RENDERING UTILS ====================

// Render 6 popular items on Home
function renderPopularTreats() {
  const container = document.getElementById('home-treats-list');
  if (!container) return;

  container.innerHTML = POPULAR_TREATS.map((treat) => `
    <div class="bg-white p-4 sm:p-5 rounded-3xl border border-[#F7DDD6]/30 hover:border-[#DE7281]/30 text-center transition-all duration-300 flex flex-col justify-between group h-full">
      <div class="aspect-square rounded-2xl overflow-hidden bg-[#FAECE8] relative mb-4">
        <img 
          src="${treat.image}" 
          alt="${treat.name}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerpolicy="no-referrer"
        />
        <span class="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#9B2D3C] text-[10px] font-bold py-1 px-2.5 rounded-full shadow-xs uppercase tracking-wider">Popular</span>
      </div>
      <div>
        <h3 class="font-serif font-bold text-sm text-[#3D292B] line-clamp-1">${treat.name}</h3>
        <p class="text-sm font-semibold text-[#DE7281] mt-1">${treat.priceText}</p>
      </div>
      <button 
        onclick="addToBasket('${treat.id}')"
        class="mt-4 w-full bg-[#FAECE8] hover:bg-[#DE7281] hover:text-white text-[#DE7281] font-display text-[11px] font-bold py-2 px-3 rounded-xl transition-all duration-300 cursor-pointer uppercase tracking-wider"
      >
        + Add To Basket
      </button>
    </div>
  `).join('');
}

// Render dynamic lists on menu page
function renderMenu() {
  const container = document.getElementById('menu-items-grid');
  if (!container) return;

  // Filter based on category and Search Queries
  const filtered = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-16 space-y-3">
        <div class="text-4xl">🔍</div>
        <h3 class="font-serif font-bold text-lg text-[#3D292B]">No tasty treats found</h3>
        <p class="text-xs text-[#3D292B]/60 max-w-xs mx-auto">Try refining your search text or switching the category filters above!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item) => `
    <div class="bg-white p-5 rounded-[32px] border border-[#F7DDD6]/30 hover:border-[#DE7281]/30 transition-all duration-350 shadow-xs flex flex-col justify-between group h-full">
      
      <div>
        <div class="aspect-4/3 rounded-2xl overflow-hidden bg-[#FAECE8] relative mb-5">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            referrerpolicy="no-referrer"
          />
          <span class="absolute top-3 left-3 bg-[#FAECE8]/90 text-[#9B2D3C] text-[10px] font-bold py-1 px-3 rounded-full shadow-2xs uppercase tracking-widest">${item.category}</span>
        </div>

        <div class="space-y-2">
          <div class="flex justify-between items-start gap-2">
            <h3 class="font-serif font-bold text-base text-[#3D292B] group-hover:text-[#DE7281] transition-colors">${item.name}</h3>
            <span class="text-sm font-bold text-[#9B2D3C] whitespace-nowrap bg-[#FAECE8] px-2.5 py-0.5 rounded-full">${item.priceText}</span>
          </div>
          <p class="text-xs text-[#3D292B]/65 leading-relaxed font-medium">${item.description}</p>
        </div>
      </div>

      <button 
        onclick="addToBasket('${item.id}')"
        class="mt-6 w-full bg-[#DE7281] hover:bg-[#9B2D3C] text-white font-display text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider select-none shadow-xs"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
        Add to Basket
      </button>

    </div>
  `).join('');
}

// Category filter
function filterMenuCategory(category: string) {
  selectedCategory = category;

  // Update active visual button state
  const filterBtns = document.querySelectorAll('.cat-filter-btn');
  filterBtns.forEach((btn) => {
    const isSelected = btn.textContent === category;
    if (isSelected) {
      btn.className = 'cat-filter-btn py-2 px-5 font-display text-[13px] font-semibold rounded-full select-none cursor-pointer tracking-wide transition-all duration-300 bg-[#DE7281] text-white shadow-md shadow-[#DE7281]/20';
    } else {
      btn.className = 'cat-filter-btn py-2 px-5 font-display text-[13px] font-semibold rounded-full select-none cursor-pointer tracking-wide transition-all duration-300 bg-[#FAECE8]/60 hover:bg-[#F7DDD6] text-[#3D292B]';
    }
  });

  renderMenu();
}

// Live search input handler
function handleMenuSearch(query: string) {
  searchQuery = query;
  renderMenu();
}

// Render Timeline on About Sarah page
function renderTimeline() {
  const container = document.getElementById('about-timeline-list');
  if (!container) return;

  container.innerHTML = ABOUT_TIMELINE.map((node) => `
    <div class="relative pl-8 md:pl-12 transition-all duration-300 hover:translate-x-1 group">
      <!-- Marker dot -->
      <div class="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full border-2 border-[#DE7281] bg-[#FDF9F7] group-hover:bg-[#DE7281] transition-colors"></div>
      
      <div class="space-y-1">
        <span class="font-display text-[#DE7281] text-lg font-bold">${node.year}</span>
        <h3 class="font-serif text-lg font-bold text-[#3D292B]">${node.title}</h3>
        <p class="text-xs text-[#3D292B]/70 max-w-lg leading-relaxed">${node.desc}</p>
      </div>
    </div>
  `).join('');
}

// Render Core Brand Values inside About Us Section
function renderValues() {
  const container = document.getElementById('about-values-grid');
  if (!container) return;

  container.innerHTML = BAKERY_VALUES.map((val) => {
    let emoji = '🍰';
    if (val.title === 'Handmade Daily') emoji = '✨';
    if (val.title === 'Family-Owned') emoji = '💖';
    if (val.title === 'Premium Ingredients') emoji = '🍓';
    if (val.title === 'Made With Love') emoji = '🎁';

    return `
      <div class="bg-white p-6 rounded-3xl border border-[#F7DDD6]/30 text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-[#FAECE8] flex items-center justify-center text-2xl mx-auto shadow-2xs">${emoji}</div>
        <div class="space-y-1.5">
          <h4 class="font-serif font-bold text-sm text-[#3D292B]">${val.title}</h4>
          <p class="text-[11px] leading-relaxed text-[#3D292B]/60 font-medium">${val.desc}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Render inspiration images on custom cake form page
function renderInspirationGallery() {
  const container = document.getElementById('inspiration-images-grid');
  if (!container) return;

  container.innerHTML = INSPIRATION_GALLERY.map((img) => `
    <div class="group border-4 border-white bg-white rounded-2xl shadow-xs overflow-hidden aspect-square relative cursor-pointer" onclick="switchThemeOption('${img.title}')">
      <img 
        src="${img.image}" 
        alt="${img.title}" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        referrerpolicy="no-referrer"
      />
      <!-- hover overlay -->
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3D292B] via-[#3D292B]/40 to-transparent p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p class="text-[11px] font-bold text-white tracking-wide">${img.title}</p>
      </div>
    </div>
  `).join('');
}

// Switch Custom Theme Selection dynamically from gallery click
function switchThemeOption(themeName: string) {
  const selectTheme = document.getElementById('custom-theme') as HTMLSelectElement;
  if (selectTheme) {
    let fittedVal = 'Other bespoke ideas (Describe below)';
    if (themeName === 'Floral Wedding Tier') fittedVal = 'Floral & Botanical Elegant';
    if (themeName === 'Whimsical Overload') fittedVal = 'Whimsical Kids Custom Illustration';
    if (themeName === 'Celebration Drips') fittedVal = 'Modern Pastel Drips & Macarons';
    if (themeName === 'Elegant Macaron Cake') fittedVal = 'Other wedding options';

    for (let i = 0; i < selectTheme.options.length; i++) {
      if (selectTheme.options[i].value.includes(themeName.substring(0, 5))) {
        fittedVal = selectTheme.options[i].value;
        break;
      }
    }
    selectTheme.value = fittedVal;
    showToast(`Visual Selected: "${themeName}"!`);
  }
}
(window as any).switchThemeOption = switchThemeOption;

// Render Instagram posts showcase
function renderInstagramShowcase() {
  const container = document.getElementById('instagram-showcase-grid');
  if (!container) return;

  container.innerHTML = INSTAGRAM_POSTS.map((post) => `
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="aspect-square bg-[#FAECE8] overflow-hidden rounded-2xl relative block border-2 border-white shadow-xs group">
      <img 
        src="${post.url}" 
        alt="Oven Treats Instagram" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerpolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-[#DE7280]/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-lg">❤️</div>
    </a>
  `).join('');
}

// Side listings of 3 boxes for quick order
function renderQuickBoxes() {
  const container = document.getElementById('quick-order-boxes-list');
  if (!container) return;

  const boxes = [
    {
      id: 'm-7',
      name: 'Red Velvet Cupcake Duo',
      price: 45,
      priceText: 'R45',
      image: 'https://images.unsplash.com/photo-1616031037011-08bf1801e251?auto=format&fit=crop&q=80&w=350',
      tag: 'Moist Red Velvet'
    },
    {
      id: 'm-12',
      name: 'Chunky Chocolate Cookie Box',
      price: 120,
      priceText: 'R120',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=350',
      tag: 'Crunchy Chocolate'
    },
    {
      id: 'm-13',
      name: 'Speculoos Macarons (10)',
      price: 180,
      priceText: 'R180',
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=350',
      tag: 'Spiced Ganache'
    }
  ];

  container.innerHTML = boxes.map((box) => `
    <div class="bg-white p-3.5 rounded-2xl border border-[#F7DDD6]/30 flex items-center gap-3 justify-between">
      <div class="flex items-center gap-3">
        <div class="w-14 h-14 rounded-xl overflow-hidden bg-[#FAECE8] shrink-0">
          <img src="${box.image}" alt="${box.name}" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
        </div>
        <div>
          <h4 class="font-serif font-bold text-xs text-[#3D292B]">${box.name}</h4>
          <span class="text-[9px] uppercase tracking-wider text-[#DE7281] font-semibold">${box.tag}</span>
        </div>
      </div>
      <div class="text-right shrink-0">
        <p class="text-xs font-bold text-[#9B2D3C] mb-1.5">${box.priceText}</p>
        <button 
          type="button"
          onclick="addToBasket('${box.id}')"
          class="bg-[#FAECE8] hover:bg-[#DE7281] hover:text-white text-[#DE7281] py-1 px-3.5 rounded-lg text-[10px] font-bold tracking-wide transition-colors uppercase cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  `).join('');
}


// ==================== BASKET OPERATIONS ====================

// Toggle current mini basket dropdown view
function toggleBasketDropdown() {
  const dropdown = document.getElementById('basket-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('hidden');
  }
}

// Add Item
function addToBasket(id: string, name?: string, price?: number, image?: string) {
  const existingIndex = cart.findIndex((item) => item.id === id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    let resolvedName = name || '';
    let resolvedPrice = price || 0;
    let resolvedImage = image || '';

    if (!resolvedName || !resolvedPrice || !resolvedImage) {
      const match = POPULAR_TREATS.find(t => t.id === id) || 
                    MENU_ITEMS.find(m => m.id === id) ||
                    [
                      { id: 'pt-1', name: 'Chocolate Cupcake', price: 35, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=650' },
                      { id: 'pt-2', name: 'Red Velvet Slice', price: 40, image: 'https://images.unsplash.com/photo-1616031037011-08bf1801e251?auto=format&fit=crop&q=80&w=650' },
                      { id: 'pt-3', name: 'Fudgy Brownie', price: 30, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=650' },
                      { id: 'pt-4', name: 'Mini Cheesecake', price: 45, image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=650' },
                      { id: 'pt-5', name: 'Butter Croissant', price: 25, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=650' },
                      { id: 'pt-6', name: 'Chocolate Cookie', price: 20, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=650' },
                      { id: 'm-7', name: 'Red Velvet Cupcake Duo', price: 45, image: 'https://images.unsplash.com/photo-1616031037011-08bf1801e251?auto=format&fit=crop&q=80&w=350' },
                      { id: 'm-12', name: 'Chunky Chocolate Cookie Box', price: 120, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=350' },
                      { id: 'm-13', name: 'Speculoos Macarons (10)', price: 180, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=350' }
                    ].find(q => q.id === id);

      if (match) {
        resolvedName = match.name;
        resolvedPrice = match.price;
        resolvedImage = match.image;
      }
    }

    if (resolvedName) {
      cart.push({ id, name: resolvedName, price: resolvedPrice, quantity: 1, image: resolvedImage });
    }
  }

  // Persist
  localStorage.setItem('sweet_crumbs_vanilla_cart', JSON.stringify(cart));

  // Sync UI & Feedback Toast alert
  updateBasketUI();

  const item = cart.find(i => i.id === id);
  if (item) {
    showToast(`Added: ${item.name} to basket!`);
  }
}

// Remove or decrease quantity
function removeFromBasket(id: string) {
  const existingIndex = cart.findIndex((item) => item.id === id);

  if (existingIndex > -1) {
    if (cart[existingIndex].quantity > 1) {
      cart[existingIndex].quantity -= 1;
    } else {
      cart.splice(existingIndex, 1);
    }
  }

  localStorage.setItem('sweet_crumbs_vanilla_cart', JSON.stringify(cart));
  updateBasketUI();
}

// Directly change quantity
function updateBasketQuantity(id: string, newQty: number) {
  const idx = cart.findIndex((item) => item.id === id);
  if (idx > -1) {
    if (newQty <= 0) {
      cart.splice(idx, 1);
    } else {
      cart[idx].quantity = newQty;
    }
  }
  localStorage.setItem('sweet_crumbs_vanilla_cart', JSON.stringify(cart));
  updateBasketUI();
}

// Handle basket local states
function updateBasketUI() {
  let subtotal = 0;
  let totalCount = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalCount += item.quantity;
  });

  // Calculate delivery additions
  const deliveryCost = selectedFulfillment === 'delivery' ? 50 : 0;
  const grandTotal = subtotal + deliveryCost;

  // 1. Update Badges
  const badge = document.getElementById('basket-badge');
  if (badge) {
    if (totalCount > 0) {
      badge.textContent = totalCount.toString();
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  }

  // 2. Render Mini Header Dropdown HTML
  const emptyView = document.getElementById('basket-empty-view');
  const footerSec = document.getElementById('basket-dropdown-footer');
  const itemsContainer = document.getElementById('basket-dropdown-items');

  if (emptyView && footerSec && itemsContainer) {
    if (totalCount === 0) {
      emptyView.classList.remove('hidden');
      footerSec.classList.add('hidden');
      itemsContainer.classList.add('hidden');
    } else {
      emptyView.classList.add('hidden');
      footerSec.classList.remove('hidden');
      itemsContainer.classList.remove('hidden');

      const dropdownTotal = document.getElementById('basket-dropdown-total');
      if (dropdownTotal) dropdownTotal.textContent = `R${subtotal}`;

      // Loop elements
      const listHtml = cart.map((item) => `
        <div class="flex justify-between items-center gap-3">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-lg overflow-hidden bg-[#FAECE8] shrink-0">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
            </div>
            <div>
              <p class="text-xs font-bold text-[#3D292B] line-clamp-1">${item.name}</p>
              <p class="text-[10px] text-[#DE7280] font-semibold">R${item.price} each</p>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button onclick="removeFromBasket('${item.id}')" class="p-0.5 rounded-md hover:bg-[#FAECE8] text-[#DE7281] cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path></svg>
            </button>
            <span class="text-xs font-extrabold text-[#3D292B] w-4 text-center">${item.quantity}</span>
            <button onclick="addToBasket('${item.id}')" class="p-0.5 rounded-md hover:bg-[#FAECE8] text-[#9B2D3C] cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
            </button>
          </div>
        </div>
      `).join('');

      itemsContainer.innerHTML = listHtml;
    }
  }

  // 3. Render Large Order Online Checkout Page list
  const receiptItemsContainer = document.getElementById('checkout-items-wrapper');
  if (receiptItemsContainer) {
    if (totalCount === 0) {
      receiptItemsContainer.innerHTML = `
        <div class="text-center py-12 text-[#3D292B]/50">
          <svg class="w-10 h-10 mx-auto text-[#F7DDD6] stroke-1 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path></svg>
          <p class="text-xs font-semibold text-[#3D292B]">Your basket is empty</p>
          <p class="text-[10px] text-[#3D292B]/40 max-w-xs mx-auto mt-1">Please select standard buns, cupcakes, or customized pre_order boxes from our active list above first!</p>
        </div>
      `;
      // Hide checkout fields if empty
      const coordinates = document.getElementById('checkout-coordinates-fields');
      const pricingCard = document.getElementById('checkout-pricing-card');
      if (coordinates) coordinates.classList.add('hidden');
      if (pricingCard) pricingCard.classList.add('hidden');
    } else {
      const coordinates = document.getElementById('checkout-coordinates-fields');
      const pricingCard = document.getElementById('checkout-pricing-card');
      if (coordinates) coordinates.classList.remove('hidden');
      if (pricingCard) pricingCard.classList.remove('hidden');

      // Loop elements
      receiptItemsContainer.innerHTML = cart.map((item) => `
        <div class="flex justify-between items-center gap-3 pb-3 border-b border-[#FDF9F7]/10">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl overflow-hidden bg-[#FAECE8] shrink-0">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
            </div>
            <div>
              <p class="text-xs font-bold text-[#3D292B]">${item.name}</p>
              <p class="text-[10px] text-[#DE7280] font-semibold">R${item.price} each</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="removeFromBasket('${item.id}')" class="p-1 rounded-md bg-[#FAECE8]/60 hover:bg-[#FAECE8] text-[#DE7281] cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path></svg>
            </button>
            <span class="text-xs font-bold text-[#3D292B] w-5 text-center">${item.quantity}</span>
            <button type="button" onclick="addToBasket('${item.id}')" class="p-1 rounded-md bg-[#FAECE8]/60 hover:bg-[#FAECE8] text-[#9B2D3C] cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
            </button>
          </div>
        </div>
      `).join('');

      // Render Totals estimates
      const subtotalEl = document.getElementById('checkout-subtotal');
      const delCostEl = document.getElementById('checkout-delivery-fee');
      const grandTotalEl = document.getElementById('checkout-grand-total');

      if (subtotalEl) subtotalEl.textContent = `R${subtotal}`;
      if (delCostEl) delCostEl.textContent = selectedFulfillment === 'delivery' ? 'R50 (Pretoria Area)' : 'Free Collection';
      if (grandTotalEl) grandTotalEl.textContent = `R${grandTotal}`;
    }
  }
}

// Toggle Delivery Strategy toggle values
function setFulfillment(strategy: 'collection' | 'delivery') {
  selectedFulfillment = strategy;

  const collBtn = document.getElementById('fulfillment-collection-btn');
  const delBtn = document.getElementById('fulfillment-delivery-btn');
  const addressBox = document.getElementById('checkout-address-box');
  const streetInput = document.getElementById('checkout-address') as HTMLInputElement;

  if (collBtn && delBtn && addressBox) {
    if (strategy === 'collection') {
      collBtn.className = 'border rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs font-semibold border-[#DE7281] bg-[#FAECE8]/40 text-[#9B2D3C]';
      delBtn.className = 'border rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs font-semibold border-[#F7DDD6] bg-transparent text-[#3D292B] hover:bg-[#FAECE8]/15';
      addressBox.classList.add('hidden');
      if (streetInput) streetInput.required = false;
    } else {
      delBtn.className = 'border rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs font-semibold border-[#DE7281] bg-[#FAECE8]/40 text-[#9B2D3C]';
      collBtn.className = 'border rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs font-semibold border-[#F7DDD6] bg-transparent text-[#3D292B] hover:bg-[#FAECE8]/15';
      addressBox.classList.remove('hidden');
      if (streetInput) streetInput.required = true;
    }
  }

  // Refresh totals recalculations
  updateBasketUI();
}

// ==================== FORM SUBMISSIONS TO WHATSAPP ====================

// Simulate reference image upload
function handleCakeFileUpload(input: HTMLInputElement) {
  const uploadStatus = document.getElementById('upload-status');
  if (input.files && input.files[0] && uploadStatus) {
    const file = input.files[0];
    uploadedFileName = file.name;
    uploadStatus.textContent = `📄 Selected Reference: "${file.name}" (Size: ${(file.size / 1024).toFixed(1)} KB)`;
    uploadStatus.classList.remove('text-[#3D292B]');
    uploadStatus.classList.add('text-green-600', 'font-bold');
    showToast('Reference file uploaded successfully!');
  }
}

// 1. Submit Custom Dessert Quote Form
function submitCustomCakeForm(event: Event) {
  event.preventDefault();

  const nameInput = document.getElementById('custom-name') as HTMLInputElement;
  const phoneInput = document.getElementById('custom-phone') as HTMLInputElement;
  const dateInput = document.getElementById('custom-date') as HTMLInputElement;
  const sizeSelect = document.getElementById('custom-size') as HTMLSelectElement;
  const flavorSelect = document.getElementById('custom-flavor') as HTMLSelectElement;
  const themeSelect = document.getElementById('custom-theme') as HTMLSelectElement;
  const notesText = document.getElementById('custom-notes') as HTMLTextAreaElement;

  if (!nameInput || !phoneInput) return;

  const fullName = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const eventDate = dateInput ? dateInput.value : 'Flexible Date';
  const cakeSize = sizeSelect ? sizeSelect.value : 'Single Tier';
  const flavor = flavorSelect ? flavorSelect.value : 'Vanilla';
  const theme = themeSelect ? themeSelect.value : 'Elegant Minimalist';
  const customNotes = notesText ? notesText.value.trim() : 'None';

  // Construct WhatsApp draft
  const intro = `🎂 *Sweet Crumbs Custom Cake Proposal* 🎂\n\n`;
  const nameLine = `👤 *Customer:* ${fullName}\n`;
  const phoneLine = `📱 *Contact Phone:* ${phone}\n`;
  const dateLine = `📅 *Event Scheduled:* ${eventDate}\n`;
  const sizeLine = `🍰 *Cake Size / Tiers:* ${cakeSize}\n`;
  const flavorLine = `🍓 *Preferred Flavor:* ${flavor}\n`;
  const themeLine = `🌸 *Theme / Aesthetic:* ${theme}\n`;
  const uploadLine = uploadedFileName ? `📄 *Reference Photo:* Attached "${uploadedFileName}"\n` : ``;
  const notesLine = customNotes ? `📝 *Additional Wishes:*\n_"${customNotes}"_` : ``;

  const finalizedMessage = encodeURIComponent(`${intro}${nameLine}${phoneLine}${dateLine}${sizeLine}${flavorLine}${themeLine}${uploadLine}${notesLine}`);
  
  // Pretoria business line
  const whatsappUrl = `https://wa.me/27821134567?text=${finalizedMessage}`;
  window.open(whatsappUrl, '_blank');

  showToast('Opening custom design line with Sarah Rakhunwana!');
  
  // Clean Form
  const form = document.getElementById('custom-cake-form') as HTMLFormElement;
  if (form) form.reset();
  
  // Clean upload state
  uploadedFileName = '';
  const uploadStatus = document.getElementById('upload-status');
  if (uploadStatus) {
    uploadStatus.textContent = 'Click to browse files or drag reference images';
    uploadStatus.className = 'text-xs font-semibold text-[#3D292B]';
  }
}

// 2. Submit Active Cart Checkout Form
function processCheckoutForm(event: Event) {
  event.preventDefault();

  const nameInput = document.getElementById('checkout-name') as HTMLInputElement;
  const phoneInput = document.getElementById('checkout-phone') as HTMLInputElement;
  const streetInput = document.getElementById('checkout-address') as HTMLInputElement;
  const instructionsText = document.getElementById('checkout-instructions') as HTMLTextAreaElement;

  if (!nameInput || !phoneInput || cart.length === 0) return;

  const clientName = nameInput.value.trim();
  const clientPhone = phoneInput.value.trim();
  const address = selectedFulfillment === 'delivery' && streetInput ? streetInput.value.trim() : '';
  const instructions = instructionsText ? instructionsText.value.trim() : '';

  // Calculate items cost
  let subtotal = 0;
  let summary = `🛍️ *Sweet Crumbs Pre-Order Checkout* 🛍️\n\n`;
  summary += `👤 *Customer Name:* ${clientName}\n`;
  summary += `📱 *Phone Number:* ${clientPhone}\n`;
  summary += `📍 *Strategy:* ${selectedFulfillment === 'delivery' ? `Home Delivery` : `Self-Collection from Pretoria HQ`}\n`;
  
  if (address) {
    summary += `🏠 *Delivery Spot:* ${address}\n`;
  }
  summary += `\n🍰 *Pre-Order Items List:*\n`;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    summary += `  ${index + 1}. *${item.name}* (x${item.quantity}) — R${itemTotal}\n`;
    subtotal += itemTotal;
  });

  const deliveryCost = selectedFulfillment === 'delivery' ? 50 : 0;
  const grandTotal = subtotal + deliveryCost;

  summary += `\n💰 *Subtotal Price:* R${subtotal}\n`;
  if (deliveryCost > 0) {
    summary += `🚚 *Pretoria Delivery Fee:* R50\n`;
  }
  summary += `⭐ *Grand Total Estimate:* R${grandTotal}\n`;

  if (instructions) {
    summary += `\n📝 *Custom Decorating Instructions:*\n_"${instructions}"_`;
  }

  const encodedUrl = encodeURIComponent(summary);
  const whatsappUrl = `https://wa.me/27821134567?text=${encodedUrl}`;
  
  window.open(whatsappUrl, '_blank');

  // Success state: show feedback toast and CLEAR basket
  showToast('Checkout summary sent! Directing to WhatsApp...');
  
  cart = [];
  localStorage.removeItem('sweet_crumbs_vanilla_cart');
  updateBasketUI();

  // Reset forms
  const form = document.getElementById('checkout-receipt-form') as HTMLFormElement;
  if (form) form.reset();
  setFulfillment('collection');
}

// 3. Submit General Contact Inquiry
function submitGeneralContact(event: Event) {
  event.preventDefault();

  const nameInput = document.getElementById('contact-name') as HTMLInputElement;
  const emailInput = document.getElementById('contact-email') as HTMLInputElement;
  const phoneInput = document.getElementById('contact-phone') as HTMLInputElement;
  const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement;

  if (!nameInput || !messageInput) return;

  const senderName = nameInput.value.trim();
  const senderEmail = emailInput ? emailInput.value.trim() : 'Not provided';
  const senderPhone = phoneInput ? phoneInput.value.trim() : 'Not provided';
  const rawMsg = messageInput.value.trim();

  const summary = `✉️ *Sweet Crumbs Baker Inquiry* ✉️\n\n` +
                  `👤 *From:* ${senderName}\n` +
                  `📧 *Email:* ${senderEmail}\n` +
                  `📱 *Phone:* ${senderPhone}\n\n` +
                  `📝 *Message Prompt:*\n"${rawMsg}"`;

  const encodedUrl = encodeURIComponent(summary);
  const whatsappUrl = `https://wa.me/27821134567?text=${encodedUrl}`;

  window.open(whatsappUrl, '_blank');
  showToast('Inquiry forwarded to Sarah. Direct chat loading!');

  // Clear Form
  const form = document.getElementById('contact-general-form') as HTMLFormElement;
  if (form) form.reset();
}


// ==================== GLOBAL HELPER TOAST FEEDBACK ====================
function showToast(message: string) {
  const toast = document.getElementById('alert-toast');
  const toastText = document.getElementById('alert-toast-text');

  if (toast && toastText) {
    toastText.textContent = message;
    
    // Remove hidden and animate in
    toast.classList.remove('hidden');
    
    // Tiny delay to let DOM cycle register before transition classes
    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 15);

    // After 3.5 seconds, slide down and hide
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      // Set back to hidden after styling animations finish (300ms)
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 300);
    }, 3500);
  }
}


// ==================== BINDS AND GLOBAL EXPORTS ====================
(window as any).switchTab = switchTab;
(window as any).toggleMobileMenu = toggleMobileMenu;
(window as any).filterMenuCategory = filterMenuCategory;
(window as any).handleMenuSearch = handleMenuSearch;
(window as any).toggleBasketDropdown = toggleBasketDropdown;
(window as any).addToBasket = addToBasket;
(window as any).removeFromBasket = removeFromBasket;
(window as any).updateBasketQuantity = updateBasketQuantity;
(window as any).setFulfillment = setFulfillment;
(window as any).handleCakeFileUpload = handleCakeFileUpload;
(window as any).submitCustomCakeForm = submitCustomCakeForm;
(window as any).processCheckoutForm = processCheckoutForm;
(window as any).submitGeneralContact = submitGeneralContact;
(window as any).showToast = showToast;
