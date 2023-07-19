import React from "react"
import { Helmet } from "react-helmet"
import Footer from "components/common/Footer"
import SideMenu from "components/common/SideMenu";
import tw, {styled} from "twin.macro";


const Container = styled.main`${tw`flex flex-col items-center h-full text-[#c5c6c7]`}`;


export interface IContainerProps {
    title: string
    description: string
    url: string
    image: string
    children?: React.ReactNode,
}

const Template = (
    {
        title,
        description,
        url,
        image,
        children
    }: IContainerProps
) => {

    return (
        <Container data-component={'Container'}>
            <Helmet>
                <html lang="ko" />
                <title>{title ||"JeonMinBae's Blog"}</title>

                <meta name="description" content="많은 배움이 필요한 개발자입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />
                <meta property="og:site_name" content={title} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:site" content="Hardy" />
                <meta name="twitter:creator" content="Hardy" />

                <meta name="google-site-verification" content="-D8_ZMKNzbPlcFO6UHuFoET6K1MHECG1bP-9_7mkEko" />
                <meta name="naver-site-verification" content="42e87f7e5eec3000385ee0aa614ae8f4e39977f2" />

                <html lang={"ko"} />

            </Helmet>
            <SideMenu/>
            {children}
            <Footer />
        </Container>
    )
}


Template.defaultProps = {}

export default Template