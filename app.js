const STORAGE_KEY = "studieportal-data";
const uid = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
const TIMEEDIT_URL = "https://cloud.timeedit.net/hvl/web/studenthau/riqYZy470gvZ57QZQ285701Q6Q166XQYq1261Z0Q60o3oY6.html";

const SUBJECTS = [
  {id:"msb102",code:"MSB102",name:"Innovasjonsteori og praksis",color:"#d56b47"},
  {id:"msb104",code:"MSB104",name:"Økonometri",color:"#8557a6"},
  {id:"data-science",code:"MSB105",name:"Data Science",color:"#cc4d78"}
];

const CLASS_ROWS = [
  ["2026-08-18T10:15","data-science"],["2026-08-20T12:15","data-science"],["2026-08-21T10:15","data-science"],["2026-08-24T10:15","msb102"],["2026-08-25T10:15","data-science"],["2026-08-27T12:15","data-science"],["2026-08-28T10:15","data-science"],["2026-08-31T10:15","msb102"],
  ["2026-09-01T10:15","data-science"],["2026-09-02T10:15","msb104"],["2026-09-03T12:15","data-science"],["2026-09-03T14:15","msb104"],["2026-09-04T10:15","data-science"],["2026-09-04T12:15","msb104"],["2026-09-07T10:15","msb102"],["2026-09-08T10:15","data-science"],["2026-09-09T10:15","msb104"],["2026-09-10T12:15","data-science"],["2026-09-10T14:15","msb104"],["2026-09-11T08:15","data-science"],["2026-09-11T10:15","msb102"],["2026-09-11T12:15","msb104"],
  ["2026-09-15T10:15","data-science"],["2026-09-16T10:15","msb104"],["2026-09-16T12:15","data-science"],["2026-09-17T12:15","data-science"],["2026-09-17T14:15","msb104"],["2026-09-18T10:15","data-science"],["2026-09-18T12:15","msb104"],["2026-09-22T10:15","data-science"],["2026-09-23T08:15","msb102"],["2026-09-24T12:15","data-science"],["2026-09-24T14:15","msb104"],["2026-09-25T10:15","data-science"],["2026-09-25T12:15","msb104"],["2026-09-28T10:15","msb102"],["2026-09-29T10:15","data-science"],
  ["2026-10-01T10:15","msb104"],["2026-10-01T12:15","data-science"],["2026-10-01T14:15","msb104"],["2026-10-02T08:15","data-science"],["2026-10-02T10:15","msb102"],["2026-10-02T12:15","msb104"],["2026-10-05T10:15","msb102"],["2026-10-09T10:15","msb102"],["2026-10-13T10:15","data-science"],["2026-10-14T10:15","msb104"],["2026-10-15T12:15","msb104"],["2026-10-16T10:15","data-science"],["2026-10-16T12:15","msb104"],["2026-10-20T10:15","data-science"],["2026-10-21T10:15","msb104"],["2026-10-22T12:15","msb104"],["2026-10-23T10:15","data-science"],["2026-10-23T12:15","msb104"],["2026-10-27T10:15","data-science"],["2026-10-29T10:15","msb104"],["2026-10-30T10:15","data-science"],["2026-10-30T12:15","msb104"],
  ["2026-11-03T10:15","data-science"],["2026-11-04T10:15","msb104"],["2026-11-05T12:15","msb104"],["2026-11-06T10:15","data-science"],["2026-11-06T12:15","msb104"],["2026-11-10T10:15","data-science"],["2026-11-12T10:15","msb104"],["2026-11-12T12:15","msb104"],["2026-11-13T10:15","data-science"],["2026-11-13T12:15","msb104"]
];
const TIMEEDIT_DETAILS = {
  "2026-08-24T10:15|msb102":["2026-08-24T12:00","Digital undervisning"],"2026-08-25T10:15|data-science":["2026-08-25T12:00","HGSD2084 DAK-lab"],"2026-08-27T12:15|data-science":["2026-08-27T16:00","HGSD Auditorium F"],"2026-08-28T10:15|data-science":["2026-08-28T14:00","HGSD Auditorium E"],"2026-08-31T10:15|msb102":["2026-08-31T12:00","Digital undervisning"],
  "2026-09-01T10:15|data-science":["2026-09-01T12:00","HGSD2084 DAK-lab"],"2026-09-02T10:15|msb104":["2026-09-02T12:00","HGSD2008"],"2026-09-03T12:15|data-science":["2026-09-03T14:00","HGSD Auditorium F"],"2026-09-03T14:15|msb104":["2026-09-03T16:00","HGSD Auditorium F"],"2026-09-04T10:15|data-science":["2026-09-04T12:00","HGSD Auditorium E"],"2026-09-04T12:15|msb104":["2026-09-04T14:00","HGSD2084 DAK-lab"],"2026-09-07T10:15|msb102":["2026-09-07T12:00","Digital undervisning"],"2026-09-08T10:15|data-science":["2026-09-08T12:00","HGSD2084 DAK-lab"],"2026-09-09T10:15|msb104":["2026-09-09T12:00","SIM3041 Seminarrom"],"2026-09-10T12:15|data-science":["2026-09-10T14:00","HGSD Auditorium C"],"2026-09-10T14:15|msb104":["2026-09-10T16:00","HGSD Auditorium C"],"2026-09-11T08:15|data-science":["2026-09-11T10:00","HGSD2008"],"2026-09-11T10:15|msb102":["2026-09-11T12:00","Digital undervisning"],"2026-09-11T12:15|msb104":["2026-09-11T14:00","HGSD2084 DAK-lab"],
  "2026-09-16T10:15|msb104":["2026-09-16T12:00","HGSD Auditorium F"],"2026-09-16T12:15|data-science":["2026-09-16T14:00","HGSD Auditorium F"],"2026-09-17T12:15|data-science":["2026-09-17T14:00","HGSD Auditorium E"],"2026-09-17T14:15|msb104":["2026-09-17T16:00","HGSD Auditorium E"],"2026-09-18T10:15|data-science":["2026-09-18T12:00","SIM3041 Seminarrom"],"2026-09-18T12:15|msb104":["2026-09-18T14:00","HGSD2084 DAK-lab"],"2026-09-22T10:15|data-science":["2026-09-22T12:00","HGSD2084 DAK-lab"],"2026-09-23T08:15|msb102":["2026-09-23T14:00","HGSD2083"],"2026-09-24T12:15|data-science":["2026-09-24T14:00","HGSD Auditorium F"],"2026-09-24T14:15|msb104":["2026-09-24T16:00","HGSD2083"],"2026-09-25T10:15|data-science":["2026-09-25T12:00","HGSD Auditorium C"],"2026-09-25T12:15|msb104":["2026-09-25T14:00","HGSD2084 DAK-lab"]
};
const DEFAULT_CLASSES = CLASS_ROWS.map(([date,subject])=>{const details=TIMEEDIT_DETAILS[`${date}|${subject}`];return {id:`class-${date}-${subject}`,type:"class",title:"Undervisning",subject,date,endDate:details?.[0]||addHoursString(date,2),location:details?.[1]||"",note:"",done:false,source:"timeedit-manual"};});
const DEFAULT_STUDY = [
  {id:"deadline-msb102-group",type:"deadline",title:"Sende gruppe + tema for PowerPoint og essay",subject:"msb102",date:"2026-08-24T23:59",done:false},
  {id:"deadline-msb102-presentation",type:"deadline",title:"Presentasjon",subject:"msb102",date:"2026-09-23T10:00",done:false},
  {id:"deadline-msb102-midterm",type:"deadline",title:"Midterm evaluation",subject:"msb102",date:"2026-10-01T10:00",done:false},
  {id:"deadline-msb102-essay",type:"deadline",title:"Essay",subject:"msb102",date:"2026-11-10T23:59",done:false},
  {id:"deadline-msb102-task",type:"deadline",title:"Oppgave",subject:"msb102",date:"2026-11-14T14:00",done:false},
  {id:"exam-msb102",type:"exam",title:"Skoleeksamen - 5 timer",subject:"msb102",date:"2026-12-08T09:00",endDate:"2026-12-08T14:00",done:false},
  {id:"exam-msb104",type:"exam",title:"Eksamen - 4 timer",subject:"msb104",date:"2026-12-11T09:00",endDate:"2026-12-11T13:00",done:false}
];

function addHoursString(value,hours){const d=new Date(value);d.setHours(d.getHours()+hours);return localDateTime(d);}
function localDateTime(date){const d=new Date(date);const z=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`;}
function freshData(){return {version:2,subjects:SUBJECTS.map(x=>({...x})),items:[...DEFAULT_STUDY.map(x=>({...x})),...DEFAULT_CLASSES.map(x=>({...x}))],todos:[],settings:{hourlyWage:0,timeEditUrl:TIMEEDIT_URL}};}
function loadData(){
  let parsed;
  try{parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");}catch{parsed=null;}
  if(!parsed)return freshData();
  parsed.subjects=Array.isArray(parsed.subjects)?parsed.subjects:[];
  SUBJECTS.forEach(subject=>{const existing=parsed.subjects.find(x=>x.id===subject.id);existing?Object.assign(existing,subject):parsed.subjects.push({...subject});});
  parsed.items=Array.isArray(parsed.items)?parsed.items:[];
  parsed.items=parsed.items.filter(item=>!(item.type==="class"&&String(item.id||"").startsWith("class-")));
  const ids=new Set(parsed.items.map(x=>x.id));
  [...DEFAULT_STUDY,...DEFAULT_CLASSES].forEach(item=>{if(!ids.has(item.id)&&!parsed.items.some(x=>x.type===item.type&&x.subject===item.subject&&x.date===item.date))parsed.items.push({...item});});
  parsed.todos=Array.isArray(parsed.todos)?parsed.todos:[];
  parsed.settings={hourlyWage:0,timeEditUrl:TIMEEDIT_URL,...parsed.settings};
  parsed.version=2;
  return parsed;
}
let data=loadData();
let calendarDate=startOfWeek(new Date());
let calendarMode="week";
let calendarFilters=new Set(["school","work","training","event","private"]);
let todoFilter="all";
let selectedSubjectId=null;
persist();

const LABELS={school:"Skole",work:"Jobb",training:"Trening",event:"Arrangement",private:"Privat",other:"Annet",class:"Undervisning",deadline:"Frist",exam:"Eksamen",shift:"Jobbvakt"};
const ICONS={school:"▤",work:"▣",training:"◆",event:"○",private:"⌂",other:"·"};
const VIEW_TITLES={dashboard:"Oversikt",calendar:"Kalender",todos:"Gjøremål",study:"Studie",work:"Jobb",training:"Trening",events:"Arrangementer"};
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data));window.cloudDashboard?.schedule();}
window.getDashboardData=()=>JSON.parse(JSON.stringify(data));
window.applyCloudDashboard=payload=>{if(!payload||typeof payload!=="object")return;localStorage.setItem(STORAGE_KEY,JSON.stringify(payload));data=loadData();renderAll();};
function esc(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function toDate(v){return v?new Date(v):null;}
function startOfDay(v){const d=new Date(v);d.setHours(0,0,0,0);return d;}
function startOfWeek(v){const d=startOfDay(v),day=d.getDay()||7;d.setDate(d.getDate()-day+1);return d;}
function endOfWeek(v){const d=startOfWeek(v);d.setDate(d.getDate()+7);return d;}
function formatDate(v,opts={day:"numeric",month:"short"}){return toDate(v).toLocaleDateString("nb-NO",opts);}
function formatTime(v){return toDate(v).toLocaleTimeString("nb-NO",{hour:"2-digit",minute:"2-digit"});}
function formatRange(item){return item.endDate?`${formatTime(item.date)}-${formatTime(item.endDate)}`:formatTime(item.date);}
function eventEnd(item){return item.endDate?toDate(item.endDate):new Date(toDate(item.date).getTime()+1);}
function overlaps(item,start,end){return toDate(item.date)<end&&eventEnd(item)>start;}
function formatDateSpan(item){const start=toDate(item.date),end=toDate(item.endDate);if(end&&start.toDateString()!==end.toDateString())return `${formatDate(start,{day:"numeric",month:"short"})} - ${formatDate(end,{day:"numeric",month:"short",year:"numeric"})}`;return formatDate(start,{weekday:"short",day:"numeric",month:"short"});}
function dayDiff(v){return Math.ceil((startOfDay(v)-startOfDay(new Date()))/86400000);}
function countdown(v){const d=dayDiff(v);return d<0?"Passert":d===0?"I dag":d===1?"I morgen":`${d} dager igjen`;}
function categoryOf(item){return ["class","deadline","exam"].includes(item.type)?"school":item.type==="shift"?"work":item.type==="event"?"event":item.type==="training"?"training":"private";}
function subjectById(id){return data.subjects.find(s=>s.id===id)||{code:"",name:"Ukjent fag",color:"#4077c8"};}
function upcoming(type){return data.items.filter(i=>(!type||i.type===type)&&toDate(i.date)>=new Date()&&!i.done).sort((a,b)=>toDate(a.date)-toDate(b.date));}
function durationHours(item){const start=toDate(item.date),end=toDate(item.endDate);return end&&end>start?(end-start)/3600000:item.type==="class"?2:0;}
function empty(text){return `<div class="empty">${esc(text)}</div>`;}
function toast(text){const el=document.getElementById("toast");el.textContent=text;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2200);}

function eventRow(item,removable=true){
  const subject=subjectById(item.subject),cat=categoryOf(item);
  const subtitle=item.subject?`${subject.code} - ${subject.name}`:LABELS[cat];
  return `<div class="event-row"><span class="event-mark type-${esc(item.type)}"></span><div><h3>${esc(item.title)}</h3><p>${esc(subtitle)}${item.location?` · ${esc(item.location)}`:""} · ${formatDateSpan(item)}</p></div><div class="event-time"><strong>${formatRange(item)}</strong><span>${countdown(item.date)}</span>${removable?`<button class="delete-btn" data-delete-event="${esc(item.id)}" title="Slett">×</button>`:""}</div></div>`;
}
function todoRow(todo,removable=true){
  const due=todo.due?`${formatDate(todo.due,{day:"numeric",month:"short"})}${todo.hasTime?` kl. ${formatTime(todo.due)}`:""} · ${countdown(todo.due)}`:"Ingen dato";
  const subject=todo.subject?subjectById(todo.subject):null;
  return `<div class="todo-item ${todo.done?"done":""}"><button class="todo-check" data-toggle-todo="${esc(todo.id)}" aria-label="Merk som ${todo.done?"ikke ferdig":"ferdig"}">✓</button><div><div class="todo-title">${esc(todo.title)}</div><div class="todo-meta"><span class="badge">${esc(subject?subject.code:(LABELS[todo.category]||"Annet"))}</span><span class="${todo.priority==="high"?"priority-high":""}">${esc(due)}</span></div></div>${removable?`<button class="delete-btn" data-delete-todo="${esc(todo.id)}" title="Slett">×</button>`:""}</div>`;
}

function renderDashboard(){
  const now=new Date(),todayStart=startOfDay(now),tomorrow=new Date(todayStart);tomorrow.setDate(tomorrow.getDate()+1);
  const todayItems=data.items.filter(i=>toDate(i.date)>=todayStart&&toDate(i.date)<tomorrow).sort((a,b)=>toDate(a.date)-toDate(b.date));
  const next=upcoming()[0];
  document.getElementById("greeting-title").textContent=todayItems.length?`Du har ${todayItems.length} ${todayItems.length===1?"ting":"ting"} på planen i dag.`:"Dagen er åpen.";
  document.getElementById("greeting-copy").textContent=todayItems.length?"Her er det viktigste, samlet på ett sted.":"Legg til et gjøremål eller bruk kalenderen til å planlegge.";
  document.getElementById("next-title").textContent=next?next.title:"Ingen kommende hendelser";
  document.getElementById("next-meta").textContent=next?`${LABELS[categoryOf(next)]} · ${formatDate(next.date,{weekday:"long",day:"numeric",month:"long"})} · ${formatRange(next)}`:"";
  document.getElementById("next-countdown").textContent=next?countdown(next.date):"";
  document.getElementById("next-dot").style.background=next?`var(--${categoryOf(next)})`:"var(--private)";
  const setStat=(type,titleId,metaId,labelFn)=>{
    const item=upcoming(type)[0];document.getElementById(titleId).textContent=item?labelFn(item):"Ingen";document.getElementById(metaId).textContent=item?`${formatDate(item.date)} · ${countdown(item.date)}`:"Ikke registrert";
  };
  setStat("exam","dash-exam","dash-exam-meta",x=>subjectById(x.subject).name);
  setStat("shift","dash-shift","dash-shift-meta",x=>x.title);
  setStat("training","dash-training","dash-training-meta",x=>x.title);
  setStat("event","dash-event","dash-event-meta",x=>x.title);
  document.getElementById("today-timeline").innerHTML=todayItems.length?todayItems.map(i=>`<div class="timeline-item"><time>${formatTime(i.date)}</time><span class="timeline-line type-${i.type}"></span><div><strong>${esc(i.title)}</strong><small>${esc(i.subject?subjectById(i.subject).code:LABELS[categoryOf(i)])}${i.location?` · ${esc(i.location)}`:""}</small></div></div>`).join(""):empty("Ingen hendelser i dag.");
  const activeTodos=data.todos.filter(t=>!t.done).sort(todoSort);
  document.getElementById("dashboard-todos").innerHTML=activeTodos.length?activeTodos.slice(0,5).map(t=>todoRow(t,false)).join(""):empty("Du har ingen åpne gjøremål.");
  const soon=data.items.filter(i=>toDate(i.date)>=now&&["deadline","event","exam"].includes(i.type)).sort((a,b)=>toDate(a.date)-toDate(b.date)).slice(0,5);
  document.getElementById("coming-soon").innerHTML=soon.length?soon.map(i=>`<div class="mini-item"><div class="mini-date"><strong>${toDate(i.date).getDate()}</strong>${formatDate(i.date,{month:"short"})}</div><div><strong>${esc(i.title)}</strong><small>${esc(i.subject?subjectById(i.subject).code:LABELS[categoryOf(i)])} · ${countdown(i.date)}</small></div></div>`).join(""):empty("Ingenting registrert.");
  renderWeekSummary();
}
function renderWeekSummary(){
  const start=startOfWeek(new Date()),end=endOfWeek(start),items=data.items.filter(i=>toDate(i.date)>=start&&toDate(i.date)<end);
  const hours=type=>items.filter(i=>i.type===type).reduce((sum,i)=>sum+durationHours(i),0);
  const schoolHours=items.filter(i=>i.type==="class").reduce((s,i)=>s+durationHours(i),0),eventCount=items.filter(i=>i.type==="event").length;
  const remaining=data.todos.filter(t=>!t.done&&(!t.due||(toDate(t.due)>=start&&toDate(t.due)<end))).length;
  const dayLoad=Array.from({length:7},(_,index)=>{const d=new Date(start);d.setDate(d.getDate()+index);const next=new Date(d);next.setDate(next.getDate()+1);return {date:d,value:items.filter(i=>toDate(i.date)>=d&&toDate(i.date)<next).reduce((s,i)=>s+Math.max(durationHours(i),1),0)};});
  const busiest=dayLoad.sort((a,b)=>b.value-a.value)[0];
  document.getElementById("week-number").textContent=`Uke ${getWeekNumber(start)}`;
  document.getElementById("week-summary").innerHTML=[
    ["Skole",`${schoolHours.toLocaleString("nb-NO",{maximumFractionDigits:1})} t`],["Jobb",`${hours("shift").toLocaleString("nb-NO",{maximumFractionDigits:1})} t`],["Trening",`${hours("training").toLocaleString("nb-NO",{maximumFractionDigits:1})} t`],["Arrangementer",eventCount],["Gjøremål",remaining],["Travleste dag",busiest.value?formatDate(busiest.date,{weekday:"long"}):"Ingen"]
  ].map(([a,b])=>`<div class="week-stat"><span>${a}</span><strong>${b}</strong></div>`).join("");
}
function getWeekNumber(value){const d=new Date(Date.UTC(value.getFullYear(),value.getMonth(),value.getDate()));d.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));const y=new Date(Date.UTC(d.getUTCFullYear(),0,1));return Math.ceil((((d-y)/86400000)+1)/7);}

function renderCalendar(){
  const categories=["school","work","training","event","private"];
  document.getElementById("calendar-filters").innerHTML=categories.map(c=>`<button class="filter-chip ${calendarFilters.has(c)?"active":""}" data-calendar-filter="${c}"><i style="background:var(--${c})"></i>${LABELS[c]}</button>`).join("");
  document.querySelectorAll("[data-calendar-mode]").forEach(b=>b.classList.toggle("active",b.dataset.calendarMode===calendarMode));
  calendarMode==="week"?renderWeekCalendar():renderMonthCalendar();
}
function filteredCalendarItems(start,end){return data.items.filter(i=>calendarFilters.has(categoryOf(i))&&overlaps(i,start,end)).sort((a,b)=>toDate(a.date)-toDate(b.date));}
function calendarEvent(item,dayStart,dayEnd){const subject=item.subject?subjectById(item.subject):null;const title=subject?`${subject.code} ${subject.name}`:item.title;const meta=item.location||LABELS[categoryOf(item)],start=toDate(item.date),end=eventEnd(item),startsBefore=start<dayStart,endsToday=Boolean(item.endDate)&&end<=dayEnd;const timeLabel=startsBefore?(endsToday?`Til ${formatTime(item.endDate)}`:"Hele dagen"):(item.endDate&&end>dayEnd?`${formatTime(item.date)} →`:formatTime(item.date));return `<button class="calendar-event type-${item.type}" data-view-event="${esc(item.id)}" title="Åpne detaljer for ${esc(title)}"><strong>${esc(timeLabel)} ${esc(title)}</strong><span>${esc(meta)}</span></button>`;}
function renderWeekCalendar(){
  const start=startOfWeek(calendarDate),end=endOfWeek(start),names=["Man","Tir","Ons","Tor","Fre","Lør","Søn"],items=filteredCalendarItems(start,end);
  document.getElementById("calendar-label").textContent=`${formatDate(start,{day:"numeric",month:"short"})} - ${formatDate(new Date(end-1),{day:"numeric",month:"short",year:"numeric"})}`;
  document.getElementById("calendar-content").innerHTML=`<div class="week-calendar">${names.map((name,index)=>{const d=new Date(start);d.setDate(d.getDate()+index);const n=new Date(d);n.setDate(n.getDate()+1);const list=items.filter(i=>overlaps(i,d,n));return `<div class="calendar-day ${d.toDateString()===new Date().toDateString()?"today":""}"><div class="calendar-day-head"><span>${name}</span><strong>${d.getDate()}</strong></div><div class="day-events">${list.map(i=>calendarEvent(i,d,n)).join("")}</div></div>`;}).join("")}</div>`;
}
function renderMonthCalendar(){
  const first=new Date(calendarDate.getFullYear(),calendarDate.getMonth(),1),gridStart=startOfWeek(first),gridEnd=new Date(gridStart);gridEnd.setDate(gridEnd.getDate()+42);const items=filteredCalendarItems(gridStart,gridEnd),names=["Man","Tir","Ons","Tor","Fre","Lør","Søn"];
  document.getElementById("calendar-label").textContent=first.toLocaleDateString("nb-NO",{month:"long",year:"numeric"});
  document.getElementById("calendar-content").innerHTML=`<div class="month-calendar">${names.map(n=>`<div class="month-weekday">${n}</div>`).join("")}${Array.from({length:42},(_,index)=>{const d=new Date(gridStart);d.setDate(d.getDate()+index);const n=new Date(d);n.setDate(n.getDate()+1);const list=items.filter(i=>overlaps(i,d,n));return `<div class="month-day ${d.getMonth()!==first.getMonth()?"outside":""} ${d.toDateString()===new Date().toDateString()?"today":""}"><strong>${d.getDate()}</strong><div class="month-day-events">${list.slice(0,4).map(i=>{const subject=i.subject?subjectById(i.subject):null;const label=subject?subject.code:i.title;const room=i.location?` · ${i.location}`:"",start=toDate(i.date),end=eventEnd(i),time=start<d?(i.endDate&&end<=n?`til ${formatTime(i.endDate)}`:"hele dagen"):(i.endDate&&end>n?`${formatTime(i.date)} →`:formatTime(i.date));return `<button class="month-event type-${i.type}" data-view-event="${esc(i.id)}" title="Åpne detaljer for ${esc(label)}">${esc(time)} ${esc(label+room)}</button>`;}).join("")}${list.length>4?`<small>+${list.length-4} flere</small>`:""}</div></div>`;}).join("")}</div>`;
}

function todoSort(a,b){if(a.done!==b.done)return a.done?1:-1;if(!a.due&&!b.due)return 0;if(!a.due)return 1;if(!b.due)return-1;return toDate(a.due)-toDate(b.due);}
function renderTodos(){
  const cats=["all","school","work","private","training","other"];
  document.getElementById("todo-filters").innerHTML=cats.map(c=>`<button class="filter-chip ${todoFilter===c?"active":""}" data-todo-filter="${c}">${c==="all"?"Alle":LABELS[c]}</button>`).join("");
  const filtered=data.todos.filter(t=>todoFilter==="all"||t.category===todoFilter).sort(todoSort);
  const dated=filtered.filter(t=>t.due&&!t.done),undated=filtered.filter(t=>!t.due&&!t.done),done=filtered.filter(t=>t.done);
  const section=(title,list)=>`<section class="todo-section"><h3>${title} · ${list.length}</h3><div class="todo-list">${list.length?list.map(t=>todoRow(t)).join(""):empty("Ingen gjøremål her.")}</div></section>`;
  document.getElementById("todo-sections").innerHTML=section("Med frist",dated)+section("Ingen dato",undated)+section("Ferdig",done);
}
function renderStudy(){
  document.getElementById("subject-grid").innerHTML=data.subjects.map(s=>{const related=upcoming().filter(i=>i.subject===s.id),next=related[0];const tasks=data.todos.filter(t=>t.subject===s.id&&!t.done).length;return `<article class="subject-card card" style="--subject-color:${esc(s.color||"#4077c8")}" data-subject-id="${esc(s.id)}" role="button" tabindex="0"><div class="subject-code">${esc(s.code)}</div><h3>${esc(s.name)}</h3><p class="muted">${related.length} kommende hendelser · ${tasks} åpne gjøremål</p>${next?`<p><strong>Neste:</strong> ${esc(next.title)}<br><span class="muted">${formatDate(next.date)} · ${formatTime(next.date)}</span></p>`:""}<span class="subject-open">Åpne emnet →</span></article>`;}).join("");
  const classes=upcoming("class").slice(0,12),assessments=upcoming().filter(i=>["deadline","exam"].includes(i.type)).slice(0,12);
  document.getElementById("study-classes").innerHTML=classes.length?classes.map(i=>eventRow(i,false)).join(""):empty("Ingen kommende undervisning.");
  document.getElementById("study-deadlines").innerHTML=assessments.length?assessments.map(i=>eventRow(i)).join(""):empty("Ingen kommende frister.");
  if(selectedSubjectId)renderSubjectDetail(selectedSubjectId);
}
function renderSubjectDetail(id){
  const subject=subjectById(id);if(!data.subjects.some(s=>s.id===id))return;
  selectedSubjectId=id;document.getElementById("study-overview").hidden=true;document.getElementById("subject-detail").hidden=false;
  const classes=upcoming("class").filter(i=>i.subject===id),assessments=upcoming().filter(i=>i.subject===id&&["deadline","exam"].includes(i.type));
  const todos=data.todos.filter(t=>t.subject===id).sort(todoSort);
  document.getElementById("subject-detail-content").innerHTML=`<article class="subject-hero card" style="--subject-color:${esc(subject.color||"#4077c8")}"><p class="eyebrow">${esc(subject.code)}</p><h2>${esc(subject.name)}</h2><p class="muted">${classes.length} forelesninger · ${assessments.length} frister/vurderinger · ${todos.filter(t=>!t.done).length} åpne gjøremål</p><button class="primary" data-add-subject-todo="${esc(id)}">+ Gjøremål for emnet</button></article><div class="subject-detail-grid"><article class="card"><div class="card-head"><div><p class="eyebrow">Plan</p><h2>Forelesninger</h2></div></div><div class="event-list">${classes.length?classes.map(i=>eventRow(i,false)).join(""):empty("Ingen kommende forelesninger.")}</div></article><article class="card"><div class="card-head"><div><p class="eyebrow">Vurdering</p><h2>Frister og eksamener</h2></div></div><div class="event-list">${assessments.length?assessments.map(i=>eventRow(i)).join(""):empty("Ingen kommende frister.")}</div></article><article class="card full"><div class="card-head"><div><p class="eyebrow">Arbeidsliste</p><h2>Gjøremål</h2></div></div><div class="todo-list">${todos.length?todos.map(t=>todoRow(t)).join(""):empty("Ingen gjøremål for dette emnet.")}</div></article></div>`;
}
function renderWork(){
  const now=new Date(),start=new Date(now.getFullYear(),now.getMonth(),1),end=new Date(now.getFullYear(),now.getMonth()+1,1),shifts=data.items.filter(i=>i.type==="shift").sort((a,b)=>toDate(a.date)-toDate(b.date)),month=shifts.filter(i=>toDate(i.date)>=start&&toDate(i.date)<end),hours=month.reduce((s,i)=>s+durationHours(i),0);
  document.getElementById("work-hours").textContent=`${hours.toLocaleString("nb-NO",{maximumFractionDigits:1})} t`;document.getElementById("work-shifts").textContent=month.length;document.getElementById("work-pay").textContent=`${Math.round(hours*(Number(data.settings.hourlyWage)||0)).toLocaleString("nb-NO")} kr`;
  const future=shifts.filter(i=>toDate(i.date)>=new Date());document.getElementById("work-list").innerHTML=future.length?future.map(i=>eventRow(i)).join(""):empty("Ingen kommende jobbvakter. Legg til den første vakten.");
}
function renderSimpleList(type,id,message){const list=upcoming(type);document.getElementById(id).innerHTML=list.length?list.map(i=>eventRow(i)).join(""):empty(message);}
function renderTraining(){
  const list=upcoming("training"),now=new Date(),monthStart=new Date(now.getFullYear(),now.getMonth(),1),monthEnd=new Date(now.getFullYear(),now.getMonth()+1,1),monthItems=data.items.filter(i=>i.type==="training"&&toDate(i.date)>=monthStart&&toDate(i.date)<monthEnd),hours=monthItems.reduce((sum,i)=>sum+durationHours(i),0),next=list[0];
  document.getElementById("training-next").textContent=next?next.title:"Ingen";document.getElementById("training-next-meta").textContent=next?`${formatDate(next.date,{weekday:"short",day:"numeric",month:"short"})} · ${formatRange(next)}`:"Ikke registrert";document.getElementById("training-month-count").textContent=monthItems.length;document.getElementById("training-month-hours").textContent=`${hours.toLocaleString("nb-NO",{maximumFractionDigits:1})} t`;
  if(!list.length){document.getElementById("training-list").innerHTML=empty("Ingen kommende treninger.");return;}
  const groups=new Map();list.forEach(item=>{const start=startOfWeek(item.date),key=localDateTime(start).slice(0,10);if(!groups.has(key))groups.set(key,{start,items:[]});groups.get(key).items.push(item);});
  const thisWeek=startOfWeek(now),nextWeek=new Date(thisWeek);nextWeek.setDate(nextWeek.getDate()+7);
  document.getElementById("training-list").innerHTML=[...groups.values()].map(group=>{const end=new Date(group.start);end.setDate(end.getDate()+6);const label=group.start.getTime()===thisWeek.getTime()?"Denne uken":group.start.getTime()===nextWeek.getTime()?"Neste uke":`Uke ${getWeekNumber(group.start)}`;return `<section class="training-group"><div class="training-group-head"><h3>${label}</h3><span>${formatDate(group.start,{day:"numeric",month:"short"})} - ${formatDate(end,{day:"numeric",month:"short"})} · ${group.items.length} ${group.items.length===1?"økt":"økter"}</span></div><div class="training-group-list">${group.items.map(item=>`<div class="training-row"><div class="training-date"><strong>${toDate(item.date).getDate()}</strong>${formatDate(item.date,{weekday:"short"})}</div><div class="training-info"><strong>${esc(item.title)}</strong><span>${esc(item.location||"Sted ikke oppgitt")}${item.note?` · ${esc(item.note)}`:""}</span></div><div class="training-time"><strong>${formatRange(item)}</strong><button class="delete-btn" data-delete-event="${esc(item.id)}" title="Slett">×</button></div></div>`).join("")}</div></section>`;}).join("");
}
function renderAll(){document.getElementById("today").textContent=new Date().toLocaleDateString("nb-NO",{weekday:"long",day:"numeric",month:"long"});renderDashboard();renderCalendar();renderTodos();renderStudy();renderWork();renderTraining();renderSimpleList("event","events-list","Ingen kommende arrangementer.");bindDynamicActions();}

function bindDynamicActions(){
  document.querySelectorAll("[data-toggle-todo]").forEach(btn=>btn.onclick=()=>{const t=data.todos.find(x=>x.id===btn.dataset.toggleTodo);if(t){t.done=!t.done;persist();renderAll();}});
  document.querySelectorAll("[data-delete-todo]").forEach(btn=>btn.onclick=()=>{data.todos=data.todos.filter(x=>x.id!==btn.dataset.deleteTodo);persist();renderAll();toast("Gjøremålet ble slettet");});
  document.querySelectorAll("[data-delete-event]").forEach(btn=>btn.onclick=()=>{data.items=data.items.filter(x=>x.id!==btn.dataset.deleteEvent);persist();renderAll();toast("Hendelsen ble slettet");});
  document.querySelectorAll("[data-calendar-filter]").forEach(btn=>btn.onclick=()=>{const c=btn.dataset.calendarFilter;calendarFilters.has(c)?calendarFilters.delete(c):calendarFilters.add(c);renderCalendar();bindDynamicActions();});
  document.querySelectorAll("[data-todo-filter]").forEach(btn=>btn.onclick=()=>{todoFilter=btn.dataset.todoFilter;renderTodos();bindDynamicActions();});
  document.querySelectorAll("[data-view-event]").forEach(btn=>btn.onclick=()=>openEventDetail(btn.dataset.viewEvent));
  document.querySelectorAll("[data-subject-id]").forEach(card=>{card.onclick=()=>{renderSubjectDetail(card.dataset.subjectId);bindDynamicActions();};card.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();card.click();}};});
  document.querySelectorAll("[data-add-subject-todo]").forEach(btn=>btn.onclick=()=>openTodoDialog(btn.dataset.addSubjectTodo));
}
function openEventDetail(id){
  const item=data.items.find(x=>x.id===id);if(!item)return;const subject=item.subject?subjectById(item.subject):null;
  document.getElementById("detail-type").textContent=subject?`${subject.code} · ${LABELS[item.type]||"Studie"}`:(LABELS[categoryOf(item)]||"Hendelse");document.getElementById("detail-title").textContent=subject?subject.name:item.title;
  const rows=[[item.endDate&&toDate(item.date).toDateString()!==toDate(item.endDate).toDateString()?"Datoer":"Dato",item.endDate&&toDate(item.date).toDateString()!==toDate(item.endDate).toDateString()?`${formatDate(item.date,{weekday:"long",day:"numeric",month:"long",year:"numeric"})} - ${formatDate(item.endDate,{weekday:"long",day:"numeric",month:"long",year:"numeric"})}`:formatDate(item.date,{weekday:"long",day:"numeric",month:"long",year:"numeric"})],["Tid",formatRange(item)],["Sted / rom",item.location||"Ikke oppgitt"]];if(subject)rows.splice(1,0,["Emne",`${subject.code} - ${subject.name}`]);
  document.getElementById("event-detail-content").innerHTML=rows.map(([label,value])=>`<div class="detail-row"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")+(item.note?`<div class="detail-note"><strong>Kommentar</strong><br>${esc(item.note)}</div>`:`<div class="detail-note muted">Ingen kommentar er lagt til.</div>`);
  document.getElementById("event-detail-dialog").showModal();
}
function switchView(id){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));document.querySelectorAll(".nav-btn[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===id));document.getElementById("page-title").textContent=VIEW_TITLES[id]||"Min hverdag";window.scrollTo({top:0,behavior:"smooth"});}
document.querySelectorAll(".nav-btn[data-view]").forEach(btn=>btn.onclick=()=>switchView(btn.dataset.view));
document.querySelectorAll("[data-view-jump]").forEach(btn=>btn.onclick=()=>switchView(btn.dataset.viewJump));
document.querySelectorAll("[data-open]").forEach(btn=>btn.onclick=()=>openFor(btn.dataset.open));
document.querySelectorAll("[data-close]").forEach(btn=>btn.onclick=()=>document.getElementById(btn.dataset.close).close());
document.getElementById("subject-back").onclick=()=>{selectedSubjectId=null;document.getElementById("subject-detail").hidden=true;document.getElementById("study-overview").hidden=false;};

const entryDialog=document.getElementById("entry-dialog"),entryType=document.getElementById("entry-type");
function refreshSubjects(){document.getElementById("entry-subject").innerHTML=data.subjects.map(s=>`<option value="${esc(s.id)}">${esc(s.code)} - ${esc(s.name)}</option>`).join("");}
function updateEntryFields(){const type=entryType.value,isStudy=["class","deadline","exam"].includes(type);document.getElementById("entry-subject-wrap").style.display=isStudy?"grid":"none";document.getElementById("repeat-wrap").style.display=type==="training"?"flex":"none";document.getElementById("entry-dialog-title").textContent={shift:"Ny jobbvakt",training:"Ny trening",event:"Nytt arrangement",class:"Ny undervisning",deadline:"Ny frist",exam:"Ny eksamen",private:"Ny privat avtale"}[type]||"Ny hendelse";}
function refreshTodoSubjects(){document.getElementById("todo-subject").innerHTML=`<option value="">Generelt skolearbeid</option>`+data.subjects.map(s=>`<option value="${esc(s.id)}">${esc(s.code)} - ${esc(s.name)}</option>`).join("");}
function updateTodoFields(){document.getElementById("todo-subject-wrap").style.display=document.getElementById("todo-category").value==="school"?"grid":"none";}
function openTodoDialog(subjectId=""){document.getElementById("todo-form").reset();refreshTodoSubjects();document.getElementById("todo-category").value=subjectId?"school":"private";document.getElementById("todo-subject").value=subjectId;updateTodoFields();document.getElementById("todo-dialog").showModal();}
function openFor(kind){if(kind==="todo"){openTodoDialog();return;}const mapping={shift:"shift",training:"training",event:"event",study:"class"};document.getElementById("entry-form").reset();entryType.value=mapping[kind]||"private";refreshSubjects();const start=new Date();start.setMinutes(Math.ceil(start.getMinutes()/15)*15,0,0);document.getElementById("entry-start").value=localDateTime(start);updateEntryFields();entryDialog.showModal();}
entryType.onchange=updateEntryFields;
document.getElementById("entry-form").onsubmit=e=>{
  e.preventDefault();const type=entryType.value,title=document.getElementById("entry-title").value.trim(),start=document.getElementById("entry-start").value;if(!title||!start)return;
  const base={id:uid(),type,title,date:start,endDate:document.getElementById("entry-end").value||"",location:document.getElementById("entry-location").value.trim(),note:document.getElementById("entry-note").value.trim(),done:false};
  if(["class","deadline","exam"].includes(type))base.subject=document.getElementById("entry-subject").value;
  data.items.push(base);
  if(type==="training"&&document.getElementById("entry-repeat").checked){const series=uid();base.seriesId=series;for(let i=1;i<12;i++){const copy={...base,id:uid(),seriesId:series,date:localDateTime(new Date(toDate(base.date).getTime()+i*7*86400000))};if(base.endDate)copy.endDate=localDateTime(new Date(toDate(base.endDate).getTime()+i*7*86400000));data.items.push(copy);}}
  persist();entryDialog.close();renderAll();toast("Hendelsen ble lagt til");
};
function addTodo(title,category,due="",priority="medium",subject="",hasTime=false){data.todos.push({id:uid(),title:title.trim(),category,due,priority,subject:category==="school"?subject:"",hasTime,done:false,createdAt:new Date().toISOString()});persist();renderAll();toast("Gjøremålet ble lagt til");}
document.getElementById("quick-todo-form").onsubmit=e=>{e.preventDefault();const input=document.getElementById("quick-todo-title");addTodo(input.value,document.getElementById("quick-todo-category").value,localDateTime(new Date().setHours(23,59,0,0)),"medium","",false);input.value="";};
document.getElementById("todo-category").onchange=updateTodoFields;
document.getElementById("todo-form").onsubmit=e=>{e.preventDefault();const date=document.getElementById("todo-due-date").value,time=document.getElementById("todo-due-time").value,hasTime=Boolean(date&&time),due=date?`${date}T${time||"23:59"}`:"";addTodo(document.getElementById("todo-title").value,document.getElementById("todo-category").value,due,document.getElementById("todo-priority").value,document.getElementById("todo-subject").value,hasTime);document.getElementById("todo-dialog").close();};
function openSettings(){document.getElementById("hourly-wage").value=data.settings.hourlyWage||"";window.cloudDashboard?.showConfiguration();document.getElementById("settings-dialog").showModal();}
document.getElementById("settings-btn").onclick=openSettings;
document.getElementById("mobile-settings-btn").onclick=openSettings;
document.getElementById("settings-form").onsubmit=e=>{e.preventDefault();data.settings.hourlyWage=Math.max(0,Number(document.getElementById("hourly-wage").value)||0);window.cloudDashboard?.saveConfiguration();persist();document.getElementById("settings-dialog").close();renderAll();toast("Innstillingene ble lagret");};
document.getElementById("export-data").onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download=`min-hverdag-${new Date().toISOString().slice(0,10)}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);toast("Datafilen ble eksportert");};
document.getElementById("import-data").onclick=()=>document.getElementById("import-data-file").click();
document.getElementById("import-data-file").onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{const imported=JSON.parse(await file.text());if(!imported||!Array.isArray(imported.items)||!Array.isArray(imported.todos))throw new Error("Ugyldig datafil");window.applyCloudDashboard(imported);persist();document.getElementById("settings-dialog").close();toast("Dataene ble importert og synkroniseres");}catch(error){toast(`Import feilet: ${error.message}`);}finally{e.target.value="";}};
document.getElementById("calendar-prev").onclick=()=>{calendarMode==="week"?calendarDate.setDate(calendarDate.getDate()-7):calendarDate.setMonth(calendarDate.getMonth()-1);renderCalendar();bindDynamicActions();};
document.getElementById("calendar-next").onclick=()=>{calendarMode==="week"?calendarDate.setDate(calendarDate.getDate()+7):calendarDate.setMonth(calendarDate.getMonth()+1);renderCalendar();bindDynamicActions();};
document.getElementById("calendar-today").onclick=()=>{calendarDate=calendarMode==="week"?startOfWeek(new Date()):new Date();renderCalendar();bindDynamicActions();};
document.querySelectorAll("[data-calendar-mode]").forEach(btn=>btn.onclick=()=>{calendarMode=btn.dataset.calendarMode;calendarDate=calendarMode==="week"?startOfWeek(calendarDate):new Date(calendarDate.getFullYear(),calendarDate.getMonth(),1);renderCalendar();bindDynamicActions();});
document.querySelectorAll("dialog").forEach(dialog=>dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();}));

renderAll();
