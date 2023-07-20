import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import tw, {styled} from "twin.macro";


export type PostFrontmatterType = {
    title: string
    date: string
    categories: string[]
    summary: string
    thumbnail: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData
        }
        publicURL: string
    }
}

export interface IPostItemProps extends PostFrontmatterType{
    link: string
    //children?: React.ReactNode,
}

const PostItem = (
    {
        title,
        date,
        categories,
        summary,
        thumbnail: {childImageSharp: { gatsbyImageData }},
        link,
    }: IPostItemProps
) => {

    return (
        <PostItemWrapper data-component={'PostItemWrapper'} to={link}>
            <ThumbnailImage data-component={'ThumbnailImage'} image={gatsbyImageData} alt={"Post Thumbnail"} />

            <PostItemContent data-component={'PostItemContent'}>
                <Title data-component={'Title'}>{title}</Title>
                <Date data-component={'Date'}>{date}</Date>
                <Category data-component={'Category'}>
                    {categories.map(c => <CategoryItem key={c} data-component={'CategoryItem'}>{c}</CategoryItem>)}
                </Category>
                <Summary data-component={'Summary'}>{summary}</Summary>
            </PostItemContent>
        </PostItemWrapper>
    )
}

const PostItemWrapper = styled(Link)`${tw`flex flex-col rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.15)] text-gray-600 no-underline transition duration-300 ease-out cursor-pointer hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:-translate-x-1 hover:-translate-y-1`}`
const ThumbnailImage = styled(GatsbyImage)`${tw`w-full h-56 rounded-t-lg object-cover`}`
const PostItemContent = styled.div`${tw`flex flex-1 flex-col bg-neutral-900 p-4`}`
const Title = styled.div`${tw`overflow-hidden text-ellipsis whitespace-normal break-words text-[1.2rem] text-[#ddddde] font-bold  mb-1`} display: '-webkit-box' webkit-line-clamp: 2 webkit-box-orient: 'vertical`
const Date = styled.div`${tw`text-[0.85rem] text-[#ddddde] font-normal opacity-70`}`
const Category = styled.div`${tw`flex flex-wrap my-3 mx-[-0.2rem]`}`
const CategoryItem = styled.div`${tw`my-1 mx-1 py-[3px] px-[5px] rounded-sm bg-black text-[14px] font-bold text-[#888888]`}`
const Summary = styled.div`${tw`overflow-hidden mt-auto text-ellipsis whitespace-normal break-words text-[16px] text-[#ddddde] opacity-80`} display: '-webkit-box' webkit-line-clamp: 4 webkit-box-orient: 'vertical`


PostItem.defaultProps = {}

export default PostItem