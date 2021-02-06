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

		// options:
		var shortenURLs = false;

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

							// change page title too
							var elems = $(section);
							var pageTitle = elems[0].innerHTML + ' | Recipe Book';
							$(document).prop('title', pageTitle);
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

					// opt: remove cruft from 'based on' links
					if (shortenURLs) {
						$('#basedon a').each( function() {
							var url = $(this).text();
							url = getDomain(url);
							$(this).text(url);
						});
					}

					// in the ingredients, make things in parentheses a
					// bit lighter
					$('#ingredients li').each( function() {
						var str = $(this).text();
						str = str.replace(/\(([^)]+)\)/g, '<span class="paren">($1)</span>');
						$(this).html(str);
					});

					// in info, force images to 100% width
					$('#info img').each( function() {
						$(this).width('100%');
					});

					// in info, add labels to time/quantity
					var time =  $('#info li:eq(0)');
					var makes = $('#info li:eq(1)');
					$('#info ul').html('<li><span id="time">TIME </span>' + time.text() + '</li><li><span id="makes">MAKES </span>' + makes.text() + '</li>');

					// add some links re the recipe
					var recipeName = $('h1').text().toLowerCase();
					recipeName = recipeName.replace(' ', '+');
					var yelpUrl = 'https://www.yelp.com/search?find_desc=' + recipeName;
					var googleUrl = 'https://www.google.com/search?q=' + recipeName + '+recipe';
					var imageUrl = 'https://www.google.com/search?q=' + recipeName + '&tbm=isch';
					var seriousEatsUrl = 'https://www.seriouseats.com/search?term=' + recipeName + '&site=recipes';

					// link icon svg code
					// via: https://fontawesome.com/icons/external-link-alt
					var linkIcon = '<svg class="linkIcon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">';
					linkIcon += '<path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>';
					linkIcon += '</svg>';

					var html = '<h2>help!</h2>';
					html += '<ul>';
					html += '<li><a href="' + imageUrl + '" target="blank">Image search' + linkIcon + '</a></li>';
					html += '<li><a href="' + seriousEatsUrl + '" target="blank">Serious Eats' + linkIcon + '</a></li>';
					html += '<li><a href="' + googleUrl + '" target="blank">More recipes' + linkIcon + '</a></li>';
					html += '<li><a href="' + yelpUrl + '" target="blank">Yelp (takeout pls)' + linkIcon + '</a></li>';
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
				// e.preventDefault();		// ignore normal L/R behavior
											// (probably don't want to do this, since
											//  we want to use L/R for the back button, etc)
			});
		});
	</script>
</head>

<body>
	<div id="wrapper" class="recipe">
		<p id="back">
			<a href="index.php">
				<!-- via: https://fontawesome.com/icons/arrow-left -->
				<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
				</svg>
			</a>
		</p>
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
</html>

