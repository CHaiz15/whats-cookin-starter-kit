class User {
  constructor(users, recipeData) {
    this.id = users.id;
    this.name = users.name;
    this.pantry = users.pantry;
    this.recipeData = recipeData;
    this.favoriteRecipes = JSON.parse(localStorage.getItem(`usersFavRecipes${this.id}`)) || [];
    this.recipesToCook = [];
    this.matchingRecipes = [];
  }
  decideRecipe() {

  }
  favoriteRecipe(clickedCardNum) {
    if (!this.favoriteRecipes.includes(recipeData[clickedCardNum])) {
      this.favoriteRecipes.push(recipeData[clickedCardNum]);
    } else {
      console.log('shuck');
    }
  }
  searchRecipes(recipeData, searchValue) {
    this.matchingRecipes = [];
    let searchedRecipes = recipeData.filter(recipe => {
      searchValue = searchValue.toLowerCase();
      recipe.name = recipe.name.toLowerCase();
      return recipe.name.includes(searchValue);
    })
    searchedRecipes.forEach(recipe => {
      if (!this.matchingRecipes.includes(searchValue)) {
        this.matchingRecipes.push(recipe);
      }
    })
  }
  saveToStorage(favRecipes) {
    var stringifiedObj = JSON.stringify(favRecipes);
    localStorage.setItem(`usersFavRecipes${this.id}`, stringifiedObj);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
