const RegExes = {
  // urls starting with http://, https://, or ftp://
  HTTP: /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim,
  // urls starting with "www." (without // before it, or it'd re-link the ones done above)
  WWW: /(^|[^/])(www\.[\S]+(\b|$))/gim,
  // change email addresses to mailto: links
  EMAIL: /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim,
};

// handy function to create links in the markdown text
// via: https://stackoverflow.com/a/3890175/1167783
const linkify = str => str
  .replace(RegExes.HTTP, '<a href="$1" target="_blank">$1</a>')
  .replace(RegExes.WWW, '$1<a href="http://$2" target="_blank">$2</a>')
  .replace(RegExes.EMAIL, '<a href="mailto:$1">$1</a>');

module.exports = {
  linkify,
};
