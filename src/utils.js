const RegExes = {
  /** URLs (starting with http://, https://, or ftp://) that aren't already in a link tag */
  URL_WITH_PROTOCOL: /(?<!href=")(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim,
  /** URLs starting with "www." (without // before it, or it'd re-link the ones done above) */
  URL_WITH_WWW: /(^|[^/"])(www\.[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|]+(\b|$))/gim,
  /** Wrap email addresses in "mailto:" links */
  EMAIL: /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim,
};

// handy function to create links in the markdown text
// via: https://stackoverflow.com/a/3890175/1167783
const linkify = str => str
  .replace(RegExes.URL_WITH_PROTOCOL, '<a href="$1">$1</a>')
  .replace(RegExes.URL_WITH_WWW, '$1<a href="http://$2">$2</a>')
  .replace(RegExes.EMAIL, '<a href="mailto:$1">$1</a>');

module.exports = {
  linkify,
};
