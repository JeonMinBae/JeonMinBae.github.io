import React, {useEffect, useState} from "react"
import tw, {styled} from "twin.macro"


export interface ITableOfContentsProps {
    toc: string
    //children?: React.ReactNode,
}

const TableOfContents = (
    {
        toc,
    }: ITableOfContentsProps
) => {

    const [position, setPosition] = useState(0);
    const onScroll = () => {
        setPosition(() => window.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const makeTocPosition = (position: number) =>{
        const threshold = 800;
        if(position < 420){
            return 420;
        }else if( threshold > (document.body.clientHeight - position)){
            return document.body.clientHeight - threshold
        }else{
            return position
        }
    }

    return (
        <TocWrapper data-component={"TocWrapper"} style={{top: makeTocPosition(position)}}>
            <TocTitle data-component={"TocTitle`"} >Table of Contents</TocTitle>
            <Toc dangerouslySetInnerHTML={{__html: toc}} />
        </TocWrapper>
    )
}

const TocWrapper = styled.div`${tw`xl:(absolute right-8 block w-auto ) mt-5 mx-auto flex flex-col w-[768px] border-2 border-gray-400 border-solid rounded`}`
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
        
        li li:hover {
            transition: color 0.3s;
            color: white;
            background-color: gray;
        }
        
        
        li p:hover {
            transition: color 0.3s;
            color: white;
            background-color: gray;
        }
    `;

TableOfContents.defaultProps = {}

export default TableOfContents