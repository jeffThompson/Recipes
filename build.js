const { basename, extname, resolve } = require('path');
const { cpSync, readdirSync, readFileSync, rmSync, mkdirSync } = require('fs');

const { buildRecipes } = require('./src/buildRecipes');
const buildRecipeIndex = require('./src/buildRecipeIndex');
const configs = require('./config');

const MARKDOWN_EXT = '.md';

function getRecipeFileList({ recipesPath } = {}) {
  return readdirSync(recipesPath)
    .filter(fileName => extname(fileName) === MARKDOWN_EXT)
    .map(fileName => ({
      file: resolve(recipesPath, fileName),
      name: basename(fileName, MARKDOWN_EXT),
    }));
}

function readTemplates({ templatesPath }) {
  return {
    indexTemplate: readFileSync(resolve(templatesPath, 'index.html'), { encoding: 'utf8' }),
    recipeTemplate: readFileSync(resolve(templatesPath, 'recipe.html'), { encoding: 'utf8' }),
  };
}

function setupOutputDir(outputPath) {
  rmSync(outputPath, { recursive: true, force: true });
  mkdirSync(outputPath);

}

function copyStatic(staticPath, outputPath) {
  ['scripts', 'styles'].forEach(dir => cpSync(resolve(staticPath, dir), resolve(outputPath, dir), { recursive: true }));
}

function copyImages(imagesPath, outputPath) {
  cpSync(imagesPath, resolve(outputPath, 'images'), { recursive: true });
}

function main(configs) {
  const options = {
    ...configs,
    imagesPath: resolve(__dirname, configs.imageDir),
    outputPath: resolve(__dirname, configs.outputDir),
    recipesPath: resolve(__dirname, configs.recipeDir),
    staticPath: resolve(__dirname, './src/static/'),
    templatesPath: resolve(__dirname, './src/templates/'),
  };

  const fileList = getRecipeFileList(options);
  const { indexTemplate, recipeTemplate } = readTemplates(options);

  setupOutputDir(options.outputPath);
  copyStatic(options.staticPath, options.outputPath);
  copyImages(options.imagesPath, options.outputPath);
  buildRecipes(recipeTemplate, options, fileList);
  buildRecipeIndex(indexTemplate, options, fileList);

  // eslint-disable-next-line no-console
  console.log(`Processed ${fileList.length} recipes`);
}

main(configs);
