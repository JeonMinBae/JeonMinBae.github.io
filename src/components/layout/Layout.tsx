import React from "react"
import { GlobalStyles } from 'twin.macro'



export interface ILayoutProps {
    children: React.ReactNode,
}

const Layout = ({children, ...rest}: ILayoutProps) => {

    return (
        <div data-component={'Layout'} {...rest}>
            <GlobalStyles />
            {children}
        </div>
    )
}


Layout.defaultProps = {}

export default Layout