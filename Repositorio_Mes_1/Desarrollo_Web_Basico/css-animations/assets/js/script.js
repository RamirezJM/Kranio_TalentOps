const sidebar = document.getElementById("sidebar");
const main = document.querySelector(".main");
const toggleSidebar = document.getElementById("toggleSidebar");
const closeSidebar = document.querySelector(".close-sidebar")
const toggleTheme = document.getElementById("toggleTheme");
const loader = document.getElementById("loader");
const content = document.getElementById("content");

// Toggle sidebar
toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("expanded");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("expanded");
});

// Toggle theme
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains('dark')) {
    toggleTheme.textContent = '🌞'
  } else {
    toggleTheme.textContent = '🌚'
  }
});

// loading
setTimeout(() => {
  loader.classList.add("hidden");
  content.classList.remove("hidden");
}, 2000);
