<!doctype html>
<html profile="http://www.w3.org/2005/10/profile">
	<head>
		<title>Recipe Book</title>

		<!-- basics -->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
		<link rel="icon" type="image/png" href="http://www.jeffreythompson.org/graphics/favicon.png">

		<!-- font and styles -->
		<link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700,700i,900" rel="stylesheet"> 
		<link href="stylesheet.css" rel="stylesheet" type="text/css">

		<!-- jquery -->
		<!-- loads the recipes and adds the selected one below -->
		<script
			src="https://code.jquery.com/jquery-3.3.1.min.js"
			integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
			crossorigin="anonymous">
		</script>
	</head>

	<body>
		<div id="wrapper" class="index">
			
			<!-- table of contents -->
			<section id="toc">
				<h1 id="mainTitle">Recipe Book</h1>
				<p id="navigation"></p>

				<ul> <!-- your recipes will go here --> </ul>
			</section>
			
			<!-- footer -->
			<section id="footer">
				<ul>
					<li>A super minimal recipe website by <a href="http://www.jeffreythompson.org">Jeff Thompson</a></li>
					<li><a href="https://github.com/jeffThompson/Recipes">Source code
					
					<!-- external link icon -->
					<!-- via: https://fontawesome.com/icons/external-link-alt -->
					<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
					</svg>
					</a></li>
				</ul>
			</section>
		</div>
	</body>

	<!-- combo php/js to get all recipes in the folder -->
	<script>
		<?php $files = array_map('basename', glob('recipes/*.md')); ?>
  	let files = <?php echo json_encode($files) ?>;
	</script>
	
	<!-- javascript does the rest :) -->
	<script src="utils.js"></script>
	<script src="list-recipes.js"></script>
</html>

