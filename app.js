const DEFAULT_CLASSES = [
  ["2026-08-18T10:15","msb102"],["2026-08-20T12:15","msb102"],["2026-08-21T10:15","msb102"],["2026-08-25T10:15","msb102"],["2026-08-27T12:15","msb102"],["2026-08-28T10:15","msb102"],
  ["2026-09-01T10:15","msb102"],["2026-09-02T10:15","msb104"],["2026-09-03T12:15","msb102"],["2026-09-03T14:15","msb104"],["2026-09-04T10:15","msb102"],["2026-09-04T12:15","msb104"],
  ["2026-09-08T10:15","msb102"],["2026-09-09T10:15","msb104"],["2026-09-10T12:15","msb102"],["2026-09-10T14:15","msb104"],["2026-09-11T08:15","msb102"],["2026-09-11T12:15","msb104"],
  ["2026-09-15T10:15","msb102"],["2026-09-16T10:15","msb104"],["2026-09-17T12:15","msb102"],["2026-09-17T14:15","msb104"],["2026-09-18T10:15","msb102"],["2026-09-18T12:15","msb104"],
  ["2026-09-22T10:15","msb102"],["2026-09-24T10:15","msb104"],["2026-09-24T12:15","msb102"],["2026-09-24T14:15","msb104"],["2026-09-25T10:15","msb102"],["2026-09-25T12:15","msb104"],["2026-09-29T10:15","msb102"],
  ["2026-10-01T10:15","msb104"],["2026-10-01T12:15","msb102"],["2026-10-01T14:15","msb104"],["2026-10-02T08:15","msb102"],["2026-10-02T12:15","msb104"],
  ["2026-10-13T10:15","msb102"],["2026-10-14T10:15","msb104"],["2026-10-15T12:15","msb104"],["2026-10-16T10:15","msb102"],["2026-10-16T12:15","msb104"],
  ["2026-10-20T10:15","msb102"],["2026-10-21T10:15","msb104"],["2026-10-22T12:15","msb104"],["2026-10-23T10:15","msb102"],["2026-10-23T12:15","msb104"],
  ["2026-10-27T10:15","msb102"],["2026-10-29T10:15","msb104"],["2026-10-30T10:15","msb102"],["2026-10-30T12:15","msb104"],
  ["2026-11-03T10:15","msb102"],["2026-11-04T10:15","msb104"],["2026-11-05T12:15","msb104"],["2026-11-06T10:15","msb102"],["2026-11-06T12:15","msb104"],
  ["2026-11-10T10:15","msb102"],["2026-11-12T10:15","msb104"],["2026-11-12T12:15","msb104"],["2026-11-13T10:15","msb102"],["2026-11-13T12:15","msb104"]
].map(([date,subject])=>({
  id:`class-${date}-${subject}`,
  type:"class",
  title:"Undervisning",
  subject,
  date,
  location:"",
  done:false
}));

const DEFAULT_DATA = {
  subjects: [
    { id: "msb102", code: "MSB102", name: "Innovasjonsteori og praksis" },
    { id: "msb104", code: "MSB104", name: "Økonometri" }
  ],
  items: [
    { id: crypto.randomUUID(), type: "deadline", title: "Sende gruppe + tema for PowerPoint og essay", subject: "msb102", date: "2026-08-24T23:59", done: false },
    { id: crypto.randomUUID(), type: "deadline", title: "Presentasjon", subject: "msb102", date: "2026-09-23T10:00", done: false },
    { id: crypto.randomUUID(), type: "deadline", title: "Midterm evaluation", subject: "msb102", date: "2026-10-01T10:00", done: false },
    { id: crypto.randomUUID(), type: "deadline", title: "Essay", subject: "msb102", date: "2026-11-10T23:59", done: false },
    { id: crypto.randomUUID(), type: "deadline", title: "Oppgave", subject: "msb102", date: "2026-11-14T14:00", done: false },
    { id: crypto.randomUUID(), type: "exam", title: "Skoleeksamen – 5 timer", subject: "msb102", date: "2026-12-08T09:00", done: false },
    { id: crypto.randomUUID(), type: "exam", title: "Eksamen – 4 timer", subject: "msb104", date: "2026-12-11T09:00", done: false },
    ...DEFAULT_CLASSES
  ]
};

const saved = localStorage.getItem("studieportal-data");
let data = saved ? JSON.parse(saved) : DEFAULT_DATA;
const knownIds = new Set(data.items.map(item=>item.id));
const missingClasses = DEFAULT_CLASSES.filter(item=>!knownIds.has(item.id));
if(missingClasses.length){
  data.items.push(...missingClasses);
  localStorage.setItem("studieportal-data", JSON.stringify(data));
}
let visibleWeek = getWeekStart(new Date());

function persist(){ localStorage.setItem("studieportal-data", JSON.stringify(data)); }
function subjectById(id){ return data.subjects.find(s => s.id === id) || {code:"",name:"Ukjent fag"}; }
function toDate(v){ return new Date(v); }
function formatDate(v){
  return toDate(v).toLocaleDateString("nb-NO",{day:"2-digit",month:"short"});
}
function formatFull(v){
  return toDate(v).toLocaleString("nb-NO",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"});
}
function dayDiff(v){
  const now = new Date();
  return Math.ceil((toDate(v)-now)/(1000*60*60*24));
}
function countdownText(v){
  const days = dayDiff(v);
  if(days < 0) return "Passert";
  if(days === 0) return "I dag";
  if(days === 1) return "1 dag igjen";
  return `${days} dager igjen`;
}
function upcoming(type){
  return data.items.filter(i => (!type || i.type===type) && toDate(i.date)>=new Date() && !i.done).sort((a,b)=>toDate(a.date)-toDate(b.date));
}

function getWeekStart(value){
  const date = new Date(value);
  const day = date.getDay() || 7;
  date.setHours(0,0,0,0);
  date.setDate(date.getDate() - day + 1);
  return date;
}

function renderSchedule(schedules){
  const days = ["Mandag","Tirsdag","Onsdag","Torsdag","Fredag"];
  const weekEnd = new Date(visibleWeek);
  weekEnd.setDate(weekEnd.getDate() + 6);
  document.getElementById("schedule-week-label").textContent =
    `${visibleWeek.toLocaleDateString("nb-NO",{day:"numeric",month:"short"})} – ${weekEnd.toLocaleDateString("nb-NO",{day:"numeric",month:"short",year:"numeric"})}`;

  document.getElementById("schedule-grid").innerHTML = days.map((name,index)=>{
    const date = new Date(visibleWeek);
    date.setDate(date.getDate() + index);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const lessons = schedules.filter(item=>toDate(item.date)>=date && toDate(item.date)<nextDate);
    const isToday = date.toDateString() === new Date().toDateString();
    return `<div class="schedule-day ${isToday ? "is-today" : ""}">
      <div class="schedule-day-head"><span>${name}</span><strong>${date.getDate()}</strong></div>
      <div class="schedule-lessons">
        ${lessons.length ? lessons.map(item=>{
          const subject=subjectById(item.subject);
          const time=toDate(item.date).toLocaleTimeString("nb-NO",{hour:"2-digit",minute:"2-digit"});
          return `<article class="schedule-lesson"><time>${time}</time><strong>${item.title}</strong><span>${subject.code}${item.location ? ` · ${item.location}` : ""}</span></article>`;
        }).join("") : `<span class="schedule-empty">Ingen undervisning</span>`}
      </div>
    </div>`;
  }).join("");
}

function renderEvent(item, showStatus=false){
  const s = subjectById(item.subject);
  const d = toDate(item.date);
  return `<div class="event ${item.done ? "done":""}">
    <div class="event-date"><strong>${d.getDate()}</strong>${d.toLocaleDateString("nb-NO",{month:"short"})}</div>
    <div>
      <div class="event-title">${item.title}</div>
      <span class="tag">${s.code ? s.code+" – " : ""}${s.name}</span>
      ${item.location ? `<div class="muted" style="margin-top:5px">${item.location}</div>`:""}
    </div>
    <div class="event-right">
      <div>${d.toLocaleTimeString("nb-NO",{hour:"2-digit",minute:"2-digit"})}</div>
      <div>${countdownText(item.date)}</div>
      ${showStatus ? `<button class="status-btn" onclick="toggleDone('${item.id}')" title="Marker som ferdig">${item.done ? "↩️":"✅"}</button>`:""}
    </div>
  </div>`;
}

function render(){
  document.getElementById("today").textContent = new Date().toLocaleDateString("nb-NO",{weekday:"long",day:"numeric",month:"long"});
  document.getElementById("subject-count").textContent = `${data.subjects.length} fag`;
  const trackedItems = data.items.filter(i=>i.type==="deadline");
  const completedItems = trackedItems.filter(i=>i.done).length;
  const progress = trackedItems.length ? Math.round((completedItems / trackedItems.length) * 100) : 0;
  document.getElementById("progress-label").textContent = `${progress}%`;
  document.getElementById("progress-bar").style.width = `${progress}%`;
  document.getElementById("progress-copy").textContent = trackedItems.length
    ? `${completedItems} av ${trackedItems.length} oppgaver ferdig`
    : "Legg til en oppgave for å starte";

  const allUpcoming = upcoming();
  const next = allUpcoming[0];
  document.getElementById("next-title").textContent = next ? next.title : "Ingen kommende hendelser";
  document.getElementById("next-meta").textContent = next ? `${subjectById(next.subject).name} · ${formatFull(next.date)}` : "";
  document.getElementById("next-countdown").textContent = next ? countdownText(next.date) : "";

  const nd = upcoming("deadline")[0];
  document.getElementById("next-deadline").textContent = nd ? nd.title : "Ingen";
  document.getElementById("next-deadline-date").textContent = nd ? `${formatFull(nd.date)} · ${countdownText(nd.date)}` : "";

  const ne = upcoming("exam")[0];
  document.getElementById("next-exam").textContent = ne ? subjectById(ne.subject).name : "Ingen";
  document.getElementById("next-exam-date").textContent = ne ? `${formatFull(ne.date)} · ${countdownText(ne.date)}` : "";

  const up = allUpcoming.slice(0,6);
  document.getElementById("upcoming-list").innerHTML = up.length ? up.map(i=>renderEvent(i)).join("") : `<div class="empty">Ingen kommende frister.</div>`;

  const schedules = data.items.filter(i=>i.type==="class").sort((a,b)=>toDate(a.date)-toDate(b.date));
  renderSchedule(schedules);

  const now = new Date();
  const weekEnd = new Date(now); weekEnd.setDate(now.getDate()+7);
  const weekItems = schedules.filter(i=>toDate(i.date)>=now && toDate(i.date)<=weekEnd);
  document.getElementById("week-list").innerHTML = weekItems.length ? weekItems.map(i=>renderEvent(i)).join("") : `<div class="empty">Ingen undervisning lagt inn de neste 7 dagene.</div>`;

  const deadlines = data.items.filter(i=>i.type==="deadline").sort((a,b)=>toDate(a.date)-toDate(b.date));
  document.getElementById("deadline-list").innerHTML = deadlines.length ? deadlines.map(i=>renderEvent(i,true)).join("") : `<div class="empty">Ingen frister registrert.</div>`;

  const exams = data.items.filter(i=>i.type==="exam").sort((a,b)=>toDate(a.date)-toDate(b.date));
  document.getElementById("exam-list").innerHTML = exams.length ? exams.map(i=>renderEvent(i,true)).join("") : `<div class="empty">Ingen eksamener registrert.</div>`;

  document.getElementById("subject-grid").innerHTML = data.subjects.map(s=>{
    const related=data.items.filter(i=>i.subject===s.id && toDate(i.date)>=new Date()).sort((a,b)=>toDate(a.date)-toDate(b.date));
    return `<div class="subject-card">
      <div class="subject-code">${s.code}</div>
      <h3>${s.name}</h3>
      <p class="muted">${related.length ? `${related.length} kommende hendelser` : "Ingen kommende hendelser"}</p>
      ${related[0] ? `<p><strong>Neste:</strong> ${related[0].title}<br><span class="muted">${formatDate(related[0].date)}</span></p>`:""}
    </div>`
  }).join("");
  refreshSubjectSelect();
}

function toggleDone(id){
  const item=data.items.find(i=>i.id===id);
  if(item){item.done=!item.done;persist();render();}
}
window.toggleDone=toggleDone;

document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>switchView(btn.dataset.view)));
document.querySelectorAll("[data-view-jump]").forEach(btn=>btn.addEventListener("click",()=>switchView(btn.dataset.viewJump)));
document.querySelectorAll("[data-open-type]").forEach(btn=>btn.addEventListener("click",()=>openItemDialog(btn.dataset.openType)));

function switchView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===id));
  const btn=[...document.querySelectorAll(".nav-btn")].find(b=>b.dataset.view===id);
  document.getElementById("page-title").textContent = btn ? btn.textContent.replace(/^[^\s]+\s/,"") : "Studieportal";
}

const itemDialog=document.getElementById("item-dialog");
const itemType=document.getElementById("item-type");
const itemTitle=document.getElementById("item-title");
const itemDate=document.getElementById("item-date");
const itemSubject=document.getElementById("item-subject");
const itemLocation=document.getElementById("item-location");
const locationWrap=document.getElementById("location-wrap");

function refreshSubjectSelect(){
  itemSubject.innerHTML=data.subjects.map(s=>`<option value="${s.id}">${s.code} – ${s.name}</option>`).join("");
}
function openItemDialog(type){
  itemType.value=type;
  itemTitle.value="";
  itemDate.value="";
  itemLocation.value="";
  locationWrap.style.display=type==="class"?"grid":"none";
  document.getElementById("dialog-title").textContent = type==="class" ? "Ny undervisning" : type==="exam" ? "Ny eksamen" : "Ny frist";
  refreshSubjectSelect();
  itemDialog.showModal();
}
document.getElementById("add-class-btn").onclick=()=>openItemDialog("class");
document.getElementById("previous-week").onclick=()=>{visibleWeek.setDate(visibleWeek.getDate()-7);render();};
document.getElementById("next-week").onclick=()=>{visibleWeek.setDate(visibleWeek.getDate()+7);render();};
document.getElementById("current-week").onclick=()=>{visibleWeek=getWeekStart(new Date());render();};
document.getElementById("add-deadline-btn").onclick=()=>openItemDialog("deadline");
document.getElementById("add-exam-btn").onclick=()=>openItemDialog("exam");

document.getElementById("save-item").addEventListener("click",(e)=>{
  e.preventDefault();
  if(!itemTitle.value || !itemDate.value) return;
  data.items.push({
    id:crypto.randomUUID(),
    type:itemType.value,
    title:itemTitle.value.trim(),
    subject:itemSubject.value,
    date:itemDate.value,
    location:itemLocation.value.trim(),
    done:false
  });
  persist(); itemDialog.close(); render();
});

const subjectDialog=document.getElementById("subject-dialog");
document.getElementById("add-subject-btn").onclick=()=>subjectDialog.showModal();
document.getElementById("save-subject").addEventListener("click",(e)=>{
  e.preventDefault();
  const code=document.getElementById("subject-code").value.trim();
  const name=document.getElementById("subject-name").value.trim();
  if(!code || !name) return;
  data.subjects.push({id:code.toLowerCase().replace(/[^a-z0-9]+/g,"-")+Date.now(),code,name});
  persist(); subjectDialog.close(); document.getElementById("subject-form").reset(); render();
});

render();
