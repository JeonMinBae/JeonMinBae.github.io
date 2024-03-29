module.exports = {
    siteMetadata: {
        title: `배우고 공부한 것을 기록하는 저장소`,
        description: `배우게된 것 알게된 것 정리한 것들을 기록하고 있는 블로그 입니다.`,
        author: `Hardy`,
        siteUrl: `https://jeonminbae.github.io/`
    },
    plugins: [
        "gatsby-plugin-postcss",
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-image`,
        'gatsby-plugin-sitemap',
        {
            resolve: "gatsby-plugin-typescript",
            options: {
                isTSX: true,
                allExtensions: true
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `contents`,
                path: `${__dirname}/contents`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/static`
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-smartypants",
                        options: {
                            dashes: "oldschool"
                        }
                    },
                    {
                        resolve: "gatsby-remark-prismjs",
                        options: {
                            classPrefix: "language-"
                        }
                    },
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 768,
                            quality: 100,
                            withWebp: true
                        }
                    },
                    {
                        resolve: "gatsby-remark-copy-linked-files",
                        options: {}
                    },
                    {
                        resolve: "gatsby-remark-external-links",
                        options: {
                            target: "_blank",
                            rel: "nofollow"
                        }
                    },
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            offsetY: `100`,
                            icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
                            className: `custom-class`,
                            // maintainCase: true,
                            // removeAccents: true,
                            isIconAfterHeader: true,
                            elements: [`h1`, `h2`, `h3`, `h4`]
                        }
                    }
                ]
            }
        },
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    formats: ["auto", "webp"],
                    quality: 100,
                    placeholder: "blurred"
                }
            }
        },
        {
            resolve: 'gatsby-plugin-emotion',
        },
        {
            resolve: "gatsby-plugin-canonical-urls",
            options: {
                siteUrl: "https://jeonminbae.github.io/",
                stripQueryString: true
            }
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                policy: [{ userAgent: "*", allow: "/" }]
            }
        },
    ]
}

