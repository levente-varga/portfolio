const CustomLabels = { github: "GitHub", linkedin: "LinkedIn", itch: "itch.io", gmail: "Email", youtube: "YouTube" };

class CustomTitle extends HTMLElement {
  static get observedAttributes() {
    return ["text", "prefix", "suffix", "topPadding", "bottomPadding", "responsive", "itch", "github", "youtube"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("text") || "";
    const prefix = this.getAttribute("prefix") || "";
    const suffix = this.getAttribute("suffix") || "";
    const topPadding = this.getAttribute("topPadding") || 8;
    const bottomPadding = this.getAttribute("bottomPadding") || 8;
    const responsive = this.getAttribute("responsive") || false;
    const itch = this.getAttribute("itch");
    const github = this.getAttribute("github");
    const youtube = this.getAttribute("youtube");

    this.innerHTML = `
      <div class="flex flex-col justify-center space-y-4 px-8 w-fit mx-auto" style="padding-top: ${topPadding}rem; padding-bottom: ${bottomPadding}rem;">
        <div class="text-textDim text-center content-center w-fit">
          ${prefix ? `<div class="text-xl font-light">${prefix}</div>` : ``}
          <div class="${responsive ? "sm:text-6xl text-5xl md:text-7xl" : "text-7xl"} tracking-wide font-title">${title}</div>
          ${suffix ? `<div class="text-xl font-light">${suffix}</div>` : ``}
          ${itch || github || youtube ? `
            <ul class="flex space-x-4 items-center mt-8 mx-auto w-fit">
              ${this.item(itch, "itch")}
              ${this.item(github, "github")}
              ${this.item(youtube, "youtube")}
            </ul>
          ` : ``}
        </div>
      </div>      
    `;
  }

  item(url, icon) {
    return url ? `
      <li><a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${CustomLabels[icon] ?? icon}">
        <svg class="size-6 fill-textDim hover:fill-text duration-250"><use href="/svg/icons.svg#${icon}"></use></svg>
      </a></li>
    ` : ``;
  }
}

customElements.define("custom-title", CustomTitle);