/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceText: string;
  price: number;
  image: string;
  category: 'Cakes' | 'Cupcakes' | 'Pastries' | 'Cookies' | 'Special Orders';
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomCakeRequest {
  fullName: string;
  phoneNumber: string;
  eventDate: string;
  cakeSize: string;
  flavor: string;
  themeStyle: string;
  additionalNotes: string;
}

export interface ContactMessage {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  message: string;
}

export type TabId = 'home' | 'menu' | 'custom' | 'about' | 'order' | 'contact';
