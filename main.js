import { projects } from './src/projects.js';
import { experiences } from "./src/experiences.js";
import { educations } from "./src/educations.js";
import { awards } from "./src/awards.js";

const projectsContainer = document.getElementById('projects-container');
const experienceContainer = document.getElementById('experience-container');
const educationContainer = document.getElementById('education-container');
const awardsContainer = document.getElementById('awards-container');

// Create project cards
projects.forEach(project => {
  const projectCard = document.createElement('project-card');
  projectCard.setAttribute('name', project.name);
  projectCard.setAttribute('description', project.description);
  projectCard.setAttribute('image', project.image);
  projectCard.setAttribute('tags', project.tags);
  projectCard.setAttribute('year', project.year);
  projectCard.setAttribute('url', project.url);
  projectCard.classList.add('perspective-near');
  projectsContainer.appendChild(projectCard);
});

function createTimeline(entries, container) {
  entries.forEach((entry, index) => {
    const left = index % 2 === 0;
    const first = index === 0;
    const last = index === entries.length - 1;
    const timelineRow = document.createElement('timeline-row');
    timelineRow.setAttribute('name', entry.name);
    timelineRow.setAttribute('company', entry.company);
    timelineRow.setAttribute('company-url', entry.companyUrl);
    timelineRow.setAttribute('logo', entry.logo);
    timelineRow.setAttribute('time', entry.time);
    timelineRow.setAttribute('location', entry.location);
    timelineRow.setAttribute('footer', entry.footer);
    timelineRow.setAttribute('description', entry.description);
    timelineRow.setAttribute('left', left ? 'true' : 'false');
    timelineRow.setAttribute('first', first ? 'true' : 'false');
    timelineRow.setAttribute('last', last ? 'true' : 'false');
    container.appendChild(timelineRow);
  });
}

function setupCarousel() {
  const iconList = [
    'vscode', 'visualstudio', 'azure', 'unity', 'html', 'css', 'javascript', 'dart', 'kotlin', 'xcode', 'git', 'cpp', 'csharp', 'aspnet', 'tailwind', 'androidstudio', 'webstorm', 'rider', 'blender', 'davinci', 'figma', 'godot', 'flutter', 'bootstrap', 'mongo', 'mssql'
  ];
  iconList.sort(() => Math.random() - 0.5);

  const carousel = document.getElementById('icon-carousel');
  const iconWidth = 32;
  const gap = 16;
  const maxSpeed = 40;
  let speed = 40;
  let hovered = false;

  carousel.onmouseover = () => {
    hovered = true;
    console.log('hovered');
  }
  carousel.onmouseout = () => {
    hovered = false;
    console.log('unhovered');
  }
  const lerp = (x, y, a) => x * (1 - a) + y * a;

  function createIcon(id) {
    const img = document.createElement('div');
    img.setAttribute('class', 'size-8 bg-cover bg-center bg-no-repeat');
    img.style.backgroundImage = `url('/images/tools/${id}.png')`;
    const div = document.createElement('div');
    div.setAttribute('class', 'h-8 w-12 pr-4');
    div.appendChild(img);
    return div;
  }

  function fillCarousel() {
    const containerWidth = carousel.parentElement.offsetWidth;
    for (let i = 0; i < iconList.length; i++) {
      const icon = createIcon(iconList[i]);
      carousel.appendChild(icon);
    }
  }

  fillCarousel();

  let offset = 0;
  let previousTime = performance.now();
  function animateCarousel() {
    let deltaTime = (performance.now() - previousTime) / 1000.0;
    previousTime = performance.now();

    if (hovered) {
      speed = lerp(speed, 0, deltaTime * 4);
    } else {
      speed = lerp(speed, maxSpeed, deltaTime * 0.5);
    }
    offset -= speed * deltaTime;
    carousel.style.transform = `translateX(${offset}px)`;

    const firstIcon = carousel.firstElementChild;
    if (firstIcon && firstIcon.getBoundingClientRect().right < carousel.parentElement.getBoundingClientRect().left) {
      carousel.appendChild(firstIcon);
      offset += iconWidth + gap;
      carousel.style.transform = `translateX(${offset}px)`;
    }
    requestAnimationFrame(animateCarousel);
  }

  animateCarousel();
}

createTimeline(experiences, experienceContainer);
createTimeline(educations, educationContainer);
createTimeline(awards, awardsContainer);
//setupCarousel();

// Wait for fonts and profile image to load before starting animations
const profileImageUrl = '/images/profile.png';
const profileImage = new Image();
profileImage.src = profileImageUrl;

const fontsReady = document.fonts.ready;
const imageReady = new Promise((resolve) => {
  if (profileImage.complete) {
    resolve();
  } else {
    profileImage.onload = resolve;
    profileImage.onerror = resolve; // Continue even if image fails to load
  }
});

// Wait for a small timeout as a fallback and to ensure smooth transition
const timeout = new Promise((resolve) => setTimeout(resolve, 1000));

Promise.race([
  Promise.all([fontsReady, imageReady]),
  timeout
]).then(() => {
  document.body.classList.remove('wait-loading');
});