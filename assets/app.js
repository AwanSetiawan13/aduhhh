const header = document.querySelector('.site-header');
const progress = document.getElementById('scrollProgress');
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 18);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max ? Math.min(100, (window.scrollY / max) * 100) : 0) + '%';
}
onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
mainNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mainNav.classList.remove('open'); navToggle?.setAttribute('aria-expanded', 'false') }));

const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target) }
}), { threshold: .12, rootMargin: '0px 0px -35px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const tabs = [...document.querySelectorAll('.tab-btn')];
const panels = [...document.querySelectorAll('.tab-panel')];
tabs.forEach(btn => btn.addEventListener('click', () => {
  const key = btn.dataset.tab;
  tabs.forEach(t => { const active = t === btn; t.classList.toggle('active', active); t.setAttribute('aria-selected', String(active)) });
  panels.forEach(p => { const active = p.dataset.panel === key; p.classList.toggle('active', active); p.hidden = !active });
}));

const disorderData = {
  stroke: { kicker: 'Gangguan fungsi otak akut', title: 'Stroke', image: 'assets/images/stroke_full.webp', alt: 'Ilustrasi stroke iskemik dan hemoragik', text: 'Stroke merupakan gangguan fungsi otak akut akibat terhentinya pasokan darah ke otak, baik karena penyumbatan (stroke iskemik) maupun pecahnya pembuluh darah (stroke hemoragik).', note: 'Kondisi ini menyebabkan sel-sel otak mengalami kekurangan oksigen secara mendadak, sehingga memicu kerusakan jaringan saraf dan penurunan fungsi tubuh.' },
  ms: { kicker: 'Penyakit autoimun kronis', title: 'Multiple Sclerosis (MS)', image: 'assets/images/ms_full.webp', alt: 'Ilustrasi Multiple Sclerosis dan selubung mielin', text: 'Multiple Sclerosis merupakan penyakit autoimun kronis pada sistem saraf pusat yang terjadi ketika sistem kekebalan tubuh merusak selubung mielin (pelindung serabut saraf).', note: 'Kerusakan ini menghambat penghantaran impuls listrik saraf, sehingga memicu gangguan koordinasi, kelemahan otot, dan gangguan penglihatan.' },
  bells: { kicker: 'Gangguan Nervus Fasialis', title: "Bell's Palsy", image: 'assets/images/bell_full.webp', alt: "Ilustrasi Bell's Palsy pada wajah", text: "Bell's Palsy merupakan kondisi kelumpuhan atau kelemahan mendadak pada otot salah satu sisi wajah akibat peradangan atau penekanan pada Nervus Fasialis (Saraf Kranial VII).", note: 'Gangguan ini bersifat sementara dan menyebabkan wajah tampak melorot, kesulitan tersenyum atau menutup mata, serta penurunan fungsi pengecapan pada lidah.' },
  parkinson: { kicker: 'Gangguan degeneratif sistem saraf pusat', title: 'Parkinson', image: 'assets/images/parkinson_full.webp', alt: 'Ilustrasi penyakit Parkinson', text: 'Penyakit Parkinson merupakan gangguan degeneratif sistem saraf pusat yang terjadi akibat kemunduran sel-sel saraf penghasil dopamin di area substantia nigra otak.', note: 'Defisiensi dopamin ini mengganggu sistem kontrol gerakan tubuh, sehingga memicu tremor saat istirahat (resting tremor), kekakuan otot, kelambatan gerak (bradikinesia), serta ketidakseimbangan postur.' }
};
const modal = document.getElementById('disorderModal');
const modalClose = document.getElementById('modalClose');
document.querySelectorAll('[data-disorder]').forEach(card => card.addEventListener('click', () => {
  const d = disorderData[card.dataset.disorder]; if (!d) return;
  document.getElementById('modalKicker').textContent = d.kicker;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalText').textContent = d.text;
  document.getElementById('modalNote').textContent = d.note;
  const img = document.getElementById('modalImage'); img.src = d.image; img.alt = d.alt;
  modal.showModal();
}));
modalClose?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', e => { if (e.target === modal) modal.close() });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.open) modal.close() });
