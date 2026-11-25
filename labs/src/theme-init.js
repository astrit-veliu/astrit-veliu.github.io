(function () {
  var theme = 'dark';
  try {
    var saved = window.localStorage.getItem('vl-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (error) {
    theme = 'light';
  }
  document.documentElement.dataset.theme = theme;
})();
