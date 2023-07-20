import React from "react"
import {graphql} from "gatsby"
import Template from "components/common/Template"
import PostHead from "components/post/PostHead"
import {PostFrontmatterType} from "components/main/PostItem"
import PostContent from "components/post/PostContent"
import CommentWidget from "components/post/CommentWidget"
import TableOfContents from "components/post/TableOfContents"
import {GatsbyImage} from "gatsby-plugin-image";
import {navigate} from "@reach/router";
import PostNavigate from "components/post/PostNavigate";


export interface PostPageItemType {
    node: {
        html: string
        tableOfContents: string
        frontmatter: PostFrontmatterType
    }
}

export interface IPostTemplateProps {
    data: {
        allMarkdownRemark: {
            edges: PostPageItemType[]
        }
    }
    location: {
        href: string
    }
    //children?: React.ReactNode,
}

const PostTemplate = (
    {
        pageContext,
        data,
        location: {href},
    }
) => {
    const {slug} = pageContext;
    const {allMarkdownRemark: {edges}} = data;

    let previousPost;
    let nextPost;
    let currentPost;

    for (const edge of edges) {
        if (edge.node.fields.slug === slug) {
            currentPost = edge;
        } else if (currentPost) {
            nextPost = edge;
        } else {
            previousPost = edge;
        }
    }

    const {
        node: {
            html,
            tableOfContents,
            frontmatter: {
                title,
                summary,
                date,
                categories,
                thumbnail: {
                    childImageSharp: {gatsbyImageData}
                },
                publicURL,
            }
        }
    } = currentPost;

    return (
        <Template title={title} description={summary} url={href} image={publicURL}>
            <PostHead
                title={title}
                date={date}
                categories={categories}
                thumbnail={gatsbyImageData}
            />
            <TableOfContents toc={tableOfContents}/>
            <PostContent html={html}/>
            <PostNavigate previousPost={previousPost} nextPost={nextPost}/>
            <CommentWidget/>
        </Template>
    )
}


PostTemplate.defaultProps = {}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
    query queryMarkdownDataBySlug($ids: [String]) {
        allMarkdownRemark(
            filter: {id: {in: $ids}}
            sort: {order: DESC, fields: frontmatter___date}
        ) {
            edges {
                node {
                    html
                    tableOfContents
                    fields {
                      slug
                    }
                    frontmatter {
                        title
                        summary
                        date(formatString: "YYYY.MM.DD.")
                        categories
                        thumbnail {
                            childImageSharp {
                                gatsbyImageData
                            }
                            publicURL
                        }
                    }
                }
            }
        }
    }
`

//     `
//     query queryMarkdownDataBySlug($slug: String) {
//         allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
//             edges {
//                 node {
//                     html
//                     tableOfContents
//                     frontmatter {
//                         title
//                         summary
//                         date(formatString: "YYYY.MM.DD.")
//                         categories
//                         thumbnail {
//                             childImageSharp {
//                                 gatsbyImageData
//                             }
//                             publicURL
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `

