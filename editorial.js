const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
function revealTarget(){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(!target)return;let ancestor=target.parentElement;while(ancestor){if(ancestor.tagName==='DETAILS')ancestor.open=true;ancestor=ancestor.parentElement;}requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');history.pushState(null,'',link.hash);revealTarget();}));
addEventListener('hashchange',revealTarget);if(location.hash)revealTarget();
addEventListener('popstate',revealTarget);
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-unavailable');img.parentElement.classList.add('photo-unavailable');}));
