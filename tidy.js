/* 導覽使用原區塊；補上可分享的網址、鍵盤操作及手機抽屜。 */
(()=>{
const sidebar=document.getElementById('sideNav'), opener=document.getElementById('mobileSidebarReopen'),closer=document.getElementById('mobileSidebarToggle');
const mobile=matchMedia('(max-width:991px)');
const bar=document.createElement('div');bar.className='tidy-mobilebar';bar.textContent='張語宸｜教育實踐者';bar.setAttribute('aria-hidden','true');document.body.prepend(bar);
const backdrop=document.createElement('div');backdrop.className='tidy-backdrop';document.body.append(backdrop);
const skip=document.createElement('a');skip.className='tidy-skip';skip.href='#home';skip.textContent='跳至主要內容';document.body.prepend(skip);
const backtop=document.createElement('button');backtop.className='tidy-backtop';backtop.textContent='↑ 回到頂端';backtop.type='button';document.body.append(backtop);backtop.onclick=()=>window.goToSection('home');
opener.setAttribute('aria-controls','sideNav');closer.setAttribute('aria-controls','sideNav');
function drawer(open,focus=true){sidebar.classList.toggle('tidy-open',open);backdrop.classList.toggle('open',open);opener.setAttribute('aria-expanded',String(open));closer.setAttribute('aria-expanded',String(open));opener.setAttribute('aria-label',open?'關閉導覽':'開啟導覽');if(mobile.matches){sidebar.inert=!open;document.body.style.overflow=open?'hidden':'';}if(focus){if(open)closer.focus();else opener.focus();}}
for(const [button,open] of [[opener,true],[closer,false]])button.addEventListener('click',e=>{if(!mobile.matches)return;e.preventDefault();e.stopImmediatePropagation();drawer(open);},true);
backdrop.addEventListener('click',()=>drawer(false));
document.addEventListener('keydown',e=>{if(!mobile.matches||!sidebar.classList.contains('tidy-open'))return;if(e.key==='Escape'){drawer(false);return;}if(e.key==='Tab'){const controls=[...sidebar.querySelectorAll('a,button')].filter(el=>el.getClientRects().length&&!el.disabled);const first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
const toggle=document.getElementById('profileToggleBtn'),details=document.getElementById('profileDetails');toggle.setAttribute('aria-controls','profileDetails');
const sync=()=>{toggle.setAttribute('aria-expanded',String(details.classList.contains('show')));details.inert=!details.classList.contains('show');};new MutationObserver(sync).observe(details,{attributes:true,attributeFilter:['class']});sync();
const originalActive=window.setActiveSideLink;window.setActiveSideLink=id=>{originalActive(id);document.querySelectorAll('.side-menu a').forEach(a=>{if(a.dataset.section===id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});};
window.goToSection=id=>{const target=document.getElementById(id);if(!target)return;if(details.contains(target)){details.classList.add('show');toggle.classList.add('open');document.getElementById('profileToggleText').textContent='收起完整個人經歷';sync();}if(mobile.matches)drawer(false,false);if(location.hash!=='#'+id)history.pushState(null,'','#'+id);requestAnimationFrame(()=>{target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});window.setActiveSideLink(id);});};
document.querySelectorAll('.side-menu a[data-section]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();window.goToSection(a.dataset.section);}));
const restore=()=>{const id=decodeURIComponent(location.hash.slice(1));if(id&&document.getElementById(id))window.goToSection(id);};addEventListener('popstate',restore);if(location.hash)restore();
const resize=()=>{drawer(false,false);if(!mobile.matches){sidebar.inert=false;document.body.style.overflow='';}};mobile.addEventListener('change',resize);resize();
const progress=()=>backtop.classList.toggle('visible',scrollY>650);addEventListener('scroll',progress,{passive:true});progress();
})();
