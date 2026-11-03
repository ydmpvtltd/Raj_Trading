// Tailwind settings for building css/tailwind.css (run: node tools/build-machinery.js).
// Same Tailwind version (3.4.16) the site previously loaded from the CDN, with default settings.
module.exports = {
  content: [
    './index.html',
    './machinery/**/*.html',
    './js/**/*.js',
    './data/**/*.js',
  ],
  theme: { extend: {} },
  plugins: [],
};
