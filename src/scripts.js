const body = document.querySelector('body');
const navBar = document.querySelector('nav');
const welcomeBoxes = document.querySelectorAll('.welcome');
const cardHolder = document.querySelector('.recipe-holder');
const allRecipesBox = document.querySelector('.all-recipes-box');
const pantryBox = document.querySelector('.pantry-box');
const myRecipesBox = document.querySelector('.my-recipes-box');
const recipesToCookBox = document.querySelector('.recipes-to-cook-box');
let pageWelcome = document.querySelector('.page-welcome');
const user = new User(users[(Math.round(Math.random() * 50))]);
let searchButton = document.querySelector('.search-btn');
let searchInput = document.querySelector('.search');
const recipe = new Recipe(recipeData);
const usersFavRecipes = JSON.parse(localStorage.getItem(`usersFavRecipes${user.id}`)) || [];
// let heart;
// let cardDisplay;



window.addEventListener("click", functionRunner);
pageWelcome.innerText = `Welcome, ${user.name}!`;

function functionRunner() {
  if (event.target.classList.contains('page-title')) {
    goHome();
  }
  if (event.target.classList.contains('menu-box')) {
    animateNavBar();
  }
  if (event.target.classList.contains('all-recipes-box')) {
    instantiateAllRecipes(recipeData);
  }
  if (event.target.classList.contains('my-recipes-box')) {
    instantiateAllRecipes(user.favoriteRecipes);
  }
  if (event.target.classList.contains('search-btn')) {
    addToSearchRecipes(event);
    instantiateAllRecipes(user.matchingRecipes);
  }
  if (event.target.classList.contains('recipe-card')) {
    displayCardInfo(recipeData);
  }
}

function goHome() {
  location.reload();
}

function displayCardInfo() {
  let clickedIdValue = parseInt(event.target.dataset.id);
  let clickedRecipe = recipeData.find(recipe => recipe.id === clickedIdValue);
  let cardDisplay = document.querySelector(".card-display");
  cardDisplay.innerHTML = '';
  cardDisplay.innerHTML += `
  <h2 class="recipe-info-title">${clickedRecipe.name}</h2>
  <div alt='${clickedRecipe.name}' class="recipe-info" data-id="${clickedRecipe.id}">
  </div>
  <div class="info">
  <h4>Ingredients Needed:</h4>
  <ul class='ingredient-list'>
  </ul>
  <h4>Instructions:</h4>
  <ul class='instruction-list'>
  </ul>
  </div>
  `
  let recipeInfo = document.querySelector('.recipe-info');
    recipeInfo.style.backgroundImage = `url(${clickedRecipe.image})`;
  let ingredientList = document.querySelector(".ingredient-list")
  clickedRecipe.ingredients.forEach(i => {
    ingredientList.innerHTML += `<li>${i.name}: ${i.quantity.amount} ${i.quantity.unit}.</li>`;
  })
  let instructionList = document.querySelector(".instruction-list");
  clickedRecipe.instructions.forEach(i => {
    instructionList.innerHTML += `<li>${i.number}: ${i.instruction}</li>`;
  })
}

function addToSearchRecipes() {
  const searchInput = document.querySelector('.search');
  user.searchRecipes(recipeData, document.querySelector('.search').value);
}

function animateNavBar() {
  welcomeBoxes.forEach(box => {
    box.classList.add('faded');
    box.classList.remove('menu-box');
  });
  navBar.style.animationDuration = '1.5s';
  navBar.style.animationName = 'nav-animation';
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
  searchButton.style.display = 'initial';
  searchInput.style.display = 'initial';
  if (data === recipeData) {
    pageWelcome.innerHTML = 'All Recipes!';
  } else if (data === user.favoriteRecipes) {
    pageWelcome.innerHTML = 'My Recipes!';
  }
  let cardDisplay = document.querySelector(".card-display");
  cardDisplay.innerHTML = '';
  data.forEach((recipe, i) => {
    cardDisplay.innerHTML += `
    <button alt='${recipe.name}' class="recipe-card card${i}" data-id="${recipe.id}">
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
    if(user.favoriteRecipes.includes(recipe)){
      heart.classList.add('heart-active');
    }
  })
  const favorite = document.querySelectorAll('.heart');
  favorite.forEach(card => card.addEventListener('click', addFavoriteRecipe))
}

function addFavoriteRecipe() {
  let clickedCardNum = event.target.parentNode.parentNode.classList[1].split('d')[1];
  let clickedCardId = parseInt(event.target.parentNode.parentNode.dataset.id);
  let addedCard = recipeData.find(recipe => recipe.id === clickedCardId);
  heart = document.querySelector(`.heartid${clickedCardNum}`);
  if (!event.target.parentNode.parentNode.classList.contains('heart-active')) {
    heart.classList.toggle('heart-active');
}
  user.favoriteRecipe(addedCard);
  user.saveToStorage(user.favoriteRecipes);
}
