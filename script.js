// Portofolio Raditya Abdillah Heulung — interaktivitas

/* Nav scroll state */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 24), {passive:true});

/* Mobile menu */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

/* Active section highlight */
const links = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.dataset.sec === e.target.id));
    }
  });
}, {rootMargin:'-40% 0px -55% 0px'});
['about','skills','journey'].forEach(id => spy.observe(document.getElementById(id)));

/* Reveal animation — sekali jalan */
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

/* Animated counters */
const counters = document.querySelectorAll('[data-count]');
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, dur = 1100, t0 = performance.now();
    (function tick(now){
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    countObs.unobserve(el);
  });
}, {threshold:.6});
counters.forEach(c => countObs.observe(c));

/* Copy email dengan feedback */
const copyBtn = document.getElementById('copyEmail');
const copyLabel = document.getElementById('copyLabel');
copyBtn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('raditya@example.com'); } catch(e) {}
  copyLabel.textContent = 'tersalin ✓';
  setTimeout(() => copyLabel.textContent = 'salin', 2000);
});

/* Tahun otomatis di footer */
document.getElementById('year').textContent = new Date().getFullYear();
