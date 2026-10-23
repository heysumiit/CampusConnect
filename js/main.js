// Shared navigation, demo forms, and smart campus search.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#contact-message").textContent =
      "Thanks! Your message passed demo validation. No email was sent.";
    contactForm.reset();
  });

  const suggestionForm = document.querySelector("#suggestion-form");
  if (suggestionForm) suggestionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = suggestionForm.querySelector("textarea").value.trim();
    if (!text) return;
    const suggestions = JSON.parse(localStorage.getItem("campusSuggestions") || "[]");
    suggestions.push({ text, submittedAt: new Date().toISOString() });
    localStorage.setItem("campusSuggestions", JSON.stringify(suggestions));
    document.querySelector("#suggestion-message").textContent = "Suggestion saved in this browser.";
    suggestionForm.reset();
  });

  const searchForm = document.querySelector("#smart-search");
  if (searchForm) {
    const input = document.querySelector("#global-search");
    const results = document.querySelector("#search-results");
    const searchable = [
      { title: "Coding Workshop", type: "Event", keywords: "technical coding workshop programming", url: "events.html" },
      { title: "Cultural Fest", type: "Event", keywords: "cultural music dance festival", url: "events.html" },
      { title: "Inter-Department Sports Meet", type: "Event", keywords: "sports football cricket", url: "events.html" },
      { title: "Data Structures Notes", type: "Resource", keywords: "computer science dsa notes", url: "resources.html" },
      { title: "Physics Fundamentals", type: "Resource", keywords: "physics notes science", url: "resources.html" },
      { title: "Mid-semester schedule published", type: "Update", keywords: "exam examination timetable academic", url: "updates.html" },
      { title: "Assignment submission reminder", type: "Update", keywords: "deadline assignment", url: "updates.html" }
    ];
    const render = (query) => {
      const q = query.trim().toLowerCase();
      if (!q) { results.classList.remove("show"); results.innerHTML = ""; return; }
      const matches = searchable.filter(item => (item.title + " " + item.type + " " + item.keywords).toLowerCase().includes(q));
      results.innerHTML = matches.length
        ? matches.map(item => `<a href="${item.url}"><b>${item.title}</b> <span class="muted">· ${item.type}</span></a>`).join("")
        : `<p class="muted" style="padding:8px;margin:0">No matching campus content found.</p>`;
      results.classList.add("show");
    };
    input.addEventListener("input", () => render(input.value));
    searchForm.addEventListener("submit", (e) => { e.preventDefault(); render(input.value); });
    document.addEventListener("click", (e) => { if (!searchForm.contains(e.target)) results.classList.remove("show"); });
  }
});
