import React, { FunctionComponent } from "react"

type TextProps = {
    text: string,
    children?: React.ReactNode,
}

const Text: FunctionComponent<TextProps> = ({ text, children }) => {
    return <div>{text}</div>
}

export default Text

