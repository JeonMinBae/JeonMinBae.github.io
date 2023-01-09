import React from "react"
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"


const PostHeadInfoWrapper = (props) => <div data-component={'PostHeadInfoWrapper'} className={'z-[1] relative flex flex-col w-[768px] h-full mx-auto my-0 px-0 pt-16 text-white'}>{props.children}</div>
const PrevPageIcon = (props) => <div data-component={'PrevPageIcon'} className={'grid place-items-center w-10 h-10 rounded-full bg-white text-xl cursor-pointer text-black'} {...props}>{props.children}</div>
// const Title = (props) => <div className={`overflow-hidden break-words mt-auto text-ellipsis whitespace-normal text-4xl font-extrabold`} style={{display: '-webkit-box', '-webkit-line-clamp': 2, '-webkit-box-orient': 'vertical'}} {...props}>{props.children}</div>
const Title = (props) => <div data-component={'Title'} className={`overflow-hidden break-words mt-24 text-ellipsis whitespace-normal text-4xl font-extrabold`} style={{display: '-webkit-box', '-webkit-line-clamp': 2, '-webkit-box-orient': 'vertical'}} {...props}>{props.children}</div>
const PostData = (props) => <div data-component={'PostData'} className={`flex justify-between items-center mt-2.5 text-lg font-bold `} {...props}>{props.children}</div>


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


PostHeadInfo.defaultProps = {}

export default PostHeadInfo