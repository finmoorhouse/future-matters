const Image = require("@11ty/eleventy-img");
const cssnanoPlugin = require("cssnano");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [400],
    formats: ["webp" , "avif", "jpeg"],
    outputDir: "./_site/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
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
      output: "_site",
    },
  };
};
