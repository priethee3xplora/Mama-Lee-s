import { state } from './state.js';

export function switchTab(tabId) {
  state.currentTab = tabId;

  const tabViews = document.querySelectorAll('.tab-view');
  tabViews.forEach((view) => {
    if (view.id === `section-${tabId}`) {
      view.classList.remove('hidden');
    } else {
      view.classList.add('hidden');
    }
  });

  const navIds = {
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

  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  if (mobileNavPanel) {
    const buttons = mobileNavPanel.querySelectorAll('.mobile-nav-btn');
    const orderOfTabs = ['home', 'menu', 'custom', 'about', 'order', 'contact'];
    buttons.forEach((btn, index) => {
      if (orderOfTabs[index] === tabId) {
        btn.classList.add('bg-[#FAECE8]', 'text-[#9B2D3C]', 'font-semibold');
        btn.classList.remove('text-[#3D292B]/80');
      } else {
        btn.classList.remove('bg-[#FAECE8]', 'text-[#9B2D3C]', 'font-semibold');
        btn.classList.add('text-[#3D292B]/80');
      }
    });

    mobileNavPanel.classList.add('hidden');
    const openIcon = document.getElementById('mobile-menu-open-icon');
    const closeIcon = document.getElementById('mobile-menu-close-icon');
    if (openIcon && closeIcon) {
      openIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function toggleMobileMenu() {
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
