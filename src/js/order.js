import { state } from './state.js';
import { showToast } from './toast.js';
import { updateBasketUI } from './basket.js';

export function setFulfillment(strategy) {
  state.selectedFulfillment = strategy;

  const collBtn = document.getElementById('fulfillment-collection-btn');
  const delBtn = document.getElementById('fulfillment-delivery-btn');
  const addressBox = document.getElementById('checkout-address-box');
  const streetInput = document.getElementById('checkout-address');

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

  updateBasketUI();
}

export function processCheckoutForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('checkout-name');
  const phoneInput = document.getElementById('checkout-phone');
  const streetInput = document.getElementById('checkout-address');
  const instructionsText = document.getElementById('checkout-instructions');

  if (!nameInput || !phoneInput || state.cart.length === 0) return;

  const clientName = nameInput.value.trim();
  const clientPhone = phoneInput.value.trim();
  const address = state.selectedFulfillment === 'delivery' && streetInput ? streetInput.value.trim() : '';
  const instructions = instructionsText ? instructionsText.value.trim() : '';

  let subtotal = 0;
  let summary = `🛍️ *Sweet Crumbs Pre-Order Checkout* 🛍️\n\n`;
  summary += `👤 *Customer Name:* ${clientName}\n`;
  summary += `📱 *Phone Number:* ${clientPhone}\n`;
  summary += `📍 *Strategy:* ${state.selectedFulfillment === 'delivery' ? `Home Delivery` : `Self-Collection from Pretoria HQ`}\n`;

  if (address) {
    summary += `🏠 *Delivery Spot:* ${address}\n`;
  }
  summary += `\n🍰 *Pre-Order Items List:*\n`;

  state.cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    summary += `  ${index + 1}. *${item.name}* (x${item.quantity}) — R${itemTotal}\n`;
    subtotal += itemTotal;
  });

  const deliveryCost = state.selectedFulfillment === 'delivery' ? 50 : 0;
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

  showToast('Checkout summary sent! Directing to WhatsApp...');

  state.cart = [];
  localStorage.removeItem('sweet_crumbs_vanilla_cart');
  updateBasketUI();

  const form = document.getElementById('checkout-receipt-form');
  if (form) form.reset();
  setFulfillment('collection');
}
