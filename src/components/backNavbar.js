class BackNavbar extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.render();
    this.addScrollListener();
    this.setupBackButton();
  }

  render() {
    this.innerHTML = `
      <header class="fixed top-0 left-0 w-full z-20 transition-transform duration-300">
        <div class="flex justify-center items-center w-full">
          <div id="navbar" style="transition: transform 0.3s ease-in-out;" class="flex lg:max-w-5xl w-full mx-auto bg-background p-4 justify-left items-center sm:h-16 h-20">
            <button id="button" class="group px-4 cursor-pointer" aria-label="Back">
              <svg class="size-8 fill-textLight group-hover:fill-text duration-150"><use href="/svg/icons.svg#back"/></svg>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  addScrollListener() {
    let lastScrollY = window.scrollY;
    const navbar = this.querySelector("#navbar");
    const scrollThreshold = 50;

    window.addEventListener("scroll", () => {
      if (window.scrollY <= 0) {
        navbar.style.transform = "translateY(0)";
        lastScrollY = window.scrollY;
      } else if (window.scrollY > lastScrollY + scrollThreshold) {
        navbar.style.transform = "translateY(-100%)";
        lastScrollY = window.scrollY;
      } else if (window.scrollY < lastScrollY - scrollThreshold) {
        navbar.style.transform = "translateY(0)";
        lastScrollY = window.scrollY;
      }
    });
  }

  setupBackButton() {
    const backButton = this.querySelector("button");
    backButton.addEventListener("click", () => {
      const previousURL = document.referrer;
      const targetURL = "https://leventevarga.com/";

      if (previousURL === targetURL || previousURL.includes("localhost:") || previousURL.includes(".vercel.app")) {
        window.history.back();
      } else {
        window.location.href = targetURL;
      }
    });
  }
}

customElements.define("back-navbar", BackNavbar);