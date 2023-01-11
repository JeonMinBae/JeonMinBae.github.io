import React from "react"
import { Link} from "gatsby"
import tw, {styled} from 'twin.macro'


const CategoryListWrapper = (props) => <div data-component={'CategoryListWrapper'} tw={'flex flex-wrap w-[768px] mt-36 mx-auto'}>{props.children}</div>
const CategoryItem = styled(Link)(props => props.active ? tw`font-[800] text-black` : tw`font-[400] text-stone-500`, tw`mr-4 py-1 px-0 text-[1.125rem] cursor-pointer last-of-type:mr-0`)


export interface ICategoryListProps {
    selectedCategory: string,
    categoryList: {
        [key: string]: number,
    }
    //children?: React.ReactNode,
}

const CategoryList = (
    {
        selectedCategory,
        categoryList,
    }: ICategoryListProps

) => {

    return (
        <CategoryListWrapper>
            {Object.entries(categoryList).map(([name, count]) => (
                <CategoryItem key={name}
                              data-component={'CategoryItem'}
                              to={`/?category=${name}`}
                              active={name === selectedCategory}
                >
                    #{name}({count})
                </CategoryItem>
            ))}
        </CategoryListWrapper>
    )
}


CategoryList.defaultProps = {}

export default CategoryList