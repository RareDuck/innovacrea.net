"use strict";

/* =========================================================
   UTILITIES
========================================================= */

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
    .filter(Boolean);

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


/* =========================================================
   PROJECT SPECTRUM
========================================================= */

let spectrumProjects = [];

const projectsManifestUrl = "assets/projects/projects.json";

const spectrumContainer =
  document.querySelector("[data-project-spectrum]");

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
  return {
    id: project.id || "",
    title: project.title || "Untitled project",
    value: Number(project.value || 0),
    category: project.category || project.type || "Project",
    year: project.year || "",
    location: project.location || "",
    text: project.text || "",
    url: project.url || "",
    media: Array.isArray(project.media)
      ? project.media.map((item, index) => normalizeProjectMedia(item, index))
      : [],
    sections: Array.isArray(project.sections) ? project.sections : []
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

function renderProjectTextBlock(text) {
  return String(text || "")
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) => `
      <p class="project-drawer__paragraph">
        ${renderInlineMarkdown(paragraph).replace(/\n/g, "<br>")}
      </p>
    `)
    .join("");
}

function renderProjectMediaItem(item, sizeOverride = "") {
  const type = item.type || "image";
  const size = getProjectMediaSize(sizeOverride || item.size);
  const caption = item.caption
    ? `<figcaption>${escapeHTML(item.caption)}</figcaption>`
    : "";

  if (type === "video") {
    return `
      <figure class="project-drawer__media-item" style="--media-width:${escapeHTML(size)}">
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
    <figure class="project-drawer__media-item" style="--media-width:${escapeHTML(size)}">
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

function renderProjectSectionBlock(block, mediaById) {
  if (typeof block === "string") {
    return renderProjectTextBlock(block);
  }

  if (
    !block ||
    typeof block !== "object"
  ) {
    return "";
  }

  if (block.body) {
    return renderProjectTextBlock(block.body);
  }

  if (Array.isArray(block.media)) {
    return `
      <div class="project-drawer__media project-drawer__media--inline">
        ${block.media
          .map((reference) => renderProjectMediaReference(
            reference,
            mediaById,
            block.size || ""
          ))
          .join("")}
      </div>
    `;
  }

  return "";
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

  const sectionMarkup = normalizedProject.sections
    .map((section) => {
      const blocks = Array.isArray(section.blocks)
        ? section.blocks
        : [
          {
            body: section.body || ""
          },
          ...(Array.isArray(section.media)
            ? [
              {
                media: section.media,
                size: section.size || ""
              }
            ]
            : [])
        ];

      return `
        <section class="project-drawer__section">
          <h3>${escapeHTML(section.title || "Nota")}</h3>
          <div class="project-drawer__section-content">
            ${blocks
              .map((block) => renderProjectSectionBlock(block, mediaById))
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");

  projectDrawerBody.innerHTML = `
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

    ${sectionMarkup}

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

    spectrumProjects = projects.map(normalizeProject);
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

projectDrawerCloseButtons.forEach((button) => {
  button.addEventListener("click", closeProjectDrawer);
});

document.addEventListener("keydown", (event) => {
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


/* =========================================================
   REFLECTIONS MARKDOWN LOADER
========================================================= */

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
