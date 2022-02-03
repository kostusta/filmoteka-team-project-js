Handlebars.registerHelper('release-year', function (release_date) {
  const releaseDate = release_date;
  const releaseYear = releaseDate.slice(0, 3);
  return releaseYear;
});
