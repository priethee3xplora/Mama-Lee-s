import { state } from './state.js';
import { showToast } from './toast.js';

export function switchThemeOption(themeName) {
  const selectTheme = document.getElementById('custom-theme');
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

export function handleCakeFileUpload(input) {
  const uploadStatus = document.getElementById('upload-status');
  if (input.files && input.files[0] && uploadStatus) {
    const file = input.files[0];
    state.uploadedFileName = file.name;
    uploadStatus.textContent = `📄 Selected Reference: "${file.name}" (Size: ${(file.size / 1024).toFixed(1)} KB)`;
    uploadStatus.classList.remove('text-[#3D292B]');
    uploadStatus.classList.add('text-green-600', 'font-bold');
    showToast('Reference file uploaded successfully!');
  }
}

export function submitCustomCakeForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('custom-name');
  const phoneInput = document.getElementById('custom-phone');
  const dateInput = document.getElementById('custom-date');
  const sizeSelect = document.getElementById('custom-size');
  const flavorSelect = document.getElementById('custom-flavor');
  const themeSelect = document.getElementById('custom-theme');
  const notesText = document.getElementById('custom-notes');

  if (!nameInput || !phoneInput) return;

  const fullName = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const eventDate = dateInput ? dateInput.value : 'Flexible Date';
  const cakeSize = sizeSelect ? sizeSelect.value : 'Single Tier';
  const flavor = flavorSelect ? flavorSelect.value : 'Vanilla';
  const theme = themeSelect ? themeSelect.value : 'Elegant Minimalist';
  const customNotes = notesText ? notesText.value.trim() : 'None';

  const intro = `🎂 *Sweet Crumbs Custom Cake Proposal* 🎂\n\n`;
  const nameLine = `👤 *Customer:* ${fullName}\n`;
  const phoneLine = `📱 *Contact Phone:* ${phone}\n`;
  const dateLine = `📅 *Event Scheduled:* ${eventDate}\n`;
  const sizeLine = `🍰 *Cake Size / Tiers:* ${cakeSize}\n`;
  const flavorLine = `🍓 *Preferred Flavor:* ${flavor}\n`;
  const themeLine = `🌸 *Theme / Aesthetic:* ${theme}\n`;
  const uploadLine = state.uploadedFileName ? `📄 *Reference Photo:* Attached "${state.uploadedFileName}"\n` : ``;
  const notesLine = customNotes ? `📝 *Additional Wishes:*\n_"${customNotes}"_` : ``;

  const finalizedMessage = encodeURIComponent(`${intro}${nameLine}${phoneLine}${dateLine}${sizeLine}${flavorLine}${themeLine}${uploadLine}${notesLine}`);
  const whatsappUrl = `https://wa.me/27821134567?text=${finalizedMessage}`;
  window.open(whatsappUrl, '_blank');

  showToast('Opening custom design line with Sarah Rakhunwana!');

  const form = document.getElementById('custom-cake-form');
  if (form) form.reset();

  state.uploadedFileName = '';
  const uploadStatus = document.getElementById('upload-status');
  if (uploadStatus) {
    uploadStatus.textContent = 'Click to browse files or drag reference images';
    uploadStatus.className = 'text-xs font-semibold text-[#3D292B]';
  }
}
