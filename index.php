<!doctype html>
<html profile="http://www.w3.org/2005/10/profile">
<head>

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
		// and generate table of contents
		$(document).ready(function() {
			<?php
				$files = array_map('basename', glob('recipes/*.md'));
			?>
			var files = <?php echo json_encode($files) ?>;
			var html = '';
			for (var i in files) {
				var url = files[i];
				var anchor = url.replace('.md', '');
				var name = anchor.split('-').join(' ');
				html += '<li><a href="recipe.php#' + anchor + '">' + name + '</a></li>';
			}
			$('#toc ul').html(html);
		});
	</script>
</head>

<body>
	<div id="wrapper">
		<section id="toc">
			<h1>Recipe Book</h1>
			<ul> <!-- your recipes will go here --> </ul>
		</section>
		<section id="footer">
			<p>A super minimal recipe website by <a href="http://www.jeffreythompson.org">Jeff Thompson</a></p>
		</section>
	</div>
</body>
</html>

