// Dynamically load and inject header.html into the page
(function(){
  function loadHeader() {
    var headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.insertBefore(headerContainer, document.body.firstChild);
    // Auto-detect correct relative path for header.html
    var headerPath = 'components/header.html';
    var currentPath = window.location.pathname;
    if(currentPath.includes('/pages/')) headerPath = '../components/header.html';
    fetch(headerPath)
      .then(function(res){
        if(!res.ok) throw new Error('Header fetch failed');
        return res.text();
      })
      .then(function(html){
        // If in subdirectory, fix relative paths for images and links
        var currentPath = window.location.pathname;
        if(currentPath.includes('/pages/')) {
          html = html.replace(/src="img\//g, 'src="../img/');
          html = html.replace(/href="pages\//g, 'href="../pages/');
        }
        headerContainer.innerHTML = html;
        if(window.I18N) window.I18N.init();
      })
      .catch(function(){
        headerContainer.innerHTML = '<div style="background:#6b21a8;color:#fff;padding:1em;text-align:center">Header failed to load</div>';
      });
  }
  document.addEventListener('DOMContentLoaded', loadHeader);
})();
