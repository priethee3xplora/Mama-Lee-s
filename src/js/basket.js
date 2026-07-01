import { state } from './state.js';
import { showToast } from './toast.js';
import { POPULAR_TREATS, MENU_ITEMS } from '../data.ts';

const QUICK_BOX_ITEMS = [
  { id: 'm-7',  name: 'Red Velvet Cupcake Duo',       price: 45,  image: 'https://images.unsplash.com/photo-1616031037011-08bf1801e251?auto=format&fit=crop&q=80&w=350' },
  { id: 'm-12', name: 'Chunky Chocolate Cookie Box',   price: 120, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=350' },
  { id: 'm-13', name: 'Speculoos Macarons (10)',        price: 180, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=350' },
];

function resolveItem(id) {
  return (
    POPULAR_TREATS.find((t) => t.id === id) ||
    MENU_ITEMS.find((m) => m.id === id) ||
    QUICK_BOX_ITEMS.find((q) => q.id === id)
  );
}

export function toggleBasketDropdown() {
  const dropdown = document.getElementById('basket-dropdown');
  if (dropdown) dropdown.classList.toggle('hidden');
}

export function addToBasket(id, name, price, image) {
  const existingIndex = state.cart.findIndex((item) => item.id === id);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += 1;
  } else {
    let resolvedName = name || '';
    let resolvedPrice = price || 0;
    let resolvedImage = image || '';

    if (!resolvedName || !resolvedPrice || !resolvedImage) {
      const match = resolveItem(id);
      if (match) {
        resolvedName = match.name;
        resolvedPrice = match.price;
        resolvedImage = match.image;
      }
    }

    if (resolvedName) {
      state.cart.push({ id, name: resolvedName, price: resolvedPrice, quantity: 1, image: resolvedImage });
    }
  }

  localStorage.setItem('sweet_crumbs_vanilla_cart', JSON.stringify(state.cart));
  updateBasketUI();

  const item = state.cart.find((i) => i.id === id);
  if (item) showToast(`Added: ${item.name} to basket!`);
}

export function removeFromBasket(id) {
  const existingIndex = state.cart.findIndex((item) => item.id === id);

  if (existingIndex > -1) {
    if (state.cart[existingIndex].quantity > 1) {
      state.cart[existingIndex].quantity -= 1;
    } else {
      state.cart.splice(existingIndex, 1);
    }
  }

  localStorage.setItem('sweet_crumbs_vanilla_cart', JSON.stringify(state.cart));
  updateBasketUI();
}

export function updateBasketQuantity(id, newQty) {
  const idx = state.cart.findIndex((item) => item.id === id);
  if (idx > -1) {
    if (newQty <= 0) {
      state.cart.splice(idx, 1);
    } else {
      state.cart[idx].quantity = newQty;
    }
  }
  localStorage.setItem('sweet_crumbs_vanilla_cart', JSON.stringify(state.cart));
  updateBasketUI();
}

export function updateBasketUI() {
  let subtotal = 0;
  let totalCount = 0;

  state.cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalCount += item.quantity;
  });

  const deliveryCost = state.selectedFulfillment === 'delivery' ? 50 : 0;
  const grandTotal = subtotal + deliveryCost;

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

      itemsContainer.innerHTML = state.cart.map((item) => `
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
    }
  }

  const receiptItemsContainer = document.getElementById('checkout-items-wrapper');
  if (receiptItemsContainer) {
    const coordinates = document.getElementById('checkout-coordinates-fields');
    const pricingCard = document.getElementById('checkout-pricing-card');

    if (totalCount === 0) {
      receiptItemsContainer.innerHTML = `
        <div class="text-center py-12 text-[#3D292B]/50">
          <svg class="w-10 h-10 mx-auto text-[#F7DDD6] stroke-1 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path></svg>
          <p class="text-xs font-semibold text-[#3D292B]">Your basket is empty</p>
          <p class="text-[10px] text-[#3D292B]/40 max-w-xs mx-auto mt-1">Please select standard buns, cupcakes, or customized pre_order boxes from our active list above first!</p>
        </div>
      `;
      if (coordinates) coordinates.classList.add('hidden');
      if (pricingCard) pricingCard.classList.add('hidden');
    } else {
      if (coordinates) coordinates.classList.remove('hidden');
      if (pricingCard) pricingCard.classList.remove('hidden');

      receiptItemsContainer.innerHTML = state.cart.map((item) => `
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

      const subtotalEl = document.getElementById('checkout-subtotal');
      const delCostEl = document.getElementById('checkout-delivery-fee');
      const grandTotalEl = document.getElementById('checkout-grand-total');

      if (subtotalEl) subtotalEl.textContent = `R${subtotal}`;
      if (delCostEl) delCostEl.textContent = state.selectedFulfillment === 'delivery' ? 'R50 (Pretoria Area)' : 'Free Collection';
      if (grandTotalEl) grandTotalEl.textContent = `R${grandTotal}`;
    }
  }
}
