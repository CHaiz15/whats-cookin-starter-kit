const body = document.querySelector('body');
const navBar = document.querySelector('nav');
const welcomeBoxes = document.querySelectorAll('.welcome');
const cardHolder = document.querySelector('.recipe-holder');
const allRecipesBox = document.querySelector('.all-recipes-box');
const pantryBox = document.querySelector('.pantry-box');
const myRecipesBox = document.querySelector('.my-recipes-box');
const recipesToCookBox = document.querySelector('.recipes-to-cook-box');
const pageWelcome = document.querySelector('.page-welcome');
const user = new User(users[(Math.round(Math.random() * 50))]);
const searchButton = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search');
const recipe = new Recipe(recipeData);
const usersFavRecipes = JSON.parse(localStorage.getItem(`usersFavRecipes${user.id}`)) || [];
let heartButton;
let cardDisplay;


window.addEventListener("click", functionRunner);
pageWelcome.innerText = `Welcome, ${user.name}!`;

function functionRunner() {
  if (event.target.classList.contains('menu-box')) {
    animateNavBar();
    welcomeBoxes.forEach((box, i) => {
      welcomeBoxes[i].classList.remove('menu-box');
    });
  }
  if (event.target.classList.contains('all-recipes-box')) {
    instantiateAllRecipes(recipeData);
  }
  if (event.target.classList.contains('my-recipes-box')) {
    instantiateAllRecipes(user.favoriteRecipes);
  }
  if (event.target.classList.contains('search-btn')) {
    addToSearchRecipes();
    instantiateAllRecipes(user.matchingRecipes);
  }
}



function addToSearchRecipes() {
  const searchInput = document.querySelector('.search');
  user.searchRecipes(recipeData, document.querySelector('.search').value);
}

function animateNavBar() {
  welcomeBoxes.forEach((box, i) => {
    welcomeBoxes[i].classList.add('faded');
  });
  navBar.style.animationDuration = '1.5s';
  navBar.style.animationName = 'nav-animation';
  //insert new nav bar here and new divs for the 4 pages
  setTimeout(function() {
    searchButton.style.display = 'initial';
    searchInput.style.display= 'initial';
    navBar.removeAttribute("style");
    navBar.classList.add("main-nav");
    for (i = 0; i < welcomeBoxes.length; i++) {
      welcomeBoxes[i].classList.remove("welcome");
      welcomeBoxes[i].classList.remove("faded");
      welcomeBoxes[i].classList.add("nav-popup");
      welcomeBoxes[i].classList.add("popup-animate");
    };
    // navBar.innerHTML += `
    // <div class="filter-area"></div>
    // `;
    body.innerHTML +=
      `
    <main>
    <section class="ten-spacer"></section>
    <section class="card-display"></section>
    </main>

    `
    instantiateAllRecipes(recipeData);
  }, 1500);
}

function instantiateAllRecipes(data) {
  pageWelcome.innerHTML = 'All Recipes!';
  cardDisplay = document.querySelector(".card-display");
  cardDisplay.innerHTML = '';
  data.forEach((recipe, i) => {
    cardDisplay.innerHTML += `
    <button alt='${recipe.name}' class="recipe-card card${i} data-num='${recipe.id}'>
      <div class="card-text">
      </div>
      <div class="button-arrangement">
        <div class="heart heartid${i}"></div>
        <div class="plus"></div>
      </div>
    </button>
    `
    let card = document.querySelector(`.card${i}`);
    card.style.backgroundImage = `url(${recipe.image})`;
    card.style.backgroundSize = 'cover';
    let heart = document.querySelector(`.heartid${i}`);
    heart.style.backgroundImage = 'url(../images/heart-active.png)';
    heart.style.backgroundSize = 'cover';
    heartButton = document.querySelector('.heart');
  })
  const favorite = document.querySelectorAll('.heart');
  favorite.forEach(card => card.addEventListener('click', addFavoriteRecipe))
}

function addFavoriteRecipe() {
  heartButton.style.opacity = 1;
  heartButton.style.backgroundImage = "url('../images/heart-active.png')";
  var clickedCardNum = event.target.parentNode.parentNode.classList[1].split('d')[1];
  user.favoriteRecipe(clickedCardNum);
  user.saveToStorage(user.favoriteRecipes);
}
