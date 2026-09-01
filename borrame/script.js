"use strict";

/* # PROYECTOS */

const plot = document.querySelector("[data-timeline-plot]");
const axis = document.querySelector("[data-timeline-axis]");
const readout = document.querySelector("[data-project-readout]");

function parseDate(date) {
  const match = String(date || "").match(/^(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  return new Date(Number(match[2]), Number(match[1]) - 1, 1);
}

function getProjectImage(project) {
  const image = (project.media || []).find((item) => item.type !== "video");
  return image ? `../${image.src}` : "";
}

function setReadout(project) {
  const architecture = 100 - Number(project.value || 0);
  const image = getProjectImage(project);

  readout.innerHTML = `
    <p class="project-readout__index">${project.date} / ${project.id}</p>
    <h2>${project.title}</h2>
    <div class="project-readout__meta">
      <span>${architecture}% arquitectura</span>
      <span>${project.value}% programación</span>
      <span>${project.category}</span>
    </div>
    ${image ? `<img class="project-readout__image" src="${image}" alt="">` : ""}
    <p class="project-readout__copy">${project.text}</p>
  `;
}

/* ## Gráfico Constelación */
function renderTimeline(projects) {
  const datedProjects = projects
    .map((project) => ({ ...project, timelineDate: parseDate(project.date) }))
    .filter((project) => project.timelineDate);

  const timestamps = datedProjects.map((project) => project.timelineDate.getTime());
  const start = Math.min(...timestamps);
  const end = Math.max(...timestamps);
  const span = Math.max(end - start, 1);

  const labels = [...new Set(datedProjects.map((project) => project.timelineDate.getFullYear()))];
  axis.innerHTML = labels.map((year) => `<span>${year}</span>`).join("");

  datedProjects.forEach((project) => {
    const x = 8 + ((project.timelineDate.getTime() - start) / span) * 84;
    const y = 8 + Number(project.value || 0) / 100 * 84;
    const point = document.createElement("button");

    point.className = "timeline-point";
    point.style.left = `${x}%`;
    point.style.bottom = `${y}%`;
    point.dataset.label = project.title;
    point.setAttribute("aria-label", `Ver ${project.title}, ${project.date}`);
    point.addEventListener("click", () => {
      document.querySelectorAll(".timeline-point").forEach((item) => {
        item.classList.toggle("is-active", item === point);
      });
      setReadout(project);
    });

    plot.appendChild(point);
  });

  if (datedProjects[0]) {
    plot.querySelector(".timeline-point").classList.add("is-active");
    setReadout(datedProjects[0]);
  }
}

fetch("../assets/projects/projects.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el manifiesto de proyectos.");
    }

    return response.json();
  })
  .then(renderTimeline)
  .catch((error) => {
    readout.innerHTML = `<p class="project-readout__index">ERROR</p><p>${error.message}</p>`;
  });
