/* ── BOOT SEQUENCE ───────────────────────────────────────── */
const bootOverlay = document.getElementById("bootOverlay");
const bootBox = document.getElementById("bootBox");
const bootLines = [
  "$ mvn spring-boot:run",
  "Compiling PortfolioApplication...",
  "Loading beans: About, Skills, Projects, Contact",
  "Tomcat started on port 8080",
  "Started PortfolioApplication in 1.847s ✓"
];

function runBoot() {
  if (!bootOverlay || !bootBox) return;
  if (sessionStorage.getItem("bootSeen")) {
    bootOverlay.classList.add("done");
    return;
  }
  let i = 0;
  function nextLine() {
    if (i >= bootLines.length) {
      setTimeout(() => {
        bootOverlay.classList.add("done");
        sessionStorage.setItem("bootSeen", "1");
      }, 350);
      return;
    }
    const line = document.createElement("div");
    line.className = "boot-line";
    line.innerHTML = `<span class="prompt">›</span> ${bootLines[i]}`;
    bootBox.appendChild(line);
    requestAnimationFrame(() => line.classList.add("show"));
    i++;
    setTimeout(nextLine, 340);
  }
  nextLine();
}
runBoot();

/* ── DATA ─────────────────────────────────────────────────── */
const skillGroups = [
  {
    label: "core",
    skills: ["Java", "OOP", "Data Structures", "Algorithms", "Multithreading"]
  },
  {
    label: "backend",
    skills: ["Spring Boot", "Spring MVC", "Spring Security", "Hibernate", "JPA", "REST APIs", "Microservices", "Maven"]
  },
  {
    label: "database",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "JDBC"]
  },
  {
    label: "frontend",
    skills: ["JavaScript", "React.js", "HTML5", "CSS3"]
  },
  {
    label: "tooling",
    skills: ["Git & GitHub", "Docker", "Postman", "JUnit", "IntelliJ IDEA", "Jenkins"]
  }
];

const projects = [
  {
    icon: "🎓",
    ext: ".java",
    name: "EduTrack — Student Management System",
    desc: "A Spring Boot platform for institutions to manage student records, attendance, and grades, with role-based access for admins, teachers, and students.",
    tags: ["Spring Boot", "Hibernate", "MySQL", "REST API", "JWT"],
    link: "https://github.com/rajveer253",
    linkLabel: "View on GitHub"
  },
  {
    icon: "🛍️",
    ext: ".java",
    name: "ShopSphere — E-Commerce REST API",
    desc: "A modular e-commerce backend with secure checkout, inventory tracking, and order management, built around Spring Security and layered microservices.",
    tags: ["Spring Boot", "Spring Security", "MySQL", "Microservices"],
    link: "https://github.com/rajveer253",
    linkLabel: "View on GitHub"
  },
  {
    icon: "✅",
    ext: ".java",
    name: "TaskFlow — Employee Task Tracker",
    desc: "A full-stack task and productivity tracker pairing a Spring Boot API with a React dashboard, supporting real-time status updates and deadline reminders.",
    tags: ["Spring Boot", "React", "MySQL", "JWT Auth"],
    link: "https://github.com/rajveer253",
    linkLabel: "View on GitHub"
  },
  {
    icon: "📚",
    ext: ".java",
    name: "LibroSys — Library Management System",
    desc: "A desktop-to-web library system for cataloguing books and tracking issues and returns, originally built on core Java and JDBC, later exposed via REST.",
    tags: ["Java", "JDBC", "MySQL", "REST API"],
    link: "https://github.com/rajveer253",
    linkLabel: "View on GitHub"
  }
];

const timeline = [
  {
    role: "B.Tech in Computer Science & Engineering",
    org: "// Buddha Institute of Technology, Gorakhpur",
    meta: ["2023 — 2027", "Currently pursuing"],
    desc: "Focused coursework in object-oriented programming, database systems, and data structures — the foundation for a Java-first backend career.",
    courses: ["OOP", "DBMS", "Data Structures", "Operating Systems", "Computer Networks"]
  },
  {
    role: "Java Full Stack Development — Certification",
    org: "// certification.provider",
    meta: ["2024"],
    desc: "Hands-on program covering Spring Boot, Hibernate, REST API design, and React, capped by shipping four production-style capstone projects.",
    courses: ["Spring Boot", "Hibernate", "REST APIs", "React", "MySQL"]
  }
];

/* ── TYPED ROLE (HERO) ───────────────────────────────────── */
const roles = ["Java Full Stack Developer", "Spring Boot Engineer", "Backend Craftsman", "REST API Builder"];
const typedRoleEl = document.getElementById("typedRole");

function typeLoop() {
  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      typedRoleEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      charIndex--;
      typedRoleEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}
if (typedRoleEl) typeLoop();

/* ── CODE EDITOR TYPING ANIMATION ─────────────────────────── */
const codeLines = [
  [{ t: "com", v: "// Rajveer Kumar — Java Full Stack Developer" }],
  [],
  [{ t: "ann", v: "@RestController" }],
  [{ t: "ann", v: '@RequestMapping("/api/v1/portfolio")' }],
  [{ t: "kw", v: "public class " }, { t: "type", v: "PortfolioController " }, { t: "kw", v: "{" }],
  [],
  [{ t: "com", v: "    // says hello and means it" }],
  [{ t: "ann", v: "    @GetMapping(\"/status\")" }],
  [{ t: "kw", v: "    public " }, { t: "type", v: "ResponseEntity<String> " }, { t: "kw", v: "status() {" }],
  [{ t: "kw", v: "        return " }, { t: "type", v: "ResponseEntity" }, { t: "kw", v: ".ok(" }, { t: "str", v: '"Shipping clean, scalable code."' }, { t: "kw", v: ");" }],
  [{ t: "kw", v: "    }" }],
  [{ t: "kw", v: "}" }]
];

const ideBody = document.getElementById("ideBody");

function renderCodeTyping() {
  if (!ideBody) return;
  ideBody.innerHTML = "";
  let lineIdx = 0;

  function renderLine(tokens, cb) {
    const lineEl = document.createElement("div");
    const lnNum = document.createElement("span");
    lnNum.className = "ln";
    lnNum.textContent = lineIdx + 1;
    lineEl.appendChild(lnNum);
    ideBody.appendChild(lineEl);

    if (tokens.length === 0) { cb(); return; }

    let tokenIdx = 0;
    function typeToken() {
      if (tokenIdx >= tokens.length) { cb(); return; }
      const tok = tokens[tokenIdx];
      const span = document.createElement("span");
      span.className = "tok-" + tok.t;
      lineEl.appendChild(span);
      let charIdx = 0;
      function typeChar() {
        if (charIdx <= tok.v.length) {
          span.textContent = tok.v.slice(0, charIdx);
          charIdx++;
          setTimeout(typeChar, 8);
        } else {
          tokenIdx++;
          typeToken();
        }
      }
      typeChar();
    }
    typeToken();
  }

  function next() {
    if (lineIdx >= codeLines.length) {
      setTimeout(() => { ideBody.innerHTML = ""; lineIdx = 0; next(); }, 4000);
      return;
    }
    renderLine(codeLines[lineIdx], () => {
      lineIdx++;
      setTimeout(next, 120);
    });
  }
  next();
}
renderCodeTyping();

/* ── SCROLL REVEAL OBSERVER ──────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });

/* ── RENDER SKILLS ───────────────────────────────────────── */
const skillsWrap = document.getElementById("skillsWrap");
if (skillsWrap) {
  skillGroups.forEach((group, gi) => {
    const cat = document.createElement("div");
    cat.className = "skills-category reveal";
    cat.style.transitionDelay = (gi * 0.06) + "s";
    cat.innerHTML = `<div class="skills-category-label">${group.label}.*;</div><div class="skills-grid"></div>`;
    const grid = cat.querySelector(".skills-grid");
    group.skills.forEach(s => {
      const el = document.createElement("span");
      el.className = "skill-pill";
      el.innerHTML = `<span class="skill-dot"></span>${s}`;
      grid.appendChild(el);
    });
    skillsWrap.appendChild(cat);
    observer.observe(cat);
  });
}

/* ── RENDER PROJECTS ─────────────────────────────────────── */
const projectsGrid = document.getElementById("projectsGrid");
if (projectsGrid) {
  projects.forEach((p, i) => {
    const el = document.createElement("div");
    el.className = "project-card reveal";
    el.style.transitionDelay = (i * 0.1) + "s";
    el.innerHTML = `
      <div class="project-top">
        <div class="project-icon">${p.icon}</div>
        <div class="project-ext">${p.ext}</div>
      </div>
      <div class="project-name">${p.name}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}</div>
      <a class="project-link" href="${p.link}" target="_blank" rel="noopener">
        ${p.linkLabel}
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>`;
    projectsGrid.appendChild(el);
    observer.observe(el);
    attachTilt(el);
  });
}

/* ── PROJECT CARD TILT ────────────────────────────────────── */
function attachTilt(card) {
  const MAX = 6;
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${(-py * MAX * 2).toFixed(2)}deg) rotateY(${(px * MAX * 2).toFixed(2)}deg)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
}

/* ── RENDER TIMELINE ─────────────────────────────────────── */
const timelineWrap = document.getElementById("timelineWrap");
if (timelineWrap) {
  timeline.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "timeline-item reveal";
    el.style.transitionDelay = (i * 0.12) + "s";
    el.innerHTML = `
      <div class="timeline-marker">
        <div class="timeline-dot"></div>
        ${i !== timeline.length - 1 ? '<div class="timeline-line"></div>' : ""}
      </div>
      <div class="timeline-content">
        <div class="timeline-role">${item.role}</div>
        <div class="timeline-org">${item.org}</div>
        <div class="timeline-meta">${item.meta.map(m => `<span>${m}</span>`).join("")}</div>
        <div class="timeline-desc">${item.desc}</div>
        <div class="course-chips">${item.courses.map(c => `<span class="course-chip">${c}</span>`).join("")}</div>
      </div>`;
    timelineWrap.appendChild(el);
    observer.observe(el);
  });
}

/* ── SCROLL REVEAL (static elements) ─────────────────────── */
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ── THEME TOGGLE ────────────────────────────────────────── */
const themeBtn = document.getElementById("themeBtn");
const htmlEl = document.documentElement;
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = htmlEl.getAttribute("data-theme") === "dark";
    htmlEl.setAttribute("data-theme", isDark ? "light" : "dark");
    themeBtn.textContent = isDark ? "☾" : "☀";
  });
}

/* ── HAMBURGER ───────────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
}

/* ── CURSOR GLOW ─────────────────────────────────────────── */
const glow = document.getElementById("cursorGlow");
if (glow) {
  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

/* ── ACTIVE NAV LINK ─────────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const scrollSpy = () => {
  let current = "";
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navAnchors.forEach(a => {
    const match = a.getAttribute("href") === `#${current}`;
    a.style.color = match ? "var(--accent)" : "";
    a.style.background = match ? "var(--accent-subtle)" : "";
  });
};
window.addEventListener("scroll", scrollSpy, { passive: true });

/* ── FOOTER YEAR ─────────────────────────────────────────── */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
