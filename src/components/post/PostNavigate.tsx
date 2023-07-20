import React from 'react';
import {navigate} from "@reach/router";
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import tw, {styled} from "twin.macro";

export interface IPostNavigate {
    node: {
        fields: {
            slug: string
        }
        frontmatter: {
            title: string
            thumbnail: {
                childImageSharp: {
                    gatsbyImageData: IGatsbyImageData
                }
            }
        }
    }
}

enum PostType{
    PREVIOUS,
    NEXT,
}

export interface IPostNavigateProps {
    previousPost: IPostNavigate
    nextPost: IPostNavigate
    //children?: React.ReactNode,
}

const PostNavigate = (
    {
        previousPost,
        nextPost,
    }: IPostNavigateProps
) => {
    const navigateForm = (post, qqqq :PostType) => {
        const {
            node: {
                fields: {
                    slug: slug
                },
                frontmatter: {
                    title: title,
                    thumbnail: {
                        childImageSharp: {
                            gatsbyImageData: image
                        }
                    }
                }
            }
        } = post;

        return (
            <PostNavigateItem onClick={() => navigate(slug)}>
                {PostType.PREVIOUS === qqqq && <span className={'mx-1'}>&lt;</span>}
                <PostNavigateImage image={image}/>
                <PostNavigateText>{title}</PostNavigateText>
                {PostType.NEXT === qqqq && <span className={'mx-1'}>&gt;</span>}
            </PostNavigateItem>
        )
    }

    return (
        <PostNavigateWrapper>
            {previousPost ? navigateForm(previousPost, PostType.PREVIOUS) : <div></div>}
            {nextPost ? navigateForm(nextPost, PostType.NEXT) : <div></div>}
        </PostNavigateWrapper>
    );
};

const PostNavigateWrapper = styled.div`${tw`w-[768px] flex place-content-between`}`
const PostNavigateItem = styled.div`${tw`flex items-center py-2 px-3 rounded bg-neutral-800 cursor-pointer`}`
const PostNavigateImage = styled(GatsbyImage)`${tw`h-12 w-20 mx-2`}`
const PostNavigateText = styled.span`${tw`font-bold w-44 text-lg truncate`}`


PostNavigate.defaultProps = {};

export default PostNavigate;