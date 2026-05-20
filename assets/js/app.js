// Simple client-side MVC loader for case studies
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.case-link');
  const content = document.getElementById('case-content');
  const home = document.getElementById('home-content');
  const navHome = document.getElementById('nav-home');

  function showHome() {
    if (home) home.style.display = '';
    if (content) content.innerHTML = 'Select a case study from the sidebar to view it here. The content will be loaded using a small MVC controller.';
    // clear active link
    document.querySelectorAll('.case-link').forEach(l => l.classList.remove('active'));
    history.pushState({}, '', '#');
  }

  function renderHTML(html) {
    // Replace content with parsed HTML body children
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    content.innerHTML = '';
    Array.from(doc.body.children).forEach(node => content.appendChild(node));
  }

  function loadPage(path, push = true) {
    // Simple iframe-based loader: set iframe.src and let iframe handle loading
    if (!content) return;
    // create or reuse iframe
    let iframe = content.querySelector('iframe.case-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.className = 'case-iframe';
      iframe.style.width = '100%';
      iframe.style.border = '0';
      iframe.style.borderRadius = '6px';
      iframe.style.minHeight = '480px';
      content.innerHTML = '';
      content.appendChild(iframe);
    }
    // show loader overlay
    content.classList.add('loading');
    if (!content.querySelector('.loader')) {
      const loader = document.createElement('div');
      loader.className = 'loader';
      loader.innerText = 'Loading…';
      content.appendChild(loader);
    }
    // set active link immediately
    document.querySelectorAll('.case-link').forEach(l => l.classList.toggle('active', l.dataset.path === path));
    if (home) home.style.display = 'none';
    // set src (this will trigger iframe load)
    iframe.src = path;
    // once loaded, remove loader
    iframe.onload = () => {
      content.classList.remove('loading');
      const loaderEl = content.querySelector('.loader');
      if (loaderEl) loaderEl.remove();
    };
    if (push) history.pushState({ path }, '', '#' + path.split('/').pop().split('.')[0]);
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const path = link.dataset.path;
      if (path) loadPage(path);
    });
  });

  if (navHome) {
    navHome.addEventListener('click', (e) => {
      e.preventDefault();
      showHome();
    });
  }

  // Load initial page from hash if present
  if (location.hash) {
    const name = location.hash.substring(1);
    const initial = `Tabs/${name}.html`;
    const initialLink = document.querySelector(`.case-link[data-path="${initial}"]`);
    if (initialLink) initialLink.click(); else loadPage(initial, false);
  }

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.path) loadPage(e.state.path, false);
  });
});
