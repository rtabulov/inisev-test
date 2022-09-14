export const handleNavigation = (pathname, title) => {
  window.history.pushState(null, title, pathname);
  window.dispatchEvent(new Event('popstate'));
};
