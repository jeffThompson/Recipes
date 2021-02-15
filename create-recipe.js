
// once document is loaded, get recipe from file
$(document).ready(function() {

  // create markdown converter
  let md = new showdown.Converter();
  
  // extract which recipe from url anchor
  let baseFilename = window.location.hash;
  baseFilename = baseFilename.replace('#', '');
  let filename = 'recipes/' + baseFilename + '.md';

  // if there's a hero image available, load and display
  if (lookForHeroImage) {
    let src = 'images/' + baseFilename + '.jpg';
    let img = $('<img>').attr('src', src)
      .on('load', function() {
        // if, for various reasons, the image can't be loaded let us know
        if (!this.complete || typeof this.naturalWidth == 'undefined' || this.naturalWidth == 0) {
          console.warn('Error loading hero image! Might not exist for this recipe, but if it does make sure the filename is the same as the recipe file and has a .jpg extension');
        }
        else {
          $('#heroimage').append(img);
        }
    });
  }

  // load the recipe
  $.ajax({
    url: filename,
    success: function(recipe) {

      // convert markdown to html, split into sections
      // regex via: https://pineco.de/snippets/split-strings-and-keep-the-delimiter
      recipe = md.makeHtml(recipe);
      let sections = recipe.split(/(?=<h)/);

      // iterate sections, add to body
      let foundTitle = false;
      for (let i in sections) {
        let section = sections[i];

        // regex to get id from header (auto-added by
        // the markdown parser)
        let idPattern = new RegExp('id="(.*?)"');
        let id = idPattern.exec(section);

        // remove id from header (for css later)
        section = section.replace(/\sid=".*?"/, '');

        // if this is the first section...
        if (!foundTitle) {
          id = 'title';
          foundTitle = true;

          // change page title too
          let elems = $(section);
          let pageTitle = elems[0].innerHTML + ' | Recipe Book';
          $(document).prop('title', pageTitle);
        }
        // for all other pages, get id from regex match
        else {
          id = id[1];
        }

        // make any urls (in sections listed at the top)
        // that don't have link syntax into valid urls
        if (autoUrlSections.includes(id)) {
          section = linkify(section);
        }
        
        // place the html inside its section
        $('#' + id).html(section);
      }

      // a few more bits to nicen things up...

      // opt: remove cruft from 'based on' links
      if (shortenURLs) {
        $('#basedon a').each( function() {
          let url = $(this).text();
          url = getDomain(url);
          $(this).text(url);
        });
      }

      // in the ingredients, make things in parentheses a
      // bit lighter
      $('#ingredients li').each( function() {
        let str = $(this).text();
        str = str.replace(/\(([^)]+)\)/g, '<span class="paren">($1)</span>');
        $(this).html(str);
      });

      // in info, add labels to time/quantity
      let time =  $('#info li:eq(0)');
      let makes = $('#info li:eq(1)');
      $('#info ul').html('<li><span id="time">TIME </span>' + time.text() + '</li><li><span id="makes">MAKES </span>' + makes.text() + '</li>');

      // link icon svg code
      // via: https://fontawesome.com/icons/external-link-alt
      let linkIcon = '<svg class="linkIcon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">';
      linkIcon += '<path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>';
      linkIcon += '</svg>';

      // add some helper links
      let recipeName = $('h1').text().toLowerCase();
      recipeName = recipeName.replace(' ', '+');
      let help = '<h2>help!</h2>';
      help += '<ul>';
      for (let j in helpUrls) {
        let label = helpUrls[j].label;
        let url = helpUrls[j].url.replace('<name>', recipeName);
        help += '<li><a href="' + url + '" target="blank">' + label + '</a></li>';
      }
      help += '</ul>';
      $('#help').html(help);

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
    error: function(xhr, status, err) {
      console.log(err);
      window.location.href = 'index.php';
    }
  });

  // L/R arrow keys shift the step highlight
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37:                        // left
        var curr = $('.highlight');
        curr.removeClass('highlight');
        curr.prev().addClass('highlight');
        break;
      case 39:                        // right
        var curr = $('.highlight');
        curr.removeClass('highlight');
        curr.next().addClass('highlight');
        break;
      default: 
        return;
    }

    // ignore normal L/R behavior
    // (probably don't want to do this, since
    // we want to use L/R for the back button, etc)
    // e.preventDefault();
  });
});

