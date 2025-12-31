const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const navOverlay = document.getElementById("navOverlay");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navOverlay.classList.toggle("active");
});

navOverlay.addEventListener("click", () => {
  navLinks.classList.remove("active");
  navOverlay.classList.remove("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
  });
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
