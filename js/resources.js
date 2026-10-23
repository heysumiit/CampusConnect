const campusResources = [
  { title: "Data Structures Notes", subject: "Computer Science", type: "NOTES", description: "Sample overview notes for arrays, stacks, queues, and linked lists.", file: "documents/sample-notes.txt" },
  { title: "Physics Fundamentals", subject: "Physics", type: "REFERENCE", description: "A concise sample reference sheet for core physics concepts.", file: "documents/sample-notes.txt" },
  { title: "Discrete Mathematics Practice", subject: "Mathematics", type: "QUESTION PAPER", description: "Practice topics including logic, relations, and graph theory.", file: "documents/sample-notes.txt" },
  { title: "Operating Systems Quick Review", subject: "Computer Science", type: "NOTES", description: "Sample review of processes, memory, and scheduling.", file: "documents/sample-notes.txt" },
  { title: "Digital Electronics Basics", subject: "Electronics", type: "REFERENCE", description: "Logic gates, Boolean algebra, and number system practice.", file: "documents/sample-notes.txt" }
];
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#resource-search");
  const target = document.querySelector("#resources-list");
  const empty = document.querySelector("#resource-empty");
  const count = document.querySelector("#resource-count");
  if (!input || !target) return;
  const render = () => {
    const q = input.value.trim().toLowerCase();
    const filtered = campusResources.filter(r => (r.title + " " + r.subject + " " + r.type + " " + r.description).toLowerCase().includes(q));
    target.innerHTML = filtered.map(r => `<article class="resource-card"><span class="resource-type">${r.type}</span><h3>${r.title}</h3><p><b>${r.subject}</b></p><p>${r.description}</p><a class="download-link" href="${r.file}" download>Open sample resource ↗</a></article>`).join("");
    empty.hidden = filtered.length > 0;
    count.textContent = `${filtered.length} resource${filtered.length === 1 ? "" : "s"}`;
  };
  input.addEventListener("input", render);
  render();
});
