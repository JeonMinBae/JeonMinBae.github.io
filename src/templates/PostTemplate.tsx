import React from "react"
import { graphql } from "gatsby"
import { PostListItemType } from "components/main/PostList"
import { IGatsbyImageData } from "gatsby-plugin-image"


export interface IPostTemplateProps {
    data: {
        allMarkdownRemark: {
            edges: PostListItemType[]
        }
    }
    //children?: React.ReactNode,
}

const Post_template = (props) => {
    console.log("props", props)

    return (
        <div>
            ???s
        </div>
    )
}


Post_template.defaultProps = {}

export default Post_template;

export const queryMarkdownDataBySlug = graphql`
    query queryMarkdownDataBySlug($slug: String) {
        allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
            edges {
                node {
                    html
                    frontmatter {
                        title
                        summary
                        date(formatString: "YYYY.MM.DD.")
                        categories
                        thumbnail {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                }
            }
        }
    }
`