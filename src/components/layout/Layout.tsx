import React from "react"
import { GlobalStyles } from 'twin.macro'
import {StyledEngineProvider} from "@mui/styled-engine";



export interface ILayoutProps {
    children: React.ReactNode,
}

const Layout = ({children, ...rest}: ILayoutProps) => {



    return (
        <StyledEngineProvider injectFirst>
            <div data-component={'Layout'} {...rest}>
                <GlobalStyles />
                {children}
            </div>
        </StyledEngineProvider>
    )
}


Layout.defaultProps = {}

export default Layout