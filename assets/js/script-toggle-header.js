(() => {
  const toggleLi = document.getElementById('hide-header');
  const header = document.querySelector('.site-header');
  if (!toggleLi || !header) return;

  const apply = (hidden) => {
    header.classList.toggle('header-hidden', hidden);
    toggleLi.setAttribute('aria-pressed', hidden ? 'true' : 'false');
  };

  // Initial state
  apply(false);

  toggleLi.addEventListener('click', (e) => {
    e.preventDefault();
    const hidden = !header.classList.contains('header-hidden');
    apply(hidden);
  });

  toggleLi.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleLi.click();
    }
  });
})();

