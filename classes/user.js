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
      let searchedRecipes = recipeData.filter(value => {
      return value.name.includes(searchValue);
    })
    this.matchingRecipes.push(searchedRecipes);
    // probably use filter && || find to search by ingredient || name through
    // the favoriteRecipes array
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
