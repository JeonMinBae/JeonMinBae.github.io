import React, { createRef, useEffect } from "react"



const src = 'https://utteranc.es/client.js'
const repo = 'JeonMinBae/JeonMinBae.github.io'



export interface ICommentWidgetProps {
    //children?: React.ReactNode,
}

const CommentWidget = ({}: ICommentWidgetProps) => {
    const element = createRef<HTMLDivElement>()

    useEffect(() => {
        if (element.current === null) return

        const utterances: HTMLScriptElement = document.createElement('script')

        const attributes: {
            src: string
            repo: string
            'issue-term': string
            label: string
            theme: string
            crossorigin: string
            async: string
        } = {
            src,
            repo,
            'issue-term': 'pathname',
            label: 'Comment',
            theme: `github-dark`,
            crossorigin: 'anonymous',
            async: 'true',
        }

        Object.entries(attributes).forEach(([key, value]) => {
            utterances.setAttribute(key, value)
        })

        element.current.appendChild(utterances)
    }, [])

    return <div className={'w-full py-5'} ref={element} />
}


CommentWidget.defaultProps = {}

export default CommentWidget