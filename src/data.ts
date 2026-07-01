/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem } from './types';

// Let's list the popular treats shown on the home page
export const POPULAR_TREATS = [
  {
    id: 'pt-1',
    name: 'Chocolate Cupcake',
    priceText: 'R35',
    price: 35,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=650',
  },
  {
    id: 'pt-2',
    name: 'Red Velvet Slice',
    priceText: 'R40',
    price: 40,
    image: 'https://images.unsplash.com/photo-1616031037011-08bf1801e251?auto=format&fit=crop&q=80&w=650',
  },
  {
    id: 'pt-3',
    name: 'Fudgy Brownie',
    priceText: 'R30',
    price: 30,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=650',
  },
  {
    id: 'pt-4',
    name: 'Mini Cheesecake',
    priceText: 'R45',
    price: 45,
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=650',
  },
  {
    id: 'pt-5',
    name: 'Butter Croissant',
    priceText: 'R25',
    price: 25,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=650',
  },
  {
    id: 'pt-6',
    name: 'Chocolate Cookie',
    priceText: 'R20',
    price: 20,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=650',
  },
];

// Main Interactive Menu Page items
export const MENU_ITEMS: MenuItem[] = [
  // cakes
  {
    id: 'm-1',
    name: 'Chocolate Ganache Cake',
    description: 'Rich chocolate sponge layers filled & wrapped with silky smooth Belgian chocolate ganache frosting.',
    priceText: 'From R450',
    price: 450,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=650',
    category: 'Cakes',
  },
  {
    id: 'm-2',
    name: 'Red Velvet Cake',
    description: 'Classic velvety rich chocolatey sponge, beautifully balanced with creamy vanilla cream cheese frosting.',
    priceText: 'From R420',
    price: 420,
    image: 'https://images.unsplash.com/photo-1586985289688-ca9cf499368a?auto=format&fit=crop&q=80&w=650',
    category: 'Cakes',
  },
  {
    id: 'm-3',
    name: 'Lemon Drip Cake',
    description: 'Zesty moist lemon sponge layered with rich artisanal lemon curd and smooth whipped buttercream.',
    priceText: 'From R400',
    price: 400,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=650',
    category: 'Cakes',
  },
  {
    id: 'm-4',
    name: 'Classic Carrot Cake',
    description: 'Perfectly spiced carrot cake layers, packed with chopped pecans and frosted with cream cheese topping.',
    priceText: 'From R420',
    price: 420,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=650',
    category: 'Cakes',
  },
  {
    id: 'm-5',
    name: 'Cookies & Cream Cake',
    description: 'Fudgy chocolate cake layers sandwiching crushed Oreo crumbs whipped into premium vanilla chantilly.',
    priceText: 'From R450',
    price: 450,
    image: 'https://images.unsplash.com/photo-1557925923-cd4648e21187?auto=format&fit=crop&q=80&w=650',
    category: 'Cakes',
  },
  {
    id: 'm-6',
    name: 'Strawberry Shortcake',
    description: 'Sweet, cloud-like vanilla sponge filled with juicy local strawberries and hand-whipped cream.',
    priceText: 'From R420',
    price: 420,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=650',
    category: 'Cakes',
  },

  // cupcakes
  {
    id: 'm-7',
    name: 'Red Velvet Cupcake Duo',
    description: 'Cream-cheese-topped red velvet cloud cakes. Light, fluffy, and completely scrumptious.',
    priceText: 'From R45',
    price: 45,
    image: 'https://images.unsplash.com/photo-1616031037011-08bf1801e251?auto=format&fit=crop&q=80&w=650',
    category: 'Cupcakes',
  },
  {
    id: 'm-8',
    name: 'Double Chocolate Cupcake',
    description: 'Deep cocoa cupcakes with signature chocolate fudge buttercream and gold glitter dust.',
    priceText: 'From R35',
    price: 35,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=650',
    category: 'Cupcakes',
  },
  {
    id: 'm-9',
    name: 'Zesty Lemon Cupcakes (6)',
    description: 'Six moist lemon cupcakes filled with dynamic homemade lemon curd under cream frosting.',
    priceText: 'From R110',
    price: 110,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=650',
    category: 'Cupcakes',
  },

  // pastries
  {
    id: 'm-10',
    name: 'Butter Croissants (4)',
    description: 'Four freshly laminated, highly flaky French-style butter croissants, baked golden brown.',
    priceText: 'From R90',
    price: 90,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=650',
    category: 'Pastries',
  },
  {
    id: 'm-11',
    name: 'Almond Croissant Deluxe',
    description: 'Twice-baked croissant loaded with rich frangipane almond cream and toasted almond slices.',
    priceText: 'From R45',
    price: 45,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=650',
    category: 'Pastries',
  },

  // cookies
  {
    id: 'm-12',
    name: 'Chunky Chocolate Chip Cookie Box',
    description: 'Six jumbo cookies stuffed with dark and milk chocolate chunks, baked to soft, chewy perfection.',
    priceText: 'From R120',
    price: 120,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=650',
    category: 'Cookies',
  },
  {
    id: 'm-13',
    name: 'Speculoos Macarons (10)',
    description: 'A delicate box of ten French macaron shells filled with heavenly spiced cookie butter ganache.',
    priceText: 'From R180',
    price: 180,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=650',
    category: 'Cookies',
  },

  // special orders
  {
    id: 'm-14',
    name: 'Elegant Floral Macaron Tower',
    description: 'A beautiful medium tower of custom-colored macarons, detailed with hand-picked organic flowers.',
    priceText: 'From R750',
    price: 750,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=650',
    category: 'Special Orders',
  },
  {
    id: 'm-15',
    name: 'Celebration Bento Box',
    description: 'A cute 4-inch mini customized cake accompanied by 5 premium coordinated frosted cupcakes.',
    priceText: 'From R290',
    price: 290,
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=650',
    category: 'Special Orders',
  }
];

// Timeline for Sarah's about page
export const ABOUT_TIMELINE = [
  {
    year: '2020',
    title: 'Home Kitchen Origins',
    desc: 'Started baking in my humble Pretoria home kitchen with a big passion for beautiful designs and perfect crumb textures.',
  },
  {
    year: '2022',
    title: 'Community Devotion',
    desc: 'Began taking custom commission orders for birthday parties. Word of mouth spread throughout Pretoria, prompting our brand expansion.',
  },
  {
    year: '2024',
    title: 'Our Sweet HQ',
    desc: 'Upgraded to a gorgeous boutique baking space, bringing in local helpers to manage our daily handmade pastries and recipe designs.',
  },
  {
    year: '2025',
    title: 'Digital Cake Shop',
    desc: 'Launched our responsive digital shop with direct-to-WhatsApp routing to allow seamless ordering and customizable pricing.',
  },
];

// About Us Values
export const BAKERY_VALUES = [
  {
    title: 'Handmade Daily',
    desc: 'We crack fresh eggs, sift flour, and make frostings from scratch every single morning. No premixes or preservatives allowed.',
    icon: 'Sparkles',
  },
  {
    title: 'Family-Owned',
    desc: 'Sweet Crumbs is a passionate Pretoria small business. Every smile on your face fuels our pride and creative baking drive.',
    icon: 'Heart',
  },
  {
    title: 'Premium Ingredients',
    desc: 'We source rich Belgian cocoa, pure Madagascar vanilla pods, organic local butter, and the freshest strawberries of the season.',
    icon: 'Apple',
  },
  {
    title: 'Made With Love',
    desc: 'Each custom decoration is piped with patience, and each sugar rose is hand-molded carefully. Craftsmanship at its peak.',
    icon: 'Gift',
  },
];

// Inspiration Gallery for Custom Cakes Request Page
export const INSPIRATION_GALLERY = [
  {
    id: 'ig-1',
    title: 'Floral Wedding Tier',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'ig-2',
    title: 'Whimsical Overload',
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'ig-3',
    title: 'Celebration Drips',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'ig-4',
    title: 'Elegant Macaron Cake',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=500',
  },
];

// Instagram Grid
export const INSTAGRAM_POSTS = [
  { id: 'insta-1', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400' },
  { id: 'insta-2', url: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=400' },
  { id: 'insta-3', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
  { id: 'insta-4', url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&q=80&w=400' },
  { id: 'insta-5', url: 'https://images.unsplash.com/photo-1586985289688-ca9cf499368a?auto=format&fit=crop&q=80&w=400' },
  { id: 'insta-6', url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400' },
];
