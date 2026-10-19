// ===== Navbar scroll effect =====
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  toggleBackToTop();
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== Close navbar on link click (mobile) =====
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

// ===== Back to top =====
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.remove('d-none');
  } else {
    backToTopBtn.classList.add('d-none');
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Contact form =====
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const telepon = document.getElementById('telepon').value.trim();
  const email = document.getElementById('email').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  if (!nama || !telepon || !email || !pesan) {
    showAlert('Mohon lengkapi semua field!', 'danger');
    return;
  }

  // Format pesan WhatsApp
  const waNumber = '6281234567890';
  const waText = encodeURIComponent(
    `Halo, saya ${nama}.\n\n` +
    `📞 Telepon: ${telepon}\n` +
    `📧 Email: ${email}\n\n` +
    `💬 Pesan: ${pesan}`
  );

  showAlert('Membuka WhatsApp...', 'success');

  setTimeout(() => {
    window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
    contactForm.reset();
    formAlert.innerHTML = '';
  }, 800);
});

function showAlert(message, type) {
  formAlert.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show mb-0" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

// ===== Smooth scroll (fallback) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});