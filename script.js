// Progressive enhancements for the Shockratees storefront.
const extraStyles = document.createElement('link');
extraStyles.rel = 'stylesheet';
extraStyles.href = 'v2.css';
document.head.appendChild(extraStyles);

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('is-open') ?? false;
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

const params = new URLSearchParams(window.location.search);
const checkoutState = params.get('checkout');
if (checkoutState === 'success' || checkoutState === 'cancelled') {
  const notice = document.createElement('div');
  notice.className = 'checkout-notice';
  notice.setAttribute('role', 'status');
  notice.textContent = checkoutState === 'success'
    ? 'Payment received. Thank you for backing Shockratees—watch your email for order updates.'
    : 'Checkout was cancelled. Nothing was charged, and your selection is still here.';
  document.body.prepend(notice);
}

// Preserve campaign information locally so Facebook and social traffic can be identified later.
['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((key) => {
  const value = params.get(key);
  if (value) localStorage.setItem(`shockratees_${key}`, value);
});

document.querySelectorAll('.product-card form').forEach((form) => {
  form.addEventListener('submit', () => {
    const button = form.querySelector('button[type="submit"]');
    if (!button || button.disabled) return;
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = 'Opening secure checkout…';
    window.setTimeout(() => {
      button.disabled = false;
      button.textContent = button.dataset.originalText || 'Buy Tee';
    }, 70000);
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
