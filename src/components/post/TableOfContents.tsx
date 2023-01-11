import React from "react"
import styled from "@emotion/styled"
import tw from "twin.macro"


const TocWrapper = (props) => <div data-component={"TocWrapper"} css={tw`xl:(fixed right-8 block w-auto) mt-5 flex flex-col w-[768px] border-2 border-gray-400 border-solid rounded `} {...props}>{props.children}</div>
const TocTitle = (props) => <div data-component={"TocTitle`"} className={'bg-gray-400 text-white text-center p-3 '} {...props}>{props.children}</div>

export interface ITableOfContentsProps {
    toc: string
    //children?: React.ReactNode,
}

const TableOfContents = (
    {
        toc,
    }: ITableOfContentsProps
) => {

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

    return (
        <TocWrapper>
            <TocTitle>Table of Contents</TocTitle>
            <Toc dangerouslySetInnerHTML={{__html: toc}} />
        </TocWrapper>
    )
}


TableOfContents.defaultProps = {}

export default TableOfContents