<!doctype html>
<html profile="http://www.w3.org/2005/10/profile">
<head>

	<!-- basics -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
	<link rel="icon" type="image/png" href="http://www.jeffreythompson.org/graphics/favicon.png">
	
	<!-- font and styles -->
	<link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,700,700i,900,900i" rel="stylesheet"> 
	<link href="stylesheet.css" rel="stylesheet" type="text/css">

	<!-- SHOWDOWN (markdown parser) -->
	<!-- https://github.com/showdownjs -->
	<script src="https://cdn.rawgit.com/showdownjs/showdown/1.9.0/dist/showdown.min.js"></script>

	<!-- JQUERY -->
	<!-- loads the recipes and adds the selected one below -->
	<script
		src="https://code.jquery.com/jquery-3.3.1.min.js"
		integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
		crossorigin="anonymous">
	</script>
	<script>

		// create markdown converter
		var md = new showdown.Converter();

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

		// a little function to get only the domain from a full url
		// https://stackoverflow.com/a/8498668/1167783
		function getDomain(url) {
			var a = document.createElement('a');
			a.href = url;
			return a.hostname;
		}

		// once document is loaded, load recipe from file
		$(document).ready(function() {
			
			// extract which recipe from url anchor
			var filename = window.location.hash;
			filename = filename.replace('#', '');
			filename = 'recipes/' + filename + '.md';

			// load the recipe
			$.ajax({
				url: filename,
				success: function(recipe) {

					// convert markdown to html, split into sections
					recipe = md.makeHtml(recipe);
					var sections = recipe.split('<h');

					// iterate sections, add to body
					var foundTitle = false;
					for (var i in sections) {
						
						// get from array, add start of header tag back in
						var section = sections[i];
						section = '<h' + section;

						// regex to get id from header (auto-added by
						// the markdown parser)
						var idPattern = new RegExp('id="(.*?)"');
						var id = idPattern.exec(section);
						
						// if no match (happens at the start of the file
						// for some reason), just skip
						if (id == null) {
							continue;
						}

						// remove id from header (for css later)
						section = section.replace(idPattern, '');

						// if this is the first non-null match,
						// add 'title' id instead of the recipe name
						if (!foundTitle) {
							id = 'title';
							foundTitle = true;
						}
						// for all others, get id from regex match
						else {
							id = id[1];
						}

						// make any urls into links
						section = linkify(section);
						
						// place the html inside its section
						$('#' + id).html(section);
					}

					// a few more bits to nicen things up...

					// remove cruft from 'based on' links
					// (comment out if you want the full urls to appear)
					$('#basedon a').each( function() {
						var url = $(this).text();
						url = getDomain(url);
						$(this).text(url);
					});

					// in the ingredients, make things in parentheses a
					// bit lighter
					$('#ingredients li').each( function() {
						var str = $(this).text();
						str = str.replace(/\(([^)]+)\)/g, '<span class="paren">($1)</span>');
						$(this).html(str);
					});

					// add some links re the recipe
					var recipeName = $('h1').text().toLowerCase();
					recipeName = recipeName.replace(' ', '+');
					var yelpUrl = 'https://www.yelp.com/search?find_desc=' + recipeName;
					var googleUrl = 'https://www.google.com/search?q=' + recipeName + '+recipe';
					var imageUrl = 'https://www.google.com/search?q=' + recipeName + '&tbm=isch';
					var seriousEatsUrl = 'https://www.seriouseats.com/search?term=' + recipeName;

					var html = '<h2>help!</h2>';
					html += '<ul>';
					html += '<li><a href="' + imageUrl + '" target="blank">Image search</a> <img src="images/external-arrow.png" class="externalArrow"></li>';
					html += '<li><a href="' + seriousEatsUrl + '" target="blank">Serious Eats</a> <img src="images/external-arrow.png" class="externalArrow"></li>';
					html += '<li><a href="' + googleUrl + '" target="blank">More recipes</a> <img src="images/external-arrow.png" class="externalArrow"></li>';
					html += '<li><a href="' + yelpUrl + '" target="blank">Yelp (takeout pls)</a> <img src="images/external-arrow.png" class="externalArrow"></li>';
					html += '</ul>';
					$('#help').html(html);

					// click a step to highlight it
					$('#steps li').click( function() {
						if ( $(this).hasClass('highlight') ) {
							$(this).removeClass('highlight');
						}
						else {
							$('.highlight').removeClass('highlight');
							$(this).addClass('highlight');
						}
					});
				}, 

				// no recipe listed or some problem?
				// redirect to the main page
				error: function() {
					window.location.href = 'index.php';
				}
			});

			// L/R arrow keys shift the step highlight
			$(document).keydown(function(e) {
				switch(e.which) {
					case 37: 						// left
					var curr = $('.highlight');
					curr.removeClass('highlight');
					curr.prev().addClass('highlight');
					break;
					case 39: 						// right
					var curr = $('.highlight');
					curr.removeClass('highlight');
					curr.next().addClass('highlight');
					break;
					default: return;
				}
				e.preventDefault();		// ignore normal L/R behavior
			});
		});
	</script>
</head>

<body>
	<div id="wrapper">
		<p id="back"><a href="index.php">&larr;&nbsp;&nbsp;&nbsp;</a></p>
		<section id="title"></section>
		<section id="ingredients"></section>
		<section id="steps"></section>
		<hr />
		<section id="notes"></section>
		<section id="help"></section>
		<section id="basedon"></section>
	</div>
</body>
</html>

