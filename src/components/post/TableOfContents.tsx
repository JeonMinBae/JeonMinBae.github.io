import React from "react"
import tw, {styled} from "twin.macro"


const TocWrapper = styled.div`${tw`xl:(fixed right-8 block w-auto) mt-5 mx-auto flex flex-col w-[768px] border-2 border-gray-400 border-solid rounded`}`
const TocTitle = styled.div`${tw`bg-gray-400 text-white text-center p-3`}`
const Toc = styled.div`    
        a {
            max-width: 9rem;
            display: block;
            padding: 0.3rem 2rem;
            color: #c5c5c7;
            text-decoration: none;
        }
        
        p {
            margin: 0;
        }
        
        ul {
            padding: 0;
            margin: 0;
            list-style-type : none;
        }
        
        ul ul a {
            padding-left: 3rem;
        }
        
        li {
            padding: 0.1rem 0;
            width: 100%;
            border-top: 1px solid #BDC3C7;
           
        }
        
        li:hover {
            // color: white;
            // background-color: gray;
        }
        
        li a:hover {
            transition: color 0.3s;
            color: white;
            background-color: gray;
        }
    `;

export interface ITableOfContentsProps {
    toc: string
    //children?: React.ReactNode,
}

const TableOfContents = (
    {
        toc,
    }: ITableOfContentsProps
) => {

    return (
        <TocWrapper data-component={"TocWrapper"}>
            <TocTitle data-component={"TocTitle`"} >Table of Contents</TocTitle>
            <Toc dangerouslySetInnerHTML={{__html: toc}} />
        </TocWrapper>
    )
}


TableOfContents.defaultProps = {}

export default TableOfContents