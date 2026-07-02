// Small progressive enhancements for the static Shockratees landing page.
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const year = document.querySelector('#year');
const signupForm = document.querySelector('.signup-form');
const formMessage = document.querySelector('.form-message');

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

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

signupForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = signupForm.querySelector('input[type="email"]');
  const email = emailInput?.value.trim() ?? '';

  if (!emailInput?.checkValidity()) {
    formMessage.textContent = 'Enter a valid email to join the drop list.';
    emailInput?.focus();
    return;
  }

  formMessage.textContent = `You're on the list. Watch ${email} for the first signal.`;
  signupForm.reset();
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
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
