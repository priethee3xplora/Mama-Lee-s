import { showToast } from './toast.js';

export function submitGeneralContact(event) {
  event.preventDefault();

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const messageInput = document.getElementById('contact-message');

  if (!nameInput || !messageInput) return;

  const senderName = nameInput.value.trim();
  const senderEmail = emailInput ? emailInput.value.trim() : 'Not provided';
  const senderPhone = phoneInput ? phoneInput.value.trim() : 'Not provided';
  const rawMsg = messageInput.value.trim();

  const summary =
    `✉️ *Sweet Crumbs Baker Inquiry* ✉️\n\n` +
    `👤 *From:* ${senderName}\n` +
    `📧 *Email:* ${senderEmail}\n` +
    `📱 *Phone:* ${senderPhone}\n\n` +
    `📝 *Message Prompt:*\n"${rawMsg}"`;

  const encodedUrl = encodeURIComponent(summary);
  const whatsappUrl = `https://wa.me/27821134567?text=${encodedUrl}`;

  window.open(whatsappUrl, '_blank');
  showToast('Inquiry forwarded to Sarah. Direct chat loading!');

  const form = document.getElementById('contact-general-form');
  if (form) form.reset();
}
