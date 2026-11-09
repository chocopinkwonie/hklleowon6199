(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),rnd=(a,b)=>a+Math.random()*(b-a);
const show=el=>el.classList.remove('hide'),hide=el=>el.classList.add('hide');
let ac;function beep(f=660,d=.18){try{ac=ac||new(window.AudioContext||webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.04;g.gain.exponentialRampToValueAtTime(1e-4,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
const fx=$('#fx');
function particle(x,y,ch,dx,dy,dur){if(fx.children.length>60)return;const e=document.createElement('span');e.textContent=ch;e.style.cssText=`left:${x}px;top:${y}px`;fx.appendChild(e);
const a=e.animate([{transform:'translate(-50%,-50%)',opacity:1},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${rnd(-90,90)}deg)`,opacity:0}],{duration:dur,easing:'cubic-bezier(.2,.8,.4,1)'});a.onfinish=()=>e.remove()}
function hearts(x,y,n=5){if(RM)return;for(let i=0;i<n;i++)particle(x+rnd(-20,20),y,['💗','💖','♡'][i%3],rnd(-40,40),rnd(-160,-80),1600)}
function confetti(x,y,n=24){if(RM)return;for(let i=0;i<n;i++)particle(x,y,['🎊','✨','💗','⭐','🎀'][i%5],rnd(-170,170),rnd(-200,60),1300)}
const mid=()=>[innerWidth/2,innerHeight/2];
let tt;function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),3200)}
let cur=1;
function go(n){if(n===cur)return;$('#s'+cur).classList.remove('on');cur=n;$('#s'+n).classList.add('on');scrollTo(0,0);document.body.classList.toggle('night',n===7);beep(520);if(n===7)finale()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(+b.dataset.go)});
document.addEventListener('click',e=>{if(!e.target.closest('button,.card,.nm,.star,input,.cake'))hearts(e.clientX,e.clientY,3)});
for(let i=0;i<14;i++){const s=document.createElement('span');s.className='star';s.textContent='✦';s.style.cssText=`left:${rnd(3,95)}%;top:${rnd(8,92)}%;font-size:${rnd(10,20)}px;animation-delay:${rnd(0,3)}s`;s.onclick=()=>{s.classList.add('glow');toast(C.stars[Math.floor(rnd(0,C.stars.length))]);setTimeout(()=>s.classList.remove('glow'),1500)};$('#bg').appendChild(s)}
$('#moon').onclick=()=>toast(C.moon);
let nc=0;document.addEventListener('click',e=>{if(e.target.closest('.nm')&&++nc===5){toast(C.secret);confetti(...mid());nc=0}});
const P=n=>`assets/images/p${n}.jpg`;
Object.entries(C.scr).forEach(([s,ids])=>{const w=document.createElement('div');w.className='pols';ids.forEach((n,k)=>{const b=document.createElement('button');b.className='pol';b.style.cssText=`--r:${k?5:-5}deg;--d:${k*.7}s`;b.setAttribute('aria-label','Ảnh: '+C.cap[n]);b.innerHTML=`<i class="tape"></i><img src="${P(n)}" alt="Ảnh hai bạn chụp chung" loading="lazy" decoding="async"><span></span>`;b.lastChild.textContent=C.cap[n];b.onclick=()=>{b.classList.remove('wig');void b.offsetWidth;b.classList.add('wig');const r=b.getBoundingClientRect();hearts(r.left+r.width/2,r.top,5);beep(800);toast(C.pt[Math.floor(rnd(0,C.pt.length))])};w.appendChild(b)});$('#s'+s).prepend(w)});
let opening=false;
async function openEnv(){if(opening)return;opening=true;const env=$('#env');env.classList.add('shake');beep(440);await sleep(600);env.classList.add('open');beep(700);const r=env.getBoundingClientRect();hearts(r.left+r.width/2,r.top,8);await sleep(1300);go(2)}
$('#env').onclick=openEnv;$('#open1').onclick=openEnv;
C.moods.forEach(([em,lb,msg],i)=>{const b=document.createElement('button');b.className='mood';b.innerHTML=`<span>${em}</span>${lb}`;b.onclick=()=>{$$('.mood').forEach(m=>m.classList.remove('sel'));b.classList.add('sel');$('#moods').classList.add('picked');$('#bubble').textContent=msg;show($('#bubble'));show($('#n2'));beep(600+i*80)};$('#moods').appendChild(b)});
let lit=3;
$('#cake').onclick=e=>confetti(e.clientX,e.clientY,10);
$$('.candle').forEach(c=>c.onclick=e=>{e.stopPropagation();if(c.classList.contains('out'))return;c.classList.add('out');beep(300);if(--lit===0){beep(880,.4);confetti(...mid(),40);$('#cake').classList.add('glow');show($('#wish'))}});
const opened=new Set();
C.gifts.forEach(([t,x,col],i)=>{const g=document.createElement('button');g.className='gift';g.style.setProperty('--c',col);g.setAttribute('aria-label','Mở quà: '+t);g.innerHTML='<i class="gl"></i><i class="gb"></i>';
g.onclick=()=>{if(!opened.has(i)){opened.add(i);g.classList.add('open');beep(760);const r=g.getBoundingClientRect();confetti(r.left+r.width/2,r.top,18)}$('#gt').textContent=t;$('#gx').textContent=x;show($('#gc'));$('#gclose').focus()};$('#gifts').appendChild(g)});
$('#gclose').onclick=()=>{hide($('#gc'));if(opened.size===3)show($('#giftsdone'))};
let bag=[],last='',count=0;
$('#tell').onclick=()=>{if(!bag.length){bag=[...C.compliments].sort(()=>Math.random()-.5);if(bag[bag.length-1]===last&&bag.length>1)bag.unshift(bag.pop())}
last=bag.pop();const c=document.createElement('div');c.className='cc';c.innerHTML=`<img src="${P(Math.floor(rnd(1,11)))}" alt="" loading="lazy">`;const sp=document.createElement('span');sp.textContent=last;c.appendChild(sp);c.style.setProperty('--r',rnd(-3,3)+'deg');const box=$('#cards');box.prepend(c);while(box.children.length>3)box.lastChild.remove();
const r=$('#tell').getBoundingClientRect();hearts(r.left+r.width/2,r.top);beep(700);if(++count>=5)show($('#more'))};
const L=$('#letter');C.letter.forEach((t,i)=>{const p=document.createElement('p');p.textContent=t;p.style.animationDelay=(RM?0:i*1.1)+'s';L.appendChild(p)});
$('#openL').onclick=()=>{hide($('#pre'));show(L);show($('#closeL'));hide($('#lastBtn'));L.scrollTop=0;beep(500)};
$('#closeL').onclick=()=>{hide(L);hide($('#closeL'));show($('#lastBtn'))};
let ran=false;
async function finale(){if(ran)return;ran=true;const box=$('#lines');for(let n=1;n<=10;n++){const d=document.createElement('img');d.src=P(n);d.alt='';d.className='dr';d.style.cssText=`--x:${rnd(2,85)}%;--r:${rnd(-12,12)}deg;--d:${-n*1.6}s`;$('#bg').appendChild(d)}
for(const t of C.last){box.innerHTML='';const p=document.createElement('p');p.textContent=t;box.appendChild(p);await sleep(1700)}
hide(box);show($('#final'));beep(880,.5);
setInterval(()=>{if(cur===7)confetti(rnd(40,innerWidth-40),rnd(60,innerHeight*.5),10)},1800);
for(let i=0;i<8;i++)setTimeout(()=>hearts(rnd(40,innerWidth-40),innerHeight-20,2),i*400)}
$('#replay').onclick=()=>location.reload();
let sending=false;$('#heart').onclick=async()=>{if(sending)return;sending=true;const h=document.createElement('div');h.className='bigheart';h.textContent='💗';document.body.appendChild(h);toast(C.sent);beep(900,.5);await sleep(2200);h.remove();sending=false};
const au=new Audio('assets/music/birthday.mp3');au.loop=true;au.volume=.4;let on=false;
$('#vol').oninput=e=>au.volume=e.target.value;
$('#music').onclick=()=>{const b=$('#music');if(on){au.pause();on=false}else{au.play().then(()=>{on=true;b.textContent='♪ Nhạc: BẬT';b.setAttribute('aria-pressed','true')}).catch(()=>toast('Thêm bài hát vào assets/music/birthday.mp3 để nghe nhạc nha ♡'));return}b.textContent='♪ Nhạc: TẮT';b.setAttribute('aria-pressed','false')};
})();
