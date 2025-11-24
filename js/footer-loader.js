// Dynamically load and inject footer.html into the page
(function(){
  function loadFooter() {
    var footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';
    document.body.appendChild(footerContainer);
    var footerPath = 'components/footer.html';
    var currentPath = window.location.pathname;
    if(currentPath.includes('/pages/')) footerPath = '../components/footer.html';
    fetch(footerPath)
      .then(function(res){
        if(!res.ok) throw new Error('Footer fetch failed');
        return res.text();
      })
      .then(function(html){
        // If in subdirectory, fix relative paths for images and links
        if(currentPath.includes('/pages/')) {
          html = html.replace(/src="img\//g, 'src="../img/');
          html = html.replace(/href="#/g, 'href="../#');
        }
        footerContainer.innerHTML = html;
        if(window.I18N) window.I18N.init();
      })
      .catch(function(){
        footerContainer.innerHTML = '<div style="background:#6b21a8;color:#fff;padding:1em;text-align:center">Footer failed to load</div>';
      });
  }
  document.addEventListener('DOMContentLoaded', loadFooter);
})();
