/* DB is loaded globally from db.js (plain script, no ES modules) */

const state = {
  lang: 'en',
  gender: null,
  name: '',
  userId: null,
  photo: null,
  referredBy: null,
  journeyIndex: 0,
  journeyAnswers: [],
  returnScreen: 'screen-hero',
};

/* ---------------- i18n ---------------- */
const I18N = {
  en:{
    loading:"gathering rose petals…",
    heroEyebrow:"International Girlfriend Day · Aug 1",
    heroSub:"A little journey. A big celebration. Made for someone who deserves it.",
    begin:"Begin the story →",
    days:"days",hours:"hrs",mins:"min",secs:"sec",
    live:"live now",stories:"joined",yeses:"yeses said",
    whoAskEyebrow:"One quick thing",whoAsk:"Who are you?",girl:"Girl",boy:"Boy",
    entryEyebrow:"How did you get here?",entryTitle:"Choose how to begin",
    entryReceived:"❤️ I received this link from someone",entryOwn:"✨ I want my own invitation",
    referralEyebrow:"Give credit where it's due",referralAsk:"Who sent you this?",
    referralPlaceholder:"Their name",continue:"Continue",
    nameEyebrow:"This story is yours",nameAsk:"What's your name?",namePlaceholder:"Type your name",
    photoEyebrow:"Optional",photoAsk:"Add a photo?",photoNote:"Stays on this device only. Totally skippable.",skip:"Skip",
    finalEyebrow:"The question",proposalTitle:"Will you be my girlfriend?",
    yesBtn:"❤️ Yes",thinkingBtn:"🙈 Thinking",runBtn:"🏃 Run Away",
    celebrateTitle:"She said yes ❤️",celebrateSub:"Happy Girlfriend Day. Here's to your story.",
    makeCard:"Create my share card",explore:"Explore more",
    shareTitle:"Your card is ready",download:"Download",copyLink:"Copy my invite link",
    boyAsk:"Today is Girlfriend Day ❤️. Are you single?",single:"Yes 😔",taken:"No 😎",
    takenTitle:"Lucky her.",takenSub:"Tag her and make today about her, not this website.",
    wishEyebrow:"Just for you",wishTitle:"Write it down.",
    wishNote:"This stays private — it's not posted publicly or sent to anyone.",
    wishPlaceholder:"What are you hoping for this year?",wishSubmit:"Seal it",
    lbTitle:"Leaderboard",tabInvited:"Most Invitations",tabViral:"Most Shared",tabLoved:"Most Loved",
    lbActivity:"Recent activity",backHome:"Back",
    pInvites:"invitations",pShares:"shares",pHearts:"hearts",pAchievements:"Achievements",
    exploreTitle:"Explore Girlfriend Day",
    mfFortune:"Love Fortune",mfWheel:"Spin the Love Wheel",mfCompliment:"Compliment Generator",
    mfGarden:"Virtual Rose Garden",mfQuiz:"Compatibility Quiz",mfLetters:"Secret Love Letters",
  },
  hi:{
    loading:"gulab ki pankhuriyan jama ho rahi hain…",
    heroEyebrow:"International Girlfriend Day · Aug 1",
    heroSub:"Ek chhota sa safar. Ek bada celebration. Kisi khaas ke liye banaya gaya.",
    begin:"Kahani shuru karo →",
    days:"din",hours:"ghante",mins:"min",secs:"sec",
    live:"abhi live",stories:"joined",yeses:"yes bole gaye",
    whoAskEyebrow:"Ek chhoti si baat",whoAsk:"Aap kaun ho?",girl:"Ladki",boy:"Ladka",
    entryEyebrow:"Yahan kaise pahunche?",entryTitle:"Shuru kaise karna hai?",
    entryReceived:"❤️ Mujhe yeh link kisi ne bheja",entryOwn:"✨ Mujhe apna invitation chahiye",
    referralEyebrow:"Credit toh banta hai",referralAsk:"Kisne bheja tumhe yeh?",
    referralPlaceholder:"Unka naam",continue:"Aage badho",
    nameEyebrow:"Yeh kahani tumhari hai",nameAsk:"Tumhara naam kya hai?",namePlaceholder:"Apna naam likho",
    photoEyebrow:"Optional",photoAsk:"Photo dogi?",photoNote:"Sirf isi device pe rahegi. Skip bhi kar sakti ho.",skip:"Skip",
    finalEyebrow:"Woh sawaal",proposalTitle:"Kya tum meri girlfriend banogi?",
    yesBtn:"❤️ Haan",thinkingBtn:"🙈 Sochungi",runBtn:"🏃 Bhaag jao",
    celebrateTitle:"Usne haan bola ❤️",celebrateSub:"Happy Girlfriend Day. Yeh kahani tumhari hai.",
    makeCard:"Share card banao",explore:"Aur explore karo",
    shareTitle:"Tumhara card ready hai",download:"Download karo",copyLink:"Apna invite link copy karo",
    boyAsk:"Aaj Girlfriend Day hai ❤️. Kya tum single ho?",single:"Haan 😔",taken:"Nahi 😎",
    takenTitle:"Lucky hai woh.",takenSub:"Usko tag karo, aaj uska din hai, is website ka nahi.",
    wishEyebrow:"Sirf tumhare liye",wishTitle:"Likh do.",
    wishNote:"Yeh private rahega — kahin publicly post nahi hoga.",
    wishPlaceholder:"Is saal kya chahte ho?",wishSubmit:"Seal karo",
    lbTitle:"Leaderboard",tabInvited:"Sabse zyada invite",tabViral:"Sabse zyada share",tabLoved:"Sabse loved",
    lbActivity:"Recent activity",backHome:"Wapas",
    pInvites:"invitations",pShares:"shares",pHearts:"hearts",pAchievements:"Achievements",
    exploreTitle:"Girlfriend Day explore karo",
    mfFortune:"Love Fortune",mfWheel:"Love Wheel spin karo",mfCompliment:"Compliment Generator",
    mfGarden:"Virtual Rose Garden",mfQuiz:"Compatibility Quiz",mfLetters:"Secret Love Letters",
  }
};
function t(key){ return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key; }
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{ el.placeholder = t(el.dataset.i18nPlaceholder); });
}

/* ---------------- screen navigation ---------------- */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ---------------- constellation background ---------------- */
(function constellation(){
  const canvas = document.getElementById('constellation');
  const ctx = canvas.getContext('2d');
  let w,h,points=[];
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(60, Math.floor((w*h)/22000));
    points = Array.from({length:count},()=>({
      x:Math.random()*w, y:Math.random()*h,
      vx:(Math.random()-.5)*.15, vy:(Math.random()-.5)*.15,
      r:Math.random()*1.6+.6
    }));
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(255,93,143,0.55)';
    points.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1;
      if(p.y<0||p.y>h)p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    });
    ctx.strokeStyle = 'rgba(255,93,143,0.12)';
    for(let i=0;i<points.length;i++){
      for(let j=i+1;j<points.length;j++){
        const dx=points[i].x-points[j].x, dy=points[i].y-points[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<110){
          ctx.globalAlpha = 1-dist/110;
          ctx.beginPath(); ctx.moveTo(points[i].x,points[i].y); ctx.lineTo(points[j].x,points[j].y); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(step);
  }
  window.addEventListener('resize', resize);
  resize(); step();
})();

/* ---------------- falling petals ---------------- */
function spawnPetals(count=16){
  const wrap = document.getElementById('petals');
  const glyphs = ['🌸','🌹','✨','💗'];
  for(let i=0;i<count;i++){
    const el = document.createElement('span');
    el.className='petal';
    el.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
    el.style.left = Math.random()*100+'vw';
    el.style.animationDuration = (6+Math.random()*6)+'s';
    el.style.animationDelay = (Math.random()*4)+'s';
    el.style.fontSize = (12+Math.random()*14)+'px';
    wrap.appendChild(el);
  }
}
spawnPetals(16);

/* ---------------- typewriter ---------------- */
function typewriter(el, text, speed=55){
  el.textContent='';
  let i=0;
  (function tick(){
    if(i<=text.length){ el.textContent = text.slice(0,i); i++; setTimeout(tick,speed); }
  })();
}

/* ---------------- Girlfriend Day date logic (Aug 1, recurring) ---------------- */
function nextGirlfriendDay(){
  const now = new Date();
  const year = now.getMonth()===7 && now.getDate()>1 ? now.getFullYear()+1 : now.getFullYear();
  return new Date(`${year}-08-01T00:00:00`);
}
function isGirlfriendDayToday(){
  const now = new Date();
  return now.getMonth()===7 && now.getDate()===1; // August is month index 7
}
function startCountdownAndBanner(){
  const banner = document.getElementById('celebrationBanner');
  const box = document.getElementById('countdown');
  function tick(){
    if(isGirlfriendDayToday()){
      box.classList.add('hidden');
      banner.classList.add('live');
      banner.textContent = state.lang==='hi'
        ? '🎉 Aaj Girlfriend Day hai! Happy Girlfriend Day 2026 ❤️'
        : '🎉 Today is Girlfriend Day! Happy Girlfriend Day 2026 ❤️';
      return;
    }
    box.classList.remove('hidden');
    banner.classList.remove('live');
    banner.textContent = state.lang==='hi' ? '✨ Girlfriend Day 2026 ka countdown' : '✨ Counting down to Girlfriend Day 2026';
    const target = nextGirlfriendDay();
    let diff = Math.max(0, target - new Date());
    const d = Math.floor(diff/86400000); diff-=d*86400000;
    const h = Math.floor(diff/3600000); diff-=h*3600000;
    const m = Math.floor(diff/60000); diff-=m*60000;
    const s = Math.floor(diff/1000);
    document.getElementById('cdDays').textContent = String(d).padStart(2,'0');
    document.getElementById('cdHours').textContent = String(h).padStart(2,'0');
    document.getElementById('cdMins').textContent = String(m).padStart(2,'0');
    document.getElementById('cdSecs').textContent = String(s).padStart(2,'0');
  }
  tick(); setInterval(tick,1000);
}

/* ---------------- stats + activity ticker ---------------- */
async function initStats(){
  await DB.bumpCounter('visitors',1);
  const c = await DB.getCounters();
  document.getElementById('liveVisitors').textContent = c.visitors ?? 1;
  document.getElementById('totalStories').textContent = c.stories ?? 0;
  document.getElementById('totalYes').textContent = c.yeses ?? 0;
  refreshActivityTicker();
  setInterval(refreshActivityTicker, 8000);
}
async function refreshActivityTicker(){
  const list = await DB.listActivity(6);
  const el = document.getElementById('activityTicker');
  if(!list.length){ el.textContent=''; return; }
  const lines = list.map(activityLine);
  let i=0;
  el.textContent = lines[0];
  clearInterval(el._t);
  el._t = setInterval(()=>{ i=(i+1)%lines.length; el.textContent = lines[i]; }, 3000);
}
function activityLine(a){
  if(a.type==='joined') return (state.lang==='hi'?`${a.name} ne join kiya ✨`:`${a.name} just joined ✨`);
  if(a.type==='referred') return (state.lang==='hi'?`${a.detail}, ${a.name} ke through aayi ❤️`:`${a.detail} joined via ${a.name} ❤️`);
  if(a.type==='yes') return (state.lang==='hi'?`${a.name} ne haan bola 💖`:`${a.name} said yes 💖`);
  if(a.type==='shared') return (state.lang==='hi'?`${a.name} ne apna card share kiya 🔥`:`${a.name} shared their card 🔥`);
  return '';
}

/* ---------------- DB mode banner ---------------- */
function showDbModeBanner(){
  if(DB.mode==='local'){
    const el = document.getElementById('dbModeBanner');
    el.classList.remove('hidden');
    el.textContent = 'Local demo mode — leaderboard & referrals are saved on this browser only. Add a Firebase config for real shared data.';
  }
}

/* ---------------- journey ---------------- */
const JOURNEY = {
  en:[
    {q:"Do you believe in destiny?", opts:["❤️ Yes","💖 Maybe","💔 Not really"], line:"Some things really are written."},
    {q:"What matters more — words or actions?", opts:["🗣️ Words","🤲 Actions","✨ Both"], line:"Noted, and remembered."},
    {q:"Pick a vibe for tonight.", opts:["🌙 Quiet & cozy","🎶 Music & dancing","🌹 Something romantic"], line:"Good taste."},
  ],
  hi:[
    {q:"Kya tum destiny mein believe karti ho?", opts:["❤️ Haan","💖 Shayad","💔 Nahi"], line:"Kuch cheezein sach mein likhi hoti hain."},
    {q:"Zyada important kya hai — baatein ya actions?", opts:["🗣️ Baatein","🤲 Actions","✨ Dono"], line:"Note kar liya."},
    {q:"Aaj raat ka vibe choose karo.", opts:["🌙 Shaant","🎶 Gaana & dance","🌹 Kuch romantic"], line:"Achha taste hai."},
  ]
};
function renderJourney(){
  const list = JOURNEY[state.lang] || JOURNEY.en;
  const step = list[state.journeyIndex];
  const card = document.getElementById('journeyCard');
  const pct = Math.round((state.journeyIndex/list.length)*100);
  document.getElementById('journeyProgress').style.width = pct+'%';
  if(!step){
    document.getElementById('journeyProgress').style.width = '100%';
    showScreen('screen-proposal');
    return;
  }
  card.innerHTML = `
    <p class="eyebrow">Chapter ${state.journeyIndex+1}</p>
    <h1 class="display-lg">${step.q}</h1>
    <div class="choice-grid two" id="journeyOpts"></div>
  `;
  const wrap = document.getElementById('journeyOpts');
  step.opts.forEach(opt=>{
    const b = document.createElement('button');
    b.className='choice-btn';
    b.textContent = opt;
    b.onclick = ()=>{
      state.journeyAnswers.push(opt);
      card.innerHTML = `<p class="hero-sub" style="margin-top:40px">${step.line}</p>`;
      spawnHeartBurst();
      setTimeout(()=>{ state.journeyIndex++; renderJourney(); }, 900);
    };
    wrap.appendChild(b);
  });
}

/* ---------------- FX ---------------- */
function spawnHeartBurst(n=14){
  for(let i=0;i<n;i++){
    const el = document.createElement('div');
    el.style.position='fixed'; el.style.zIndex=50; el.style.pointerEvents='none';
    el.textContent='❤';
    el.style.left = (45+Math.random()*10)+'vw';
    el.style.top = '50vh';
    el.style.fontSize = (14+Math.random()*20)+'px';
    el.style.color = Math.random()>.5 ? '#ff5d8f' : '#ffd873';
    el.style.transition = 'transform 1.1s ease, opacity 1.1s ease';
    document.body.appendChild(el);
    requestAnimationFrame(()=>{
      const dx = (Math.random()-.5)*300;
      const dy = -200-Math.random()*200;
      el.style.transform = `translate(${dx}px,${dy}px) rotate(${(Math.random()-.5)*180}deg)`;
      el.style.opacity='0';
    });
    setTimeout(()=>el.remove(),1200);
  }
}
function spawnConfetti(n=70){
  const colors=['#ff5d8f','#ffd873','#c084fc','#7dd3fc'];
  for(let i=0;i<n;i++){
    const el=document.createElement('div');
    el.style.position='fixed'; el.style.zIndex=50; el.style.pointerEvents='none';
    el.style.left = Math.random()*100+'vw';
    el.style.top='-5vh';
    el.style.width='8px'; el.style.height='14px';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.transition = `transform ${2+Math.random()*2}s linear, opacity 3s ease`;
    document.body.appendChild(el);
    requestAnimationFrame(()=>{
      el.style.transform = `translateY(110vh) rotate(${360+Math.random()*360}deg)`;
      el.style.opacity='.2';
    });
    setTimeout(()=>el.remove(), 4200);
  }
}

/* ---------------- run-away dodge button ---------------- */
const runLines = {
  en:["Nice try 😂","Not that easy!","Caught you!","...okay maybe ❤️"],
  hi:["Koshish achi thi 😂","Itna aasan nahi!","Pakda gaye!","...chalo maybe ❤️"]
};
let dodgeCount=0;
function dodgeRunBtn(){
  const btn = document.getElementById('runBtn');
  const caption = document.getElementById('dodgeCaption');
  dodgeCount++;
  const rect = btn.getBoundingClientRect();
  const parentRect = btn.parentElement.getBoundingClientRect();
  const maxX = parentRect.width - rect.width;
  const tx = (Math.random()-.5)*Math.min(160, maxX);
  const ty = (Math.random()-.5)*40;
  const scale = dodgeCount>3 ? Math.max(0.5, 1-dodgeCount*0.08) : 1;
  const rotate = (Math.random()-.5)*30;
  btn.style.transform = `translate(${tx}px,${ty}px) rotate(${rotate}deg) scale(${scale})`;
  const lines = runLines[state.lang]||runLines.en;
  caption.textContent = lines[Math.min(dodgeCount-1, lines.length-1)];
  if(dodgeCount>=5){
    btn.textContent = state.lang==='hi' ? '❤️ Shayad' : '❤️ Maybe';
    btn.onclick = ()=>handleYes();
  }
}

/* ---------------- achievements ---------------- */
const BADGE_DEFS = [
  {id:'bloom', min:0, en:'First Bloom', hi:'First Bloom'},
  {id:'cupid', field:'referrals', min:3, en:"Cupid's Messenger", hi:"Cupid ka Doot"},
  {id:'collector', field:'hearts', min:10, en:'Heart Collector', hi:'Heart Collector'},
  {id:'trend', field:'shares', min:5, en:'Trendsetter', hi:'Trendsetter'},
];
function renderBadges(container, user){
  container.innerHTML='';
  BADGE_DEFS.forEach(b=>{
    const val = b.field ? (user?.[b.field]||0) : 1;
    const unlocked = val >= b.min;
    const span = document.createElement('span');
    span.className = 'badge' + (unlocked?'':' locked');
    span.textContent = (unlocked?'✓ ':'🔒 ') + (state.lang==='hi'?b.hi:b.en);
    container.appendChild(span);
  });
}

/* ---------------- proposal -> yes ---------------- */
async function handleYes(){
  if(state.userId){
    await DB.saveUser(state.userId, {completed:true});
    await DB.addActivity({type:'yes', name: state.name});
  }
  await DB.bumpCounter('yeses',1);
  const letter = document.getElementById('loveLetter');
  const lines = {
    en:`Dear ${state.name || 'you'},\n\nHowever this year unfolds, I hope it's kind to you.\nHappy Girlfriend Day. This one's yours.`,
    hi:`Pyaari ${state.name || 'tum'},\n\nYeh saal jaisa bhi ho, tumhare liye accha ho.\nHappy Girlfriend Day. Yeh kahani tumhari hai.`
  };
  letter.style.whiteSpace='pre-line';
  letter.textContent = lines[state.lang]||lines.en;

  const user = state.userId ? await DB.getUser(state.userId) : null;
  renderBadges(document.getElementById('unlockBadges'), user);

  showScreen('screen-celebration');
  spawnConfetti(70);
  spawnHeartBurst(20);
}

/* ---------------- invite link helpers ---------------- */
function myInviteLink(){
  const url = new URL(window.location.href);
  url.search='';
  url.searchParams.set('invite', state.name || 'friend');
  return url.toString();
}

/* ---------------- share card ---------------- */
function drawShareCard(){
  const canvas = document.getElementById('shareCanvas');
  const ctx = canvas.getContext('2d');
  const w=canvas.width, h=canvas.height;
  const grad = ctx.createLinearGradient(0,0,0,h);
  grad.addColorStop(0,'#1b1130'); grad.addColorStop(1,'#0b0714');
  ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
  ctx.fillStyle='rgba(255,255,255,0.06)';
  roundRect(ctx,40,60,w-80,h-120,28); ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.15)'; ctx.lineWidth=1;
  roundRect(ctx,40,60,w-80,h-120,28); ctx.stroke();
  ctx.fillStyle='#ff5d8f'; ctx.font='14px monospace'; ctx.textAlign='center';
  ctx.fillText('INTERNATIONAL GIRLFRIEND DAY · 2026', w/2, 120);
  ctx.fillStyle='#f5eef7'; ctx.font='italic 42px Georgia';
  ctx.fillText(state.name ? `${state.name} said` : 'She said', w/2, 340);
  ctx.font='700 64px Georgia'; ctx.fillStyle='#ffd873';
  ctx.fillText('YES ❤️', w/2, 410);
  ctx.fillStyle='#b6a3c7'; ctx.font='16px sans-serif';
  ctx.fillText('someday · by @sourya791m', w/2, h-100);
  ctx.fillStyle='#ff5d8f'; ctx.font='24px serif';
  ctx.fillText('❤', 70, 100);
  ctx.fillText('❤', w-70, h-70);
}
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}

/* ---------------- leaderboard ---------------- */
async function renderLeaderboard(field='referrals'){
  const list = await DB.listUsers(field, 20);
  const ol = document.getElementById('lbList');
  const empty = document.getElementById('lbEmptyHint');
  ol.innerHTML='';
  if(!list.length){
    empty.textContent = state.lang==='hi' ? 'Abhi tak koi participant nahi — pehla tum bano!' : 'No participants yet — be the first!';
    return;
  }
  empty.textContent='';
  const labels = {referrals:'invites', shares:'shares', hearts:'hearts'};
  list.forEach((row,i)=>{
    const li=document.createElement('li');
    li.innerHTML = `<span class="rank">#${i+1}</span><span class="lb-name">${escapeHtml(row.name||'—')}</span><span>${row[field]||0} ${labels[field]}</span>`;
    ol.appendChild(li);
  });
  const list2 = await DB.listActivity(15);
  const al = document.getElementById('activityList');
  al.innerHTML='';
  list2.forEach(a=>{
    const li=document.createElement('li');
    li.innerHTML = activityLine(a).replace(/^(\S+)/, '<b>$1</b>');
    al.appendChild(li);
  });
}
function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s??''; return d.innerHTML; }

/* ---------------- profile ---------------- */
async function renderProfile(){
  const nameEl = document.getElementById('profileName');
  if(!state.userId){
    nameEl.textContent = state.lang==='hi' ? 'Abhi tak start nahi kiya' : "You haven't started yet";
    document.getElementById('profileJoined').textContent='';
    document.getElementById('profileReferrals').textContent='0';
    document.getElementById('profileShares').textContent='0';
    document.getElementById('profileHearts').textContent='0';
    document.getElementById('profileBadges').innerHTML='';
    document.getElementById('profileInviteLink').textContent='';
    return;
  }
  const user = await DB.getUser(state.userId);
  nameEl.textContent = user?.name || state.name;
  document.getElementById('profileJoined').textContent = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString() : '';
  document.getElementById('profileReferrals').textContent = user?.referrals||0;
  document.getElementById('profileShares').textContent = user?.shares||0;
  document.getElementById('profileHearts').textContent = user?.hearts||0;
  renderBadges(document.getElementById('profileBadges'), user);
  document.getElementById('profileInviteLink').textContent = myInviteLink();
  const photoWrap = document.getElementById('profilePhoto').parentElement;
  if(state.photo){
    document.getElementById('profilePhoto').src = state.photo;
    photoWrap.classList.add('has-img');
  } else {
    photoWrap.classList.remove('has-img');
  }
}

/* ---------------- explore hub / mini-features ---------------- */
const FORTUNES = {
  en:["Someone new will make this year interesting.","A conversation you're avoiding will turn out well.","Your patience is about to pay off.","A small coincidence will feel bigger than it is — enjoy it.","Good things are closer than they look."],
  hi:["Koi naya insaan is saal ko interesting banayega.","Jo baat tum avoid kar rahe ho, achhi jayegi.","Tumhara sabr jald rang layega.","Ek chhoti si coincidence badi lagegi — enjoy karo.","Achhi cheezein jitni lagti hain, usse kareeb hain."]
};
const COMPLIMENTS = {
  en:["You make ordinary days feel a little more special.","Your energy is genuinely rare.","Anyone would be lucky to know you.","You notice things most people miss — that's a gift.","You have impeccable timing, even when you don't realize it."],
  hi:["Tum normal din bhi khaas bana dete ho.","Tumhari energy sach mein rare hai.","Jo bhi tumhe jaanta hai woh lucky hai.","Tum wo cheezein notice karte ho jo baaki miss kar dete hain.","Tumhara timing kamaal ka hai, chahe pata na ho."]
};
const LETTERS = {
  en:["To whoever reads this: you are exactly on time, not late, not early.","Someone out there thinks about you more than you know.","This is your reminder that you're allowed to want good things."],
  hi:["Jo bhi yeh padh raha hai: tum bilkul sahi waqt pe ho.","Koi tumhare baare mein sochta hai, jitna tumhe pata bhi nahi.","Yeh yaad dilana hai ki tumhe achhi cheezein chahne ka haq hai."]
};
const WHEEL_OUTCOMES = {
  en:["A sweet surprise this week 🎁","Good news is coming 📬","Someone is thinking of you 💭","A lucky coincidence ✨","A great conversation ahead 💬","Extra luck in love today 🍀"],
  hi:["Is hafte ek meethi surprise 🎁","Achhi khabar aa rahi hai 📬","Koi tumhe soch raha hai 💭","Ek lucky coincidence ✨","Aage ek achhi baat-cheet 💬","Aaj love mein extra luck 🍀"]
};
const QUIZ = {
  en:[
    {q:"Ideal weekend?", opts:["Adventure outdoors","Cozy at home","Trying new food"]},
    {q:"Texting style?", opts:["Fast replier","Slow but thoughtful","Voice notes only"]},
    {q:"Love language?", opts:["Words","Quality time","Small gifts"]},
  ],
  hi:[
    {q:"Ideal weekend?", opts:["Outdoor adventure","Ghar pe cozy","Naya khana try karna"]},
    {q:"Texting style?", opts:["Fast reply","Slow but thoughtful","Sirf voice notes"]},
    {q:"Love language?", opts:["Words","Quality time","Chhoti gifts"]},
  ]
};

function mfRandom(list){ return list[Math.floor(Math.random()*list.length)]; }

function openMiniFeature(kind){
  document.getElementById('mfGrid').classList.add('hidden');
  const panel = document.getElementById('mfPanel');
  panel.classList.remove('hidden');

  if(kind==='fortune' || kind==='letters'){
    const bank = kind==='fortune' ? FORTUNES[state.lang]||FORTUNES.en : LETTERS[state.lang]||LETTERS.en;
    const render = ()=>{
      panel.innerHTML = `<p class="letter" style="margin:0 0 16px">${mfRandom(bank)}</p>
        <div class="btn-row"><button class="ghost-btn" id="mfAgain">${state.lang==='hi'?'Aur dikhao':'Reveal another'}</button>
        <button class="ghost-btn" id="mfClose">${t('backHome')}</button></div>`;
      document.getElementById('mfAgain').onclick = render;
      document.getElementById('mfClose').onclick = closeMiniFeature;
    };
    render();
    return;
  }

  if(kind==='compliment'){
    const bank = COMPLIMENTS[state.lang]||COMPLIMENTS.en;
    const render = ()=>{
      panel.innerHTML = `<p class="letter" style="margin:0 0 16px">${mfRandom(bank)}</p>
        <div class="btn-row"><button class="cta-btn" id="mfAgain">${state.lang==='hi'?'Ek aur':'Another one'}</button>
        <button class="ghost-btn" id="mfClose">${t('backHome')}</button></div>`;
      document.getElementById('mfAgain').onclick = render;
      document.getElementById('mfClose').onclick = closeMiniFeature;
    };
    render();
    return;
  }

  if(kind==='wheel'){
    panel.innerHTML = `<div class="love-wheel" id="loveWheel"></div>
      <p class="field-hint" id="wheelResult">&nbsp;</p>
      <div class="btn-row"><button class="cta-btn" id="mfSpin">${state.lang==='hi'?'Spin karo':'Spin the wheel'}</button>
      <button class="ghost-btn" id="mfClose">${t('backHome')}</button></div>`;
    document.getElementById('mfClose').onclick = closeMiniFeature;
    document.getElementById('mfSpin').onclick = ()=>{
      const wheel = document.getElementById('loveWheel');
      const spins = 4*360 + Math.floor(Math.random()*360);
      wheel.style.transform = `rotate(${spins}deg)`;
      document.getElementById('wheelResult').textContent = state.lang==='hi' ? 'Ghoom raha hai…' : 'Spinning…';
      setTimeout(()=>{
        document.getElementById('wheelResult').textContent = mfRandom(WHEEL_OUTCOMES[state.lang]||WHEEL_OUTCOMES.en);
        if(state.userId) DB.incrementField(state.userId,'hearts',1);
      }, 3000);
    };
    return;
  }

  if(kind==='garden'){
    const count = Number(localStorage.getItem('gfday_garden_count')||0);
    const render = (n)=>{
      panel.innerHTML = `<div class="garden-plot" id="gardenPlot">${'🌹'.repeat(Math.min(n,30))}</div>
        <p class="field-hint">${n} ${state.lang==='hi'?'gulab lagaye gaye':'roses planted'}</p>
        <div class="btn-row"><button class="cta-btn" id="mfPlant">${state.lang==='hi'?'Gulab lagao':'Plant a rose'}</button>
        <button class="ghost-btn" id="mfClose">${t('backHome')}</button></div>`;
      document.getElementById('mfClose').onclick = closeMiniFeature;
      document.getElementById('mfPlant').onclick = ()=>{
        const next = n+1;
        localStorage.setItem('gfday_garden_count', next);
        if(state.userId) DB.incrementField(state.userId,'hearts',1);
        spawnHeartBurst(4);
        render(next);
      };
    };
    render(count);
    return;
  }

  if(kind==='quiz'){
    let step=0; let score=0;
    const questions = QUIZ[state.lang]||QUIZ.en;
    const renderQ = ()=>{
      if(step>=questions.length){
        const pct = 70 + Math.min(29, score*7 + Math.floor(Math.random()*10));
        panel.innerHTML = `<h2 class="display-lg" style="margin-bottom:8px">${pct}%</h2>
          <p class="hero-sub small">${state.lang==='hi'?'Compatibility score':'Compatibility score'}</p>
          <div class="btn-row"><button class="ghost-btn" id="mfClose">${t('backHome')}</button></div>`;
        document.getElementById('mfClose').onclick = closeMiniFeature;
        return;
      }
      const q = questions[step];
      panel.innerHTML = `<p class="eyebrow">Q${step+1}/${questions.length}</p>
        <h2 class="display-lg" style="font-size:1.3rem">${q.q}</h2>
        <div class="choice-grid one" id="quizOpts"></div>`;
      const wrap = document.getElementById('quizOpts');
      q.opts.forEach((opt,i)=>{
        const b = document.createElement('button');
        b.className='choice-btn wide';
        b.textContent = opt;
        b.onclick = ()=>{ score += i; step++; renderQ(); };
        wrap.appendChild(b);
      });
    };
    renderQ();
    return;
  }
}
function closeMiniFeature(){
  document.getElementById('mfPanel').classList.add('hidden');
  document.getElementById('mfPanel').innerHTML='';
  document.getElementById('mfGrid').classList.remove('hidden');
}

/* ---------------- owner dashboard ---------------- */
function ownerUnlocked(){
  const params = new URLSearchParams(window.location.search);
  return params.get('owner') === 'sourya791mowner';
}
async function renderOwnerStats(){
  const [users, wishes] = await Promise.all([DB.listUsers('referrals',1000), DB.listWishes(1000)]);
  document.getElementById('ownerStats').innerHTML = `
    <div class="stat"><span>${users.length}</span><label>users</label></div>
    <div class="stat"><span>${wishes.length}</span><label>wishes</label></div>
    <div class="stat"><span>${DB.mode}</span><label>DB mode</label></div>`;
}
async function renderOwnerTab(tab){
  const list = document.getElementById('ownerList');
  list.innerHTML = '';
  if(tab==='users'){
    const users = await DB.listUsers('referrals',100);
    users.forEach((u,i)=>{
      const li=document.createElement('li');
      li.innerHTML = `<span class="rank">#${i+1}</span><span class="lb-name">${escapeHtml(u.name)}</span><span>${u.referrals||0}/${u.shares||0}/${u.hearts||0}</span>`;
      list.appendChild(li);
    });
  } else if(tab==='wishes'){
    const wishes = await DB.listWishes(100);
    wishes.forEach(w=>{
      const li=document.createElement('li');
      li.style.flexDirection='column'; li.style.alignItems='flex-start'; li.style.gap='6px';
      li.innerHTML = `<span style="text-align:left">${escapeHtml(w.text)} ${w.pinned?'📌':''}${w.removed?' (removed)':''}</span>
        <span style="display:flex;gap:8px;">
          <button class="ghost-btn" data-pin="${w.id}" style="padding:6px 12px;font-size:.75rem;">Pin</button>
          <button class="ghost-btn danger" data-rm="${w.id}" style="padding:6px 12px;font-size:.75rem;">Remove</button>
        </span>`;
      list.appendChild(li);
    });
    list.querySelectorAll('[data-pin]').forEach(b=>b.onclick=async()=>{ await DB.updateWish(b.dataset.pin,{pinned:true}); renderOwnerTab('wishes'); });
    list.querySelectorAll('[data-rm]').forEach(b=>b.onclick=async()=>{ await DB.updateWish(b.dataset.rm,{removed:true}); renderOwnerTab('wishes'); });
  } else if(tab==='activity'){
    const acts = await DB.listActivity(100);
    acts.forEach(a=>{
      const li=document.createElement('li');
      li.innerHTML = activityLine(a);
      list.appendChild(li);
    });
  }
}

/* =========================================================
   WIRING
   ========================================================= */
function showFatalError(err){
  console.error('[gfday] fatal init error:', err);
  const loading = document.getElementById('screen-loading');
  if(loading){
    loading.innerHTML = `<div class="loading-wrap">
      <p style="color:#ff9d9d;font-family:monospace;font-size:.85rem;max-width:320px;text-align:center;">
      Something didn't load correctly. Try opening this via a local server (e.g. "npx serve") or check the browser console for details.<br><br>${(err && err.message)||err}</p></div>`;
    loading.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  main().catch(showFatalError);
});

async function main(){
  await DB.init();
  showDbModeBanner();
  startCountdownAndBanner();
  initStats();

  // referral detection from URL
  const params = new URLSearchParams(window.location.search);
  const invite = params.get('invite');
  if(invite){
    state.referredBy = decodeURIComponent(invite);
    const bannerText = state.lang==='hi'
      ? `Yeh khaas Girlfriend Day experience tumhe ${state.referredBy} ne bheja ❤️`
      : `This special Girlfriend Day experience was shared with you by ${state.referredBy} ❤️`;
    document.getElementById('referredBanner').textContent = bannerText;
    document.getElementById('referredBanner').classList.remove('hidden');
    document.getElementById('referredBannerName').textContent = bannerText;
    document.getElementById('referredBannerName').classList.remove('hidden');
  }

  let soundOn=false;
  document.getElementById('soundToggle').onclick = (e)=>{ soundOn=!soundOn; e.target.textContent = soundOn? '🔊':'🔈'; };
  document.getElementById('themeToggle').onclick = (e)=>{
    document.body.classList.toggle('light');
    e.target.textContent = document.body.classList.contains('light') ? '☀' : '☾';
  };
  document.getElementById('navExplore').onclick = ()=>{ state.returnScreen = currentScreen(); showScreen('screen-explore'); };
  document.getElementById('navLeaderboard').onclick = ()=>{ showScreen('screen-leaderboard'); renderLeaderboard('referrals'); };
  document.getElementById('navProfile').onclick = ()=>{ showScreen('screen-profile'); renderProfile(); };

  setTimeout(()=>showScreen('screen-language'), 1200);

  document.querySelectorAll('[data-lang]').forEach(btn=>{
    btn.onclick = ()=>{
      state.lang = btn.dataset.lang;
      applyI18n();
      showScreen('screen-hero');
      typewriter(document.getElementById('typewriter'),
        state.lang==='hi' ? 'Ek kahani, tumhare liye.' : 'A story, written for you.');
    };
  });

  document.getElementById('beginBtn').onclick = ()=>{ applyI18n(); showScreen('screen-gender'); };

  document.querySelectorAll('[data-gender]').forEach(btn=>{
    btn.onclick = ()=>{
      state.gender = btn.dataset.gender;
      if(state.gender==='girl'){
        if(state.referredBy){ showScreen('screen-girl-name'); }
        else { showScreen('screen-entry-choice'); }
      } else {
        showScreen('screen-boy-status');
      }
    };
  });

  document.getElementById('entryReceived').onclick = ()=>showScreen('screen-referral-name');
  document.getElementById('entryOwn').onclick = ()=>{ state.referredBy=null; showScreen('screen-girl-name'); };
  document.getElementById('referralContinueBtn').onclick = ()=>{
    const v = document.getElementById('referralNameInput').value.trim();
    if(!v) return;
    state.referredBy = v;
    const bannerText = state.lang==='hi'
      ? `Yeh khaas Girlfriend Day experience tumhe ${v} ne bheja ❤️`
      : `This special Girlfriend Day experience was shared with you by ${v} ❤️`;
    document.getElementById('referredBannerName').textContent = bannerText;
    document.getElementById('referredBannerName').classList.remove('hidden');
    showScreen('screen-girl-name');
  };

  const nameInput = document.getElementById('girlNameInput');
  document.getElementById('nameContinueBtn').onclick = async ()=>{
    const name = nameInput.value.trim();
    const hint = document.getElementById('nameHint');
    if(!name){ hint.textContent = state.lang==='hi' ? 'Naam likho na 🙂' : 'Type a name first 🙂'; return; }
    const res = await DB.claimName(name, state.referredBy);
    if(!res.ok){
      hint.textContent = state.lang==='hi'
        ? 'Yeh khoobsurat naam pehle hi le liya gaya hai ❤️'
        : 'This beautiful name has already been claimed ❤️';
      return;
    }
    state.name = name; state.userId = res.id; hint.textContent='';
    showScreen('screen-girl-photo');
  };

  const photoDrop = document.getElementById('photoDrop');
  const photoInput = document.getElementById('photoInput');
  photoDrop.onclick = ()=>photoInput.click();
  photoInput.onchange = ()=>{
    const file = photoInput.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      state.photo = reader.result;
      document.getElementById('photoPreview').src = state.photo;
      photoDrop.classList.add('has-img');
    };
    reader.readAsDataURL(file);
  };
  const toJourney = ()=>{ state.journeyIndex=0; state.journeyAnswers=[]; showScreen('screen-journey'); renderJourney(); };
  document.getElementById('photoSkipBtn').onclick = toJourney;
  document.getElementById('photoContinueBtn').onclick = toJourney;

  document.getElementById('yesBtn').onclick = handleYes;
  document.getElementById('thinkingBtn').onclick = ()=>{
    document.getElementById('dodgeCaption').textContent = state.lang==='hi' ? 'Le lo apna time ❤️' : 'Take your time ❤️';
  };
  document.getElementById('runBtn').onclick = dodgeRunBtn;

  document.getElementById('makeCardBtn').onclick = ()=>{ showScreen('screen-share'); drawShareCard(); document.getElementById('myInviteLinkText').textContent = myInviteLink(); };
  document.getElementById('exploreFromCelebrateBtn').onclick = ()=>{ state.returnScreen='screen-celebration'; showScreen('screen-explore'); };

  document.getElementById('downloadCardBtn').onclick = async ()=>{
    const canvas = document.getElementById('shareCanvas');
    const link = document.createElement('a');
    link.download = 'girlfriend-day-2026.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    if(state.userId){ await DB.incrementField(state.userId,'shares',1); await DB.addActivity({type:'shared', name: state.name}); }
  };
  document.getElementById('copyLinkBtn').onclick = async ()=>{
    const url = myInviteLink();
    navigator.clipboard?.writeText(url);
    if(state.userId){ await DB.incrementField(state.userId,'shares',1); await DB.addActivity({type:'shared', name: state.name}); }
    document.getElementById('copiedHint').textContent = state.lang==='hi' ? 'Link copy ho gaya!' : 'Link copied!';
    document.getElementById('myInviteLinkText').textContent = url;
  };

  document.querySelectorAll('[data-single]').forEach(btn=>{
    btn.onclick = ()=>{
      if(btn.dataset.single==='yes'){ showScreen('screen-wish'); }
      else { showScreen('screen-boy-taken'); }
    };
  });
  document.getElementById('takenShareBtn').onclick = ()=>{ showScreen('screen-share'); drawShareCard(); document.getElementById('myInviteLinkText').textContent=''; };

  document.getElementById('wishSubmitBtn').onclick = async ()=>{
    const text = document.getElementById('wishInput').value.trim();
    if(!text) return;
    await DB.addWish({ text });
    const affirmations = state.lang==='hi'
      ? ["Sab kuch apne time pe hota hai.","Jo sahi hai woh milega.","Patience rakho, dil se socho."]
      : ["Everything arrives on its own time.","The right thing tends to find you.","Be patient with the wait."];
    const res = document.getElementById('wishResult');
    res.classList.remove('hidden');
    res.textContent = mfRandom(affirmations);
    spawnHeartBurst(10);
  };

  document.querySelectorAll('#lbTabs .tab').forEach(tab=>{
    tab.onclick = ()=>{
      document.querySelectorAll('#lbTabs .tab').forEach(x=>x.classList.remove('active'));
      tab.classList.add('active');
      renderLeaderboard(tab.dataset.tab);
    };
  });
  document.getElementById('lbBackBtn').onclick = ()=>showScreen(state.userId ? 'screen-profile' : 'screen-hero');

  document.querySelectorAll('#mfGrid .mf-card').forEach(card=>{
    card.onclick = ()=>openMiniFeature(card.dataset.mf);
  });
  document.getElementById('exploreBackBtn').onclick = ()=>{
    closeMiniFeature();
    showScreen(state.returnScreen || 'screen-hero');
  };

  document.getElementById('profileCopyBtn').onclick = async ()=>{
    navigator.clipboard?.writeText(myInviteLink());
    if(state.userId){ await DB.incrementField(state.userId,'shares',1); renderProfile(); }
  };
  document.getElementById('profileExploreBtn').onclick = ()=>{ state.returnScreen='screen-profile'; showScreen('screen-explore'); };

  if(ownerUnlocked()){
    document.getElementById('screen-owner').dataset.unlocked='true';
    showScreen('screen-owner');
    renderOwnerStats();
    renderOwnerTab('users');
    document.querySelectorAll('#ownerTabs .tab').forEach(tab=>{
      tab.onclick = ()=>{
        document.querySelectorAll('#ownerTabs .tab').forEach(x=>x.classList.remove('active'));
        tab.classList.add('active');
        renderOwnerTab(tab.dataset.otab);
      };
    });
    document.getElementById('exportJsonBtn').onclick = async ()=>{
      const data = { users: await DB.listUsers('referrals',1000), wishes: await DB.listWishes(1000), activity: await DB.listActivity(1000) };
      const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'gfday-export.json';
      link.click();
    };
    document.getElementById('resetDbBtn').onclick = ()=>{
      if(DB.mode!=='local'){ alert('Reset shared (Firebase) data from the Firebase console, not this button.'); return; }
      if(confirm('Clear all local data on this browser?')){
        ['gfday_users','gfday_wishes','gfday_activity','gfday_counter_visitors','gfday_counter_stories','gfday_counter_yeses','gfday_garden_count']
          .forEach(k=>localStorage.removeItem(k));
        renderOwnerStats(); renderOwnerTab('users');
      }
    };
  }
}

function currentScreen(){
  const active = document.querySelector('.screen.active');
  return active ? active.id : 'screen-hero';
}
