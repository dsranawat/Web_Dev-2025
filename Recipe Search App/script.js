const API_KEY = "3c6a057aaf824f5da2f6c7e739881da3";
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const cuisineFilter = document.getElementById("cuisineFilter");
const resetBtn = document.getElementById("resetBtn");
const resultsContainer = document.getElementById("resultsContainer");
const message = document.getElementById("message");
const loader = document.getElementById("loader");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const darkToggle = document.getElementById("darkToggle");

let currentQuery = "";
let currentCuisine = "";
let offset = 0;

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  offset = 0;
  resultsContainer.innerHTML = "";
  message.textContent = "";
  currentQuery = searchInput.value.trim();
  currentCuisine = cuisineFilter.value;
  if (currentQuery) {
    fetchRecipes(currentQuery, currentCuisine, offset);
  }
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  cuisineFilter.value = "";
  resultsContainer.innerHTML = "";
  message.textContent = "";
  loadMoreBtn.style.display = "none";
});

loadMoreBtn.addEventListener("click", () => {
  offset += 12;
  fetchRecipes(currentQuery, currentCuisine, offset);
});

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

function fetchRecipes(query, cuisine, offset) {
  loader.style.display = "block";
  message.textContent = "";
  loadMoreBtn.style.display = "none";

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=12&offset=${offset}&cuisine=${cuisine}&apiKey=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";

      if (data.results.length === 0 && offset === 0) {
        message.textContent = "No recipes found.";
        return;
      }

      data.results.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" />
          <h3>${recipe.title}</h3>
          <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
        `;
        resultsContainer.appendChild(card);
      });

      if (data.totalResults > offset + 12) {
        loadMoreBtn.style.display = "block";
      }
    })
    .catch(() => {
      loader.style.display = "none";
      message.textContent = "Error fetching recipes. Try again.";
    });
}
