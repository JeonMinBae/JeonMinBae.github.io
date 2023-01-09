import React from "react"
import { Link } from "gatsby"
import { lg } from "../styles/helpers/TailwindUtil"

const NotFoundPageWrapper = (props) => <div className={`h-screen flex flex-col justify-center items-center`} {...props}>{props.children}</div>
const NotFoundText = (props) => <div className={`text-[9.5rem] font-extrabold ${lg('text-8xl')} `} {...props}>{props.children}</div>
const NotFoundDescription = (props) => <div {...props}>{props.children}</div>
const GoToMainButton = (props) => <Link className={`mt-7 text-xl underline `} {...props}>{props.children}</Link>


export interface INotFoundProps {
    //children?: React.ReactNode,
}

const NotFound = ({}: INotFoundProps) => {

    return (
        <NotFoundPageWrapper>
            {/*<GlobalStyle />*/}
            <NotFoundText>404</NotFoundText>
            <NotFoundDescription>
                찾을 수 없는 페이지입니다. <br />
                다른 콘텐츠를 보러 가보시겠어요?
            </NotFoundDescription>
            <GoToMainButton to="/">메인으로</GoToMainButton>
        </NotFoundPageWrapper>
    )
}


NotFound.defaultProps = {}

export default NotFound