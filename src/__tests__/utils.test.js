const { linkify } = require('../utils');

describe('buildRecipes', () => {
  describe('linkify', () => {
    it('should add parens class (Happy Path)', () => {
      const value = `
<ul>
<li>Drizzle from <a href="https://cooking.nytimes.com/recipes/1021802-applejack-butter-pecan-bundt-cake">Applejack Butter Pecan Bundt Cake/NYTimes Cooking</a></li>
<li><a href="https://cooking.nytimes.com/search?q=Brian+Noyes">Brian Noyes</a> wrote this recipe</li>
<li>Just a domain: www.seriouseats.com/recipes/2017/01/homemade-bagels-recipe.html</li>
<li>Deliberately broken URL: href="www.seriouseats.com/recipes/2017/01/homemade-bagels-recipe.html</li>
<li>https://cooking.nytimes.com/recipes/1013116-simple-barbecue-sauce</li>
<li>julia.child@wgbh.org</li>
</ul>
`;

      const expectedResult = `
<ul>
<li>Drizzle from <a href="https://cooking.nytimes.com/recipes/1021802-applejack-butter-pecan-bundt-cake">Applejack Butter Pecan Bundt Cake/NYTimes Cooking</a></li>
<li><a href="https://cooking.nytimes.com/search?q=Brian+Noyes">Brian Noyes</a> wrote this recipe</li>
<li>Just a domain: <a href="http://www.seriouseats.com/recipes/2017/01/homemade-bagels-recipe.html">www.seriouseats.com/recipes/2017/01/homemade-bagels-recipe.html</a></li>
<li>Deliberately broken URL: href="www.seriouseats.com/recipes/2017/01/homemade-bagels-recipe.html</li>
<li><a href="https://cooking.nytimes.com/recipes/1013116-simple-barbecue-sauce">https://cooking.nytimes.com/recipes/1013116-simple-barbecue-sauce</a></li>
<li><a href="mailto:julia.child@wgbh.org">julia.child@wgbh.org</a></li>
</ul>
`;

      const result = linkify(value);

      expect(result).toBe(expectedResult);
    });
  });
});
