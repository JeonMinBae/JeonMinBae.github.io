import React from "react"
import { styled } from "twin.macro"


export interface IPostContentProps {
    html: string
    //children?: React.ReactNode,
}


const PostContent = ({ html }: IPostContentProps) => {

    const MarkdownRenderer = styled.div`
      // Renderer Style
      display: flex;
      flex-direction: column;
      width: 768px;
      margin: 0 auto;
      padding: 100px 0;
      word-break: break-all;

      // Markdown Style
      line-height: 1.8;
      font-size: 16px;
      font-weight: 400;

      // Apply Padding Attribute to All Elements
      p {
        padding: 3px 0;
      }

      // Adjust Heading Element Style
      h1,
      h2,
      h3 {
        font-weight: 800;
        margin-bottom: 20px;
      }

      * + h1,
      * + h2,
      * + h3 {
        // margin-top: 80px;
      }

      hr + h1,
      hr + h2,
      hr + h3 {
        margin-top: 0;
      }

      h1 {
        font-size: 30px;
      }

      h2 {
        font-size: 25px;
      }

      h3 {
        font-size: 20px;
      }

      // Adjust Quotation Element Style
      blockquote {
        margin: 30px 0;
        padding: 15px;
        border-left: 3px solid #a0a0a0;
        background-color: #22262d;
        font-weight: 500;
      }

      // Adjust List Element Style
      ol,
      ul {
        margin-left: 20px;
        padding: 0;
      }

      // Adjust Horizontal Rule style
      hr {
        //border: 1px solid #000000;
        margin: 50px 0;
      }

      // Adjust Link Element Style
      a {
        color: #4263eb;
        text-decoration: underline;
        margin: 0;
      }

      table {
        border: 1px solid rgb(226 232 240);
        border-collapse: collapse;
      }

      thead {
        color: white;
        background-color: #888888;
      }

      th, td {
        padding: 0.5rem;
      }

      td {
        border: 1px solid rgb(226 232 240);
      }

      .language-text{
        // color: rgb(239 68 68);
        // background-color: rgb(243 244 246);
        color: orangered;
        background-color: #000000;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        padding: 0.1rem 0.3rem;
      }

      // Adjust Code Style
      pre[class*='language-'] {
        margin: 30px 0;
        padding: 15px;
        font-size: 15px;

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 3px;
        }
      }

      code[class*='language-'],
      pre[class*='language-'] {
        tab-size: 2;
      }
    `


    return (
        <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
    )
}


PostContent.defaultProps = {}

export default PostContent