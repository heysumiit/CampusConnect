// Event data and category filtering. Registration is stored in this browser only.
const campusEvents = [
  { id: "evt-101", title: "Build. Learn. Connect.", category: "Technical", date: "2026-11-05", time: "10:00 AM", venue: "Main Auditorium", description: "A hands-on coding workshop with project demos.", icon: "⌘" },
  { id: "evt-102", title: "Campus Cultural Fest", category: "Cultural", date: "2026-11-12", time: "04:00 PM", venue: "Open Air Stage", description: "An afternoon of music, dance, and student performances.", icon: "♫" },
  { id: "evt-103", title: "Inter-Department Sports Meet", category: "Sports", date: "2026-11-18", time: "08:30 AM", venue: "College Ground", description: "Bring your team and compete in friendly campus games.", icon: "⚽" },
  { id: "evt-104", title: "Web Development Seminar", category: "Technical", date: "2026-11-21", time: "11:00 AM", venue: "Seminar Hall 2", description: "Explore modern frontend practices and career pathways.", icon: "⌘" },
  { id: "evt-105", title: "Photography Walk", category: "Cultural", date: "2026-11-25", time: "03:30 PM", venue: "Campus Main Gate", description: "Capture campus life and share your best frames.", icon: "◎" },
  { id: "evt-106", title: "Badminton Doubles", category: "Sports", date: "2026-11-28", time: "09:00 AM", venue: "Indoor Court", description: "A friendly doubles tournament for all skill levels.", icon: "🏸" }
];
function dateLabel(date) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function eventCard(event) {
  const registered = JSON.parse(localStorage.getItem("campusRegistrations") || "[]").includes(event.id);
  const pill = event.category === "Technical" ? "pill-blue" : event.category === "Cultural" ? "pill-purple" : "pill-green";
  return `<article class="event-card"><div class="event-visual">${event.icon}</div><div class="event-body"><div class="event-meta">${dateLabel(event.date)} · ${event.time}</div><h3>${event.title}</h3><p>${event.description}</p><div class="event-foot"><span class="pill ${pill}">${event.category}</span><button class="btn btn-primary small-btn register-btn" data-event-id="${event.id}" ${registered ? "disabled" : ""}>${registered ? "Registered ✓" : "Register"}</button></div><p class="muted" style="margin:12px 0 0;font-size:.75rem">⌖ ${event.venue}</p></div></article>`;
}
function renderEvents(list, target) {
  if (!target) return;
  target.innerHTML = list.map(eventCard).join("");
  target.querySelectorAll(".register-btn").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.eventId;
    const registrations = JSON.parse(localStorage.getItem("campusRegistrations") || "[]");
    if (!registrations.includes(id)) registrations.push(id);
    localStorage.setItem("campusRegistrations", JSON.stringify(registrations));
    button.textContent = "Registered ✓"; button.disabled = true;
    const msg = document.querySelector("#registration-message");
    if (msg) msg.textContent = "Registration saved in this browser. This is a demo; it is not sent to your college.";
  }));
}
document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("#events-list");
  const filter = document.querySelector("#event-filter");
  const empty = document.querySelector("#event-empty");
  if (list && filter) {
    const update = () => {
      const category = filter.value;
      const filtered = category === "All" ? campusEvents : campusEvents.filter(event => event.category === category);
      renderEvents(filtered, list);
      if (empty) empty.hidden = filtered.length !== 0;
    };
    filter.addEventListener("change", update);
    update();
  }
  const homeEvents = document.querySelector("#home-events");
  if (homeEvents) renderEvents(campusEvents.slice(0, 3), homeEvents);
});
  
