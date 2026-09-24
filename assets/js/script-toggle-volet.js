(() => {
  const toggleBtn = document.getElementById('toggle-volet');
  const volet = document.getElementById('volet-droit');
  if (!toggleBtn || !volet) return;

  const isOpen = () => volet.classList.contains('volet-open');

  const setOpen = (open) => {
    volet.classList.toggle('volet-open', open);
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', open ? 'Réduire le volet' : 'Ouvrir le volet');
    document.getElementById('toggle-volet').querySelector('svg').style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
  };

  // State initiale : ouvert
  setOpen(true);

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setOpen(!isOpen());
    document.getElementById('toggle-volet').querySelector('svg').style.transform = isOpen() ? 'rotate(180deg)' : 'rotate(0deg)';
  });

  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleBtn.click();
    }
  });
})();

