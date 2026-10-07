// ======================================================
// TEMA CLARO / ESCURO
// ======================================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  const dark = theme === 'dark';
  root.dataset.theme = dark ? 'dark' : 'light';

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
    themeToggle.setAttribute('title', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
  }
}

const savedTheme = localStorage.getItem('medisocial-theme');
const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(preferredTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('medisocial-theme', nextTheme);
  applyTheme(nextTheme);
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Parallax suave baseado no scroll
const parallaxItems = document.querySelectorAll('[data-speed]');
let ticking = false;

function updateParallax() {
  const y = window.scrollY;

  parallaxItems.forEach(el => {
    const speed = parseFloat(el.dataset.speed || '0');
    const rect = el.getBoundingClientRect();
    const center =
      rect.top + rect.height / 2 - window.innerHeight / 2;

    el.style.transform = `translate3d(0, ${center * speed}px, 0)`;
  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

updateParallax();

// Header visual feedback
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (header) {
    header.style.boxShadow =
      window.scrollY > 30
        ? '0 8px 30px rgba(12,50,31,.06)'
        : 'none';
  }
}, { passive: true });

// ======================================================
// FORMULÁRIO DE CONTATO
// Envio via FormSubmit AJAX para permanecer na mesma página.
// ======================================================

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  const nomeInput = form.querySelector('input[name="nome"]');
  const nome = nomeInput?.value.trim() || 'você';
  const originalButtonHTML = submitButton?.innerHTML || '';

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = 'Enviando... <span>↗</span>';
  }

  if (formMessage) {
    formMessage.className = 'form-note';
    formMessage.textContent = `Enviando sua mensagem, ${nome}...`;
  }

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json'
      }
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Não foi possível enviar o formulário.');
    }

    if (formMessage) {
      formMessage.className = 'form-note success';
      formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
    }

    form.reset();

  } catch (error) {
    console.error('Erro ao enviar formulário:', error);

    if (formMessage) {
      formMessage.className = 'form-note error';
      formMessage.textContent = 'Não foi possível enviar sua mensagem. Tente novamente.';
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHTML;
    }
  }
});

// Current year
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Phone mask
const phone = document.querySelector('input[name="telefone"]');

phone?.addEventListener('input', (e) => {
  let value = e.target.value
    .replace(/\D/g, '')
    .slice(0, 11);

  if (value.length > 6) {
    value = value.replace(
      /^(\d{2})(\d{5})(\d{0,4}).*/,
      '($1) $2-$3'
    );
  } else if (value.length > 2) {
    value = value.replace(
      /^(\d{2})(\d{0,5}).*/,
      '($1) $2'
    );
  }

  e.target.value = value;
});
