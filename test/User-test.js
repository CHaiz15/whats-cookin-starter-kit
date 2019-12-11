const chai = require('chai');
const expect = chai.expect;

const User = require('../classes/User');
const users = require('../data/users');
const recipeData = require('../data/recipes.js');


describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User(users[0]);
    // add values to past tests?
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should have a default value of [] for favoriteRecipes', function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should have a default value of [] for recipesToCook', function() {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should have a default id of 1', function() {
    expect(user.id).to.equal(1);
  });

  it('should have a default name of Saige O\'Kon', function() {
    expect(user.name).to.equal('Saige O\'Kon');
  });

  it('should have a default pantry of users[0].pantry', function() {
    expect(user.pantry).to.equal(users[0].pantry);
  });

  it.skip('should add recipe to this.favoriteRecipes when user favorites recipe', function() {
    user.favoriteRecipe(recipeData);
    expect(user.favoriteRecipes[0]).to.equal(recipeData[0]);
  })

  it('should find the recipes matching the name searched by the user', function() {
    user.searchRecipes(recipeData, 'Cookie');
    expect(user.matchingRecipes[0]).to.equal(recipeData[0]);
  })
})
