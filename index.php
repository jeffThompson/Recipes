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

	<!-- JQUERY -->
	<!-- loads the recipes and adds the selected one below -->
	<script
		src="https://code.jquery.com/jquery-3.3.1.min.js"
		integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
		crossorigin="anonymous">
	</script>
	<script>

		// handy function to create links in the markdown text
		// via: https://stackoverflow.com/a/3890175/1167783
		function linkify(str) {
			// urls starting with http://, https://, or ftp://
			var httpPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
			str = str.replace(httpPattern, '<a href="$1" target="_blank">$1</a>');

			// urls starting with "www." (without // before it, or it'd re-link the ones done above)
			var wwwPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
			str = str.replace(wwwPattern, '$1<a href="http://$2" target="_blank">$2</a>');

			// change email addresses to mailto: links
			var emailPattern = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
			str = str.replace(emailPattern, '<a href="mailto:$1">$1</a>');

			return str;
		}

		// once document is loaded, load list of markdown files
		// and generate table of contents, plus a quick-nav list
		// at the top
		$(document).ready(function() {
			<?php
				$files = array_map('basename', glob('recipes/*.md'));
			?>
			var files = <?php echo json_encode($files) ?>;
			var listOfRecipes = '';
			var listOfLetters = '';
			var prevLetter = '';
			for (var i in files) {
				var url = files[i];
				var anchor = url.replace('.md', '');
				var name = anchor.split('-').join(' ');
				var firstLetter = name.charAt(0).toUpperCase();
				if (firstLetter != prevLetter) {
					listOfRecipes += '<li id="' + firstLetter + '">';
					listOfLetters += '<a href="#' + firstLetter + '">' + firstLetter + ' </a>';
				}
				else {
					listOfRecipes += '<li>';
				}
				listOfRecipes += '<a href="recipe.php#' + anchor + '">' + name + '</a></li>';
				prevLetter = firstLetter;
			}
			$('#toc ul').html(listOfRecipes);
			$('#navigation').html(listOfLetters);
		});
	</script>
</head>

<body>
	<div id="wrapper" class="index">
		<section id="toc">
			<h1 id="mainTitle">Recipe Book</h1>
			<p id="navigation"></p>

			<ul> <!-- your recipes will go here --> </ul>
		</section>
		<section id="footer">
			<ul>
				<li>A super minimal recipe website by <a href="http://www.jeffreythompson.org">Jeff Thompson</a></li>
				<li><a href="https://github.com/jeffThompson/Recipes">Source code
				
				<!-- via: https://fontawesome.com/icons/external-link-alt -->
				<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>
				</svg>
				</a></li>
			</ul>
		</section>
	</div>
</body>
</html>

