const body = document.querySelector('body');
const navBar = document.querySelector('nav');
const welcomeBoxes = document.querySelectorAll('.menu-box');
const cardHolder = document.querySelector('.recipe-holder');
const allRecipes = document.querySelector('.all-recipes-box');
const pageTitle = document.querySelector('h1');
let searchButton = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search');
const user = new User(users);
let heartButton;
let cardDisplay;


window.addEventListener("click", functionRunner);
function functionRunner() {
  if (event.target.classList.contains('all-recipes-box')) {
    animateNavBar();
  }
  if (event.target.classList.contains('search-btn')) {
    addToSearchRecipes();
    displaySearchedRecipes();
  }
}
// search bar functionality, filter functionality, and clicked recipe pops up

function addToSearchRecipes() {
  const searchInput = document.querySelector('.search');
  user.searchRecipes(recipeData, document.querySelector('.search').value);
}

function animateNavBar() {
  for(i = 0; i < welcomeBoxes.length; i++){
    welcomeBoxes[i].classList.add('faded');
  }
  navBar.style.animationDuration = '1.5s';
  navBar.style.animationName = 'nav-animation';
  //insert new nav bar here and new divs for the 4 pages
  setTimeout(function(){
    searchButton.style.visibility = 'initial';
    searchInput.style.visibility = 'initial';
    navBar.removeAttribute("style");
    navBar.classList.add("main-nav");

    for(i = 0; i < welcomeBoxes.length; i++){
      welcomeBoxes[i].classList.remove("welcome");
      welcomeBoxes[i].classList.remove("faded");
      welcomeBoxes[i].classList.add("nav-popup");
      welcomeBoxes[i].classList.add("popup-animate");
    }
    body.innerHTML +=
    `
    <main>
    <section class="ten-spacer"></section>
    <section class="card-display"></section>
    </main>
    `

    instantiateRecipes(recipeData);
  }, 1500);
}

function instantiateRecipes(data) {
  pageTitle.innerHTML = 'All Recipes!';
  cardDisplay = document.querySelector(".card-display");
  cardDisplay.innerHTML = '';
  for(i = 0; i < data.length; i++) {
    cardDisplay.innerHTML += `
    <button alt='${data[i].name}' class="recipe-card card${i} data-num='${i}'>
      <div class="card-text">
      </div>
      <div class="button-arrangement">
        <div class="heart"></div>
        <div class="plus"></div>
      </div>
    </button>
    `
    let card = document.querySelector(`.card${i}`);
    card.style.backgroundImage = `url(${data[i].image})`;
    card.style.backgroundSize = 'cover';
    heartButton = document.querySelector('.heart');
    }
    const favorite = document.querySelectorAll('.heart');
    favorite.forEach(card => card.addEventListener('click', addFavoriteRecipe))
}

function displaySearchedRecipes() {
  cardDisplay.innerHTML = '';
  user.matchingRecipes.forEach((recipe, i) => {
    cardDisplay.innerHTML += `
    <button alt='${recipe.name}' class="recipe-card card${i} data-num='${i}'>
      <div class="card-text">
      </div>
      <div class="button-arrangement">
        <div class="heart"></div>
        <div class="plus"></div>
      </div>
    </button>
    `
    let card = document.querySelector(`.card${i}`);
    card.style.backgroundImage = `url(${recipe.image})`;
    card.style.backgroundSize = 'cover';
  })
}

function addFavoriteRecipe() {
  heartButton.style.opacity = 1;
  heartButton.style.backgroundImage = "url('../images/heart-active.png')";
  var clickedCardNum = event.target.parentNode.parentNode.classList[1].split('d')[1];
  user.favoriteRecipe(clickedCardNum);
  // take the value of clicked card and send it on over to the user class method of favoriteRecipe
  // where it will add that recipe to the array and then be able to instantiate on favorite recipes.

  // **side note** we will need to log in a user and save their favorite recipes to local storage.
  console.log(clickedCardNum);
}
