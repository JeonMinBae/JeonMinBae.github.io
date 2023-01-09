import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"





const PostItemWrapper = (props) => <Link data-component={'PostItemWrapper'} className={`flex flex-col rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.15)] text-gray-600 no-underline transition duration-300 ease-out cursor-point hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:-translate-x-1 hover:-translate-y-1 `} {...props}>{props.children}</Link>
const ThumbnailImage = (props) => <GatsbyImage data-component={'ThumbnailImage'} className={`w-full h-52 rounded-t-lg object-cover`} {...props} />
const PostItemContent = (props) => <div data-component={'PostItemContent'} className={`flex flex-1 flex-col bg-[#1D1811] p-4`}>{props.children}</div>
const Title = (props) => <div data-component={'Title'} style={{display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}} className={`overflow-hidden text-ellipsis whitespace-normal break-words text-[1.2rem] text-[#ddddde] font-bold  mb-1`}>{props.children}</div>
const Date = (props) => <div data-component={'Date'} className={`text-[0.85rem] text-[#ddddde] font-normal opacity-70`}>{props.children}</div>
const Category = (props) => <div data-component={'Category'} className={`flex flex-wrap my-3 mx-[-0.2rem]`}>{props.children}</div>
const CategoryItem = (props) => <div data-component={'CategoryItem'} className={`my-1 mx-1 py-[3px] px-[5px] rounded-sm bg-black text-[14px] font-bold text-[#888888]`}>{props.children}</div>
const Summary = (props) => <div data-component={'Summary'} style={{display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical"}} className={`overflow-hidden mt-auto text-ellipsis whitespace-normal break-words text-[16px] text-[#ddddde] opacity-80`}>{props.children}</div>

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
        <PostItemWrapper to={link}>
            <ThumbnailImage image={gatsbyImageData} alt={"Post Thumbnail"} />

            <PostItemContent>
                <Title>{title}</Title>
                <Date>{date}</Date>
                <Category>
                    {categories.map(c => <CategoryItem key={c}>{c}</CategoryItem>)}
                </Category>
                <Summary>{summary}</Summary>
            </PostItemContent>
        </PostItemWrapper>
    )
}


PostItem.defaultProps = {}

export default PostItem