"use strict";

/* # INDICE */

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const isFinePointer = window.matchMedia(
  "(pointer: fine)"
).matches;


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   SAFE TEXT / MARKDOWN HELPERS
========================================================= */

function escapeHTML(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInlineMarkdown(value) {
  return escapeHTML(value)
    .replace(
      /`([^`]+)`/g,
      "<code>$1</code>"
    )
    .replace(
      /\*\*([^*]+)\*\*/g,
      "<strong>$1</strong>"
    )
    .replace(
      /\*([^*]+)\*/g,
      "<em>$1</em>"
    )
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

function parseFrontMatter(markdown) {
  if (!markdown.startsWith("---")) {
    return {
      attributes: {},
      body: markdown
    };
  }

  const endIndex = markdown.indexOf("\n---", 3);

  if (endIndex === -1) {
    return {
      attributes: {},
      body: markdown
    };
  }

  const rawAttributes = markdown
    .slice(3, endIndex)
    .trim()
    .split("\n");

  const attributes = {};

  rawAttributes.forEach((line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    attributes[key] = value;
  });

  return {
    attributes,
    body: markdown.slice(endIndex + 4).trim()
  };
}

function renderMarkdown(markdown) {
  const blocks = markdown
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean)
    .filter((block) => !/^<!--[\s\S]*?-->$/.test(block.trim()));

  return blocks
    .map((block) => {
      const trimmedBlock = block.trim();

      if (trimmedBlock.startsWith("# ")) {
        return `<h1>${renderInlineMarkdown(trimmedBlock.slice(2))}</h1>`;
      }

      if (trimmedBlock.startsWith("## ")) {
        return `<h2>${renderInlineMarkdown(trimmedBlock.slice(3))}</h2>`;
      }

      if (trimmedBlock.startsWith("### ")) {
        return `<h3>${renderInlineMarkdown(trimmedBlock.slice(4))}</h3>`;
      }

      if (trimmedBlock.startsWith("> ")) {
        return `<blockquote><p>${renderInlineMarkdown(
          trimmedBlock.replace(/^> ?/gm, "")
        )}</p></blockquote>`;
      }

      if (/^- /m.test(trimmedBlock)) {
        const items = trimmedBlock
          .split("\n")
          .filter((line) => line.startsWith("- "))
          .map((line) => `<li>${renderInlineMarkdown(line.slice(2))}</li>`)
          .join("");

        return `<ul>${items}</ul>`;
      }

      return `<p>${renderInlineMarkdown(trimmedBlock).replace(
        /\n/g,
        "<br>"
      )}</p>`;
    })
    .join("");
}

/* ## Manifesto */
const heroManifest = document.querySelector("[data-hero-manifest]");

async function loadHeroManifest() {
  if (!heroManifest) {
    return;
  }

  try {
    const response = await fetch("assets/inicio/manifesto.md", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Cannot load manifesto");
    }

    const markdown = await response.text();

    heroManifest.innerHTML = renderMarkdown(markdown)
      .replace("<h1>", "<h2>")
      .replace("</h1>", "</h2>");
    heroManifest.hidden = false;
  } catch (error) {
    console.error("Manifesto Markdown load failed:", error);
  }
}

loadHeroManifest();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navigationLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  if (!menuToggle || !navigation) {
    return;
  }

  menuToggle.classList.remove("is-open");
  navigation.classList.remove("is-open");

  menuToggle.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}

function openMenu() {
  if (!menuToggle || !navigation) {
    return;
  }

  menuToggle.classList.add("is-open");
  navigation.classList.add("is-open");

  menuToggle.setAttribute("aria-expanded", "true");

  document.body.classList.add("menu-open");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const currentlyOpen = navigation.classList.contains("is-open");

    if (currentlyOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if (reducedMotion) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const sectionId = entry.target.id;

      navigationLinks.forEach((link) => {
        const pointsToSection =
          link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle(
          "is-active",
          pointsToSection
        );
      });
    });
  },
  {
    threshold: 0.25,
    rootMargin: "-20% 0px -55% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const coordinateX = document.querySelector("#coord-x");
const coordinateY = document.querySelector("#coord-y");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;

function formatCoordinate(value) {
  return String(Math.round(value)).padStart(4, "0");
}

function animateCursor() {
  if (!cursor || !isFinePointer) {
    return;
  }

  cursorX += (mouseX - cursorX) * 0.16;
  cursorY += (mouseY - cursorY) * 0.16;

  cursor.style.transform =
    `translate3d(${cursorX - 23}px, ${cursorY - 23}px, 0)`;

  requestAnimationFrame(animateCursor);
}

if (cursor && isFinePointer) {
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (coordinateX) {
      coordinateX.textContent =
        `X ${formatCoordinate(event.clientX)}`;
    }

    if (coordinateY) {
      coordinateY.textContent =
        `Y ${formatCoordinate(event.clientY)}`;
    }
  });

  document.addEventListener("mouseover", (event) => {
    const target = event.target;

    if (
      target instanceof Element &&
      target.closest(
        "a, button, .spectrum-row, .reference-row, .resource-card, .reflection-link"
          + ", .personal-panel"
      )
    ) {
      cursor.classList.add("is-hovering");
    }
  });

  document.addEventListener("mouseout", (event) => {
    const target = event.target;

    if (
      target instanceof Element &&
      target.closest(
        "a, button, .spectrum-row, .reference-row, .resource-card, .reflection-link"
          + ", .personal-panel"
      )
    ) {
      cursor.classList.remove("is-hovering");
    }
  });

  animateCursor();
}


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

const magneticElements = document.querySelectorAll(".magnetic");

if (isFinePointer && !reducedMotion) {
  magneticElements.forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      element.style.transform =
        `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "translate(0, 0)";
    });
  });
}


/* =========================================================
   HERO SCRAMBLE
========================================================= */

const heroTitle = document.querySelector(".hero-title");

const scrambleCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\[]{}<>+-×";

let activeScramble = null;

function randomCharacter() {
  const index = Math.floor(
    Math.random() * scrambleCharacters.length
  );

  return scrambleCharacters[index];
}

function scrambleElement(element) {
  if (!element || reducedMotion) {
    return;
  }

  const mainLines = element.querySelectorAll(
    ".hero-title__main"
  );

  mainLines.forEach((line) => {
    if (!line.dataset.originalText) {
      line.dataset.originalText = line.textContent.trim();
    }
  });

  if (activeScramble) {
    window.clearInterval(activeScramble);
    activeScramble = null;

    mainLines.forEach((line) => {
      line.textContent = line.dataset.originalText;
    });
  }

  const originalTexts = Array.from(mainLines).map(
    (line) => line.dataset.originalText
  );

  let frame = 0;
  const totalFrames = 22;

  element.classList.add("is-scrambling");

  activeScramble = window.setInterval(() => {
    mainLines.forEach((line, lineIndex) => {
      const original = originalTexts[lineIndex];

      const progress =
        frame / totalFrames;

      const resolvedCharacters = Math.floor(
        original.length * progress
      );

      const output = original
        .split("")
        .map((character, characterIndex) => {
          if (character === " ") {
            return " ";
          }

          if (characterIndex < resolvedCharacters) {
            return character;
          }

          return randomCharacter();
        })
        .join("");

      line.textContent = output;
    });

    frame += 1;

    if (frame > totalFrames) {
      window.clearInterval(activeScramble);
      activeScramble = null;

      mainLines.forEach((line, index) => {
        line.textContent = originalTexts[index];
      });

      element.classList.remove("is-scrambling");
    }
  }, 38);
}

if (heroTitle) {
  window.setTimeout(() => {
    scrambleElement(heroTitle);
  }, 650);

  heroTitle.addEventListener("mouseenter", () => {
    scrambleElement(heroTitle);
  });
}


/* =========================================================
   PARALLAX HERO DIAGRAM
========================================================= */

const heroDiagram = document.querySelector(".hero-diagram");
const heroSection = document.querySelector(".hero");

if (
  heroDiagram &&
  heroSection &&
  isFinePointer &&
  !reducedMotion
) {
  heroSection.addEventListener("mousemove", (event) => {
    const rect = heroSection.getBoundingClientRect();

    const normalizedX =
      (event.clientX - rect.left) /
      rect.width -
      0.5;

    const normalizedY =
      (event.clientY - rect.top) /
      rect.height -
      0.5;

    heroDiagram.style.transform =
      `translate(
        ${normalizedX * 24}px,
        ${normalizedY * 24}px
      ) rotate(${normalizedX * 1.3}deg)`;
  });

  heroSection.addEventListener("mouseleave", () => {
    heroDiagram.style.transform =
      "translate(0, 0) rotate(0deg)";
  });
}


/* # PROYECTOS */

let spectrumProjects = [];

const projectsManifestUrl = "assets/projects/projects.json";

const spectrumContainer =
  document.querySelector("[data-project-spectrum]");

const spectrumListView =
  document.querySelector("[data-project-list-view]");

const projectConstellation =
  document.querySelector("[data-project-constellation]");

const projectViewModeButtons =
  document.querySelectorAll("[data-project-view-mode]");

const spectrumReadoutNumber =
  document.querySelector("#spectrum-readout-number");

const spectrumReadoutTitle =
  document.querySelector("#spectrum-readout-title");

const spectrumReadoutCopy =
  document.querySelector("#spectrum-readout-copy");

const spectrumReadoutAxis =
  document.querySelector("#spectrum-readout-axis");

const spectrumReadoutType =
  document.querySelector("#spectrum-readout-type");

const spectrumHud =
  document.querySelector(".spectrum-hud");

const projectDrawer =
  document.querySelector("[data-project-drawer]");

const projectDrawerBody =
  document.querySelector("[data-project-drawer-body]");

const projectDrawerTitle =
  document.querySelector("#project-drawer-title");

const projectDrawerNumber =
  document.querySelector("[data-project-drawer-number]");

const projectDrawerCloseButtons =
  document.querySelectorAll("[data-project-drawer-close]");

function formatSpectrumNumber(index) {
  return `W / ${String(index + 1).padStart(3, "0")}`;
}

function parseProjectDate(date) {
  const match = String(date || "").match(/^(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  return new Date(Number(match[2]), Number(match[1]) - 1, 1);
}

function setProjectView(view) {
  const showConstellation = view === "constellation";

  if (spectrumListView) {
    spectrumListView.hidden = showConstellation;
  }

  if (projectConstellation) {
    projectConstellation.hidden = !showConstellation;
  }

  projectViewModeButtons.forEach((button) => {
    const isActive = button.dataset.projectViewMode === view;

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (showConstellation && spectrumHud) {
    spectrumHud.classList.remove("is-fixed");
  } else {
    updateSpectrumHudPosition();
  }
}

/* ## Gráfico Constelación */
function renderProjectConstellation() {
  if (!projectConstellation) {
    return;
  }

  const projectsWithDates = spectrumProjects
    .map((project, index) => ({
      project,
      index,
      date: parseProjectDate(project.date)
    }))
    .filter((item) => item.date);

  const years = [...new Set(
    projectsWithDates.map((item) => item.date.getFullYear())
  )];

  projectConstellation.innerHTML = `
    <div class="project-constellation__chart">
      <div class="project-constellation__y-axis" aria-hidden="true">
        <span>100 / Software</span>
        <span>0 / Arquitectura</span>
      </div>
      <div class="project-constellation__plot" data-project-constellation-plot></div>
      <div class="project-constellation__x-axis" aria-hidden="true">
        ${years.map((year) => `<span>${year}</span>`).join("")}
      </div>
    </div>
    <aside class="project-constellation__readout" data-project-constellation-readout></aside>
  `;

  const plot = projectConstellation.querySelector(
    "[data-project-constellation-plot]"
  );

  if (!plot || projectsWithDates.length === 0) {
    return;
  }

  const timestamps = projectsWithDates.map((item) => item.date.getTime());
  const start = Math.min(...timestamps);
  const span = Math.max(Math.max(...timestamps) - start, 1);

  const readout = projectConstellation.querySelector(
    "[data-project-constellation-readout]"
  );

  function setConstellationReadout(project, index, point) {
    const architecture = 100 - project.value;
    const image = project.media.find((item) => item.type !== "video");

    document.querySelectorAll(".project-constellation__point").forEach((item) => {
      item.classList.toggle("is-active", item === point);
    });

    if (readout) {
      readout.innerHTML = `
        <p class="project-constellation__index">${escapeHTML(project.date)} / ${formatSpectrumNumber(index)}</p>
        <h3>${escapeHTML(project.title)}</h3>
        <div class="project-constellation__meta">
          <span>${architecture}% arquitectura</span>
          <span>${project.value}% software</span>
          <span>${escapeHTML(project.category)}</span>
        </div>
        ${image ? `<img class="project-constellation__image" src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt)}">` : ""}
        <p class="project-constellation__copy">${escapeHTML(project.text)}</p>
      `;
    }
  }

  projectsWithDates.forEach(({ project, index, date }, itemIndex) => {
    const point = document.createElement("button");
    const x = 8 + ((date.getTime() - start) / span) * 84;
    const y = 8 + project.value / 100 * 84;

    point.className = "project-constellation__point";
    point.style.left = `${x}%`;
    point.style.bottom = `${y}%`;
    point.dataset.title = project.title;
    point.setAttribute(
      "aria-label",
      `Abrir proyecto ${project.title}, ${project.date}`
    );

    point.addEventListener("click", () => {
      setConstellationReadout(project, index, point);
    });

    point.addEventListener("dblclick", () => {
      openProjectDrawer(project, index);
    });

    plot.appendChild(point);

    if (itemIndex === 0) {
      setConstellationReadout(project, index, point);
    }
  });
}

function setActiveSpectrumProject(project, index) {
  const architecture = 100 - project.value;

  document.querySelectorAll(".spectrum-row").forEach((row) => {
    row.classList.toggle(
      "is-active",
      Number(row.dataset.spectrumIndex) === index
    );
  });

  if (spectrumReadoutNumber) {
    spectrumReadoutNumber.textContent = formatSpectrumNumber(index);
  }

  if (spectrumReadoutTitle) {
    spectrumReadoutTitle.textContent = project.title;
  }

  if (spectrumReadoutCopy) {
    spectrumReadoutCopy.textContent = project.text;
  }

  if (spectrumReadoutAxis) {
    spectrumReadoutAxis.textContent =
      `${project.value}% software / ${architecture}% arquitectura`;
  }

  if (spectrumReadoutType) {
    spectrumReadoutType.textContent = project.category;
  }
}

function resetSpectrumProjectReadout() {
  document.querySelectorAll(".spectrum-row").forEach((row) => {
    row.classList.remove("is-active");
  });

  if (spectrumReadoutNumber) {
    spectrumReadoutNumber.textContent = "W / 000";
  }

  if (spectrumReadoutTitle) {
    spectrumReadoutTitle.textContent = "Proyectos";
  }

  if (spectrumReadoutCopy) {
    spectrumReadoutCopy.textContent = "";
  }

  if (spectrumReadoutAxis) {
    spectrumReadoutAxis.textContent = "";
  }

  if (spectrumReadoutType) {
    spectrumReadoutType.textContent = "WORK INDEX";
  }
}

function normalizeProject(project) {
  const date = project.date || "";
  const yearFromDate = date.match(/^\d{2}\/(\d{4})$/);

  return {
    id: project.id || "",
    title: project.title || "Untitled project",
    value: Number(project.value || 0),
    category: project.category || project.type || "Project",
    date,
    year: yearFromDate ? yearFromDate[1] : "",
    location: project.location || "",
    text: project.text || "",
    url: project.url || "",
    content: project.content || "",
    body: project.body || "",
    media: Array.isArray(project.media)
      ? project.media.map((item, index) => normalizeProjectMedia(item, index))
      : []
  };
}

function normalizeProjectMedia(item, index) {
  return {
    alt: item.alt || "",
    id: item.id || `media-${String(index + 1).padStart(2, "0")}`,
    type: item.type || "image",
    src: item.src || "",
    size: item.size || "full",
    poster: item.poster || "",
    caption: item.caption || ""
  };
}

function getProjectMediaSize(size) {
  const sizes = {
    small: "min(360px, 100%)",
    medium: "min(620px, 100%)",
    large: "min(920px, 100%)",
    full: "100%"
  };

  if (!size) {
    return sizes.full;
  }

  if (sizes[size]) {
    return sizes[size];
  }

  if (/^\d+(\.\d+)?(px|rem|em|%|vw)$/.test(size)) {
    return size;
  }

  return sizes.full;
}

function getProjectMediaHeight(size) {
  const heights = {
    small: "260px",
    medium: "420px",
    large: "560px",
    full: "min(720px, 70svh)"
  };

  return heights[size] || "auto";
}

function renderProjectMediaItem(item, sizeOverride = "") {
  const type = item.type || "image";
  const requestedSize = sizeOverride || item.size;
  const size = getProjectMediaSize(requestedSize);
  const height = getProjectMediaHeight(requestedSize);
  const caption = item.caption
    ? `<figcaption>${escapeHTML(item.caption)}</figcaption>`
    : "";

  if (type === "video") {
    return `
      <figure class="project-drawer__media-item" style="--media-width:${escapeHTML(size)};--media-height:${escapeHTML(height)}">
        <video
          src="${escapeHTML(item.src || "")}"
          ${item.poster ? `poster="${escapeHTML(item.poster)}"` : ""}
          controls
          playsinline
        ></video>
        ${caption}
      </figure>
    `;
  }

  return `
    <figure class="project-drawer__media-item" style="--media-width:${escapeHTML(size)};--media-height:${escapeHTML(height)}">
      <img
        src="${escapeHTML(item.src || "")}"
        alt="${escapeHTML(item.alt || "")}"
        loading="lazy"
      >
      ${caption}
    </figure>
  `;
}

function renderProjectMediaReference(reference, mediaById, sizeOverride = "") {
  if (typeof reference === "string") {
    const item = mediaById.get(reference);

    if (!item) {
      return `
        <div class="project-drawer__empty">
          Media no encontrada: ${escapeHTML(reference)}
        </div>
      `;
    }

    return renderProjectMediaItem(item, sizeOverride);
  }

  if (
    reference &&
    typeof reference === "object"
  ) {
    const item = mediaById.get(reference.id);

    if (!item) {
      return `
        <div class="project-drawer__empty">
          Media no encontrada: ${escapeHTML(reference.id || "")}
        </div>
      `;
    }

    return renderProjectMediaItem(item, reference.size || sizeOverride);
  }

  return "";
}

function getProjectMediaToken(line, mediaById) {
  const match = line.trim().match(
    /^\{([a-zA-Z0-9_-]+)(?:\|([^{}|]+))?\}$/
  );

  if (!match || !mediaById.has(match[1])) {
    return null;
  }

  return { id: match[1], size: match[2] ? match[2].trim() : "" };
}

function renderProjectMarkdown(markdown, mediaById) {
  const blocks = String(markdown || "").trim().split(/\n{2,}/).filter(Boolean);
  const visibleBlocks = blocks.filter(
    (block) => !/^<!--[\s\S]*?-->$/.test(block.trim())
  );

  if (visibleBlocks.length === 0) {
    return `<div class="project-drawer__empty">Este proyecto todavía no tiene contenido Markdown.</div>`;
  }

  return visibleBlocks.map((block) => {
    const trimmedBlock = block.trim();
    const mediaTokens = trimmedBlock
      .split("\n")
      .map((line) => getProjectMediaToken(line, mediaById));

    if (mediaTokens.every(Boolean)) {
      return `<div class="project-drawer__media project-drawer__media--inline">${mediaTokens
        .map((token) => renderProjectMediaReference(token, mediaById))
        .join("")}</div>`;
    }

    if (/^#{1,3} /.test(trimmedBlock)) {
      return `<h3 class="project-drawer__heading">${renderInlineMarkdown(
        trimmedBlock.replace(/^#{1,3} /, "")
      )}</h3>`;
    }

    if (trimmedBlock.startsWith("> ")) {
      return `<blockquote><p>${renderInlineMarkdown(
        trimmedBlock.replace(/^> ?/gm, "")
      )}</p></blockquote>`;
    }

    if (/^- /m.test(trimmedBlock)) {
      const items = trimmedBlock.split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => `<li>${renderInlineMarkdown(line.slice(2))}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    }

    return `<p class="project-drawer__paragraph">${renderInlineMarkdown(
      trimmedBlock
    ).replace(/\n/g, "<br>")}</p>`;
  }).join("");
}

function openProjectDrawer(project, index) {
  if (!projectDrawer || !projectDrawerBody) {
    return;
  }

  const normalizedProject = normalizeProject(project);
  const architecture = 100 - normalizedProject.value;
  const mediaById = new Map(
    normalizedProject.media.map((item) => [item.id, item])
  );

  if (projectDrawerTitle) {
    projectDrawerTitle.textContent = normalizedProject.title;
  }

  if (projectDrawerNumber) {
    projectDrawerNumber.textContent = formatSpectrumNumber(index);
  }

  const contentMarkup = renderProjectMarkdown(normalizedProject.body, mediaById);

  projectDrawerBody.innerHTML = `
    <div class="project-drawer__layout">
    <div class="project-drawer__meta">
      <span>${escapeHTML(normalizedProject.year)}</span>
      <span>${escapeHTML(normalizedProject.category)}</span>
      <span>${escapeHTML(normalizedProject.location)}</span>
    </div>

    <p class="project-drawer__intro">
      ${escapeHTML(normalizedProject.text)}
    </p>

    <div class="project-drawer__axis">
      <span>${normalizedProject.value}% software</span>
      <span>${architecture}% arquitectura</span>
    </div>

    <div class="project-drawer__content">
      ${contentMarkup}
    </div>

    ${normalizedProject.url ? `
      <a
        class="project-drawer__link magnetic"
        href="${escapeHTML(normalizedProject.url)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ABRIR DOCUMENTO ↗
      </a>
    ` : ""}
    </div>
  `;

  document.body.classList.add("project-drawer-open");
  projectDrawer.setAttribute("aria-hidden", "false");
}

function closeProjectDrawer() {
  if (!projectDrawer) {
    return;
  }

  document.body.classList.remove("project-drawer-open");
  projectDrawer.setAttribute("aria-hidden", "true");
}

/* =========================================================
   PROJECT IMAGE LIGHTBOX
========================================================= */

const projectLightbox = document.createElement("div");

projectLightbox.className = "project-lightbox";
projectLightbox.hidden = true;
projectLightbox.setAttribute("role", "dialog");
projectLightbox.setAttribute("aria-modal", "true");
projectLightbox.setAttribute("aria-label", "Visor de imágenes del proyecto");
projectLightbox.innerHTML = `
  <button class="project-lightbox__close" type="button" aria-label="Cerrar imagen">×</button>
  <button class="project-lightbox__nav project-lightbox__nav--previous" type="button" aria-label="Imagen anterior">←</button>
  <figure class="project-lightbox__figure">
    <img class="project-lightbox__image" alt="">
    <figcaption class="project-lightbox__caption"></figcaption>
  </figure>
  <button class="project-lightbox__nav project-lightbox__nav--next" type="button" aria-label="Imagen siguiente">→</button>
`;

document.body.appendChild(projectLightbox);

const projectLightboxImage = projectLightbox.querySelector(
  ".project-lightbox__image"
);
const projectLightboxCaption = projectLightbox.querySelector(
  ".project-lightbox__caption"
);
let projectLightboxItems = [];
let projectLightboxIndex = 0;

function setProjectLightboxImage(index) {
  if (projectLightboxItems.length === 0) {
    return;
  }

  projectLightboxIndex = (
    index + projectLightboxItems.length
  ) % projectLightboxItems.length;

  const item = projectLightboxItems[projectLightboxIndex];

  projectLightboxImage.src = item.src;
  projectLightboxImage.alt = item.alt;
  projectLightboxCaption.textContent = item.caption;
}

function openProjectLightbox(clickedImage) {
  if (!projectDrawerBody) {
    return;
  }

  const images = Array.from(
    projectDrawerBody.querySelectorAll(".project-drawer__media-item img")
  );

  projectLightboxItems = images.map((image) => {
    const caption = image.closest("figure")?.querySelector("figcaption");

    return {
      src: image.currentSrc || image.src,
      alt: image.alt,
      caption: caption ? caption.textContent.trim() : ""
    };
  });

  const index = images.indexOf(clickedImage);

  if (index === -1) {
    return;
  }

  setProjectLightboxImage(index);
  projectLightbox.hidden = false;
  document.body.classList.add("project-lightbox-open");
}

function closeProjectLightbox() {
  projectLightbox.hidden = true;
  document.body.classList.remove("project-lightbox-open");
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const projectImage = target.closest(".project-drawer__media-item img");

  if (projectImage instanceof HTMLImageElement) {
    openProjectLightbox(projectImage);
    return;
  }

  if (target === projectLightbox) {
    closeProjectLightbox();
    return;
  }

  if (target.closest(".project-lightbox__close")) {
    closeProjectLightbox();
    return;
  }

  if (target.closest(".project-lightbox__nav--previous")) {
    setProjectLightboxImage(projectLightboxIndex - 1);
    return;
  }

  if (target.closest(".project-lightbox__nav--next")) {
    setProjectLightboxImage(projectLightboxIndex + 1);
  }
});

function renderProjectSpectrum() {
  if (!spectrumContainer) {
    return;
  }

  spectrumContainer.innerHTML = "";

  if (spectrumProjects.length === 0) {
    spectrumContainer.innerHTML = `
      <p class="spectrum-error">
        No se ha cargado assets/projects/projects.json.
      </p>
    `;

    resetSpectrumProjectReadout();

    return;
  }

  spectrumProjects.forEach((project, index) => {
    const architecture = 100 - project.value;
    const row = document.createElement("article");

    row.className = "spectrum-row";
    row.dataset.spectrumIndex = index;
    row.style.setProperty("--position", project.value);
    row.tabIndex = 0;
    row.setAttribute("role", "button");
    row.setAttribute(
      "aria-label",
      `Abrir proyecto ${project.title}`
    );

    row.innerHTML = `
      <span class="spectrum-row__number">
        ${formatSpectrumNumber(index)}
      </span>

      <h3 class="spectrum-row__title">
        <span>${escapeHTML(project.title)}</span>
      </h3>

      <div class="spectrum-row__track-wrap">
        <div class="spectrum-row__track" aria-hidden="true">
          <span class="spectrum-row__marker"></span>
        </div>
      </div>

      <div class="spectrum-row__data">
        <strong>${project.value}% / ${architecture}%</strong>
        <span>${escapeHTML(project.category)} / ${escapeHTML(project.year)}</span>
      </div>
    `;

    row.addEventListener("mouseenter", () => {
      setActiveSpectrumProject(project, index);
    });

    row.addEventListener("mouseleave", () => {
      resetSpectrumProjectReadout();
    });

    row.addEventListener("focus", () => {
      setActiveSpectrumProject(project, index);
    });

    row.addEventListener("blur", () => {
      resetSpectrumProjectReadout();
    });

    row.addEventListener("click", () => {
      openProjectDrawer(project, index);
    });

    row.addEventListener("keydown", (event) => {
      if (
        event.key !== "Enter" &&
        event.key !== " "
      ) {
        return;
      }

      event.preventDefault();
      openProjectDrawer(project, index);
    });

    spectrumContainer.appendChild(row);
  });

  resetSpectrumProjectReadout();
  renderProjectConstellation();
  updateSpectrumHudPosition();
}

async function loadProjectSpectrum() {
  if (!spectrumContainer) {
    return;
  }

  spectrumContainer.innerHTML = `
    <p class="spectrum-error">
      Cargando assets/projects/projects.json...
    </p>
  `;

  try {
    const cacheKey = Date.now();
    const manifestUrl = new URL(
      projectsManifestUrl,
      document.baseURI
    );

    manifestUrl.searchParams.set("v", cacheKey);

    const response = await fetch(
      manifestUrl,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error("No projects manifest");
    }

    const projects = await response.json();

    if (!Array.isArray(projects)) {
      throw new Error("Projects manifest is not an array");
    }

    spectrumProjects = await Promise.all(
      projects.map(async (project) => {
        const normalizedProject = normalizeProject(project);

        if (!normalizedProject.content) {
          return normalizedProject;
        }

        const contentUrl = new URL(normalizedProject.content, document.baseURI);
        contentUrl.searchParams.set("v", cacheKey);

        const contentResponse = await fetch(contentUrl, { cache: "no-store" });

        if (!contentResponse.ok) {
          throw new Error(`Cannot load project Markdown: ${normalizedProject.content}`);
        }

        normalizedProject.body = await contentResponse.text();
        return normalizedProject;
      })
    );
    renderProjectSpectrum();
  } catch (error) {
    spectrumProjects = [];

    const isLocalFile = window.location.protocol === "file:";
    const errorHint = isLocalFile
      ? "Estás abriendo index.html como archivo. Para cargar JSON, sirve la web por HTTP."
      : "Revisa que el JSON sea válido y que la ruta exista.";

    spectrumContainer.innerHTML = `
      <p class="spectrum-error">
        No se pudo cargar assets/projects/projects.json. ${errorHint}
      </p>
    `;

    console.error("Projects JSON load failed:", error);

    resetSpectrumProjectReadout();
  }
}

loadProjectSpectrum();

projectViewModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setProjectView(button.dataset.projectViewMode || "list");
  });
});

projectDrawerCloseButtons.forEach((button) => {
  button.addEventListener("click", closeProjectDrawer);
});

document.addEventListener("keydown", (event) => {
  if (!projectLightbox.hidden) {
    if (event.key === "Escape") {
      closeProjectLightbox();
    }

    if (event.key === "ArrowLeft") {
      setProjectLightboxImage(projectLightboxIndex - 1);
    }

    if (event.key === "ArrowRight") {
      setProjectLightboxImage(projectLightboxIndex + 1);
    }

    return;
  }

  if (event.key === "Escape") {
    closeProjectDrawer();
  }
});

function updateSpectrumHudPosition() {
  if (!spectrumContainer || !spectrumHud) {
    return;
  }

  const board = spectrumContainer.closest(".spectrum-board");

  if (!board) {
    return;
  }

  const boardRect = board.getBoundingClientRect();
  const projectsRect = spectrumContainer.getBoundingClientRect();
  const hudHeight = spectrumHud.offsetHeight;
  const shouldFix =
    projectsRect.top <= window.innerHeight - hudHeight &&
    boardRect.bottom > window.innerHeight;

  spectrumHud.classList.toggle("is-fixed", shouldFix);

  if (shouldFix) {
    spectrumHud.style.setProperty(
      "--spectrum-hud-left",
      `${boardRect.left}px`
    );

    spectrumHud.style.setProperty(
      "--spectrum-hud-width",
      `${boardRect.width}px`
    );
  }
}

if (spectrumHud) {
  updateSpectrumHudPosition();

  window.addEventListener("scroll", updateSpectrumHudPosition, {
    passive: true
  });

  window.addEventListener("resize", updateSpectrumHudPosition);
}


/* # PERSONAL */

const reflectionsIndex =
  document.querySelector("[data-reflections-index]");

const reflectionReader =
  document.querySelector("[data-reflection-reader]");

function setReflectionReader(reflection, index) {
  if (!reflectionReader) {
    return;
  }

  const meta = reflectionReader.querySelector(
    ".reflection-reader__meta"
  );

  const body = reflectionReader.querySelector(
    ".reflection-reader__body"
  );

  if (meta) {
    meta.innerHTML = `
      <span>MD / ${String(index + 1).padStart(3, "0")}</span>
      <span>${escapeHTML(reflection.date || reflection.file)}</span>
    `;
  }

  if (body) {
    body.innerHTML = renderMarkdown(reflection.body);
  }
}

function renderReflections(reflections) {
  if (!reflectionsIndex) {
    return;
  }

  if (reflections.length === 0) {
    reflectionsIndex.innerHTML = `
      <p class="reflections-empty">
        Personal está preparado para leer Markdown desde assets/reflexiones/.
        Añade archivos .md y declara sus nombres en assets/reflexiones/index.json.
      </p>
    `;

    return;
  }

  reflectionsIndex.innerHTML = reflections
    .map((reflection, index) => `
      <button
        class="reflection-link${index === 0 ? " is-active" : ""}"
        type="button"
        data-reflection-index="${index}"
      >
        <span class="reflection-link__index">
          ${String(index + 1).padStart(3, "0")}
        </span>

        <span>
          <strong class="reflection-link__title">
            ${escapeHTML(reflection.title)}
          </strong>

          <span class="reflection-link__date">
            ${escapeHTML(reflection.date || "SIN FECHA")}
          </span>

          <p class="reflection-link__excerpt">
            ${escapeHTML(reflection.excerpt || reflection.file)}
          </p>
        </span>
      </button>
    `)
    .join("");

  reflectionsIndex.addEventListener("click", (event) => {
    const button = event.target.closest(".reflection-link");

    if (!button) {
      return;
    }

    const index = Number(button.dataset.reflectionIndex);

    reflectionsIndex
      .querySelectorAll(".reflection-link")
      .forEach((link) => {
        link.classList.toggle("is-active", link === button);
      });

    setReflectionReader(reflections[index], index);
  });

  setReflectionReader(reflections[0], 0);
}

async function loadReflections() {
  if (!reflectionsIndex || !reflectionReader) {
    return;
  }

  try {
    const manifestResponse = await fetch("assets/reflexiones/index.json");

    if (!manifestResponse.ok) {
      throw new Error("No reflections manifest");
    }

    const files = await manifestResponse.json();

    if (!Array.isArray(files)) {
      return;
    }

    const reflections = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(`assets/reflexiones/${file}`);

        if (!response.ok) {
          throw new Error(`Cannot load ${file}`);
        }

        const markdown = await response.text();
        const parsed = parseFrontMatter(markdown);

        return {
          file,
          title:
            parsed.attributes.title ||
            file.replace(/\.md$/i, "").replace(/-/g, " "),
          date: parsed.attributes.date || "",
          excerpt: parsed.attributes.excerpt || "",
          body: parsed.body
        };
      })
    );

    renderReflections(reflections);
  } catch (error) {
    reflectionsIndex.innerHTML = `
      <p class="reflection-error">
        No se pudo cargar assets/reflexiones/index.json. Sirve la web por HTTP
        y declara ahí los .md que quieras mostrar.
      </p>
    `;
  }
}

loadReflections();


/* =========================================================
   INTERNAL SMOOTH LINKS
========================================================= */

const internalLinks = document.querySelectorAll(
  'a[href^="#"]'
);

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#"
    ) {
      event.preventDefault();
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start"
    });
  });
});


/* =========================================================
   TRANSITION FOR EXTERNAL / PROJECT LINKS
========================================================= */

const transitionOverlay =
  document.querySelector(".page-transition");

const transitionLinks = document.querySelectorAll(
  'a:not([href^="#"]):not([href^="mailto:"])'
);

transitionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href === "#" ||
      reducedMotion
    ) {
      return;
    }

    const opensNewTab =
      link.getAttribute("target") === "_blank";

    if (opensNewTab) {
      return;
    }

    event.preventDefault();

    if (!transitionOverlay) {
      window.location.href = href;
      return;
    }

    transitionOverlay.classList.remove("is-entering");

    void transitionOverlay.offsetWidth;

    transitionOverlay.classList.add("is-entering");

    window.setTimeout(() => {
      window.location.href = href;
    }, 420);
  });
});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTopButton =
  document.querySelector(".back-to-top");

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });
}


/* =========================================================
   KEYBOARD ESCAPE
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});


/* =========================================================
   RESET MENU ON DESKTOP RESIZE
========================================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) {
    closeMenu();
  }
});
