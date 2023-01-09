import React, { useMemo, useState } from "react"
import PostItem, { PostFrontmatterType } from "components/main/PostItem"
import { md } from "../../styles/helpers/TailwindUtil"
import Pagination from "@mui/material/Pagination"


const PostListWrapper = (props) => <div
    className={`grid grid-cols-4 gap-4 w-full my-0 mx-auto py-12 px-5 ${md("w-[768px] pt-[50px] px-0 pb-[100px]")}`}>{props.children}</div>


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
            posts.filter(({ node: { frontmatter: { categories } } }: PostListItemType) =>
                selectedCategory !== "All"
                    ? categories.includes(selectedCategory)
                    : true
            ), [selectedCategory, page])

    const filteredPostCount = useMemo(() => filteredPostByCategory.length, [filteredPostByCategory])


    const onChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(() => value)
    }

    return (
        <PostListWrapper>
            {filteredPostByCategory
                .slice((page - 1) * pageSize, page * pageSize)
                .map((
                    {
                        node: {
                            id,
                            fields: { slug },
                            frontmatter
                        }

                    }: PostListItemType) =>
                    <PostItem key={id}
                              {...frontmatter}
                              link={slug}
                    />
                )}
            <Pagination className={`col-span-4 justify-self-center mt-10`}
                        page={page}
                        onChange={onChange}
                        count={Math.ceil(filteredPostCount / pageSize)}
                        sx={{
                            '&.MuiPaginationItem': {
                                color: 'white'
                            }
                        }}
            />
        </PostListWrapper>
    )
}


PostList.defaultProps = {}

export default PostList