const { resolve } = require('path');
const { writeFileSync } = require('fs');

/* eslint-disable key-spacing */
const Substitutions = {
  LETTERS_INDEX:     '{{__letters-index__}}',
  RECIPE_LIST:       '{{__recipe-list__}}',
};
/* eslint-enable key-spacing */

/**
 * and generate table of contents, plus a quick-nav list
 *  at the top
 */
function buildRecipeIndex(indexTemplate, { outputPath }, fileList) {
  // create anchor and name from url
  let lettersIndex = '';
  // create list of recipes
  let recipeItems = '';

  let prevLetter = '';

  fileList.forEach(({ name }) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const displayName = name.replace(/-/g, ' ');

    // if the first letter of the recipe hasn't been
    // seen yet, add to list of letters and put an achor in
    const isNewLetter = firstLetter !== prevLetter;
    if (isNewLetter) {
      lettersIndex += `<a href="#${firstLetter}">${firstLetter}</a>`;
      prevLetter = firstLetter;
    }

    recipeItems += `<li${isNewLetter ? ` id="${firstLetter}"` : ''}><a href="${name}.html">${displayName}</a></li>\n`;
  });

  const contents = indexTemplate
    // add recipes to page...
    .replace(Substitutions.RECIPE_LIST, recipeItems)
    // ...and the list of first-letters for quick nav
    .replace(Substitutions.LETTERS_INDEX, lettersIndex);

  writeFileSync(resolve(outputPath, 'index.html'), contents, { encoding: 'utf8' });
}

module.exports = buildRecipeIndex;
