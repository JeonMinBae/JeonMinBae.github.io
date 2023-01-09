import React from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import PostHeadInfo, { IPostHeadInfoProps } from "components/post/PostHeadInfo"


export interface IGatsbyImgProps {
    image: IGatsbyImageData
    alt: string
    className?: string
}



const BackgroundImage = (props: IGatsbyImgProps) => <GatsbyImage {...props} className={`brightness-[0.25] object-cover w-full h-[25rem] relative`}  />
const PostHeadWrapper = (props) => <div className={`w-full h-[25rem] relative`}>{props.children}</div>

export interface IPostHeadProps extends IPostHeadInfoProps{
    thumbnail: IGatsbyImageData
    //children?: React.ReactNode,
}

const PostHead = (
    {
        title,
        date,
        categories,
        thumbnail,
    }: IPostHeadProps
) => {

    return (
        <PostHeadWrapper>
            <BackgroundImage image={thumbnail} alt={"thumbnail"} style={{position: "absolute"}}/>
            <PostHeadInfo title={title} date={date} categories={categories} />
        </PostHeadWrapper>
    )
}


PostHead.defaultProps = {}

export default PostHead