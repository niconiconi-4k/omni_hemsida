// External JSON i18n loader; no inline fallback dictionaries.
(function(){
  const STORAGE_KEY = 'omni_lang';
  // Dynamically resolve lang path based on script location
  function getLangPath() {
    // Get current script src
    const scripts = document.getElementsByTagName('script');
    let src = '';
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.includes('i18n.js')) {
        src = scripts[i].src;
        break;
      }
    }
    if (!src) return 'lang';
    // Remove filename, get directory
    const base = src.substring(0, src.lastIndexOf('/'));
    // If script is in /js/, lang is likely ../lang
    if (base.endsWith('/js')) return '../lang';
    // If script is in /pages/js/, lang is likely ../../lang
    if (base.endsWith('/pages/js')) return '../../lang';
    // Otherwise, try lang relative to script
    return base + '/../lang';
  }

  const LANG_PATH = getLangPath();
  const LOAD_TIMEOUT_MS = 5000;
  const LOADED = {};

  function applyTranslations(dict){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(!key) return;
      if(!(key in dict)) return;
      if(el.childElementCount>0){
        const span = Array.from(el.children).reverse().find(c=>c.tagName==='SPAN' && c.children.length===0);
        if(span) span.textContent = dict[key]; else el.textContent = dict[key];
      } else el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      if(key && key in dict) el.setAttribute('placeholder', dict[key]);
    });
  }

  function loadLang(lang){
    if(LOADED[lang]) return Promise.resolve(LOADED[lang]);
    if(location.protocol === 'file:'){
      console.error('Cannot fetch translation JSON under file://. Run a local server (python3 -m http.server)');
      return Promise.resolve({});
    }
    const url = `${LANG_PATH}/${lang}.json`;
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), LOAD_TIMEOUT_MS);
    return fetch(url, { cache:'no-store', signal:controller.signal })
      .then(r=>{ clearTimeout(timeout); if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
      .then(json=>{ LOADED[lang] = json; return json; })
      .catch(err=>{ console.error(`Failed to load ${url}:`, err); return {}; });
  }

  function setLang(lang){
    const dict = LOADED[lang];
    if(!dict){ console.warn('Language not loaded:', lang); return; }
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(dict);
    const label = document.getElementById('currentLangLabel');
    if(label) label.textContent = lang==='zh' ? '中文' : 'English';
    const toggleBtn = document.getElementById('langBtn');
    if(toggleBtn && !document.getElementById('currentLangLabel')){
      toggleBtn.textContent = lang==='zh' ? '切换语言' : 'Switch Language';
    }
  }

  function attachDropdown(){
    const dropdown = document.getElementById('langDropdown');
    const btn = document.getElementById('langBtn');
    if(!btn) return;
    btn.addEventListener('click',e=>{e.stopPropagation();dropdown&&dropdown.classList.toggle('hidden');});
    dropdown?.querySelectorAll('[data-lang]').forEach(b=>{
      b.addEventListener('click',()=>{
        const lang = b.getAttribute('data-lang');
        if(lang){ loadLang(lang).then(()=>setLang(lang)); }
        dropdown.classList.add('hidden');
      });
    });
    document.addEventListener('click',e=>{ if(dropdown && !btn.contains(e.target)) dropdown.classList.add('hidden'); });
  }

  function init(){
    const initial = localStorage.getItem(STORAGE_KEY)||'zh';
    loadLang(initial).then(()=>setLang(initial));
    attachDropdown();
  }

  window.I18N = { init, setLang, loadLang };
})();
