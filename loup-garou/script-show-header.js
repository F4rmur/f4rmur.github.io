(() => {
  const showBtn = document.getElementById('show-header');
  const header = document.querySelector('.site-header');
  if (!showBtn || !header) return;

  const sync = () => {
    const hidden = header.classList.contains('header-hidden');
    showBtn.style.display = hidden ? 'inline-flex' : 'none';
  };

  sync();

  showBtn.addEventListener('click', (e) => {
    e.preventDefault();
    header.classList.remove('header-hidden');
    sync();
  });

  showBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showBtn.click();
    }
  });

  // Resync si l'état change (ex: via le li #hide-header)
  const id = setInterval(sync, 200);
  window.addEventListener('beforeunload', () => clearInterval(id));
})();


