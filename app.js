const $ = s => document.querySelector(s);
const app = $('#app');
const STORE = { rides:'ryd_rides_v1', cave:'ryd_cave_v1', council:'ryd_council_v1' };
const get = (k,f=[]) => { try { return JSON.parse(localStorage.getItem(k)) ?? f } catch { return f } };
const set = (k,v) => localStorage.setItem(k,JSON.stringify(v));

const dragons = [
 {id:'black',name:'Black Dragon',step:'Non-Step One',title:'Notice the Dragon',pattern:'Unsafety → Fear → Grounding',phrase:'I see you.',need:'Ground'},
 {id:'red',name:'Red Dragon',step:'Non-Step Two',title:'Find the Root',pattern:'Pain → Craving → Feeling',phrase:'Follow the smoke to the fire.',need:'Feel'},
 {id:'orange',name:'Orange Dragon',step:'Non-Step Three',title:'Choose Your Tree',pattern:'Shame → Compulsion → Choice & Creativity',phrase:'Feed the Tree you want to live beneath.',need:'Create'},
 {id:'yellow',name:'Yellow Dragon',step:'Non-Step Four',title:'Change the Role',pattern:'Powerlessness → Blame / Rescue → Agency',phrase:'Reclaim the pen.',need:'Act'},
 {id:'green',name:'Green Dragon',step:'Non-Step Five',title:'Take Back the Reins',pattern:'Disconnection → Attachment → Relationship',phrase:'The dragon can roar, but it cannot vote.',need:'Connect'},
 {id:'blue',name:'Blue Dragon',step:'Non-Step Six',title:'Make the Miss-Take',pattern:'Condemnation → Identity → Truth',phrase:'It was a miss-take. Take again.',need:'Tell the Truth'},
 {id:'indigo',name:'Indigo Dragon',step:'Non-Step Seven',title:'Call the Council',pattern:'Isolation → Disconnection → Wisdom',phrase:'I ride my own dragon, but I do not ride alone.',need:'Call the Council'},
 {id:'violet',name:'Violet Dragon',step:'Non-Step Eight',title:'Practice Just-Us',pattern:'Separation → Punishment → Right Relationship',phrase:'Justice is returning to right relationship.',need:'Repair'},
 {id:'rainbow',name:'Rainbow Dragon',step:'Non-Step Nine',title:'Ride the Dragon',pattern:'Fragmentation → Self-Destruction → Integration',phrase:'The Rider chooses the direction.',need:'Integrate'}
];
const emotions=['Fear','Anger','Shame','Grief','Loneliness','Craving','Joy','Peace','Numbness','Overwhelm'];
const inventories=[
 {id:'resentment',title:'Resentment Inventory',qs:['Who or what am I angry at?','What happened, without minimizing or exaggerating?','What did this affect in me—safety, esteem, belonging, money, intimacy, ambition, spirituality?','What emotion is underneath the anger?','What apology or outcome am I still waiting for?','What belongs to them? What belongs to me?','Which role am I playing: Victim, Villain, Hero—or Creator, Challenger, Guide?','What would release look like without pretending the harm was acceptable?']},
 {id:'fear',title:'Fear Inventory',qs:['What am I afraid of?','If that happened, then what? Keep going until you reach the deepest fear.','What does my dragon do when this fear appears?','Where do I feel this fear in my body?','Which Tree does this fear usually feed?','What is inside my control? What is outside it?']},
 {id:'shame',title:'Shame Inventory',qs:['What do I most fear people knowing about me?','What do I call myself when I fail?','Who taught me that this part of me was unacceptable?','How has shame tried to protect or control me?','What is the difference between what I did and who I am?','What truth would accountability say without condemnation?']},
 {id:'relationships',title:'Relationships & Intimacy',qs:['Where do I confuse love with rescue, control, attachment, approval, or fear?','Who has too much power over my emotional state?','Where do I abandon myself to keep someone else?','Where do I push people away before they can leave me?','What boundary have I avoided?','What would right relationship look like now?']},
 {id:'control',title:'Money, Power & Control',qs:['Where do I feel powerless?','Where do I compensate by controlling?','How do I react when someone tells me no?','Where do I manipulate instead of asking directly?','What does money mean to me—safety, status, freedom, scarcity, love?','What would agency look like without domination?']},
 {id:'grief',title:'Grief Inventory',qs:['What have I lost that I never fully mourned?','What grief have I converted into anger, addiction, busyness, or numbness?','What did I need then that I did not receive?','What would it mean to let the grief be grief instead of turning it into a verdict?']},
 {id:'harm',title:'Harm & Just-Us',qs:['Who may have been harmed while my dragon had the reins?','What did I do—or fail to do?','What was the likely impact?','What responsibility belongs to me?','Could direct contact cause more harm?','What changed behavior or living amends would demonstrate repair?','What outcome am I not entitled to control?']},
 {id:'spirit',title:'Spiritual Inventory',qs:['Where have I used spirituality to avoid grief, anger, responsibility, or uncertainty?','Have I confused fear with intuition or coincidence with command?','Have I tried to Guide others to avoid being guided myself?','Which beliefs grow Fear–Guilt–Shame? Which grow Love–Joy–Peace?','What does humility look like in my spiritual life?']}
];

function nav(name){
  history.replaceState(null,'','#'+name);
  const tpl = document.querySelector(`#${name}Tpl`) || $('#homeTpl');
  app.innerHTML=''; app.appendChild(tpl.content.cloneNode(true));
  window.scrollTo(0,0);
  if(name==='ride') initRide(); if(name==='dragons') initDragons(); if(name==='cave') initCave(); if(name==='council') initCouncil(); if(name==='journey') initJourney();
  bindNav();
}
function bindNav(){ document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>nav(b.dataset.nav)); }

function initRide(){
  $('#emotionChips').innerHTML=emotions.map(e=>`<label class="chip"><input type="checkbox" name="emotion" value="${e}"><span>${e}</span></label>`).join('');
  $('#scale').oninput=e=>$('#scaleOut').value=e.target.value;
  $('#rideForm').onsubmit=e=>{
    e.preventDefault(); const fd=new FormData(e.target); const scale=+fd.get('scale'); const need=fd.get('need');
    const ride={id:Date.now(),date:new Date().toISOString(),scale,emotions:fd.getAll('emotion'),tree:fd.get('tree'),reins:fd.get('reins'),need,note:fd.get('note').trim()};
    const rides=get(STORE.rides); rides.unshift(ride); set(STORE.rides,rides.slice(0,365));
    const dragon=dragons.find(d=>d.need===need) || dragons[Math.min(scale,8)];
    const high=scale>=7;
    $('#rideResult').innerHTML=`<section class="card result ${high?'high':''}"><div class="eyebrow">${high?'GROUND FIRST':'TODAY\'S PRACTICE'}</div><h2>${high?'Keep it simple.':'Try the '+dragon.name}</h2><p>${high?'Your Dragon Scale is high. Pause deep inventory. Feel your feet, slow your breathing, reduce immediate demands, and consider contacting someone on your Council. If you may be in immediate danger, use appropriate local emergency support.':dragon.title+' — '+dragon.pattern}</p><p><strong>Carry this:</strong> “${high?'The next right action can be small.':dragon.phrase}”</p>${high?'<button class="primary" data-nav="council">Open My Council</button>':`<button class="secondary" data-nav="dragons">See ${dragon.name}</button>`}</section>`;
    bindNav(); e.target.reset(); $('#scale').value=4; $('#scaleOut').value=4;
  };
}
function initDragons(){
  $('#dragonGrid').innerHTML=dragons.map(d=>`<article class="dragon-card"><img src="assets/${d.id}.png" alt="${d.name} card"><div class="body"><div class="eyebrow">${d.step}</div><h3>${d.title}</h3><p class="pattern">${d.pattern}</p><p>“${d.phrase}”</p></div></article>`).join('');
}
function initCave(){
  const saved=get(STORE.cave,{});
  $('#inventoryList').innerHTML=inventories.map(inv=>`<details class="card inventory"><summary>${inv.title}</summary><div class="questions">${inv.qs.map((q,i)=>`<div class="q"><label>${q}</label><textarea rows="4" data-key="${inv.id}.${i}" placeholder="Write what is true, not what sounds good.">${escapeHtml(saved[`${inv.id}.${i}`]||'')}</textarea></div>`).join('')}<div class="q"><label>What Dragon is awake? Which Tree am I feeding? Who has the reins?</label><textarea rows="4" data-key="${inv.id}.integration">${escapeHtml(saved[`${inv.id}.integration`]||'')}</textarea></div><div class="save-row"><button class="secondary saveInventory" type="button">Save this section</button></div></div></details>`).join('');
  document.querySelectorAll('.saveInventory').forEach(btn=>btn.onclick=()=>{ const data=get(STORE.cave,{}); btn.closest('details').querySelectorAll('textarea').forEach(t=>data[t.dataset.key]=t.value); set(STORE.cave,data); btn.textContent='Saved ✓'; setTimeout(()=>btn.textContent='Save this section',1200); });
}
function initCouncil(){
  function render(){ const list=get(STORE.council); $('#councilList').innerHTML=list.length?list.map((p,i)=>`<article class="card council-item"><div><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.role)} · ${escapeHtml(p.gift)}</p><p>${escapeHtml(p.contact||'')}</p></div><button class="remove" data-i="${i}">Remove</button></article>`).join(''):'<div class="card muted">Your Council is empty. Add one safe person you can contact when you cannot hear your own wisdom.</div>'; document.querySelectorAll('.remove').forEach(b=>b.onclick=()=>{const x=get(STORE.council);x.splice(+b.dataset.i,1);set(STORE.council,x);render()}); }
  $('#councilForm').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target);const x=get(STORE.council);x.push(Object.fromEntries(fd));set(STORE.council,x);e.target.reset();render()};render();
}
function initJourney(){
  const rides=get(STORE.rides); const avg=rides.length?(rides.reduce((a,r)=>a+r.scale,0)/rides.length).toFixed(1):'—';
  const most=(field, arrayField=false)=>{const m={};rides.forEach(r=>{const vals=arrayField?r[field]:[r[field]];(vals||[]).filter(Boolean).forEach(v=>m[v]=(m[v]||0)+1)});return Object.entries(m).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'};
  $('#stats').innerHTML=`<div class="stat"><div class="big">${rides.length}</div><div class="small">Daily Rides</div></div><div class="stat"><div class="big">${avg}</div><div class="small">Average Dragon Scale</div></div><div class="stat"><div class="big">${most('emotion',true)}</div><div class="small">Most common feeling</div></div><div class="stat"><div class="big">${most('tree')}</div><div class="small">Most common Tree</div></div>`;
  $('#recentRides').innerHTML=rides.length?rides.slice(0,10).map(r=>`<div class="ride-row"><strong>${new Date(r.date).toLocaleDateString()} · Scale ${r.scale}/9</strong><div class="meta">${escapeHtml((r.emotions||[]).join(', ')||'No emotion selected')} · ${escapeHtml(r.tree)} · ${escapeHtml(r.reins)} · ${escapeHtml(r.need)}</div>${r.note?`<div>${escapeHtml(r.note)}</div>`:''}</div>`).join(''):'<p class="muted">No Daily Rides yet.</p>';
  $('#exportBtn').onclick=()=>{const payload={exportedAt:new Date().toISOString(),rides:get(STORE.rides),cave:get(STORE.cave,{}),council:get(STORE.council)};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='ride-your-dragon-backup.json';a.click();URL.revokeObjectURL(a.href)};
  $('#eraseBtn').onclick=()=>{if(confirm('Erase all Ride Your Dragon data stored in this browser? This cannot be undone unless you exported a backup.')){Object.values(STORE).forEach(k=>localStorage.removeItem(k));initJourney();}}
}
function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

bindNav(); nav(location.hash.slice(1)||'home');
let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').classList.remove('hidden');$('#installBtn').onclick=async()=>{deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#installBtn').classList.add('hidden')}});
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
