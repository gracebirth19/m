const paths = {
  home:'<path d="M3 10 12 3l9 7v10H3zM9 20v-6h6v6"/>',
  camera:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  news:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 8-3 8-3 9h18c0-1-3-1-3-9M10 21h4"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/>',
  save:'<path d="M6 4h12v17l-6-4-6 4z"/>',
  heart:'<path d="M20.8 5.9a5 5 0 0 0-7.1 0L12 7.6l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 22l8.8-9a5 5 0 0 0 0-7.1z"/>',
  reply:'<path d="M21 11a9 8 0 0 1-9 8 10 10 0 0 1-3-.5L4 21l1.4-4.5A8 8 0 0 1 3 11a9 8 0 0 1 18 0z"/>',
  repeat:'<path d="m17 2 4 4-4 4M3 11V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4m14-1v3a2 2 0 0 1-2 2H3"/>',
  bars:'<path d="M4 19v-5m5 5V9m5 10V5m5 14v-8"/>',
  share:'<path d="M12 15V3m-4 4 4-4 4 4m-11 6v7h14v-7"/>',
  search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  back:'<path d="m13 5-7 7 7 7m-7-7h14"/>'
};
const icon = name => name === 'x' ? '<span class="x-logo" aria-hidden="true">𝕏</span>' : `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
const h = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const $ = id => document.getElementById(id);
const key = 'mars-class-save-v1';
const fresh = () => ({
  seconds:0, event:0, paused:false, speed:1, posts:[], interactions:{}, follows:{nasa:true,gallatin:true}, inbox:structuredClone(seedInbox), messagesUnread:{mom:true,maya:true}, notices:[{text:'NASA mentioned you in its inaugural Mars class announcement.', to:'x', time:-4},{text:'NYU Gallatin followed you.', to:'profile', time:-5}], unread:2, queue:[], postQueue:[]
});
let state;
try { state = JSON.parse(localStorage.getItem(key)) || fresh(); } catch { state = fresh(); }
state.postQueue ||= [];
let storageAvailable = true;
function save() {
  try { localStorage.setItem(key, JSON.stringify(state)); }
  catch { storageAvailable = false; }
}
let tab = 'for-you', platform = 'x', searchQuery = '', thread = 'mom', activePost, drawing = false;
const drafts = {};
const routes = {x:['X','x'],ig:['Instagram','camera'],messages:['Messages','mail'],press:['Newsroom','news'],notifications:['Notifications','bell'],profile:['Profile','user'],bookmarks:['Bookmarks','save'],search:['Search','search']};
const now = () => Math.floor(state.seconds);
const getRoute = () => {
  const [name,arg] = location.hash.slice(1).split('/');
  return [Object.hasOwn(routes,name) ? name : 'x', arg];
};
function go(route) {
  if (location.hash === '#' + route) {
    onRoute();
  } else {
    location.hash = route;
  }
}
const avatar = by => `<span class="avatar ${people[by][3]}" aria-hidden="true">${people[by][2]}</span>`;
const verified = by => people[by][4] ? '<span class="verified" aria-label="Verified">✓</span>' : '';
const numeric = new Intl.NumberFormat('en', {notation:'compact',maximumFractionDigits:1});
const qty = n => numeric.format(n);
const followers = () => 48920 + Math.floor(Math.min(state.seconds,184) * 117) + state.event * 938;
const minutes = (value = now()) => value < 0 ? value : Math.floor(value * 42 / 60);
function clock(value = now()) {
  const total = 14 * 60 + minutes(value);
  return `${String(Math.floor(total / 60)).padStart(2,'0')}:${String(total % 60).padStart(2,'0')}`;
}
function relative(value) {
  const age = minutes() - minutes(value);
  return age < 1 ? 'now' : age < 60 ? age + 'm' : Math.floor(age / 60) + 'h';
}
const livePosts = () => releases.slice(0,state.event).map((p,i) => ({...p,id:'live'+i,time:p.at}));
function postsFor(kind) {
  const initial = kind === 'ig' ? instagram : seedPosts;
  return [...initial,...livePosts().filter(p=>p.platform===kind),...state.posts.filter(p=>p.platform===kind)].sort((a,b)=>b.time-a.time);
}
const allPosts = () => [...postsFor('x'),...postsFor('ig')];
const findPost = id => allPosts().find(p=>p.id===id);
const interactions = id => state.interactions[id] || {};
const articleList = () => articles.filter(a => !a.at || a.at <= now());
function toast(message) {
  $('toast').textContent = message;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(()=>{ $('toast').textContent = ''; },2600);
}
function navItem(route, active, sub = false) {
  const [label, symbol] = routes[route];
  const count = route === 'messages' ? Object.values(state.messagesUnread).filter(Boolean).length : route === 'notifications' ? state.unread : 0;
  return `<button class="nav-item ${active?'active':''}" ${active?'aria-current="page"':''} data-route="${route}">${icon(sub && route==='x'?'home':symbol)}${sub && route==='x'?'Home':label}${count?`<span class="nav-number">${count}</span>`:''}</button>`;
}
function renderNav(route) {
  $('apps').innerHTML = ['x','ig','messages','press','notifications','profile','bookmarks'].map(r=>navItem(r,r===route)).join('');
  $('section').innerHTML = `<div class="eyebrow">${platform==='ig'?'INSTAGRAM':'ON X'}</div><nav>${[platform,'search'].map(r=>navItem(r,r===route,true)).join('')}</nav><button class="primary nav-cta" data-compose>${platform==='ig'?'Create':'Post'}</button>`;
  $('account').innerHTML = `<button class="account" data-route="profile">${avatar('meira')}<span><strong>Meira Berlow</strong><small>@meiraberlow</small></span></button>`;
}
function rightRail() {
  $('right').innerHTML = `<form class="search" data-search>${icon('search')}<input name="q" aria-label="Search the story" placeholder="Search" value="${h(searchQuery)}" required></form>
  <section class="card brief"><div class="eyebrow">MISSION BRIEF</div><h2>The inaugural Mars class</h2><dl><div><dt>Current event</dt><dd>Announcement day</dd></div><div><dt>Lunar expedition</dt><dd>2046</dd></div><div><dt>Your role</dt><dd>Surface science lead</dd></div><div><dt>Followers</dt><dd id="rail-followers">${qty(followers())}</dd></div></dl></section>
  <section class="card"><h2>What’s happening</h2>
  <button data-trend="Mars"><small>Spaceflight · Trending</small><strong>#MarsClass</strong><small id="trend-count">${qty(32100 + state.event * 1720)} posts</small></button>
  <button data-trend="Meira Berlow"><small>Trending in United States</small><strong>Meira Berlow</strong><small>${qty(20800 + state.event * 1020)} posts</small></button>
  <button data-trend="lunar"><small>Science · Trending</small><strong>Lunar Expedition</strong><small>9,418 posts</small></button>
  <button data-route="press" class="card-link">Open newsroom ↗</button></section>
  <section class="card follow-list"><h2>Who to follow</h2>
  ${['orbit','eli','maya'].map(by=>`<div><button class="follow" data-follow="${by}" aria-pressed="${!!state.follows[by]}">${state.follows[by]?'Following':'Follow'}</button><strong>${people[by][0]}</strong><small>@${people[by][1]}</small></div>`).join('')}</section>
  <div class="disclosure">FICTIONAL SCENARIO · NOV 17, 2026<br>All activity takes place inside this simulation.</div>`;
}
function head(title, end = '', back = '') {
  return `<div class="view-head">${back?`<button class="ghost" data-route="${back}" aria-label="Go back">${icon('back')}</button>`:''}<h1>${title}</h1>${end}</div>`;
}
const liveStatus = () => `<span class="event-indicator">${state.paused?'PAUSED':state.event===releases.length?'BRIEFING ENDED':'<span class="live-dot"></span> LIVE'}</span>`;
function composer() {
  return `<div class="composer">${avatar('meira')}<form data-send="post"><textarea name="text" rows="1" maxlength="280" aria-label="Your post" placeholder="What is happening?">${h(drafts.post || '')}</textarea><div class="composer-controls"><span aria-label="Visible in your simulated feed">${icon('globe')}</span><small>Everyone in the simulation</small><button class="primary">Post</button></div></form></div>`;
}
const empty = message => `<div class="empty muted">${message}</div>`;
function image(p, ig = false) {
  if (!p.image) return '';
  return `<button class="post-image ${ig?'ig-photo':''}" data-article="release" aria-label="Illustration of three astronauts overlooking Earth from the Moon. Read the mission profile.">${p.label?`<span>${p.label} ↗</span>`:''}</button>`;
}
function action(p, kind, glyph, label, count = 0, toggle = false) {
  const active = !!interactions(p.id)[kind];
  const classes = active ? ({like:'liked',repost:'reposted',save:'saved'}[kind] || '') : '';
  return `<button class="${classes}" data-action="${kind}" data-id="${p.id}" aria-label="${label}" title="${label}" ${toggle?`aria-pressed="${active}"`:''}>${icon(glyph)}${count>0?qty(count):''}</button>`;
}
function post(p, ig = false) {
  const author = people[p.by];
  const m = interactions(p.id);
  const reply = action(p,'reply','reply','Reply',ig?0:p.replies+(m.comments?.length||0));
  const like = action(p,'like','heart','Like',ig?0:p.likes+Number(!!m.like),true);
  const bookmark = action(p,'save','save','Bookmark',0,true);
  const share = action(p,'share','share','Share within the simulation');
  if (ig) return `<article class="ig-card" id="p-${p.id}"><div class="ig-head">${avatar(p.by)}<div class="post-meta"><strong>${author[1]}</strong>${verified(p.by)}<time> · ${relative(p.time)}</time></div></div>${image(p,true)}<div class="ig-caption"><div class="actions">${like}${reply}${share}${bookmark}</div><strong>${qty(p.likes+Number(!!m.like))} likes</strong><p><strong>${author[1]}</strong> ${h(p.text)}</p><button class="ghost" data-action="reply" data-id="${p.id}">${p.replies+(m.comments?.length||0) ? 'View comments' : 'Add a comment'}</button></div></article>`;
  return `<article class="post" id="p-${p.id}">${avatar(p.by)}<div class="post-content"><div class="post-meta"><strong>${author[0]}</strong>${verified(p.by)}<span class="handle">@${author[1]}</span><time> · ${relative(p.time)}</time></div><p class="post-text">${h(p.text)}</p>${image(p)}<div class="actions">${reply}${action(p,'repost','repeat','Repost',p.reposts+Number(!!m.repost),true)}${like}<span aria-label="${p.views} views">${icon('bars')} ${qty(p.views)}</span>${bookmark}${share}</div></div></article>`;
}
function renderX(arg) {
  if (arg && findPost(arg)) return head('Post','','x') + post(findPost(arg));
  const feed = postsFor('x').filter(p=>tab!=='following'||p.by==='meira'||state.follows[p.by]);
  return head('Home',liveStatus()) + `<div class="tabs"><button data-tab="for-you" class="${tab==='for-you'?'active':''}">For you</button><button data-tab="following" class="${tab==='following'?'active':''}">Following</button></div>` + composer() + (feed.map(p=>post(p)).join('') || empty('Follow accounts to see their posts here.'));
}
function renderIg(arg) {
  if (arg && findPost(arg)) return head('Post','','ig') + post(findPost(arg),true);
  return head('Instagram',`<span class="event-indicator"><button class="ghost" data-route="messages" aria-label="Direct messages">${icon('mail')}</button><button class="ghost" data-compose aria-label="Create a post">＋ Create</button></span>`) + `<div class="story-strip">${['meira','nasa','gallatin','eli','maya'].map(by=>`<button data-story="${by}">${avatar(by)}${by==='meira'?'Your story':people[by][1]}</button>`).join('')}</div>` + postsFor('ig').map(p=>post(p,true)).join('');
}
function renderInbox() {
  const entries = Object.entries(state.inbox).sort((a,b)=>b[1].at(-1).time-a[1].at(-1).time);
  return head('Messages') + `<div class="inbox"><nav class="threads" aria-label="Conversations">${entries.map(([by,m])=>`<button class="thread ${by===thread?'active':''}" data-route="messages/${by}">${avatar(by)}<span><strong>${people[by][0]}</strong><small>${h(m.at(-1).text)}</small></span>${state.messagesUnread[by]?'<i class="live-dot" aria-label="Unread"></i>':''}</button>`).join('')}</nav><section class="chat" aria-label="Conversation"><div class="chat-head">${avatar(thread)}<strong>${people[thread][0]}</strong></div><div class="messages" id="bubbles">${state.inbox[thread].map(m=>`<div class="bubble ${m.mine?'mine':''}">${h(m.text)}<time>${clock(m.time)}</time></div>`).join('')}</div><form class="message-form" data-send="message"><input name="text" aria-label="Message" placeholder="Start a message" value="${h(drafts['message-'+thread] || '')}" required maxlength="500"><button class="primary">Send</button></form></section></div>`;
}
function renderPress(arg) {
  const article = articleList().find(a=>a.id===arg);
  if (article) return head('Newsroom','','press')+`<article class="article"><div class="eyebrow">${article.outlet} · ${article.time} · FICTION</div><h1>${article.title}</h1><p class="muted">${article.dek}</p>${article.image?'<img class="post-image" src="./assets/crew.webp" alt="Illustration of the crew on the Moon">':''}${article.body.map(p=>`<p>${p}</p>`).join('')}</article>`;
  return head('Newsroom',liveStatus()) + articleList().map(a=>`<button class="news-card" data-article="${a.id}"><small>${a.outlet} · ${a.time}</small><h2>${a.title}</h2><p>${a.dek}</p></button>`).join('');
}
function renderProfile() {
  return head('Meira Berlow',liveStatus())+`<div class="cover"></div><section class="content-pad profile">${avatar('meira')}<button class="follow" data-compose>Post</button><h2>Meira Berlow ${verified('meira')}</h2><span class="handle">@meiraberlow</span><p>NASA’s inaugural Mars astronaut class. Astroinformatics at NYU Gallatin. Former telescope operator. Still looking up.</p><p class="profile-stats"><span><strong>${Object.values(state.follows).filter(Boolean).length}</strong> Following</span><span><strong id="profile-followers">${followers().toLocaleString('en')}</strong> Followers</span></p></section><div class="tabs"><button class="active" disabled>Posts</button></div>` + (allPosts().filter(p=>p.by==='meira').map(p=>post(p,p.platform==='ig')).join('')||empty('Your first post will appear here.'));
}
function render() {
  const [route,arg] = getRoute();
  const focused = document.activeElement;
  const focusButton = focused?.tagName === 'BUTTON' && !focused.closest('dialog')
    ? [...focused.attributes].filter(a=>a.name.startsWith('data-')).map(a=>[a.name,a.value]) : [];
  const field = focused?.matches('input,textarea') && !focused.closest('dialog') ? focused : null;
  const cursor = field ? [field.selectionStart,field.selectionEnd] : null;
  drawing = true;
  renderNav(route);
  rightRail();
  const q = searchQuery.trim().toLowerCase();
  const results = q ? allPosts().filter(p=>`${p.text} ${people[p.by][0]}`.toLowerCase().includes(q)) : [];
  switch(route) {
    case 'x': $('main').innerHTML = renderX(arg); break;
    case 'ig': $('main').innerHTML = renderIg(arg); break;
    case 'messages': $('main').innerHTML = renderInbox(); $('bubbles').scrollTop = $('bubbles').scrollHeight; break;
    case 'press': $('main').innerHTML = renderPress(arg); break;
    case 'profile': $('main').innerHTML = renderProfile(); break;
    case 'bookmarks': $('main').innerHTML = head('Bookmarks') + (allPosts().filter(p=>interactions(p.id).save).map(p=>post(p,p.platform==='ig')).join('') || empty('Save posts to find them here.')); break;
    case 'notifications': $('main').innerHTML = head('Notifications',liveStatus()) + state.notices.map(n=>`<button class="notice" data-route="${n.to}"><small>${clock(n.time)} EST</small><p>${n.text}</p></button>`).join(''); break;
    case 'search': $('main').innerHTML = head('Search')+`<div class="content-pad"><form class="search" data-search>${icon('search')}<input name="q" aria-label="Search posts" placeholder="Search posts and people" value="${h(searchQuery)}" required></form></div>`+(q?(results.map(p=>post(p,instagram.includes(p)||p.platform==='ig')).join('')||empty('No posts match your search.')):''); break;
  }
  if (field) {
    const area = field.closest('main') ? $('main') : $('right');
    const replacement = area.querySelector(`${field.tagName.toLowerCase()}[name="${field.name}"]`);
    if (replacement) {
      replacement.value = field.value;
      replacement.focus({preventScroll:true});
      if (cursor[0] !== null) replacement.setSelectionRange(...cursor);
    }
  } else if (focusButton.length) {
    const replacement = [...document.querySelectorAll('button')].find(b=>focusButton.every(([name,value])=>b.getAttribute(name)===value));
    replacement?.focus({preventScroll:true});
  }
  drawing = false;
  updateClock();
}
function updateClock() {
  $('clock').textContent = clock() + ' EST';
  if ($('rail-followers')) $('rail-followers').textContent = qty(followers());
  if ($('profile-followers')) $('profile-followers').textContent = followers().toLocaleString('en');
}
function onRoute() {
  const [route,arg] = getRoute();
  if (route==='x'||route==='ig') platform = route;
  if (route==='messages') {
    if (arg && Object.hasOwn(state.inbox,arg)) thread = arg;
    state.messagesUnread[thread] = false;
  }
  if (route==='notifications') state.unread = 0;
  save();
  render();
  window.scrollTo(0,0);
}
function modal(title, body) {
  const dialog = $('dialog');
  dialog.innerHTML = `<div class="modal-head"><h2 id="dialog-title">${title}</h2><button class="ghost" data-close aria-label="Close">✕</button></div><div class="modal-body">${body}</div>`;
  dialog.setAttribute('aria-labelledby','dialog-title');
  if (!dialog.open) dialog.showModal();
}
function settings() {
  modal('Simulation settings',`<p>The story advances while this page is open. You can pause it, speed it up, or jump to the next update.</p><div class="modal-actions"><button class="primary" data-control="pause">${state.paused?'Resume':'Pause'}</button><button class="ghost" data-control="speed">${state.speed===1?'Switch to 4× speed':'Switch to 1× speed'}</button><button class="ghost" data-control="next" ${state.event===releases.length?'disabled':''}>Next update</button></div><p class="muted">${storageAvailable?'Your progress is saved in this browser.':'This browser session cannot save progress.'} Posts and messages stay inside the simulation.</p><button class="ghost" data-control="reset">Restart announcement day…</button>`);
}
function replyModal(p) {
  activePost = p.id;
  const comments = interactions(p.id).comments || [];
  const reactions = (p.reactions || []).map(r=>`<p><strong>${people[r.by][0]}</strong> ${h(r.text)}</p>`).join('');
  const samples = p.id==='nasa' ? '<p><strong>Maya Chen</strong> Told everyone at work I’d be normal about this. I was wrong.</p><p><strong>The Orbital Desk</strong> We’ll be at the surface science briefing. Send us your questions.</p>' : '<p class="muted">Start the conversation here.</p>';
  modal('Replies',`<p class="muted">${h(p.text)}</p><div class="comments">${comments.length || p.id==='nasa' || reactions ? (p.id==='nasa'?samples:'')+reactions+comments.map(c=>`<p><strong>Meira Berlow</strong> ${h(c)}</p>`).join(''):samples}</div><form data-send="reply"><textarea class="field" name="text" required maxlength="280" aria-label="Reply" placeholder="Post your reply"></textarea><button class="primary">Reply</button></form>`);
}
function receive(by,text) {
  state.inbox[by].push({text,time:now()});
  state.messagesUnread[by] = !(getRoute()[0]==='messages' && thread===by);
}
function tick() {
  const route = getRoute()[0];
  let changed = false;
  while (state.event < releases.length && now() >= releases[state.event].at) {
    const event = releases[state.event++];
    state.notices.unshift({text:event.note,to:event.article?'press/'+event.article:event.platform+'/live'+(state.event-1),time:event.at});
    if (route!=='notifications') state.unread++;
    if (event.dm) receive(...event.dm);
    toast(event.note);
    changed = true;
  }
  state.queue = state.queue.filter(item=>{
    if (now() < item.at) return true;
    receive(item.by,item.text);
    changed = true;
    return false;
  });
  state.postQueue = state.postQueue.filter(item=>{
    if (now() < item.at) return true;
    const own = state.posts.find(p=>p.id===item.id);
    if (!own) return false;
    own.likes += item.likes;
    own.views += item.views;
    if (item.reply) {
      (own.reactions ||= []).push(item.reply);
      own.replies++;
      const notice = people[item.reply.by][0]+' replied to your post.';
      state.notices.unshift({text:notice,to:own.platform+'/'+own.id,time:now()});
      if (route!=='notifications') state.unread++;
      toast(notice);
    }
    changed = true;
    return false;
  });
  save();
  if (changed) render();
  else updateClock();
}
document.addEventListener('input', e=>{
  const form = e.target.closest('[data-send]');
  if (form?.dataset.send==='post') drafts.post = e.target.value;
  if (form?.dataset.send==='message') drafts['message-'+thread] = e.target.value;
});
document.addEventListener('submit', e=>{
  const form = e.target;
  if (!form.matches('[data-send],[data-search]')) return;
  e.preventDefault();
  const fields = new FormData(form);
  if (form.matches('[data-search]')) {
    searchQuery = fields.get('q').trim();
    go('search');
    return;
  }
  const value = fields.get('text').trim();
  if (!value) return;
  switch (form.dataset.send) {
    case 'post':
    case 'create': {
      const kind = form.dataset.send==='post' ? 'x' : form.dataset.platform;
      const id = 'user'+Date.now().toString(36);
      state.posts.unshift({id,by:'meira',time:now(),text:value,platform:kind,image:fields.has('image'),likes:0,replies:0,reposts:0,views:0});
      state.postQueue.push(
        {id,at:now()+5,likes:19,views:250,reply:{by:'maya',text:'I still can’t believe this is your actual Tuesday.'}},
        {id,at:now()+17,likes:62,views:1195,reply:{by:'jules',text:'Somebody at the observatory just showed me this. Everyone here is rooting for you.'}},
        {id,at:now()+37,likes:117,views:2218}
      );
      if (kind==='x') { drafts.post = ''; tab = 'for-you'; }
      form.reset();
      if ($('dialog').open) $('dialog').close();
      go(kind);
      toast(kind==='ig'?'Post shared to Instagram.':'Post sent.');
      break;
    }
    case 'message': {
      const sent = state.inbox[thread].filter(m=>m.mine).length;
      state.inbox[thread].push({mine:true,text:value,time:now()});
      state.queue.push({by:thread,at:now()+6+(state.queue.filter(q=>q.by===thread).length*4),text:repliesByPerson[thread][sent%repliesByPerson[thread].length]});
      drafts['message-'+thread] = '';
      form.reset();
      break;
    }
    case 'reply': {
      const p = findPost(activePost);
      if (!p) return;
      const record = state.interactions[p.id] ||= {};
      (record.comments ||= []).push(value);
      replyModal(p);
      $('dialog').querySelector('textarea').focus();
      toast('Reply posted.');
      break;
    }
    case 'story':
      state.story = value;
      $('dialog').close();
      toast('Story shared.');
      break;
  }
  save();
  render();
});
document.addEventListener('click', e=>{
  const button = e.target.closest('button');
  if (!button || drawing) return;
  const d = button.dataset;
  if (button.id==='settings') return settings();
  if ('close' in d) return $('dialog').close();
  if (d.route) return go(d.route);
  if (d.article) return go('press/'+d.article);
  if (d.trend) { searchQuery = d.trend; return go('search'); }
  if (d.tab) { tab=d.tab; return render(); }
  if (d.follow) {
    state.follows[d.follow] = !state.follows[d.follow];
    save();
    return render();
  }
  if ('compose' in d) {
    const kind = getRoute()[0]==='ig'?'ig':platform;
    modal(kind==='ig'?'Create new post':'Compose post',`<form data-send="create" data-platform="${kind}"><textarea class="field" required name="text" maxlength="${kind==='ig'?2200:280}" aria-label="Post text" placeholder="${kind==='ig'?'Write a caption…':'What is happening?'}"></textarea>${kind==='ig'?'<label><input type="checkbox" name="image" checked> Attach the mission illustration</label>':''}<button class="primary">${kind==='ig'?'Share':'Post'}</button></form>`);
    return $('dialog').querySelector('textarea').focus();
  }
  if (d.story) {
    if (d.story==='meira') {
      return modal('Your story',`<form data-send="story"><textarea class="field" required maxlength="280" name="text" aria-label="Story text" placeholder="Add to your story">${h(state.story||'')}</textarea><button class="primary">Share story</button></form>`);
    }
    const story = {nasa:'Behind the scenes in Houston. The start of a very long journey.',gallatin:'From Washington Square to the Moon. We’re so proud of our alum.',eli:'Houston. Right before the cameras came on.',maya:'That’s my friend up there. I am going to be saying this for the rest of my life.'};
    return modal(people[d.story][0]+`’s story`,`<img src="./assets/crew.webp" alt="Fictional mission illustration"><p>${story[d.story]}</p>`);
  }
  if (d.control) {
    if (d.control==='pause') state.paused = !state.paused;
    if (d.control==='speed') state.speed = state.speed===1?4:1;
    if (d.control==='next' && state.event<releases.length) {
      state.seconds = Math.max(state.seconds,releases[state.event].at);
      tick();
    }
    if (d.control==='reset') return modal('Restart announcement day?', '<p>This clears your posts, reactions, messages, and story progress in this browser.</p><button class="primary" data-control="confirm-reset">Restart</button> <button class="ghost" data-control="cancel">Cancel</button>');
    if (d.control==='confirm-reset') {
      state=fresh();
      Object.keys(drafts).forEach(k=>delete drafts[k]);
      tab='for-you';
      thread='mom';
      searchQuery='';
      $('dialog').close();
      go('x');
      toast('Announcement day restarted.');
      return;
    }
    save();
    render();
    return settings();
  }
  if (d.share) {
    const p = findPost(d.share);
    if (!p || !Object.hasOwn(state.inbox,d.to)) return;
    const sent = state.inbox[d.to].filter(m=>m.mine).length;
    state.inbox[d.to].push({mine:true,text:`Shared a post from ${people[p.by][0]}: ${p.text}`,time:now()});
    state.queue.push({by:d.to,at:now()+6,text:repliesByPerson[d.to][sent%repliesByPerson[d.to].length]});
    save();
    $('dialog').close();
    return toast('Post shared in Messages.');
  }
  if (d.action) {
    const p = findPost(d.id);
    if (!p) return;
    if (d.action==='reply') return replyModal(p);
    if (d.action==='share') return modal('Send to…', `<div class="modal-actions">${Object.keys(state.inbox).map(by=>`<button class="ghost" data-share="${p.id}" data-to="${by}">${people[by][0]}</button>`).join('')}</div>`);
    const record = state.interactions[p.id] ||= {};
    record[d.action] = !record[d.action];
    save();
    if (d.action==='save') toast(record.save?'Added to bookmarks.':'Removed from bookmarks.');
    render();
  }
});
window.addEventListener('hashchange', onRoute);
window.addEventListener('storage', e=>{
  if (e.key!==key || !e.newValue) return;
  try { state=JSON.parse(e.newValue); render(); } catch { /* Keep current session. */ }
});
onRoute();
setInterval(()=>{
  if (!state.paused && (state.event<releases.length || state.queue.length || state.postQueue.length)) {
    state.seconds += state.speed;
    tick();
  }
},1000);
