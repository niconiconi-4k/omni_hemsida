(function(){
  const STORAGE_KEY = 'omni_lang';
  const DICTS = {
    zh: {
      "nav.scenes":"应用场景","nav.features":"特点","nav.contact":"联系我们","nav.policies":"政策","nav.getStarted":"立即开始",
      "hero.title":"让餐厅运营更轻松","hero.subtitle":"OmniPOSTech 提供 POS、在线点餐与二维码点餐一体化解决方案，适配中餐及亚洲餐厅流程。","hero.demo":"预约演示","hero.video":"观看视频",
      "scenes.title":"应用场景","scenes.subtitle":"真实餐厅使用场景展示","features.sectionTitle":"🌟 为什么选择 OmniPOSTech？",
      "feature.easy.title":"简单上手，轻松培训","feature.easy.text":"界面清晰、流程直观，员工经过短时间培训即可熟练使用。",
      "feature.cn.title":"中文支持贯穿前台与后厨","feature.cn.text":"不只是收银界面支持中文，厨房单据、菜名、备注也可以中文显示。",
      "feature.bundle.title":"一价全包：POS + 在线点餐 + 二维码点餐","feature.bundle.text":"三大核心功能，不拆开卖，不收插件费。透明价格，减少餐厅数字化成本。",
      "feature.dinein.title":"堂食数字化方案已成熟","feature.list.pos":"收银台 POS","feature.list.qr":"店内扫码点餐","feature.list.menu":"在线菜单浏览","feature.list.kitchen":"中餐、亚洲餐厅后厨流程深度适配",
      "feature.future.title":"未来将接入欧洲常用外卖和点餐平台","feature.future.text":"让线上订单自动同步 POS，减少人工操作。",
      "feature.team.title":"年轻创新团队，持续快速更新","feature.team.text":"不墨守成规，不走旧路，我们的目标是让\"开餐厅\"这件事更轻松。",
      "contact.title":"联系我们","contact.subtitle":"有任何问题？欢迎随时与我们联系","contact.name":"姓名","contact.email":"邮箱","contact.phone":"电话","contact.message":"留言内容","contact.send":"发送",
      "policies.title":"政策信息","policies.teaser":"查看我们的退货、退款、取消、法律与促销相关详细政策说明。","policies.viewFull":"查看完整政策",
      "policies.subtitle":"此页面展示 OmniPOSTech 与订阅、退款、取消、法律限制及促销相关的详细政策说明。","policies.readStart":"开始阅读","policies.moreFeatures":"更多功能",
      "policy.return.title":"退货政策：","policy.return.text":"由于 OmniPOSTech 提供的是软件服务产品，通常不涉及实体商品退货。如果您购买了我们的硬件设备（如 POS 终端），可在收到商品后的 14 天内申请退货。退货商品需保持完整包装、未损坏，且附带发票或购买凭证。退货运费由客户承担，除非商品存在质量问题或配送错误。",
      "policy.refund.title":"退款和争议政策：","policy.refund.item1":"1. 软件服务退款：对于订阅服务，客户可在购买后的 14 天内申请全额退款（前提是未使用或使用极少）。超过此期限，退款将根据使用情况部分返还。","policy.refund.item2":"2. 争议处理：客户如对账单或服务有异议，请在 30 天内通过 support@omnipostech.com 联系客服。我们将核查问题并在 7 个工作日内提供解决方案。","policy.refund.item3":"3. 特殊情况：若因服务中断、技术问题或错误计费导致的损失，OmniPOSTech 将根据实际情况提供适当补偿。",
      "policy.cancel.title":"取消政策：","policy.cancel.text":"客户可随时取消订阅服务，但需提前 7 天通知。已支付的订阅费用通常不予退还，除非符合退款政策中列明的条件。取消后，账户将于当前计费周期结束时停止访问服务。",
      "policy.legal.title":"法律或出口限制：","policy.legal.item1":"1. 客户在使用 OmniPOSTech 服务时需遵守瑞典及所在国家的法律法规。","policy.legal.item2":"2. 禁止将我们的软件用于违法用途，包括但不限于侵权、诈骗或洗钱等活动。","policy.legal.item3":"3. 软件及相关技术可能受到出口管制或国际贸易法规限制，客户不得将其转售或出口至受限国家或地区。",
      "policy.promo.title":"促销条款与条件：","policy.promo.item1":"1. 所有促销活动仅限在指定时间内有效，并适用于明确列出的产品或服务。","policy.promo.item2":"2. 每个客户在同一促销活动中可能仅享受一次优惠，活动不可与其他折扣同时使用，除非特别说明。","policy.promo.item3":"3. OmniPOSTech 保留随时修改或终止促销活动的权利，且无需事先通知。","policy.promo.item4":"4. 活动条款如与法律法规冲突，以相关法律法规为准。",
      "cta.title":"准备好让餐厅管理更轻松了吗？","cta.subtitle":"立即体验 OmniPOSTech，让您的餐厅运营更高效","cta.trial":"开始免费试用","cta.sales":"联系销售",
      "footer.slogan":"为中餐及亚洲餐厅提供一体化 POS 解决方案","footer.quick":"快速链接","footer.contact":"联系方式","footer.news":"新闻订阅","footer.news.text":"订阅我们的新闻，获取最新更新和优惠","footer.email.placeholder":"您的邮箱","footer.subscribe":"订阅","footer.backHome":"返回首页",
      "coming.title":"页面即将上线","coming.text":"该功能或内容正在准备中，敬请期待。我们会很快更新此页面。","coming.backHome":"返回首页","coming.contactSupport":"联系支持"
    },
    en: {
      "nav.scenes":"Scenes","nav.features":"Features","nav.contact":"Contact","nav.policies":"Policies","nav.getStarted":"Get Started",
      "hero.title":"Make Restaurant Operations Easier","hero.subtitle":"OmniPOSTech provides an integrated POS, online ordering and QR table ordering solution adapted for Chinese & Asian restaurant workflows.","hero.demo":"Book a Demo","hero.video":"Watch Video",
      "scenes.title":"Use Cases","scenes.subtitle":"Real restaurant scenario showcase","features.sectionTitle":"🌟 Why Choose OmniPOSTech?",
      "feature.easy.title":"Easy Onboarding, Fast Training","feature.easy.text":"Clear interface and intuitive flow. Staff become proficient after short training.",
      "feature.cn.title":"Chinese Support Across Front & Kitchen","feature.cn.text":"Kitchen tickets, dish names and notes can all display in Chinese – not just the POS screen.",
      "feature.bundle.title":"One Price: POS + Online Ordering + QR Ordering","feature.bundle.text":"Three core functions bundled. No plugin fees, transparent pricing to lower digitization costs.",
      "feature.dinein.title":"Mature Dine‑In Digital Solution","feature.list.pos":"Counter POS","feature.list.qr":"In‑Store QR Ordering","feature.list.menu":"Online Menu Browsing","feature.list.kitchen":"Workflow deeply adapted to Chinese & Asian kitchens",
      "feature.future.title":"Future: Integrations with Popular EU Delivery Platforms","feature.future.text":"Online orders auto sync to POS, reducing manual work.",
      "feature.team.title":"Young Innovative Team, Rapid Updates","feature.team.text":"We avoid outdated paths; our goal is to make ‘running a restaurant’ easier.",
      "contact.title":"Contact Us","contact.subtitle":"Any questions? Reach out anytime.","contact.name":"Name","contact.email":"Email","contact.phone":"Phone","contact.message":"Message","contact.send":"Send",
      "policies.title":"Policy Information","policies.teaser":"View detailed explanations of our return, refund, cancellation, legal and promotion related policies.","policies.viewFull":"View Full Policies",
      "policies.subtitle":"This page presents detailed OmniPOSTech policies related to subscription, refunds, cancellations, legal restrictions and promotions.","policies.readStart":"Start Reading","policies.moreFeatures":"More Features",
      "policy.return.title":"Return Policy:","policy.return.text":"As OmniPOSTech provides software services, physical product returns are rarely involved. If you purchased our hardware (e.g. POS terminal) you may request a return within 14 days of receipt. Returned items must be in original packaging, undamaged and include proof of purchase. Return shipping is borne by the customer unless there is a quality or fulfillment error.",
      "policy.refund.title":"Refund & Dispute Policy:","policy.refund.item1":"1. Software Service Refund: For subscriptions, customers may request a full refund within 14 days of purchase (provided usage is none or minimal). After that period partial refunds may be granted based on usage.","policy.refund.item2":"2. Dispute Handling: If you have billing or service objections, contact support@omnipostech.com within 30 days. We respond with a solution within 7 business days.","policy.refund.item3":"3. Special Cases: In cases of service interruption, technical faults or billing errors, OmniPOSTech provides appropriate compensation based on impact.",
      "policy.cancel.title":"Cancellation Policy:","policy.cancel.text":"You may cancel a subscription at any time but must give 7 days notice. Paid fees are normally non‑refundable unless qualifying under refund terms. Access ends at the close of the current billing cycle.",
      "policy.legal.title":"Legal or Export Restrictions:","policy.legal.item1":"1. Customers must comply with Swedish law and their local jurisdiction when using the service.","policy.legal.item2":"2. The software may not be used for illegal purposes including infringement, fraud or money laundering.","policy.legal.item3":"3. Software/technology may be subject to export or trade controls; do not resell or export to restricted regions.",
      "policy.promo.title":"Promotion Terms & Conditions:","policy.promo.item1":"1. Promotions are valid only within the stated time frame for listed products/services.","policy.promo.item2":"2. Each customer may use a promotion once; offers cannot be combined unless stated.","policy.promo.item3":"3. OmniPOSTech may modify or terminate promotions anytime without prior notice.","policy.promo.item4":"4. If terms conflict with applicable laws, the laws prevail.",
      "cta.title":"Ready to Simplify Management?","cta.subtitle":"Experience OmniPOSTech now and boost operational efficiency","cta.trial":"Start Free Trial","cta.sales":"Contact Sales",
      "footer.slogan":"Integrated POS solution for Chinese & Asian restaurants","footer.quick":"Quick Links","footer.contact":"Contact","footer.news":"Newsletter","footer.news.text":"Subscribe for latest updates and offers","footer.email.placeholder":"Your email","footer.subscribe":"Subscribe","footer.backHome":"Back to Home",
      "coming.title":"Coming Soon","coming.text":"Feature or content in preparation. Stay tuned for updates.","coming.backHome":"Back to Home","coming.contactSupport":"Contact Support"
    }
  };

  function applyTranslations(dict){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(!key) return;
      if(typeof dict[key]==='undefined') return; // keep original text if missing
      if(el.childElementCount>0){
        const span = Array.from(el.children).reverse().find(c=>c.tagName==='SPAN' && c.children.length===0);
        if(span) span.textContent = dict[key]; else el.textContent = dict[key];
      }else el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      if(key && typeof dict[key] !== 'undefined') el.setAttribute('placeholder', dict[key]);
    });
  }

  function setLang(lang){
    const dict = DICTS[lang];
    if(!dict){ console.warn('No dict for', lang); return; }
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(dict);
    const label = document.getElementById('currentLangLabel');
    if(label) label.textContent = lang==='zh' ? '中文' : 'English';
    const toggleBtn = document.getElementById('langBtn');
    if(toggleBtn && !document.getElementById('currentLangLabel')){
      // coming-soon simple button
      toggleBtn.textContent = lang==='zh' ? '切换语言' : 'Switch Language';
    }
  }

  function attachDropdown(){
    const dropdown = document.getElementById('langDropdown');
    const btn = document.getElementById('langBtn');
    if(!btn) return;
    btn.addEventListener('click',e=>{e.stopPropagation();dropdown&&dropdown.classList.toggle('hidden');});
    dropdown?.querySelectorAll('[data-lang]').forEach(b=>{
      b.addEventListener('click',()=>{ const lang=b.getAttribute('data-lang'); if(lang) setLang(lang); dropdown.classList.add('hidden'); });
    });
    document.addEventListener('click',e=>{ if(dropdown && !btn.contains(e.target)) dropdown.classList.add('hidden'); });
  }

  function init(){
    const initial = localStorage.getItem(STORAGE_KEY)||'zh';
    setLang(initial);
    attachDropdown();
  }

  window.I18N = { init, setLang };
})();
