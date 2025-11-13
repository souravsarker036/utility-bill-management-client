export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  document.querySelector("html").setAttribute("data-theme", theme);
};

export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};

export const toggleTheme = () => {
  const current = getTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
  return next;
};
