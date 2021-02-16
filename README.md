# RECIPE BOOK

A super minimal recipe website – great for keeping track of family recipes, mods to ones you find online, or have created yourself!

**See it in action here: [jeffreythompson.org/recipes](http://jeffreythompson.org/recipes)**

Features:
* Recipes in a simple [Markdown format](https://daringfireball.net/projects/markdown), just dump them in a folder and upload  
* List of recipes will auto-populate with quick alpha links at the top  
* Each recipe is displayed in a nice, clean format designed for use while cooking or at the grocery store – no extra 💩 or ads  
* Auto-generated links to a Google image search for that dish, recipes on Serious Eats and Google, and for restaurants on Yelp (in case you burn something and need takeout fast)  
* To save your place while scrolling up around on the page, click the step you're on to highlight it; click it again to remove the highlight, or use the left/right arrow keys to advance  
* Easily customized and code is (mostly) really well annotated 🙃  


## MORE INFO  
* [Recipe format](#recipe-format)
* [Adding images](#adding-images)
* [Other options](#other-options)
* [Suggestions welcome!](#suggestions-welcome)


## RECIPE FORMAT  
In order to show up properly, your recipe's Markdown file should be named with dashes in place of spaces (ex: `rice-pilaf.md` or `saag-paneer.md`). This will be used to populate your list of recipes on the main page.

Use `tecipe-template.md` and/or follow this format:

```markdown
# TITLE
Optional subheader

## info  
* About XXX minutes  
* XXX servings  

## ingredients
* 

## steps  
1. 

## notes  
* 

## based on  
* url to where the recipe came from
```

For example:

```markdown
# Raspberry and Elderflower Gin and Tonic
A delicious light-red drink perfect for winter gatherings!

## ingredients
* 8 raspberries (frozen ok but should be thawed)  
* Fresh thyme (optional)  
* Gin  
* 1/2 lime  
* 1-2 tbsp St Germaine (or 1-2 tsp simple syrup)  

## steps
1. Muddle raspberries with 1.5 oz gin (and fresh thyme, if using)  
2. Add juice of half a lime  
3. Add 1-2 tbsp St Germaine (or 1-2 tsp simple syrup)  
4. Strain into glass, add ice cubes and top with tonic 

## notes
* Replace tonic with champagne for a *French 75* mashup   

## based on
* https://www.instagram.com/p/Bq3ckR8HIDE/
```

You can optionally include info about how long the recipe takes and how many servings it makes. Put this before the `Ingredients` list:  

```## info  
* Takes about 90 minutes  
* Enough for a large biryani or a full-sized curry
```

The `Ingredients` and `Steps` sections can be split with subheaders too:

```## steps
1. Soak urad dal for 4 hours to overnight, drain  
2. Grind in blender until a smooth and thick paste (add a little water if necessary)  
3. Put in mixing bowl and whip with hands for 2-3 minutes until fluffy  
4. Add spices, herbs, and salt and whip again to combine  

To fry:
1. Heat oil over medium/medium-high heat  
2. Take a bowl of water, wet hands, and form small balls  
3. Slide into oil and cook, flipping often, until golden  
4. Drain on paper towels  
```

## ADDING IMAGES  
Thanks to a suggestion from @mpember, if you have a `jpg` image with the same filename as your recipe, it will automatically be added! 

For example: `aloo-matar.md` should have an image called `aloo-matar.jpg` in the `images` folder.

You can also include other images in the recipe using Markdown's image syntax: `![alt text](url)`. You'll probably want to update the stylesheet to size them appropriately.


## OTHER OPTIONS  
The `recipe.php` file also includes some more options you can customize:

* `yelpLocation`: the city/state where you're located to make Yelp searches easier! No need for fancy formatting, this will work fine: `Minneapolis MN`  
* `helpUrls`: dictionary with the `label` (text displayed) and `url` in template form. The string `<name>` will be replaced with your recipe's name  
* `lookForHeroImage`: on by default, but you can turn it off if you never intend to include hero images  
* `autoUrlSections`: list of sections in the recepe template where you want raw URLs (ex: www.instagram.com) to be turned into real links. Great for the `Based On` section but not so good if you want to include Markdown-formatted links in other sections  
* `shortenUrls`: turns a super-long url into just the main domain name (link will still work as normal, just less cluttered). Off by default but exists if you want it


## SUGGESTIONS WELCOME  
If you have suggestions for improving this project, please let me know! Either [open an issue](https://github.com/jeffThompson/Recipes/issues/new) or send me an email.

