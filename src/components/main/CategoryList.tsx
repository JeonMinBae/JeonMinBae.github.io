import React from "react"
import { Link} from "gatsby"
import tw, {styled} from 'twin.macro'


const CategoryListWrapper = styled.div`${tw`flex flex-wrap w-[768px] mt-36 mx-auto`}`
const CategoryItem = styled(Link)(({active}: boolean) => active ? tw`font-[800] text-white` : tw`font-[400] text-stone-500`, tw`mr-4 py-1 px-0 text-[1.125rem] cursor-pointer last-of-type:mr-0`)


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
        <CategoryListWrapper data-component={'CategoryListWrapper'}>
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