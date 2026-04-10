/* ===== JAIN RASOI — main.js ===== */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== MIN DATE FOR DATE INPUT =====
const dateInput = document.getElementById('startdate');
if (dateInput) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split('T')[0];
  dateInput.value = tomorrow.toISOString().split('T')[0];
}

// ===== WHATSAPP FORM SUBMIT =====
function submitToWhatsApp(e) {
  e.preventDefault();
  const name    = document.getElementById('fname').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const plan    = document.getElementById('plan').value;
  const date    = document.getElementById('startdate').value;
  const message = document.getElementById('message').value.trim();

  const text = `Namaste Jain Rasoi! 🙏\n\n*New Subscription Request*\n\n👤 Name: ${name}\n📞 WhatsApp: ${phone}\n📍 Address: ${address}\n🍱 Plan: ${plan}\n📅 Start Date: ${date}${message ? `\n📝 Notes: ${message}` : ''}\n\n_Sent via JainRasoi.in_`;

  const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

// Attach form submit handler
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', submitToWhatsApp);
}

// ===== PLAN CTA → SCROLL TO CONTACT & PRE-SELECT PLAN =====
document.querySelectorAll('.plan-cta').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const priceText = btn.closest('.plan-card').querySelector('.plan-price').textContent;
    let selectedPlan = '';
    if (priceText.includes('90'))  selectedPlan = 'Laghu Thali – ₹90/day';
    else if (priceText.includes('120')) selectedPlan = 'Purna Thali – ₹120/day';
    else selectedPlan = 'Parivar Thali – ₹210/day';

    const planSelect = document.getElementById('plan');
    if (planSelect) planSelect.value = selectedPlan;

    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});
