const { resolve } = require('path');
const { accessSync, constants: { F_OK }, readFileSync, writeFile } = require('fs');
const showdown  = require('showdown');
const { linkify } = require('./utils');

/* eslint-disable key-spacing */
const SectionTypes = {
  BASED_ON:       'basedon',
  HELP:           'help',
  HERO_IMG:       'heroImg',
  INFO:           'info',
  INGREDIENTS:    'ingredients',
  NOTES:          'notes',
  STEPS:          'steps',
};

const SectionAliases = {
  [SectionTypes.STEPS]: ['directions', 'instructions', 'preparation', 'procedure', 'procedures'],
  [SectionTypes.NOTES]: ['tips'],
};

const Substitutions = {
  BASED_ON:       `{{__${SectionTypes.BASED_ON}__}}`,
  HELP:           `{{__${SectionTypes.HELP}__}}`,
  HERO_IMG:       `{{__${SectionTypes.HERO_IMG}__}}`,
  INFO:           `{{__${SectionTypes.INFO}__}}`,
  INGREDIENTS:    `{{__${SectionTypes.INGREDIENTS}__}}`,
  NOTES:          `{{__${SectionTypes.NOTES}__}}`,
  STEPS:          `{{__${SectionTypes.STEPS}__}}`,
  TITLE:          '{{__title__}}',
};

const Styles = {
  HELP_LINK:      'help-link',
  HERO_IMG:       'hero-img',
  PAREN:          'paren',

  HAS_NUMERIC:    'ingredient--align',
  NUMERIC:        'ingredient--amt',
  UNITS:          'ingredient--text',
};

const RegExes = {
  SECTION_SPLIT: /(?=<h[12])/,

  TITLE:         /<h1(?:\s+id=".*?")?>(.*?)<\/h1>/i,
  H2:            /<h2 id="(.+?)">(.+?)<\/h2>/,
  LI:            /<li>(.|\n)+?<\/li>/gm,

  PAGE_TITLE:    /<title>.*?<\/title>/,

  PARENS:        /\(([^)]+)\)/g,
  /**
   * Watch from "-" v. "–" (em-dash)
   * @example
   * "1 3/4 - 2 cups graham cracker crumbs"
   * "1 to 2 tablespoons lemon juice"
   * "½ cup calamansi concentrate"
   * "1/4 teaspoon vanilla extract"
   * "1.5 oz gin"
   */
  NUMERIC:       /<li>(~?[\d½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅐⅛⅜⅝⅞/ ."–-]+(?:(?:to|-) \d+)?)\s+(.*)<\/li>/
};
/* eslint-enable key-spacing */

const LINK_SUB_NAME = '<name>';

function getSectionType(section) {
  const matches = section.match(RegExes.H2);
  if (!matches) {
    return '';
  }

  const type = matches[1].toLowerCase();
  if (Object.keys(SectionTypes).some(key => SectionTypes[key] === type)) {
    return type;
  }

  const aliasType = Object.keys(SectionAliases).find(key => SectionAliases[key].includes(type));
  return aliasType || type;
}

function hasImage(imagesPath, name, ext) {
  // TODO: let's do more image filetypes: jpg, jpeg, png, webp
  try {
    accessSync(resolve(imagesPath, `${name}.${ext}`), F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

function getImageType(imagesPath, name) {
  if (hasImage(imagesPath, name, 'jpg')) {
    return 'jpg';
  }
  if (hasImage(imagesPath, name, 'png')) {
    return 'png';
  }
  if (hasImage(imagesPath, name, 'webp')) {
    return 'webp';
  }
  return null;
}

// create-recipe.js:
/*
  // link icon svg code
  // via: https://fontawesome.com/icons/external-link-alt
  let linkIcon = '<svg class="linkIcon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">';
  linkIcon += '<path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>';
  linkIcon += '</svg>';
  */

function prettyBasedOnSection(section) {
  /*
  if (shortenURLs) {
    $('#basedon a').each(function () {
      let url = $(this).text();
      url = siteDomain;
      $(this).text(url);
    });
  }
   */
  return section;
}

function prettyInfoSection(section) {
  /*
  const time =  $('#info li:eq(0)');
  const makes = $('#info li:eq(1)');
  $('#info ul').html('<li><span id="time">TIME </span>' + time.text() + '</li><li><span id="makes">MAKES </span>' + makes.text() + '</li>');
  */
  return section;
}

function prettyIngredientsSection(section) {
  return section.replace(RegExes.LI, str => str
    .replace(RegExes.NUMERIC, `<li class="${Styles.HAS_NUMERIC}"><span class="${Styles.NUMERIC}">$1</span> <span class="${Styles.UNITS}">$2</span></li>`)
    .replace(RegExes.PARENS, `<span class="${Styles.PAREN}">($1)</span>`)
  );
}

function getHelpSection(helpURLs, name) {
  const recipeName = name.replace(' ', '+');
  const links = helpURLs.map(({ label, url }) => `<li><a class=${Styles.HELP_LINK} href="${url.replace(LINK_SUB_NAME, recipeName)}" target="blank">${label}</a></li>`);

  return `
<h2>help!</h2>
<ul>${links.join('\n')}</ul>
`;
}

function writeRecipe(recipeTemplate, converter, config, path, name) {
  const { outputPath, imagesPath, autoUrlSections, titleSuffix, includeHelpLinks, shortenURLs, helpURLs, lookForHeroImage } = config;
  const markdown = readFileSync(path, { encoding: 'utf8' });
  const recipe = converter.makeHtml(markdown);
  const sections = recipe.split(RegExes.SECTION_SPLIT);

  let htmlOutput = recipeTemplate;
  const m = recipe.match(RegExes.TITLE);
  const recipeName = m ? m[1] : name;
  htmlOutput = htmlOutput
    .replace(RegExes.PAGE_TITLE, `<title>${recipeName}${titleSuffix || ''}</title>`)
    .replace(Substitutions.TITLE, recipeName);

  // if there's a hero image available, load and display
  const heroExt = lookForHeroImage && getImageType(imagesPath, name);
  if (heroExt) {
    htmlOutput = htmlOutput.replace(Substitutions.HERO_IMG, `<img class=${Styles.HERO_IMG} src="../images/${name}.${heroExt}">`);
  }

  // add some helper links
  if (includeHelpLinks && Array.isArray(helpURLs) && helpURLs.length) {
    htmlOutput = htmlOutput.replace(Substitutions.HELP, getHelpSection(helpURLs, name));
  }

  // iterate sections, add to body
  sections.forEach((section) => {
    const sectionType = getSectionType(section);
    // const sectionName  = matches[2];
    if (autoUrlSections.includes(sectionType)) {
      section = linkify(section);
    }

    // a few more bits to nicen things up...
    switch (sectionType) {
      case SectionTypes.BASED_ON:
        // opt: remove cruft from 'based on' links
        if (shortenURLs) {
          section = prettyBasedOnSection(section);
        }
        break;
      case SectionTypes.INGREDIENTS:
        // in the ingredients, make things in parentheses a
        // bit lighter
        section = prettyIngredientsSection(section);
        break;
      case SectionTypes.INFO:
        // in info, add labels to time/quantity
        section = prettyInfoSection(section);
        break;
    }

    htmlOutput = htmlOutput.replace(`{{__${sectionType}__}}`, section);
  });

  // clean-up unused sections
  Object.keys(Substitutions).forEach(word => htmlOutput = htmlOutput.replace(Substitutions[word], ''));

  writeFile(resolve(outputPath, `${name}.html`), htmlOutput, { encoding: 'utf8'}, () => null);
}

function buildRecipes(recipeTemplate, options, fileList) {
  const converter = new showdown.Converter();
  fileList.forEach(({ file: path, name }) => {
    writeRecipe(recipeTemplate, converter, options, path, name);
  });

}

module.exports = {
  __test__: {
    prettyIngredientsSection,
    NumericRegEx: RegExes.NUMERIC,
  },
  buildRecipes,
};