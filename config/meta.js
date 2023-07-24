const titleContent = 'Single-Management';
const capableContent = 'yes';
const colorContent = '#1688C9';
const descriptionContent = '';

module.exports = [
  { charset: 'utf-8' },
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  { name: 'viewport', content: 'width=1280, initial-scale=1' },
  { name: 'description', content: descriptionContent },
  { name: 'theme-color', content: colorContent },
  { name: 'msapplication-TileColor', content: colorContent },
  { name: 'application-name', content: titleContent },
  { name: 'apple-mobile-web-app-title', content: titleContent },
  { name: 'twitter:title', content: titleContent },
  { name: 'apple-mobile-web-app-capable', content: capableContent },
  { name: 'mobile-web-app-capable', content: capableContent },
  { name: 'mobile-web-app-capable', content: capableContent },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'black-translucent',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:creator', content: '@truckerpath' },
  { name: 'twitter:site', content: '@truckerpath' },
  { name: 'twitter:description', content: descriptionContent },
  { property: 'og:site_name', content: 'Truckloads' },
  { property: 'og:title', content: titleContent },
  { property: 'og:type', content: 'website' },
  { property: 'og:description', content: descriptionContent },
];
