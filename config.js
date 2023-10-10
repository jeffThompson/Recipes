const RECIPE_NAME = '<name>';

const yelpLocation = 'Bloomfield, NJ'; // no need for fancy formatting, just do it like this

/*
* RECIPE OPTIONS
* below are some options to customize how your recipes appear
* (these are mostly things that folks might want to change, but
* of course you can customize the code too)
*/
module.exports = {
  imageDir: './images',
  outputDir: './.dist',
  recipeDir: './recipes/',

  // siteDomain: 'localhost',
  titleSuffix: ' - Recipe Book',

  includeHelpLinks: false,
  /**
   * help urls to include (will be listed in the order below)
   * label = text displayed
   * url = template url (put <name> where the search term
   *       goes, it will be auto-added later)
   */
  helpURLs: [{
    label: 'Image search',
    url: `https://www.google.com/search?q=${RECIPE_NAME}&tbm=isch`
  },
  {
    label: 'Serious Eats',
    url: `https://www.seriouseats.com/search?q=${RECIPE_NAME}&site=recipes`
  },
  {
    label: 'More recipes',
    url: `https://www.google.com/search?q=${RECIPE_NAME}+recipe`
  },
  {
    label: 'Yelp (takeout pls)',
    url: `https://www.yelp.com/search?find_loc=${yelpLocation}&find_desc=${RECIPE_NAME}`
  }
  ],

  /**
   * look in a folder called 'images' for an image to display
   * at the top of the recipe?
   * (must be named the same thing as the recipe and have a .jpg ext)
   * (ex: aloo-matar.md would have an image aloo-matar.jpg)
   * will fail gracefully if an image doesn't exist, but you can
   * turn it off entirely if you want
   */
  lookForHeroImage: true,

  /**
   * turn text-only urls to links in these sections
   * (in other sections, markdown links will work as normal)
   */
  autoUrlSections: ['basedon'],

  /**
   * trim display text for long urls in 'based on' section
   * @example
   * const url = 'https://www.seriouseats.com/recipes/2012/01/aloo-matar.html'
   * // would become:
   * // https://www.seriouseats.com
   */
  shortenURLs: false,

};
