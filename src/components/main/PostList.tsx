import React, {useMemo, useState} from "react"
import PostItem, {PostFrontmatterType} from "components/main/PostItem"
import Pagination from "@mui/material/Pagination"
import tw, {styled} from "twin.macro";
import {PaginationItem} from "@mui/material";


export type PostListItemType = {
    node: {
        id: string
        fields: {
            slug: string
        }
        frontmatter: PostFrontmatterType
    }
}

export interface IPostListProps {
    selectedCategory: string
    posts: PostListItemType[]
    //children?: React.ReactNode,
}


const PostList = (
    {
        selectedCategory,
        posts
    }: IPostListProps) => {

    const pageSize = 8
    const [page, setPage] = useState(1)
    const filteredPostByCategory = useMemo(
        () =>
            posts.filter(({node: {frontmatter: {categories}}}: PostListItemType) =>
                selectedCategory !== "All"
                    ? categories.includes(selectedCategory)
                    : true
            ), [selectedCategory, page])

    const filteredPostCount = useMemo(() => filteredPostByCategory.length, [filteredPostByCategory])


    const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(() => value)
    }

    return (
        <>
            <PostListWrapper>
                {filteredPostByCategory
                    .slice((page - 1) * pageSize, page * pageSize)
                    .map((
                        {
                            node: {
                                id,
                                fields: {slug},
                                frontmatter
                            }

                        }: PostListItemType) =>
                        <PostItem key={id}
                                  {...frontmatter}
                                  link={slug}
                        />
                    )}
            </PostListWrapper>
            <Pagination className={`col-span-4 justify-self-center mb-10`}
                        page={page}
                        onChange={onChange}
                        count={Math.ceil(filteredPostCount / pageSize)}
                        renderItem={(props) => <PaginationItem
                            {...props}
                            className={'border border-1 border-zinc-700 text-gray-200'}
                            disableRipple
                        />}
                        variant={"outlined"}
                        shape={"rounded"}
            />
        </>
    )
};

const PostListWrapper = styled.div`${tw`grid grid-cols-post-1 gap-4 my-0 mx-auto py-12 px-5 sm:grid-cols-post-2 md:(grid-cols-post-2 max-w-[1258px] pt-[50px] px-0 pb-[100px]) lg:grid-cols-post-3 xl:grid-cols-post-4`}`


PostList.defaultProps = {}

export default PostList