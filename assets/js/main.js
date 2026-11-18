
(() => {
 const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
 const header=document.querySelector('.site-header');
 if(header){const onScroll=()=>header.style.boxShadow=window.scrollY>8?'0 8px 28px rgba(19,61,54,.07)':'none';window.addEventListener('scroll',onScroll,{passive:true});onScroll();}
 if(window.lucide)window.lucide.createIcons();
})();
