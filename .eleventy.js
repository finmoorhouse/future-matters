module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/_includes/assets/css/global.css": "./global.css",
  });
  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };
  eleventyConfig.setLibrary("md", markdownIt(options));
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
