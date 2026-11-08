class ProjectCard extends HTMLElement {
  projectCardId = "";

  static get observedAttributes() {
    return ["name", "description", "image", "tags", "year", "url"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const name = this.getAttribute("name") || "Name";
    const description = this.getAttribute("description") || "Description";
    const image = this.getAttribute("image") || "";
    const tags = this.getAttribute("tags") ? JSON.parse(this.getAttribute("tags")) : {};
    const year = this.getAttribute("year") || "";
    const url = this.getAttribute("url") || "";

    this.projectCardId = `project-card-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    const wrapperStart = url ? `<a href="${url}">` : `<div>`;
    const wrapperEnd = url ? `</a>` : `</div>`;

    this.innerHTML = `<div class="">
      ${wrapperStart}
      <div class="perspective-[1000px] hover:scale-[1.02] duration-200">
      <div id="${(this.projectCardId)}" class="w-full rounded-2xl ring-1 ring-white/5 bg-foreground shadow-xl overflow-hidden transform-style-3d [backface-visibility:hidden] will-change-transform">
        <div class="rounded-t-2xl aspect-[calc(5/3)] overflow-hidden">
          <div class="project-card-image w-full h-full bg-cover bg-center bg-no-repeat [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform" style="background-image: url(${image}); transform: translate3d(0, 0, -40px) scale(1.05);"> </div>
        </div>
        
        <div class="px-6 py-6 transform-style-3d">
          <div class="flex justify-between items-center">
            <div class="text-xl text-textLight font-title">${name}</div>
            <div class="text-sm text-textFaded">${year}</div>
          </div>
          <div class="text-sm text-text mt-1">${description}</div>
        </div>
        ${Object.entries(tags).length === 0 ? `` : `
          <div class="px-6 pb-3 bg-foreground rounded-b-2xl transform-style-3d">
            <ul class="flex text-text items-center">
              ${Object.entries(tags).map(([tag, color]) => `
                <li class="w-2 h-2 rounded-2xl bg-${color} inset-ring-1 inset-ring-white/20"></li>
                <li class="pr-4 pl-2 text-sm">${tag}</li>
              `).join("")}
            </ul>
          </div>
        `}
      </div>
      </div>
      ${wrapperEnd}
      </div>
    `;

    this.addHover();
  }

  addHover() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const projectCard = this.querySelector(`#${this.projectCardId}`);
    const cardImage = projectCard.querySelector('.project-card-image');

    // The mouse only sets a target; a frame loop eases the current state towards it.
    // This keeps entering, following the cursor and leaving equally smooth, which
    // CSS transitions cannot do because every mousemove would restart them.
    const smoothing = 10; // Higher is snappier
    const current = { x: 0, y: 0, hover: 0 };
    const target = { x: 0, y: 0, hover: 0 };
    let frame = null;
    let previousTime = 0;

    const apply = () => {
      projectCard.style.transform = `rotateX(${current.y * 7}deg) rotateY(${current.x * -7}deg)`;
      const scale = 1.05 - 0.02 * current.hover;
      cardImage.style.transform = `translate3d(${current.x * 10}px, ${current.y * 10}px, -40px) scale(${scale})`;
    };

    const step = (time) => {
      const deltaTime = Math.min((time - previousTime) / 1000, 0.1);
      previousTime = time;
      const blend = 1 - Math.exp(-smoothing * deltaTime);

      let settled = true;
      for (const key of Object.keys(current)) {
        current[key] += (target[key] - current[key]) * blend;
        if (Math.abs(target[key] - current[key]) > 0.001) settled = false;
        else current[key] = target[key];
      }
      apply();

      frame = settled ? null : requestAnimationFrame(step);
    };

    const start = () => {
      if (frame !== null) return;
      previousTime = performance.now();
      frame = requestAnimationFrame(step);
    };

    projectCard.addEventListener('mousemove', (e) => {
      const { width, height, left, top } = projectCard.getBoundingClientRect();
      target.x = (e.clientX - (left + width / 2)) / width;
      target.y = (e.clientY - (top + height / 2)) / height;
      target.hover = 1;
      start();
    });

    projectCard.addEventListener('mouseleave', () => {
      target.x = 0;
      target.y = 0;
      target.hover = 0;
      start();
    });
  }
}

customElements.define("project-card", ProjectCard);