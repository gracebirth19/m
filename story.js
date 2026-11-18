const people = {
  meira: ['Meira Berlow', 'meiraberlow', 'MB', 'meira', true],
  nasa: ['NASA', 'NASA', 'NASA', 'nasa', true],
  gallatin: ['NYU Gallatin', 'NYUGallatin', 'NYU', 'nyu', true],
  orbit: ['The Orbital Desk', 'OrbitalDesk', 'OD', 'orbit', true],
  maya: ['Maya Chen', 'mayachen', 'MC', 'maya', false],
  eli: ['Eli Navarro', 'elinavarro', 'EN', 'eli', false],
  jules: ['Jules Park', 'julespark', 'JP', 'jules', false],
  director: ['Riley Morgan', 'rileymorgan', 'RM', 'director', false],
  mom: ['Mom', 'mom', 'M', 'mom', false]
};

const seedPosts = [
  {id:'nasa', by:'nasa', time:-4, text:'Meet the inaugural Mars astronaut class.\n\nMeira Berlow, Daniel Okafor, and Lucas Ito will train for a 2046 lunar surface expedition, a proving mission for the first crewed landing on Mars.\n\nOne crew. Two worlds.', image:true, label:'MISSION PROFILE', likes:24800, replies:1260, reposts:8500, views:641000},
  {id:'nyu', by:'gallatin', time:-7, text:'From Gallatin to the Moon. 🌙\n\nCongratulations to Meira Berlow on her selection to NASA’s inaugural Mars class. We remember the student who kept asking what happens when you bring astronomy and information systems into the same room.', likes:4400, replies:189, reposts:610, views:51200},
  {id:'orbit', by:'orbit', time:-11, text:'The crew’s 2046 lunar expedition will put Mars surface systems through a month of real fieldwork. Berlow, who worked on the TIGERISS project at Goddard, will lead the crew’s surface science planning.', likes:3100, replies:208, reposts:435, views:49800},
  {id:'maya', by:'maya', time:-15, text:'Meira once talked me through how to find Saturn through a telescope in the freezing cold. Really struggling to be normal about the fact that I just saw her on the NASA livestream.', likes:809, replies:39, reposts:73, views:11900}
];

const releases = [
  {at:16, by:'nasa', text:'The astronaut class is on its way to the press room. When we asked Meira what she wanted to bring to the lunar surface, she said a notebook and a very good pencil.', likes:1740, replies:88, reposts:193, views:29500, platform:'x', note:'NASA posted an update from the press room.', dm:['maya','Are you watching the livestream replay? You squeezed your own hands right before they called your name. I knew immediately.']},
  {at:35, by:'eli', text:'Just filed my first photo from today’s announcement. That split second when Meira realized the entire room was standing up is the one I keep coming back to.', likes:819, replies:55, reposts:105, views:16100, platform:'ig', image:true, note:'Eli Navarro tagged you in a photo on Instagram.', dm:['mom','I wanted to let you have a minute before I texted again. I’m still sitting where I watched it. I don’t think I’ve moved.']},
  {at:57, by:'orbit', text:'One detail from the briefing worth getting right. The class trains for a lunar expedition in 2046. Its Mars landing would follow, after NASA reviews the lunar mission and its surface systems.', likes:2185, replies:204, reposts:335, views:37600, platform:'x', note:'The Orbital Desk published its lunar mission explainer.', article:'surface'},
  {at:80, by:'gallatin', text:'An astronomy student stopped us on Washington Square today to say she’d switched her concentration topic after hearing Meira speak. If that was you, send us a note. We’d love to hear what you’re working on.', likes:1240, replies:102, reposts:146, views:28300, platform:'x', note:'NYU Gallatin mentioned you in a new post.', dm:['director','Public affairs is putting together tomorrow’s Q&A. You can pick one question to answer first. I’d love to hear what you wish someone had told you when you were starting out.']},
  {at:103, by:'nasa', text:'To everyone who asked for a closer look at the patch, here it is. The three stars are for the three people who will spend the next twenty years learning how to work as one crew.', image:true, likes:3271, replies:125, reposts:510, views:40800, platform:'ig', note:'NASA shared a new crew photo on Instagram.'},
  {at:127, by:'jules', text:'I’m saving every single screenshot from today. In twenty years when you come back from the Moon, I am making you watch this extremely embarrassing slideshow.', likes:975, replies:38, reposts:54, views:15000, platform:'x', note:'Jules Park mentioned you on X.', dm:['jules','I’m taking a walk to let my phone cool down, but I need to know what *you* want to do tonight. A quiet dinner? Just sit somewhere? I’m around.']},
  {at:155, by:'eli', text:'The last reporters have left. There are three empty water glasses on the podium and a handwritten sign taped to the press room door that says CREW ONLY. That was the moment it really hit me.', likes:897, replies:51, reposts:87, views:20100, platform:'x', note:'Eli Navarro shared a dispatch from Houston.', article:'room'},
  {at:184, by:'nasa', text:'Signing off from Houston. Tomorrow the crew meets the engineers working on the lunar habitat. Today, they’re going home to their families. Thank you for being here for the beginning.', likes:6903, replies:249, reposts:1160, views:93600, platform:'x', note:'NASA wrapped up the announcement day.'}
];

const instagram = [
  {id:'ipress', by:'nasa', time:-5, text:'The inaugural Mars astronaut class. Meira Berlow, Daniel Okafor, and Lucas Ito will head to the Moon in 2046 as NASA prepares for a first crewed landing on Mars. 🌙', image:true, likes:36200, replies:905, reposts:0, views:0},
  {id:'inyu', by:'gallatin', time:-10, text:'From Washington Square to a lunar horizon. Congratulations, Meira. 💜', image:true, likes:8410, replies:184, reposts:0, views:0}
];
const seedInbox = {
  mom:[{text:'I saw you walk out. Your name was on the screen. I just kept reading it over and over. I’m so proud of you.', time:-2}],
  maya:[{text:'MEIRA. I’m in a bodega and they just put your face on the TV over the counter.', time:-3},{text:'The cashier thinks I’m lying when I say I know you.', time:-2}],
  director:[{text:'You’re clear for the afternoon. Eat something, mute the group chat if you need to, and call me when you’re ready to talk about tomorrow.', time:-4}],
  jules:[{text:'The observatory group chat is just a solid wall of moon emojis right now. I put one in for you.', time:-6}]
};
const repliesByPerson = {
  mom:['I’d love to hear your version of the day when you have the energy. I have time.', 'Whatever the rest of the world does with this, you can always just call me.', 'I keep replaying the part where you stepped up to the microphone. Call me when you’re home.'],
  maya:['Okay, I’m putting my phone on silent after this. But first, you were so good up there.', 'I’m free later. We can sit somewhere quiet and you can tell me everything.', 'You get to decide how much of today you want to share. The rest can just be yours.'],
  director:['Thanks for the update. I’ll be here through the end of the briefing if you need me.', 'Take the evening. We’ll go over tomorrow’s schedule together in the morning.', 'I’ll leave a little room in the morning schedule for us to talk this through.'],
  jules:['I was serious about dinner. I can meet you wherever you end up.', 'I saved a screenshot of the exact moment your name came up. I’ll send it to you later.', 'You can absolutely go quiet for a bit. I’ll still be here when your phone comes back on.']
};
const articles = [
  {id:'release', outlet:'NASA NEWS', title:'NASA introduces inaugural Mars astronaut class', dek:'Three astronauts will train for a 2046 lunar expedition ahead of the first crewed Mars landing.', time:'2:00 PM EST', image:true, body:['HOUSTON — NASA introduced the three members of its inaugural Mars astronaut class on Tuesday at Johnson Space Center. Meira Berlow, Daniel Okafor, and Lucas Ito will train for a lunar surface expedition planned for 2046, twenty years after today’s announcement.', 'Berlow, the only woman in the class, brings experience working on the TIGERISS project at Goddard and operating telescopes at UMBC. She will lead surface science planning and help the crew develop procedures for documenting field observations during long excursions.', 'The three are slated to become part of the first crew to land on Mars, subject to review after the lunar mission. The lunar expedition will give engineers an opportunity to study how the crew maintains a habitat and conducts field science far from Earth.']},
  {id:'campus', outlet:'WASHINGTON SQUARE DISPATCH', title:'The path from Washington Square to a lunar crew', dek:'The Gallatin community reacts to an alum’s selection to the first Mars class.', time:'2:08 PM EST', body:['Students watching the announcement around Washington Square heard a familiar name when NASA introduced its new crew. Berlow designed her own concentration at NYU Gallatin around astronomy, data, and information systems.', 'The observatory at UMBC was another part of that path. As a telescope operator, Berlow learned to explain what visitors were seeing and to point out what a photograph of the night sky could miss. On the Moon, she’ll help decide what to record when a photograph alone leaves out the context of a discovery.']},
  {id:'surface', outlet:'THE ORBITAL DESK', title:'Why a Mars crew is headed to the Moon first', dek:'A month of lunar fieldwork will test the systems the crew will depend on farther from home.', time:'2:24 PM EST', at:57, body:['The 2046 expedition gives NASA a chance to put a habitat, a science team, and a maintenance plan in the same place for a month. The team will rehearse instrument repairs and plan sample collection around the limited hours available outside the habitat.', 'The Mars landing is a separate mission. NASA plans to review the lunar expedition before confirming the surface plan and a launch window for Mars.']},
  {id:'room', outlet:'THE ORBITAL DESK', title:'The last five minutes inside the press room', dek:'After the cameras went dark, three future crewmates had a minute to themselves.', time:'4:12 PM EST', at:155, body:['The crew posed for one last photo after the briefing. Berlow asked the crew’s photographer to take a second one with the technicians who had been standing against the back wall.', 'The three stayed at the stage while the camera crew packed up. Eventually someone from public affairs held the door open and told them it was finally quiet enough to leave.']}
];
