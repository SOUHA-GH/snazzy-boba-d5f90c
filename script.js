function getYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function cardHTML(project) {
  const id = getYouTubeId(project.youtube_url);
  const autoThumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  const thumb = project.cover_image ? project.cover_image : autoThumb;
  return `
    <div class="card" data-youtube="${project.youtube_url}" data-title="${project.title}">
      <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
      <div class="thumb-wrap">
        <img src="${thumb}" alt="${project.title}" loading="lazy">
      </div>
      <div class="card-meta">
        <span class="title">${project.title}</span>
        <span class="play-badge" aria-hidden="true">
          <svg viewBox="0 0 8 8" width="10" height="10"><path d="M2 1h1v1h1v1h1v1H3v1H2V1z" fill="currentColor"/></svg>
        </span>
      </div>
    </div>
  `;
}

async function loadProjects() {
  try {
    const res = await fetch("content/projects.json", { cache: "no-store" });
    const data = await res.json();

    const landscapeGrid = document.getElementById("landscape-grid");
    const verticalGrid = document.getElementById("vertical-grid");

    if (data.landscape && data.landscape.length) {
      landscapeGrid.innerHTML = data.landscape.map(cardHTML).join("");
    }
    if (data.vertical && data.vertical.length) {
      verticalGrid.innerHTML = data.vertical.map(cardHTML).join("");
    }

    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => openModal(card.dataset.youtube, card.closest(".grid").classList.contains("vertical")));
    });
  } catch (err) {
    console.error("Could not load projects.json", err);
  }
}

async function loadSettings() {
  try {
    const res = await fetch("content/settings.json", { cache: "no-store" });
    const s = await res.json();

    document.querySelectorAll("[data-field='name']").forEach(el => el.textContent = s.name || "");
    document.querySelectorAll("[data-field='tagline']").forEach(el => el.textContent = s.tagline || "");
    document.querySelectorAll("[data-field='bio']").forEach(el => el.textContent = s.bio || "");

    const emailEl = document.querySelector("[data-field='email']");
    if (emailEl && s.email) {
      emailEl.textContent = s.email;
      emailEl.href = `mailto:${s.email}`;
    }

    const igEl = document.querySelector("[data-field='linkedin']");
    if (igEl) {
      if (s.linkedin) {
        igEl.href = s.linkedin;
        igEl.style.display = "";
      } else {
        igEl.style.display = "none";
      }
    }

    const ytEl = document.querySelector("[data-field='youtube']");
    if (ytEl) {
      if (s.youtube) {
        ytEl.href = s.youtube;
        ytEl.style.display = "";
      } else {
        ytEl.style.display = "none";
      }
    }

    const toolsEl = document.getElementById("tools-list");
    if (toolsEl && Array.isArray(s.tools)) {
      toolsEl.innerHTML = s.tools.map(t => `<span class="tool-chip">${t}</span>`).join("");
    }

    const langEl = document.getElementById("languages-list");
    if (langEl && Array.isArray(s.languages) && s.languages.length) {
      langEl.innerHTML = s.languages.map(l => `<span class="lang-chip">${l}</span>`).join("");
    }
  } catch (err) {
    console.error("Could not load settings.json", err);
  }
}

function openModal(url, isVertical) {
  const id = getYouTubeId(url);
  if (!id) return;
  const modal = document.getElementById("video-modal");
  const inner = modal.querySelector(".modal-inner");
  const frame = modal.querySelector(".modal-frame");

  inner.classList.toggle("vertical-video", !!isVertical);
  frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="Project video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  modal.classList.add("open");
}

function closeModal() {
  const modal = document.getElementById("video-modal");
  modal.classList.remove("open");
  modal.querySelector(".modal-frame").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  loadSettings();

  document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  document.getElementById("video-modal").addEventListener("click", (e) => {
    if (e.target.id === "video-modal") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
