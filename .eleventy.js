const siteURL = "https://samkelson.github.io"; // don't include trailing slash as the arguments passed to absoluteUrl function start with a slash

const fs = require("fs-extra");
const sass = require("sass");
const { promisify } = require("util");
const sassRender = promisify(sass.render);
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const markdownIt = require("markdown-it");
const markdownItRenderer = new markdownIt();
const markdownItAnchor = require("markdown-it-anchor");
const mdBiblatex = require('@arothuis/markdown-it-biblatex');
const pluginTOC = require("eleventy-plugin-toc");
const moment = require("moment");
const description = require("eleventy-plugin-description");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const xmlFiltersPlugin = require("eleventy-xml-plugin");
const yaml = require("yaml-js");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


const inspect = require("node:util").inspect;

const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
    eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));

    eleventyConfig.addPlugin(EleventyHtmlBasePlugin)

    eleventyConfig.addPlugin(pluginRss);
    //Blog excerpts
    eleventyConfig.addPlugin(description);
    // Eleventy Navigation (https://www.11ty.dev/docs/plugins/navigation/)
    eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
    // Eleventy RSS Feed (https://www.11ty.dev/docs/plugins/rss/)
    eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));
    // Filter to generate a Table of Contents from page content
    //NB parameters don't seem to work here, see single.html
    eleventyConfig.addPlugin(pluginTOC);
    // TODO https://www.npmjs.com/package/eleventy-plugin-meta-generator
    // Eleventy Syntax Highlighting (https://www.11ty.dev/docs/plugins/syntaxhighlight/)
    // eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
    eleventyConfig.addPlugin(syntaxHighlight, {

        alwaysWrapLineHighlights: true,
                // Change which Eleventy template formats use syntax highlighters
        templateFormats: ["liquid", "njk", "md", "html"]}); // default

        // Use only a subset of template types (11ty.js added in v4.0.0)
        // templateFormats: ["liquid", "njk", "md", "11ty.js"],

        // init callback lets you customize Prism
        // init: function({ Prism }) {
        //   Prism.languages.myCustomLanguage = /* */;



//QAD
        // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
       // preAttributes: {
         // tabindex: 0,

//QAD: Trying to fix this
          // Added in 4.1.0 you can use callback functions too
          //"data-language": function({ language, content, options }) {
          //  return language;
         // }
        //},
        //codeAttributes: {},
      //});

    eleventyConfig.addPlugin(xmlFiltersPlugin);

    // Custom Collections
    eleventyConfig.addCollection("pages", (collection) =>
        collection.getFilteredByGlob("./src/pages/**/*")
    );

    eleventyConfig.addCollection("posts", (collection) =>
        collection
            .getFilteredByGlob("./src/posts/**/*")
            .filter(
                (item) => item.data.draft !== true && item.date <= new Date()
            )
            .reverse()
            .map((cur, i, all) => {
                cur.data["siblings"] = {
                    next: all[i - 1],
                    prev: all[i + 1],
                };
                return cur;
            })
    );

    eleventyConfig.addCollection("projects", (collection) =>
        collection
            .getFilteredByGlob("./src/projects/**/*")
            .sort((a, b) => a.data.weight - b.data.weight)
    );

    // eleventyConfig.addCollection("posts", function (collectionApi) {
    //     return collectionApi.getFilteredByGlob("./src/_posts/**/*.md");
    // });

    eleventyConfig.addCollection("drafts", (collection) =>
    collection
        .getFilteredByGlob("./src/_drafts/**/*")
        .sort((a, b) => a.data.weight - b.data.weight)
)   ;


    eleventyConfig.addCollection("tags", (collection) => {
        let tags = new Set();

        collection.getAll().forEach((item) => {
            if ("tags" in item.data) {
                if (item.data.tags != undefined) {
                    for (const tag of item.data.tags) {
                        tags.add(tag);
                    }
                }
            }
        });

        return [...tags];
    });

    eleventyConfig.addCollection("categories", (collection) => {
        let categories = new Set();

        collection.getAll().forEach((item) => {
            if ("category" in item.data) {
                if (item.data.category != undefined) {
                     for (const category of item.data.category) {
                        categories.add(category);
                    }
                }
            }
        });

        return [...categories];
    });

    // Filters

    // eleventyConfig.addFilter("markdownify", (str) => {
    //     return markdownItRenderer.renderInline(str);
    // });

    eleventyConfig.addFilter("markdownify", (string) => {
        return md.renderInline(string);
    });

    eleventyConfig.addNunjucksFilter("markdownify", (str) => md.render(str));

    eleventyConfig.addFilter("jsonify", (variable) => JSON.stringify(variable));

    eleventyConfig.addFilter("slugify", (str) =>
        require("slugify")(str, {
            lower: true,
            replacement: "-",
            remove: /[*+~.·,()''`´%!?¿:@]/g,
        })
    );

    eleventyConfig.addFilter("where", (array, key, value) =>
        array.filter((item) => {
            const keys = key.split(".");
            const reducedKey = keys.reduce((object, key) => object[key], item);

            return reducedKey === value ? item : false;
        })
    );

    eleventyConfig.addFilter("date", (date, format = "") =>
        require("moment")(date).format(format)
    );

    eleventyConfig.addLiquidFilter("toUTCString", (date) => {
        const utc = date.toUTCString();
        return moment.utc(utc).format("MMMM Do YYYY");
    });

    eleventyConfig.addFilter("number_of_words", numberOfWords);

    // eleventyConfig.addShortcode("where_exp", function (item, exp) {
    //     console.log(exp);
    //     return eval(exp);
    // });
    eleventyConfig.addFilter("where_exp", function (value) {
        // where_exp function
        return value.hidden != true;
    });

    eleventyConfig.addFilter("inspect", function (obj = {}) {
        return inspect(obj, {sorted: true});
      });

    eleventyConfig.addFilter('group_by', groupBy)

    // Passthrough copy
    // don't use .gitignore (allows compiling sass to css into a monitored folder WITHOUT committing it to repo)
    eleventyConfig.setUseGitIgnore(false);

    // Processing configuration
    eleventyConfig.addPassthroughCopy("src/assets/images/favicon/*");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/assets");
    // eleventyConfig.addPassthroughCopy({ "src/_sass": "assets/css" });

    eleventyConfig.addShortcode("post_url", (collection, slug) => {
        try {
            if (collection.length < 1) {
                throw "Collection appears to be empty";
            }
            if (!Array.isArray(collection)) {
                throw "Collection is an invalid type - it must be an array!";
            }
            if (typeof slug !== "string") {
                throw "Slug is an invalid type - it must be a string!";
            }

            const found = collection.find((p) => p.fileSlug == slug);
            if (found === 0 || found === undefined) {
                throw `${slug} not found in specified collection.`;
            } else {
                return found.url;
            }
        } catch (e) {
            console.error(
                `RMCG:An error occured while searching for the url to ${slug}. Details:`,
                e
            );
        }
    });

    // Set section

    // Configure BrowserSync to serve the 404 page for missing files
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: (_err, browserSync) => {
                const content_404 = fs.readFileSync("dist/404.html");

                browserSync.addMiddleware("*", (_req, res) => {
                    // render the 404 content instead of redirecting
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    eleventyConfig.setBrowserSyncConfig({
        files: "./dist/assets/styles/**/*.css",
    });

    // Merge Data (https://www.11ty.dev/docs/data-deep-merge/)
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
    });

    eleventyConfig.setLiquidOptions({
        // dynamicPartials: false,
        // strictVariables: false,
        // strictFilters: false,
        jekyllInclude: true,
    });


    // Markdown Configuration
    let MarkdownItOptions = {
        html: true, // Enable HTML tags in source
        breaks: true,  // Convert '\n' in paragraphs into <br>
        linkify: true // Autoconvert URL-like text to links
      };


    const md = require("markdown-it")(MarkdownItOptions);

    const mdAnchorOpts = {
      permalink: false,
      level: [1, 2, 3, 4]
    }

    eleventyConfig.setLibrary(
        "md",
        markdownIt(MarkdownItOptions)
            .use(require("markdown-it-attrs"))
            .use(require("markdown-it-container"), "", {
                validate: () => true,
                render: (tokens, idx) => {
                    if (tokens[idx].nesting === 1) {
                        const classList = tokens[idx].info.trim();
                        return `<div ${classList && `class="${classList}"`}>`;
                    } else {
                        return `</div>`;
                    }
                },
            })
            .use(require("markdown-it-fontawesome"))
            .use(require("markdown-it-footnote"))
            .use(markdownItAnchor, mdAnchorOpts)
            .use(imageLocationFixer)
            .use(mdBiblatex, {
                bibPath: "./src/assets/bibliography.bib",
            })
    );

    // override markdown-it-footnote anchor template to use a different unicode character
    md.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
        var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

        if (tokens[idx].meta.subId > 0) {
            id += ":" + tokens[idx].meta.subId;
        }

        /* ⇑ with escape code to prevent display as Apple Emoji on iOS */
        return (
            ' <a href="#fnref' +
            id +
            '" class="footnote-backref">\u21d1\uFE0E</a>'
        );
    };

    //for upgrade sanity
    //eleventyConfig.addPlugin(UpgradeHelper);

    // eleventyConfig.addWatchTarget("./assets/css/");
    // eleventyConfig.addTransform(
    //     "sass",
    //     async function sassTransform(content, outputPath) {
    //         if (outputPath?.endsWith(".css")) {
    //             const { css } = await sassRender({
    //                 data: content,
    //                 outputStyle: "compressed",
    //                 precision: 3,
    //             });
    //             return css;
    //         }
    //         return content;
    //     }
    // );

    eleventyConfig.addFilter("absolute_url", absoluteUrl);

    eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
    

    return {
        templateFormats: ["html", "liquid", "md", "njk"],

        environment: "production",

        passthroughFileCopy: true,

        dir: {
            input: "src",
			layouts: "layouts",
            includes: "includes",
            data: "data",
            output: "dist",
        },
    };
};

// Custom markdown-it plugin to process image tokens
function imageLocationFixer(md) {
    md.core.ruler.push("image_location_fixer", function (state) {
        state.tokens.forEach(function (blockToken) {
            if (blockToken.type === "inline" && blockToken.children) {
                blockToken.children.forEach(function (token) {
                    if (token.type === "image") {
                        // Modify the token attributes or content as needed
                        // Strip the dots from the image src
                        let src = token.attrGet("src");
                        if (src.startsWith("../")) {
                            src = src.replace(/^\.\.\//, "/");
                            token.attrSet("src", src);
                        }
                    }
                });
            }
        });
    });
}



function numberOfWords(content) {
    return content.split(/\s+/g).length;
}


function absoluteUrl(url) {
    if (url !== undefined) {
        return siteURL + url
    } else {
        return siteURL
    }
}

function groupBy(array, key) {
    const get = entry => key.split('.').reduce((acc, key) => acc[key], entry)

    const map = array.reduce((acc, entry) => {
      const value = get(entry)

      if (typeof acc[value] === 'undefined') {
        acc[value] = []
      }

      acc[value].push(entry)
      return acc
    }, {})

    return Object.keys(map).reduce(
      (acc, key) => [...acc, { name: key, items: map[key] }],
      []
    )
  }
