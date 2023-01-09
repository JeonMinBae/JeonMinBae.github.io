import React from "react"
import { graphql, Link } from "gatsby"
import Text from "components/common/Text"


export interface IInfoProps {
    //children?: React.ReactNode,
    data: {
        site: {
            siteMetadata: {
                title: string
                description: string
                author: string
            }
        }
    }
}

const Info = (
    {
        data: {
            site: {
                siteMetadata: { title, description, author }
            }
        }
    }: IInfoProps) => {

    return (
        <div>
            <Text text={title} />
            <Text text={description} />
            <Text text={author} />
            <Link to={"/"}>link </Link>
            <span className={'text-red-500 font-bold underline'}>dfsdfsd</span>
        </div>
    )
}


Info.defaultProps = {}

export default Info

export const metadataQuery = graphql`
    {
        site{
            siteMetadata{
                title
                description
                author
            }
        }
    }
`