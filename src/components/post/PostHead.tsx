import React from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import PostHeadInfo, { IPostHeadInfoProps } from "components/post/PostHeadInfo"
import tw, {styled} from "twin.macro";


export interface IGatsbyImgProps {
    image: IGatsbyImageData
    alt: string
    className?: string
}

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

const BackgroundImage = styled(GatsbyImage)`${tw`brightness-[0.25] object-cover w-full h-[25rem] relative`}`
const PostHeadWrapper = styled.div`${tw`w-full h-[25rem] relative`}`


PostHead.defaultProps = {}

export default PostHead