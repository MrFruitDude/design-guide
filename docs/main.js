(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.nav-toggle');
  const list = document.getElementById('nav');
  if(toggle && list){
    toggle.addEventListener('click', ()=>{
      const open = list.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Active section highlight
  const links = Array.from(document.querySelectorAll('#nav a'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      const idx = sections.indexOf(entry.target);
      if(idx === -1) return;
      const a = links[idx];
      if(entry.isIntersecting){
        links.forEach(l=>l.classList.remove('is-active'));
        a.classList.add('is-active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0.01 });
  sections.forEach(sec => io.observe(sec));

  // Tabs demo
  document.querySelectorAll('.tabs .tab').forEach((tab)=>{
    tab.addEventListener('click',()=>{
      tab.parentElement.querySelectorAll('.tab').forEach(t=>t.classList.remove('is-active'));
      tab.classList.add('is-active');
    });
  });

  // Motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    document.documentElement.style.setProperty('--dur-slow', '0ms');
    document.documentElement.style.setProperty('--dur-med', '0ms');
    document.documentElement.style.setProperty('--dur-fast', '0ms');
  }

  // Fun hover wiggle for motion demo
  document.querySelectorAll('[data-wiggle]').forEach((el)=>{
    el.addEventListener('mouseenter',()=>{el.animate([
      { transform: 'translateY(0) rotate(0)' },
      { transform: 'translateY(-1px) rotate(-1deg)' },
      { transform: 'translateY(0) rotate(0.6deg)' },
      { transform: 'translateY(0) rotate(0)' }
    ], { duration: 450, easing: 'ease-out' });});
  });

  // Click-to-copy: entire swatch card
  document.querySelectorAll('.swatch').forEach((card)=>{
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    const hexEl = card.querySelector('b');
    const hex = hexEl ? hexEl.textContent.trim() : '';
    const copy = async ()=>{
      if(!hex) return;
      try{
        await navigator.clipboard.writeText(hex);
        card.classList.add('copied');
        setTimeout(()=>card.classList.remove('copied'), 1200);
      }catch(e){
        const range = document.createRange();
        range.selectNodeContents(hexEl || card);
        const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
        card.classList.add('copied');
        setTimeout(()=>card.classList.remove('copied'), 1200);
      }
    };
    card.addEventListener('click', copy);
    card.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); copy(); }});
  });
})();
