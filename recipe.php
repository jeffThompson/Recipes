<!doctype html>
<html profile="http://www.w3.org/2005/10/profile">
	<head>
		<title>Recipe Book</title>

		<!-- basics -->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
		<link rel="icon" type="image/png" href="http://www.jeffreythompson.org/graphics/favicon.png">
		
		<!-- font and styles -->
		<link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700,700i,900,900i" rel="stylesheet"> 
		<link href="stylesheet.css" rel="stylesheet" type="text/css">

		<script>
			// RECIPE OPTIONS
			// below are some options to customize how your recipes appear
			// (these are mostly things that folks might want to change, but
			// of course you can customize the code too)

			// help urls to include (will be listed in the order below)
			// label = text displayed
			// url = template url (put <name> where the search term
			//       goes, it will be auto-added later)
			let yelpLocation = 'Bloomfield, NJ';  // no need for fancy formatting, just do it like this
			let helpUrls = [
			  { label: 'Image search', url: 'https://www.google.com/search?q=' + '<name>' + '&tbm=isch' },
			  { label: 'Serious Eats', url: 'https://www.seriouseats.com/search?q=' + '<name>' + '&site=recipes' },
			  { label: 'More recipes', url: 'https://www.google.com/search?q=' + '<name>' + '+recipe'},
			  { label: 'Yelp (takeout pls)', url: 'https://www.yelp.com/search?find_loc=' + yelpLocation + '&find_desc=' + '<name>' }
			];

			// look in a folder called 'images' for an image to display
			// at the top of the recipe?
			// (must be named the same thing as the recipe and have a .jpg ext)
			// (ex: aloo-matar.md would have an image aloo-matar.jpg)
			// will fail gracefully if an image doesn't exist, but you can
			// turn it off entirely if you want
			let lookForHeroImage = true;

			// turn text-only urls to links in these sections
			// (in other sections, markdown links will work as normal)
			let autoUrlSections = [ 'basedon' ];

			// trim display text for long urls in 'based on' section
			// ex:           https://www.seriouseats.com/recipes/2012/01/aloo-matar.html
			// would become: https://www.seriouseats.com
			let shortenURLs = false;
		</script>

		<!-- showdown (markdown parser) -->
		<!-- https://github.com/showdownjs -->
		<script src="https://cdn.rawgit.com/showdownjs/showdown/1.9.0/dist/showdown.min.js"></script>

		<!-- jquery -->
		<!-- loads the recipes and adds the selected one below -->
		<script
			src="https://code.jquery.com/jquery-3.3.1.min.js"
			integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
			crossorigin="anonymous">
		</script>
	</head>

	<body>
		<div id="wrapper" class="recipe">
			
			<!-- back button -->
			<!-- icon via: https://fontawesome.com/icons/arrow-left -->
			<p id="back">
				<a href="index.php">
					<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
					</svg>
				</a>
			</p>

			<!-- recipe (details inserted with js) -->
			<section id="heroimage"></section>
			<section id="title"></section>
			<section id="info"></section>
			<section id="ingredients"></section>
			<section id="steps"></section>
			<hr />
			<section id="notes"></section>
			<section id="help"></section>
			<section id="basedon"></section>
		</div>
	</body>

	<!-- parses and displays recipe -->
	<script src="utils.js"></script>
	<script src="create-recipe.js"></script>
</html>

