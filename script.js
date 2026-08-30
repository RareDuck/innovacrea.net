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
        "a, button, .project, .reference-row, .resource-card, .reflection-link"
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
        "a, button, .project, .reference-row, .resource-card, .reflection-link"
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

  const originalTexts = Array.from(mainLines).map(
    (line) => line.textContent.trim()
  );

  let frame = 0;
  const totalFrames = 22;

  element.classList.add("is-scrambling");

  const animation = window.setInterval(() => {
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
      window.clearInterval(animation);

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
   PROJECT VISUAL POINTER
========================================================= */

const projectVisuals = document.querySelectorAll(
  ".project__visual"
);

if (isFinePointer && !reducedMotion) {
  projectVisuals.forEach((visual) => {
    visual.addEventListener("mousemove", (event) => {
      const rect = visual.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) /
          rect.width) *
        100;

      const y =
        ((event.clientY - rect.top) /
          rect.height) *
        100;

      visual.style.backgroundPosition =
        `${x * 0.04 + 48}% ${y * 0.04 + 48}%`;
    });

    visual.addEventListener("mouseleave", () => {
      visual.style.backgroundPosition = "center";
    });
  });
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
  if (!reflectionsIndex || reflections.length === 0) {
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
    const manifestResponse = await fetch("reflexiones/index.json");

    if (!manifestResponse.ok) {
      throw new Error("No reflections manifest");
    }

    const files = await manifestResponse.json();

    if (!Array.isArray(files) || files.length === 0) {
      return;
    }

    const reflections = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(`reflexiones/${file}`);

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
        No se pudo cargar reflexiones/index.json. Sirve la web por HTTP
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
