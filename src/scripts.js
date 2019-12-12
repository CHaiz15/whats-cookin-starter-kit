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

const searchInput = document.querySelector('.search');
const user = new User(users);
//these variables are targeting HTML elements created later. They will be reassigned
let yourNewArray;
let filteredArray=[];
let heartButton;
let cardDisplay;
let ingredientCheckBox;
// let filterArea = [];
let allIngredients = [];
let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

const ingredients = recipeData.forEach(recipe => {
  recipe.ingredients.forEach((ingredient,i) => {
    if(allIngredients.includes(ingredient.name)){
      null;
    }else{
      allIngredients.push(ingredient.name);
    }
  })
})

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
  let ingredientList = document.querySelector(".ingredient-list");
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

    navBar.innerHTML += `
    <h2>Filter</h2>
    <div class="filter-options">
      <input type="checkbox" id="tag-option" name="tag-option" checked=true>Tag
      <input type="checkbox" id="ingredient-option" name="ingredient-option">Ingredient
    </div>
    <div class="filter-area">
      <input type="checkbox" id="breakfast" name="breakfast">Breakfast
      <input type="checkbox" id="brunch" name="brunch">Brunch
      <input type="checkbox" id="lunch" name="lunch">Lunch
      <input type="checkbox" id="dinner" name="dinner">Dinner
      <input type="checkbox" id="side-dish" name="side-dish">Side Dish
      <input type="checkbox" id="main-dish" name="main-dish">Main Dish
      <input type="checkbox" id="morning-meal" name="morning-meal">Morning Meal
      <input type="checkbox" id="antipasti" name="antipasti">Antipasti
      <input type="checkbox" id="starter" name="starter">Starter
      <input type="checkbox" id="snack" name="snack">Snack
      <input type="checkbox" id="appetizer" name="appetizer">Appetizer
      <input type="checkbox" id="antipasto" name="antipasto">Antipasto
      <input type="checkbox" id="hor-d'oeuvre" name="hor-d'oeuvre">Hor D'oeuvre
      <input type="checkbox" id="salad" name="salad">Salad
      <input type="checkbox" id="dip" name="dip">Dip
      <input type="checkbox" id="spread" name="spread">Spread
      <input type="checkbox" id="condiment" name="condiment">Condiment
      <input type="checkbox" id="sauce" name="sauce">Sauce
    </div>
    `;

    body.innerHTML +=`
    <main>
    <section class="ten-spacer"></section>
    <section class="card-display"></section>
    </main>
    `;

    instantiateRecipes(recipeData);
    ingredientCheckBox = document.querySelector('#ingredient-option');
    ingredientCheckBox.addEventListener("change", changeFilter)
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

function changeFilter(){
  filterArea = document.querySelector(".filter-area");
  filterArea.innerHTML = "";
  alphabet.forEach(letter => {
    filterArea.innerHTML += `<input type="checkbox" id="${letter}" name="${letter}">${letter}`;
  })
  alphabet.forEach(letter => {
    document.getElementById(letter).addEventListener("change", sortRecipes);
  })
}

function sortRecipes(event) {
  yourNewArray = allIngredients.filter(ingredient => {
    return ingredient[0].includes(event.target.id);
  })
  allIngredients.forEach(ingredient => {
    if(ingredient[0].includes(event.target.id)){
      filterArea.innerHTML += `<input type="checkbox" id="${ingredient.split(' ').join('-')}" name="${ingredient.split(' ').join('-')}">${ingredient}`;
    }
  })
  allIngredients.forEach(ingredient => {
    console.log(ingredient.split(' ').join('-'))
    let filterBoi = document.getElementById(ingredient.split(' ').join('-'));
    filterBoi.addEventListener("change", getFilteredCards);
    })
  }


function getFilteredCards(event){
  recipeData.forEach(recipe => {
    recipe.ingredients.forEach(ingredient =>{
      if(ingredient.name === event.target.id.split('-').join(' ')){
        filteredArray.push(recipe);
      }
    })
  })
}

// function instantiateFilteredRecipes() {
//   pageTitle.innerHTML = 'My Recipes!';
//   cardDisplay.innerHTML = '';
//   filteredArray.forEach((recipe, i) => {
//     cardDisplay.innerHTML += `
//     <button alt='${recipe.name}' class="recipe-card card${i} data-num='${recipe.id}'>
//       <div class="card-text">
//       </div>
//       <div class="button-arrangement">
//         <div class="heart"></div>
//         <div class="plus"></div>
//       </div>
//     </button>
//     `
//     let card = document.querySelector(`.card${i}`);
//     card.style.backgroundImage = `url(${recipe.image})`;
//     card.style.backgroundSize = 'cover';
//     heartButton = document.querySelector('.heart');
//   })
//   const favorite = document.querySelectorAll('.heart');
//   favorite.forEach(card => card.addEventListener('click', addFavoriteRecipe))
// }

function instantiateAllRecipes(data) {
  searchButton.style.display = 'initial';
  searchInput.style.display = 'initial';
  if (data === recipeData) {
    pageWelcome.innerHTML = 'All Recipes!';
  } else if (data === user.favoriteRecipes) {
    pageWelcome.innerHTML = 'My Recipes!';
  }
  let cardDisplay = document.querySelector(".card-display");
}
function displaySearchedRecipes() {
  cardDisplay.innerHTML = '';
  data.forEach((recipe, i) => {
    cardDisplay.innerHTML += `
    <button alt='${recipe.name}' class="recipe-card card${i}" data-id="${recipe.id}">
      <div class="card-text">
      ${recipe.name}
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
