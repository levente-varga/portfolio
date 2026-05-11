class ProjectCard extends HTMLElement {
  projectCardId = "";

  static get observedAttributes() {
    return ["name", "description", "image", "tags", "year", "url"];
  }

  connectedCallback() {
    this.render();
    this.addHover();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "Name";
    const description = this.getAttribute("description") || "Description";
    const image = this.getAttribute("image") || "";
    const tags = this.getAttribute("tags") ? JSON.parse(this.getAttribute("tags")) : {};
    const year = this.getAttribute("year") || "";
    const url = this.getAttribute("url") || "";

    this.projectCardId = `project-card-${name.toLowerCase()}`;

    this.innerHTML = `<div class="">
      <a href="${url}">
      <div class="perspective-[1000px] hover:scale-[1.02] duration-200">
      <div id="${(this.projectCardId)}" class="w-full rounded-2xl transition-transform duration-[400ms] ease-out ring-1 ring-white/5 bg-foreground shadow-xl overflow-hidden transform-style-3d [backface-visibility:hidden] will-change-transform">
        <div class="rounded-t-2xl aspect-[calc(5/3)] overflow-hidden">
          <div class="project-card-image w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[400ms] ease-out [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform" style="background-image: url(${image}); transform: translate3d(0, 0, -40px) scale(1.05);"> </div>
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
      </a>
      </div>
    `;
  }

  addHover() {
    const projectCard = document.getElementById(this.projectCardId);
    const cardImage = projectCard.querySelector('.project-card-image');

    projectCard.addEventListener('mouseenter', () => {
      projectCard.style.transition = 'transform 0.1s ease-out';
      cardImage.style.transition = 'transform 0.1s ease-out';
    });

    projectCard.addEventListener('mousemove', (e) => {
      const {width, height, left, top} = projectCard.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = (e.clientX - centerX) / width;
      const deltaY = (e.clientY - centerY) / height;

      projectCard.style.transition = 'none';
      cardImage.style.transition = 'none';

      const tiltX = deltaY * 5;
      const tiltY = deltaX * -5;

      projectCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      const translateX = deltaX * 10;
      const translateY = deltaY * 10;
      cardImage.style.transform = `translate3d(${translateX}px, ${translateY}px, -40px) scale(1.03)`;
    });

    projectCard.addEventListener('mouseleave', () => {
      projectCard.style.transition = '';
      cardImage.style.transition = '';

      projectCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
      cardImage.style.transform = `translate3d(0, 0, -40px) scale(1.03)`;
    });
  }
}

customElements.define("project-card", ProjectCard);