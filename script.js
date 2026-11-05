/* HERO 슬라이드: 이미지·문구는 아래 HERO_SLIDES 한 곳에서 관리 (img=PC, mobile=모바일 전용(선택), pos=object-position) */
(function(){'use strict';
var HERO_SLIDES=[
 {img:'assets/images/hero-poster.webp',mobile:'assets/images/hero-mobile.webp',pos:'50% 60%',eyebrow:'JEJU FOREST BLACK TEA',title:['안개 너머,','제주의 한 잔'],sub:'제주의 빛과 바람이 머문 자리',cta:'제주 이야기 보기',href:'#jeju-story'},
 {img:'assets/images/tea-moment.webp',pos:'60% 50%',eyebrow:'THE MOMENT OF TEA',title:['제주의 자연을 담은','깊은 향기'],sub:'일상에 스며드는 따뜻한 여유',cta:'제주숲홍차 알아보기',href:'#product'},
 {img:'assets/images/gift.webp',pos:'70% 50%',eyebrow:'A GIFT FROM JEJU',title:['말로 다 전하지 못한 마음,','제주숲홍차로 전하세요.'],sub:'소중한 사람에게 전하는 따뜻한 진심',cta:'제주숲홍차 선물하기',href:'https://www.osulloc.com/kr/ko/shop/item/teashop/16358',ext:true}
];
var HOLD=7,h=document.getElementById('hero');if(!h)return;
var box=h.querySelector('.hero-slides'),bar=h.querySelector('.hc-bar'),cnt=h.querySelector('.hc-count b'),pb=h.querySelector('[data-act=pause]');
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var cur=0,user=rm,hid=document.hidden,off=false;
h.style.setProperty('--hold',HOLD+'s');
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var d=0;function dl(x){return ' style="--d:'+x+'s"'}
HERO_SLIDES.forEach(function(s,i){
 var el=document.createElement('div');el.className='hero-slide';el.setAttribute('role','group');el.setAttribute('aria-label',(i+1)+' / '+HERO_SLIDES.length);
 el.style.setProperty('--pos',s.pos||'50% 50%');
 el.innerHTML='<picture>'+(s.mobile?'<source media="(max-width:767px)" srcset="'+s.mobile+'">':'')+'<img src="'+s.img+'" alt="" '+(i?'loading="lazy"':'fetchpriority="high"')+'></picture>'+
 '<div class="hero-caption"><p class="hero-eyebrow rv-l"'+dl(.3)+'>'+esc(s.eyebrow)+'</p><h1 class="hero-title">'+
 s.title.map(function(t,k){return '<span class="hero-title-line"><span class="rv-l"'+dl(k?.8:.5)+'>'+esc(t)+'</span></span>'}).join('')+'</h1>'+
 '<p class="hero-subtitle rv-l"'+dl(1.2)+'>'+esc(s.sub)+'</p><a class="hero-cta rv-l"'+dl(1.5)+' href="'+s.href+'"'+(s.ext?' target="_blank" rel="noopener"':'')+'>'+esc(s.cta)+'</a></div>';
 var im=el.querySelector('img');im.addEventListener('error',function(){im.style.display='none'});  // 이미지 실패 시 포레스트 그린 배경 + 자막 유지
 if(i)el.querySelector('h1').outerHTML=el.querySelector('h1').outerHTML.replace(/^<h1/,'<h2').replace(/h1>$/,'h2>');
 box.appendChild(el)});
var sl=[].slice.call(box.children);
function restartBar(){bar.style.animation='none';void bar.offsetWidth;bar.style.animation=''}
function go(n,first){
 n=(n+sl.length)%sl.length;var p=sl[cur];
 if(!first&&n===cur&&!p.classList.contains('is-active'))return;
 if(!first&&p!==sl[n]){p.classList.remove('is-active');p.classList.add('is-leaving');setTimeout(function(){p.classList.remove('is-leaving')},950)}
 cur=n;sl[n].classList.remove('is-leaving');sl[n].classList.add('is-active');
 sl.forEach(function(x,k){x.setAttribute('aria-hidden',k!==n)});
 cnt.textContent=('0'+(n+1)).slice(-2);restartBar()}
function sync(){var p=user||hid||off;h.classList.toggle('paused',p);h.classList.toggle('static',rm);
 pb.setAttribute('aria-pressed',user);pb.setAttribute('aria-label',user?'자동재생 재개':'자동재생 일시정지');pb.innerHTML=user?'&#9654;':'&#10074;&#10074;'}
bar.addEventListener('animationend',function(){if(!rm&&!user&&!hid&&!off)go(cur+1)});  // 진행 바가 끝나면 다음 슬라이드
h.querySelector('.hero-controls').addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a=='prev')go(cur-1);else if(a=='next')go(cur+1);else{user=!user;sync()}});
var x0=null;h.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
h.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50)go(cur+(dx<0?1:-1))},{passive:true});
h.addEventListener('keydown',function(e){if(e.key=='ArrowLeft')go(cur-1);if(e.key=='ArrowRight')go(cur+1)});
document.addEventListener('visibilitychange',function(){hid=document.hidden;sync()});
if('IntersectionObserver'in window)new IntersectionObserver(function(e){off=!e[0].isIntersecting;sync()},{threshold:.25}).observe(h);
go(0,true);sync();
})();
(function(){'use strict';
// 카드: 모바일 터치 시 활성화
document.querySelectorAll('.card').forEach(function(c,_,all){c.addEventListener('click',function(){all.forEach(function(x){x.classList.toggle('on',x===c&&!c.classList.contains('on'))})})});
// 티타임 탭
var T=[['tea-step1','찻잎을 곱게 담아 향을 먼저 느껴보세요.'],['tea-step2','뜨거운 물을 천천히 부어 우려냅니다.'],['tea-step3','맑은 수색을 보며 한 모금 즐기세요.']];
var ti=document.getElementById('tabimg'),tt=document.getElementById('tabtxt'),tb=document.querySelectorAll('.tabs button');
function set(i){ti.src='assets/images/'+T[i][0]+'.webp';tt.textContent=T[i][1];tb.forEach(function(b,k){b.setAttribute('aria-selected',k==i)})}
if(ti){tb.forEach(function(b){b.addEventListener('click',function(){set(+b.dataset.i)})});set(0)}
// 텍스트 페이드인 + 가벼운 패럴랙스
if('IntersectionObserver'in window){var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)x.target.classList.add('in')})});document.querySelectorAll('.rv').forEach(function(n){io.observe(n)})}else document.querySelectorAll('.rv').forEach(function(n){n.classList.add('in')});
var P=[].slice.call(document.querySelectorAll('[data-par]')),tk=false;
if(!(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches))addEventListener('scroll',function(){if(tk)return;tk=true;requestAnimationFrame(function(){P.forEach(function(p){p.style.transform='translateY('+(-scrollY*p.dataset.par)+'px)'});tk=false})},{passive:true});
})();
