import { state } from './state.js';
import { POPULAR_TREATS, MENU_ITEMS } from '../data.ts';

export function renderPopularTreats() {
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

export function renderMenu() {
  const container = document.getElementById('menu-items-grid');
  if (!container) return;

  const filtered = MENU_ITEMS.filter((item) => {
    const matchesCategory = state.selectedCategory === 'All' || item.category === state.selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(state.searchQuery.toLowerCase());
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

export function filterMenuCategory(category) {
  state.selectedCategory = category;

  const filterBtns = document.querySelectorAll('.cat-filter-btn');
  filterBtns.forEach((btn) => {
    const isSelected = btn.textContent.trim() === category;
    if (isSelected) {
      btn.className = 'cat-filter-btn py-2 px-5 font-display text-[13px] font-semibold rounded-full select-none cursor-pointer tracking-wide transition-all duration-300 bg-[#DE7281] text-white shadow-md shadow-[#DE7281]/20';
    } else {
      btn.className = 'cat-filter-btn py-2 px-5 font-display text-[13px] font-semibold rounded-full select-none cursor-pointer tracking-wide transition-all duration-300 bg-[#FAECE8]/60 hover:bg-[#F7DDD6] text-[#3D292B]';
    }
  });

  renderMenu();
}

export function handleMenuSearch(query) {
  state.searchQuery = query;
  renderMenu();
}
