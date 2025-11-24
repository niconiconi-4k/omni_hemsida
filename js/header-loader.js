(function(){
  // Inlined header HTML to avoid fetch() so header works under file://
  const HEADER_HTML = `<header class="fixed top-0 left-0 right-0 bg-[#6b21a8] shadow-md z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" id="homeLogo" class="flex items-center space-x-2">
            <img src="img/logos/png/logo_no_bg2.png" alt="OmniPOSTech Logo" class="h-16 object-contain">
            <span class="text-white font-semibold text-xl" data-i18n="footer.brand">OmniPOSTech</span>
        </a>
        <nav class="hidden md:flex items-center space-x-8" id="mainNav">
            <a href="#carousel" class="text-white hover:text-white/80 font-medium transition-colors" data-i18n="nav.scenes">Scenes</a>
            <a href="#features" class="text-white hover:text-white/80 font-medium transition-colors" data-i18n="nav.features">Features</a>
            <a href="#painpoints" class="text-white hover:text-white/80 font-medium transition-colors" data-i18n="nav.painpoints">Pain Points</a>
            <a href="#ourstory" class="text-white hover:text-white/80 font-medium transition-colors" data-i18n="nav.story">Our Story</a>
            <a href="#testimonials" class="text-white hover:text-white/80 font-medium transition-colors" data-i18n="nav.testimonials">Testimonials</a>
            <a href="#pricing" class="text-white hover:text-white/80 font-medium transition-colors" data-i18n="nav.pricing">Pricing</a>
            <a href="#contact" class="text-white hover:text-white/80 font-medium transition-colors" data-i18n="nav.contact">Contact</a>
            <a href="pages/policies.html" class="text-white hover:text-white/80 font-medium transition-colors" data-i18n="nav.policies">Policies</a>
            <button class="bg-white text-primary px-5 py-2 !rounded-button font-medium hover:bg-gray-100 transition-colors whitespace-nowrap" data-i18n="nav.getStarted">Get Started</button>
            <div class="relative" id="langSelector">
                <button class="flex items-center space-x-1 text-white hover:text-white/80 font-medium" id="langBtn">
                    <span id="currentLangLabel">English</span>
                    <i class="ri-arrow-down-s-line"></i>
                </button>
                <div class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 hidden" id="langDropdown">
                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" data-lang="zh">中文 (ZH)</button>
                    <button class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm" data-lang="en">English (EN)</button>
                </div>
            </div>
        </nav>
        <button class="md:hidden w-10 h-10 flex items-center justify-center" id="mobileMenuBtn">
            <i class="ri-menu-line text-white ri-lg"></i>
        </button>
    </div>
</header>`;

  function loadHeader() {
    var headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.insertBefore(headerContainer, document.body.firstChild);

    var html = HEADER_HTML;
    var currentPath = window.location.pathname || '';

    // If page is in /pages/, adjust relative paths to reach top-level assets
    if(currentPath.includes('/pages/')) {
      html = html.replace(/src="img\//g, 'src="../img/');
      html = html.replace(/href="pages\//g, 'href="../pages/');
      // adjust root link href="/"
      html = html.replace(/href="\/"/g, 'href="../"');
    }

    try {
      headerContainer.innerHTML = html;

      // Add local handlers for language dropdown so it works even if i18n init timing is off
      (function attachLocalLangHandlers(){
        try {
          var btn = document.getElementById('langBtn');
          var dropdown = document.getElementById('langDropdown');

          if (btn && dropdown) {
            // Toggle dropdown visibility
            btn.addEventListener('click', function (e) {
              e.stopPropagation();
              dropdown.classList.toggle('hidden');
            });
            // Close when clicking outside
            document.addEventListener('click', function (e) {
              if (!btn.contains(e.target)) dropdown.classList.add('hidden');
            });
            // Handle language selection buttons
            dropdown.querySelectorAll('[data-lang]').forEach(function(b){
              b.addEventListener('click', function(){
                var lang = b.getAttribute('data-lang');
                dropdown.classList.add('hidden');
                if(!lang) return;
                if(window.I18N && typeof window.I18N.loadLang === 'function' && typeof window.I18N.setLang === 'function'){
                  window.I18N.loadLang(lang).then(function(){ window.I18N.setLang(lang); });
                } else {
                  // If i18n not available yet, store selection and try to set later
                  try { localStorage.setItem('omni_lang_pending', lang); } catch(e){ /* ignore */ }
                }
              });
            });
          }
        } catch (err) {
          console.warn('Local lang handlers failed:', err);
        }
      })();

      // Ensure I18N.init is called even if i18n.js loads after the header.
      (function tryInitI18N(){
        if (window.I18N && typeof window.I18N.init === 'function') {
          window.I18N.init();
          // If a pending lang selection exists (user clicked before i18n ready), apply it
          try {
            var pending = localStorage.getItem('omni_lang_pending');
            if(pending && window.I18N && typeof window.I18N.loadLang === 'function'){
              window.I18N.loadLang(pending).then(function(){ window.I18N.setLang(pending); localStorage.removeItem('omni_lang_pending'); });
            }
          } catch(e){ /* ignore */ }
          return;
        }
        var tries = 0;
        var max = 20; // retry up to ~2 seconds
        var t = setInterval(function(){
          if (window.I18N && typeof window.I18N.init === 'function') {
            clearInterval(t);
            try { window.I18N.init(); 
              var pending = localStorage.getItem('omni_lang_pending');
              if(pending && window.I18N && typeof window.I18N.loadLang === 'function'){
                window.I18N.loadLang(pending).then(function(){ window.I18N.setLang(pending); localStorage.removeItem('omni_lang_pending'); });
              }
            } catch(e){ console.error('I18N.init error:', e); }
          } else if (++tries >= max) {
            clearInterval(t);
            console.warn('I18N.init not available after retries');
          }
        }, 100);
      })();
    } catch (e) {
      headerContainer.innerHTML = '<div style="background:#6b21a8;color:#fff;padding:1em;text-align:center">Header failed to load</div>';
      console.error('Header injection failed:', e);
    }
  }

  document.addEventListener('DOMContentLoaded', loadHeader);
})();
