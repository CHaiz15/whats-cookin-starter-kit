class User {
  constructor(users, recipeData) {
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.id = users.id;
    this.name = users.name;
    this.pantry = users.pantry;
    this.matchingRecipes = [];
    this.recipeData = recipeData;
  }
  decideRecipe(){

  }
  favoriteRecipe(clickedCardNum){
    this.favoriteRecipes.push(recipeData[clickedCardNum]);
  }
  searchRecipes(recipeData, searchValue){
    this.matchingRecipes = [];
      let searchedRecipes = recipeData.filter(recipe => {
        searchValue = searchValue.toLowerCase();
        recipe.name = recipe.name.toLowerCase();
      return recipe.name.includes(searchValue);
    })
    searchedRecipes.forEach(recipe => {
      this.matchingRecipes.push(recipe);
    })
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
