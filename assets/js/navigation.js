
(() => {
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
 if(!toggle||!nav)return;
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);toggle.innerHTML=`<i data-lucide="${open?'menu':'x'}"></i>`;if(window.lucide)window.lucide.createIcons();});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.innerHTML='<i data-lucide="menu"></i>';if(window.lucide)window.lucide.createIcons();}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}});
})();
