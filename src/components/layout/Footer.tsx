import React from "react"
import tw, {styled} from "twin.macro";


export interface IFooterProps {
    //children?: React.ReactNode,
}

const Footer = ({}: IFooterProps) => {

    return (
        <Wrapper>
            <span>Thank You for Visiting and Watching My Blog, Have a Good Day 😆</span>
            <br />
            <span>© 2022 Developer Hardy, Powered By Gatsby.</span>
        </Wrapper>
    )
}

const Wrapper = styled.div`${tw`md:(text-[1rem]) w-full grid place-items-center mt-auto py-[50px] px-0 border-0 border-t border-gray-700 border-solid text-center leading-4 bg-[#11161d] text-[0.8rem]`}`

Footer.defaultProps = {}

export default Footer