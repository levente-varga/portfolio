class TimelineRow extends HTMLElement {
  static get observedAttributes() {
    return ["name", "company", "company-url", "logo", "time", "location", "footer", "description", "left", "first", "last"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "Name";
    const company = this.getAttribute("company") || "Company";
    const companyUrl = this.getAttribute("company-url");
    const logo = this.getAttribute("logo");
    const time = this.getAttribute("time") || "Time";
    const location = this.getAttribute("location");
    const footer = this.getAttribute("footer");
    const description = this.getAttribute("description");
    const left = this.getAttribute("left") === "true";
    const first = this.getAttribute("first") === "true";
    const last = this.getAttribute("last") === "true";

    this.innerHTML = `
      <div class="group flex flex-row mx-auto max-w-5xl">
        <div class="flex flex-1 flex-col space-y-2 md:py-2 py-6 ${left ? "md:items-end items-start md:text-end text-start md:order-0 order-2" : "items-start text-start order-2"} text-textDark">
          <div class="text-textLight text-2xl font-title">${name}</div>
          <a href="${companyUrl}" target="_blank" rel="noopener noreferrer">
            <div class="flex flex-row text-text hover:underline">
              <div class="text-xl ${left ? "md:order-0 order-1" : "order-1"}">${company}</div>
              ${logo ? `<img class="size-6 rounded ${left ? "md:order-1 order-0 md:ml-2 md:mr-0 mr-2" : "mr-2"}" src="${logo}" alt="Logo"/>` : ''}
            </div>
          </a>
          <div class="text-text text-md italic">${time}</div>
          ${location ? `<div class="text-textDim text-md italic">${location}</div>` : ''}
          ${description ? `<div class="text-textDim text-md">${description}</div>` : ''}
          ${footer ? footer : ''}
        </div>
          <div class="relative w-1 md:mx-6 mr-6 max-h-full ${first ? "rounded-t" : ""} ${last ? "rounded-b" : ""} order-1 bg-textDark">
            <div class="absolute top-8 md:top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-textDark border-2 border-background group-hover:bg-text duration-300"></div>
          </div>        
        <div class="md:flex hidden flex-1 flex-col items-center justify-center text-textDark ${left ? "order-2" : "order-0"}"></div>
      </div>
    `;
  }
}

customElements.define("timeline-row", TimelineRow);