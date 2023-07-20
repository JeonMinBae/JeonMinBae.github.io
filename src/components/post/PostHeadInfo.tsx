import React from "react"
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import tw, {styled} from 'twin.macro'


export interface IPostHeadInfoProps {
    title: string
    date: string
    categories: string[]
    //children?: React.ReactNode,
}

const PostHeadInfo = (
    {
        title,
        date,
        categories,
    }: IPostHeadInfoProps
) => {

    const goToPostList = () => navigate('/');

    return (
        <PostHeadInfoWrapper>
            <PrevPageIcon onClick={goToPostList}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </PrevPageIcon>
            <Title>{title}</Title>
            <PostData>
                <div>{categories.join(' / ')}</div>
                <div>{date}</div>
            </PostData>
        </PostHeadInfoWrapper>
    )
}

const PostHeadInfoWrapper = styled.div`${tw`z-[1] relative flex flex-col w-[768px] h-full mx-auto my-0 px-0 pt-16 text-white`}`
const PrevPageIcon = styled.div`${tw`grid place-items-center w-10 h-10 rounded-full bg-white text-xl cursor-pointer text-black`}`
const Title = styled.div`${tw`overflow-hidden break-words mt-24 text-ellipsis whitespace-normal text-4xl font-extrabold`}`
const PostData = styled.div`${tw`flex justify-between items-center mt-2.5 text-lg font-bold`}`



PostHeadInfo.defaultProps = {}

export default PostHeadInfo