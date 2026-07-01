import { ABOUT_TIMELINE, BAKERY_VALUES, INSPIRATION_GALLERY, INSTAGRAM_POSTS } from '../data.ts';

export function renderTimeline() {
  const container = document.getElementById('about-timeline-list');
  if (!container) return;

  container.innerHTML = ABOUT_TIMELINE.map((node) => `
    <div class="relative pl-8 md:pl-12 transition-all duration-300 hover:translate-x-1 group">
      <div class="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full border-2 border-[#DE7281] bg-[#FDF9F7] group-hover:bg-[#DE7281] transition-colors"></div>
      <div class="space-y-1">
        <span class="font-display text-[#DE7281] text-lg font-bold">${node.year}</span>
        <h3 class="font-serif text-lg font-bold text-[#3D292B]">${node.title}</h3>
        <p class="text-xs text-[#3D292B]/70 max-w-lg leading-relaxed">${node.desc}</p>
      </div>
    </div>
  `).join('');
}

export function renderValues() {
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

export function renderInspirationGallery() {
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
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3D292B] via-[#3D292B]/40 to-transparent p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p class="text-[11px] font-bold text-white tracking-wide">${img.title}</p>
      </div>
    </div>
  `).join('');
}

export function renderInstagramShowcase() {
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

export function renderQuickBoxes() {
  const container = document.getElementById('quick-order-boxes-list');
  if (!container) return;

  const boxes = [
    {
      id: 'm-7',
      name: 'Red Velvet Cupcake Duo',
      price: 45,
      priceText: 'R45',
      image: 'https://images.unsplash.com/photo-1616031037011-08bf1801e251?auto=format&fit=crop&q=80&w=350',
      tag: 'Moist Red Velvet',
    },
    {
      id: 'm-12',
      name: 'Chunky Chocolate Cookie Box',
      price: 120,
      priceText: 'R120',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=350',
      tag: 'Crunchy Chocolate',
    },
    {
      id: 'm-13',
      name: 'Speculoos Macarons (10)',
      price: 180,
      priceText: 'R180',
      image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=350',
      tag: 'Spiced Ganache',
    },
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
