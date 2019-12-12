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
  favoriteRecipe(addedCard) {
    if (!this.favoriteRecipes.includes(addedCard)) {
      this.favoriteRecipes.push(addedCard);
    } else {
      let unfavoritedRecipe = this.favoriteRecipes.find(recipe => addedCard);
      this.favoriteRecipes = this.favoriteRecipes.filter(recipe => {
        return recipe !== addedCard;
      });
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
