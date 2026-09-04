(() => {
  const storageKey = "portfolio-theme";
  const root = document.documentElement;
  const toggles = document.querySelectorAll("[data-theme-toggle]");

  const getTheme = () => root.dataset.theme === "dark" ? "dark" : "light";

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.dataset.theme = "dark";
    } else {
      root.removeAttribute("data-theme");
    }

    toggles.forEach((toggle) => {
      const isDark = theme === "dark";
      toggle.setAttribute("aria-label", isDark ? "Ativar light mode" : "Ativar dark mode");
      toggle.setAttribute("aria-pressed", String(isDark));
    });
  };

  try {
    applyTheme(localStorage.getItem(storageKey) === "dark" ? "dark" : "light");
  } catch (error) {
    applyTheme(getTheme());
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const nextTheme = getTheme() === "dark" ? "light" : "dark";
      applyTheme(nextTheme);

      try {
        if (nextTheme === "dark") {
          localStorage.setItem(storageKey, "dark");
        } else {
          localStorage.removeItem(storageKey);
        }
      } catch (error) {}
    });
  });
})();
