// Simple client-side MVC loader for case studies
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.case-link');
  const content = document.getElementById('case-content');
  const home = document.getElementById('home-content');
  const navHome = document.getElementById('nav-home');

  function showHome() {
    if (home) home.style.display = '';
    if (content) {
      content.innerHTML = '';
      content.style.display = 'none';
    }
    // clear active link
    document.querySelectorAll('.case-link').forEach(l => l.classList.remove('active'));
    // restore footer and main scrolling when returning home
    const footer = document.querySelector('footer');
    const mainEl = document.querySelector('main');
    if (footer) footer.style.display = '';
    if (mainEl) mainEl.style.overflow = '';
    // restore global scrolling
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
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
      content.style.display = 'block';
      iframe = document.createElement('iframe');
      iframe.className = 'case-iframe';
      iframe.style.width = '100%';
      iframe.style.border = '0';
      iframe.style.borderRadius = '6px';
      // let iframe be the only scroller: compute available height and allow internal scrolling
      iframe.style.overflow = 'auto';
      iframe.style.minHeight = '480px';
      content.innerHTML = '';
      content.appendChild(iframe);

      // ensure parent container doesn't scroll for the case-content area
      content.style.overflow = 'hidden';
      // hide global footer and prevent main from scrolling so iframe is the only scroller
      const footer = document.querySelector('footer');
      const mainEl = document.querySelector('main');
      if (footer) footer.style.display = 'none';
      if (mainEl) mainEl.style.overflow = 'hidden';
      // also disable page-level scrolling (body/html) so iframe is the only vertical scroller
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      // function to compute height available to iframe (viewport - content top - small margin)
      function computeIframeHeight() {
        const rect = content.getBoundingClientRect();
        const margin = 24; // allow a bit of breathing room
        const available = Math.max(320, window.innerHeight - rect.top - margin);
        return available;
      }

      // set initial height
      iframe.style.height = computeIframeHeight() + 'px';

      // update on window resize
      window.addEventListener('resize', () => {
        iframe.style.height = computeIframeHeight() + 'px';
      });
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
