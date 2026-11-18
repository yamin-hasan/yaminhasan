
(() => {
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce||!window.gsap)return;
 if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
 const items=document.querySelectorAll('[data-reveal]');
 if(window.ScrollTrigger){items.forEach(el=>gsap.from(el,{y:22,opacity:0,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));}
 const hero=document.querySelector('.hero-copy');
 if(hero){gsap.from(hero.querySelectorAll('.eyebrow,h1,.lead,.hero-actions,.hero-note'),{y:18,opacity:0,duration:.7,stagger:.1,ease:'power2.out',delay:.08});}
})();
