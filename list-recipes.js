
// once document is loaded, load list of markdown files
// and generate table of contents, plus a quick-nav list
// at the top
$(document).ready(function() {
  let listOfRecipes = '';
  let listOfLetters = '';
  let prevLetter = '';
  
  // create list of recipes
  for (let i in files) {
    let url = files[i];
    
    // skip files that start with underscore
    // (such as the _template.md file)
    if (url[0] === '_') {
      continue;
    }

    // create anchor and name from url
    let anchor = url.replace('.md', '');
    let name = anchor.split('-').join(' ');

    // if the first letter of the recipe hasn't been
    // seen yet, add to list of letters and put an achor in
    let firstLetter = name.charAt(0).toUpperCase();
    if (firstLetter !== prevLetter) {
      listOfRecipes += '<li id="' + firstLetter + '">';
      listOfLetters += '<a href="#' + firstLetter + '">' + firstLetter + ' </a>';
    }
    else {
      listOfRecipes += '<li>';
    }

    listOfRecipes += '<a href="recipe.php#' + anchor + '">' + name + '</a></li>';
    prevLetter = firstLetter;
  }

  // add recipes to page...
  $('#toc ul').html(listOfRecipes);

  // ...and the list of first-letters for quick nav
  $('#navigation').html(listOfLetters);
});

