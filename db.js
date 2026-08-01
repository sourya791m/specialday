/* FIREBASE_CONFIG comes from firebase-config.js, loaded before this file */
let fs = {}; // firestore fn namespace, populated only in firebase mode
let dbFs = null;

// in-memory fallback used only if localStorage itself is unavailable/blocked
// (private-mode Safari, some file:// contexts, storage disabled by policy)
const memoryStore = {};
let storageBroken = false;
function lread(key, fb){
  try{
    const raw = storageBroken ? memoryStore[key] : localStorage.getItem(key);
    const v = raw === undefined ? null : JSON.parse(raw);
    return v===null||v===undefined ? fb : v;
  }catch(e){ return (key in memoryStore) ? memoryStore[key] : fb; }
}
function lwrite(key, val){
  try{
    if(storageBroken) throw new Error('storage previously marked broken');
    localStorage.setItem(key, JSON.stringify(val));
  }catch(e){
    storageBroken = true;
    memoryStore[key] = val;
    console.warn('[gfday] localStorage unavailable, using in-memory fallback for this session:', e.message);
  }
}

async function tryInitFirebase(){
  if(!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') return false;
  try{
    const appMod = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
    const fsMod = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
    const app = appMod.initializeApp(FIREBASE_CONFIG);
    dbFs = fsMod.getFirestore(app);
    fs = fsMod;
    return true;
  }catch(err){
    console.warn('[gfday] Firebase unavailable, using local demo mode:', err.message);
    return false;
  }
}

const DB = {
  mode: 'local',

  async init(){
    this.mode = (await tryInitFirebase()) ? 'firebase' : 'local';
    return this.mode;
  },

  async getUser(id){
    if(!id) return null;
    if(this.mode==='firebase'){
      const snap = await fs.getDoc(fs.doc(dbFs,'users',id));
      return snap.exists() ? {id, ...snap.data()} : null;
    }
    const users = lread('gfday_users',{});
    return users[id] ? {id, ...users[id]} : null;
  },

  async saveUser(id, data){
    if(this.mode==='firebase'){
      await fs.setDoc(fs.doc(dbFs,'users',id), data, {merge:true});
      return;
    }
    const users = lread('gfday_users',{});
    users[id] = {...(users[id]||{}), ...data};
    lwrite('gfday_users', users);
  },

  async incrementField(id, field, amount=1){
    if(this.mode==='firebase'){
      await fs.setDoc(fs.doc(dbFs,'users',id), {[field]: fs.increment(amount)}, {merge:true});
      return;
    }
    const users = lread('gfday_users',{});
    users[id] = users[id] || {};
    users[id][field] = (users[id][field]||0)+amount;
    lwrite('gfday_users', users);
  },

  async claimName(rawName, referredBy){
    const name = rawName.trim();
    const id = name.toLowerCase().replace(/\s+/g,'-').slice(0,40);
    const existing = await this.getUser(id);
    if(existing) return {ok:false, id};
    await this.saveUser(id, {
      name, joinedAt: Date.now(), referrals:0, shares:0, hearts:0,
      completed:false, referredBy: referredBy || null
    });
    await this.addActivity({type:'joined', name});
    if(referredBy){
      const inviterId = referredBy.toLowerCase().replace(/\s+/g,'-').slice(0,40);
      const inviter = await this.getUser(inviterId);
      if(inviter){
        await this.incrementField(inviterId,'referrals',1);
        await this.addActivity({type:'referred', name: referredBy, detail:name});
      }
    }
    return {ok:true, id};
  },

  async listUsers(sortField='referrals', max=20){
    if(this.mode==='firebase'){
      try{
        const q = fs.query(fs.collection(dbFs,'users'), fs.orderBy(sortField,'desc'), fs.limit(max));
        const snap = await fs.getDocs(q);
        return snap.docs.map(d=>({id:d.id, ...d.data()}));
      }catch(e){ return []; }
    }
    const users = lread('gfday_users',{});
    return Object.entries(users).map(([id,u])=>({id,...u}))
      .sort((a,b)=>(b[sortField]||0)-(a[sortField]||0)).slice(0,max);
  },

  async addActivity(entry){
    if(this.mode==='firebase'){
      await fs.addDoc(fs.collection(dbFs,'activity'), {...entry, at: Date.now()});
      return;
    }
    const list = lread('gfday_activity',[]);
    list.unshift({...entry, at: Date.now()});
    lwrite('gfday_activity', list.slice(0,150));
  },

  async listActivity(max=15){
    if(this.mode==='firebase'){
      try{
        const q = fs.query(fs.collection(dbFs,'activity'), fs.orderBy('at','desc'), fs.limit(max));
        const snap = await fs.getDocs(q);
        return snap.docs.map(d=>d.data());
      }catch(e){ return []; }
    }
    return lread('gfday_activity',[]).slice(0,max);
  },

  async addWish(w){
    if(this.mode==='firebase'){
      const ref = await fs.addDoc(fs.collection(dbFs,'wishes'), {...w, at: Date.now(), pinned:false, removed:false});
      return ref.id;
    }
    const list = lread('gfday_wishes',[]);
    const id = 'w'+Date.now();
    list.unshift({id, ...w, at:Date.now(), pinned:false, removed:false});
    lwrite('gfday_wishes', list.slice(0,300));
    return id;
  },

  async listWishes(max=200){
    if(this.mode==='firebase'){
      try{
        const q = fs.query(fs.collection(dbFs,'wishes'), fs.orderBy('at','desc'), fs.limit(max));
        const snap = await fs.getDocs(q);
        return snap.docs.map(d=>({id:d.id, ...d.data()}));
      }catch(e){ return []; }
    }
    return lread('gfday_wishes',[]).slice(0,max);
  },

  async updateWish(id, patch){
    if(this.mode==='firebase'){
      await fs.updateDoc(fs.doc(dbFs,'wishes',id), patch);
      return;
    }
    const list = lread('gfday_wishes',[]);
    const i = list.findIndex(w=>w.id===id);
    if(i>-1){ list[i] = {...list[i], ...patch}; lwrite('gfday_wishes', list); }
  },

  async bumpCounter(key, amount=1){
    if(this.mode==='firebase'){
      const ref = fs.doc(dbFs,'meta','counters');
      await fs.setDoc(ref, {[key]: fs.increment(amount)}, {merge:true});
      const snap = await fs.getDoc(ref);
      return snap.data()?.[key] || amount;
    }
    const v = lread('gfday_counter_'+key,0)+amount;
    lwrite('gfday_counter_'+key, v);
    return v;
  },

  async getCounters(){
    if(this.mode==='firebase'){
      try{
        const snap = await fs.getDoc(fs.doc(dbFs,'meta','counters'));
        return snap.exists() ? snap.data() : {};
      }catch(e){ return {}; }
    }
    return {
      visitors: lread('gfday_counter_visitors',0),
      stories: lread('gfday_counter_stories',0),
      yeses: lread('gfday_counter_yeses',0),
    };
  }
};
