class CustomNavbar extends HTMLElement {
  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    this.render();
    this.addScrollListener();
    this.setupDropdownMenu();
  }

  render() {
    this.innerHTML = `
      <header id="navbar" style="transition: transform 0.3s ease-in-out;" class="fixed inset-0 z-20 h-fit">
        <div class="flex bg-background px-4 justify-center sm:h-16 h-20 animate-fade-down animation-delay-300">
          <nav class="sm:flex hidden">
            <ul class="flex space-x-5 items-center text-textLight">
              <li><a href="#home" class="group m-4">
                <svg class="size-6 m-4 fill-textLight group-hover:fill-text duration-150"><use href="/svg/icons.svg#logo"/></svg>
              </a></li>
              <li><a href="#projects" class="hover:text-text duration-150">Projects</a></li>
              <li><a href="#experience" class="hover:text-text duration-150">Experience</a></li>
              <li><a href="#education" class="hover:text-text duration-150">Education</a></li>
              <li><a href="#awards" class="hover:text-text duration-150">Awards</a></li>
              <li><a href="#about" class="hover:text-text duration-150">About</a></li>
              <li><a href="#contact" class="hover:text-text duration-150">Contact</a></li>
            </ul>
          </nav>
      
          <!-- Mobile Menu Button -->
          <div class="flex sm:hidden w-full justify-between items-center">
            <div class="flex-1 items-center"></div>
            <button id="btn-menu" class="group p-4 cursor-pointer">
              <svg class="size-6 fill-textLight group-hover:fill-text duration-150"><use href="/svg/icons.svg#logo"/></svg>
            </button>
          </div>
        </div>
      
        <!-- Mobile Dropdown Menu -->
        <div id="mobile-menu" class="md:hidden hidden z-20 fixed sm:inset-y-16 inset-y-20 w-full h-fit text-2xl">
          <div class="bg-background shadow-md">
            <a id="btn-home" href="#home" class="block px-8 py-6 text-white hover:bg-textDark duration-150">Home</a>
            <a id="btn-projects" href="#projects" class="block px-8 py-6 text-white hover:bg-textDark duration-150">Projects</a>
            <a id="btn-experience" href="#experience" class="block px-8 py-6 text-white hover:bg-textDark duration-150">Experience</a>
            <a id="btn-education" href="#education" class="block px-8 py-6 text-white hover:bg-textDark duration-150">Education</a>
            <a id="btn-awards" href="#awards" class="block px-8 py-6 text-white hover:bg-textDark duration-150">Awards</a>
            <a id="btn-about" href="#about" class="block px-8 py-6 text-white hover:bg-textDark duration-150">About</a>
            <a id="btn-contact" href="#contact" class="block px-8 py-6 text-white hover:bg-textDark duration-150">Contact</a>
          </div>
          <button id="btn-close" class="w-full h-full bg-black/50"></button>
        </div>
      </header>
    `;
  }

  addScrollListener() {
    let lastScrollY = window.scrollY;
    const navbar = this.querySelector("#navbar");
    const scrollThreshold = 50;
    let isAutoScrolling = false;

    window.addEventListener("scroll", () => {
      if (isAutoScrolling) {
        return;
      }

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

    const menuItems = document.querySelectorAll("a[href^='#']");
    menuItems.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const offset = 80;

        if (targetElement) {
          isAutoScrolling = true;

          window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: "smooth"
          });

          setTimeout(() => {
            isAutoScrolling = false;
          }, 1000);
        }
      });
    });
  }

  setupDropdownMenu() {
    const btnMenu = this.querySelector('#btn-menu');
    const mobileMenu = this.querySelector('#mobile-menu');
    const btnHome = this.querySelector('#btn-home');
    const btnProjects = this.querySelector('#btn-projects');
    const btnExperience = this.querySelector('#btn-experience');
    const btnEducation = this.querySelector('#btn-education');
    const btnAwards = this.querySelector('#btn-awards');
    const btnAbout = this.querySelector('#btn-about');
    const btnContact = this.querySelector('#btn-contact');
    const btnClose = this.querySelector('#btn-close');

    btnMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    btnHome.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
    btnProjects.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
    btnExperience.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
    btnEducation.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
    btnAwards.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
    btnAbout.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
    btnContact.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
    btnClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);