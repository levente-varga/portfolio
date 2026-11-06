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

createTimeline(experiences, experienceContainer);
createTimeline(educations, educationContainer);
createTimeline(awards, awardsContainer);

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