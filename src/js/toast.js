export function showToast(message) {
  const toast = document.getElementById('alert-toast');
  const toastText = document.getElementById('alert-toast-text');

  if (toast && toastText) {
    toastText.textContent = message;

    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    }, 15);

    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 300);
    }, 3500);
  }
}
