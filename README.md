# RECIPE BOOK

A super minimal recipe website. **See it in action here: [jeffreythompson.org/recipes](http://jeffreythompson.org/recipes)**

Create a new recipe as a [Markdown file](https://daringfireball.net/projects/markdown), dump it in a folder and upload. The list will auto-populate and each recipe is displayed in a nice, clean format designed for use while cooking or at the grocery store. Great for keeping track of family recipes, mods to ones you find online, or have created yourself!

Each recipe will auto-generate links to a Google image search for that dish, recipes on Serious Eats and Google, and for restaurants on Yelp (in case you burn something and need takeout fast).

## BONUS!  
To save your place while looking up at the ingredients, click the step you're on to highlight it. Click it again to remove the highlight, or use the left/right arrow keys to advance.

## RECIPE FORMAT  
In order to show up properly, your recipe's Markdown file should be named with dashes in place of spaces (ex: `rice-pilaf.md` or `saag-paneer.md`) and the file should follow this format:

```markdown
# Raspberry and Elderflower Gin and Tonic
A delicious light-red drink

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

You can optionally include info about how long the recipe takes and how many servings it makes:  

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

