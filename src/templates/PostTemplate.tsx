import React from "react"
import { graphql } from "gatsby"
import Template from "components/common/Template"
import PostHead from "components/post/PostHead"
import { PostFrontmatterType } from "components/main/PostItem"
import PostContent from "components/post/PostContent"
import CommentWidget from "components/post/CommentWidget"
import TableOfContents from "components/post/TableOfContents"


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
        data: {
            allMarkdownRemark: { edges }
        },
        location: { href },
    }
) => {
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
                    childImageSharp: { gatsbyImageData }
                },
                publicURL,
            }
        }
    } = edges[0]



    return (
        <Template title={title} description={summary} url={href} image={publicURL}>
            <PostHead
                title={title}
                date={date}
                categories={categories}
                thumbnail={gatsbyImageData}
            />
            <TableOfContents toc={tableOfContents} />
            <PostContent html={html} />
            <CommentWidget />
        </Template>
    )
}


PostTemplate.defaultProps = {}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
    query queryMarkdownDataBySlug($slug: String) {
        allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
            edges {
                node {
                    html
                    tableOfContents
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