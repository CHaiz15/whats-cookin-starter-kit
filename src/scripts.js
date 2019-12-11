const body = document.querySelector('body');
const navBar = document.querySelector('nav');
const welcomeBoxes = document.querySelectorAll('.menu-box');
const cardHolder = document.querySelector('.recipe-holder');
const allRecipes = document.querySelector('.all-recipes-box');
const pageTitle = document.querySelector('h1');
var heartButton;

allRecipes.addEventListener("click", animateNavBar);

function animateNavBar (){
  for(i = 0; i < welcomeBoxes.length; i++){
    welcomeBoxes[i].classList.add('faded');
  }
  navBar.style.animationDuration = '1.5s';
  navBar.style.animationName = 'nav-animation';
  //insert new nav bar here and new divs for the 4 pages
  setTimeout(function(){
    console.log('hi');
    navBar.removeAttribute("style");
    navBar.classList.add("main-nav");
    for(i = 0; i < welcomeBoxes.length; i++){
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
    `;
    instantiateRecipes();
  }, 1500);
}

function instantiateRecipes() {
  pageTitle.innerHTML = 'All Recipes!';
  let cardDisplay = document.querySelector(".card-display");
  for(i = 0; i < recipeData.length; i++) {
    cardDisplay.innerHTML += `
    <button class="recipe-card card${i} dataset=${i}>
      <div class="card-text">
      </div>
      <div class="button-arrangement">
        <div class="heart"></div>
        <div class="plus"></div>
      </div>
    </button>
    `
    console.log(recipeData[i].tags);
    let card = document.querySelector(`.card${i}`);
    card.style.backgroundImage = `url(${recipeData[i].image})`;
    card.style.backgroundSize = 'cover';
    heartButton = document.querySelector('.heart');
    }
    const favorite = document.querySelectorAll('.heart');
    favorite.forEach(card => card.addEventListener('click', addFavoriteRecipe))
}

function addFavoriteRecipe() {
  heartButton.style.opacity = 1;
  heartButton.style.backgroundImage = "url('../images/heart-active.png')";
  var clickedCard = event.target.parentNode.parentNode;
  // take the value of clicked card and send it on over to the user class method of favoriteRecipe
  // where it will add that recipe to the array and then be able to instantiate on favorite recipes.

  // **side note** we will need to log in a user and save their favorite recipes to local storage.
  console.log(clickedCard);
}
