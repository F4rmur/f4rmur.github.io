(() => {

  //gère le menu pour quand l'écran n'est pas assez large
  const nav = document.querySelector("[data-site-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  if (nav && toggle) {
    const setOpen = (open) => {
      nav.dataset.open = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };

    setOpen(false);

    toggle.addEventListener("click", () => {
      const open = nav.dataset.open === "true";
      setOpen(!open);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 760px)").matches) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
      }
    });
  }

})();

