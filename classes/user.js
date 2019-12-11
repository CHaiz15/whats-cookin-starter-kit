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
      let searchedRecipes = recipeData.filter(value => {
        searchValue = searchValue.toLowerCase();
        value.name = value.name.toLowerCase();
      return value.name.includes(searchValue);
    })
    searchedRecipes.forEach(recipe => {
      this.matchingRecipes.push(recipe);
    })
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
