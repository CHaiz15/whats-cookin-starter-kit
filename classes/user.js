class User {
  constructor(users) {
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.id = users.id;
    this.name = users.name;
    this.pantry = users.pantry;
    this.matchingRecipes = [];
  }
  decideRecipe(){

  }
  favoriteRecipe(recipeData){
    // will pass in the recipeData of the recipe that was clicked and
    // push into this.favoriteRecipes
    this.favoriteRecipes.push(recipeData[0]);
  }
  searchRecipes(recipeData, searchValue){
      let foo = recipeData.filter(value => {
      return value.name.includes(searchValue);
    })
    this.matchingRecipes.push(foo[0]);
    // probably use filter && || find to search by ingredient || name through
    // the favoriteRecipes array
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
