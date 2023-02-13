import React from "react"
import ProfileImage from "components/main/ProfileImage"
import { md } from "../../styles/helpers/TailwindUtil"
import { IGatsbyImageData } from "gatsby-plugin-image"
import tw, {styled} from 'twin.macro';


// const Background = (props) => <div data-component={'Background'} tw={"w-full bg-[#0d1117] from-[#29323c] to-[#485563] text-white"} {...props}>{props.children}</div>
// const Wrapper = (props) => <div data-component={'Wrapper'} tw={'flex flex-col justify-center items-start my-0 mx-auto w-full h-[300px] py-0 px-3 md:(w-[768px] h-[400px])'} {...props}>{props.children}</div>
// const Title = (props) => <div data-component={'Title'} tw={'text-[1.5rem] font-bold mt-2 md:(text-[2.2rem])'} {...props}>{props.children}</div>
// const SubTitle = (props) => <div data-component={'SubTitle'} tw={'text-[1rem] font-normal md:(text-[1.25rem])'} {...props}>{props.children}</div>

const Background = styled.div`${tw`w-full bg-[#0d1117] from-[#29323c] to-[#485563] text-white`}`
const Wrapper = styled.div`${tw`flex flex-col justify-center items-start my-0 mx-auto w-full h-[300px] py-0 px-3 md:(w-[768px] h-[400px])`}`
const Title = styled.div`${tw`text-[1.5rem] font-bold mt-2 md:(text-[2.2rem])`}`
const SubTitle = styled.div`${tw`text-[1rem] font-normal md:(text-[1.25rem])`}`

// const Background = (props) => <div className={"w-full bg-[#0d1117] from-[#29323c] to-[#485563] text-white"}>{props.children}</div>
// const Wrapper = (props) => <div className={`flex flex-col justify-center items-start my-0 mx-auto w-full h-[300px] py-0 px-3 ${md("w-[768px] h-[400px]")} `}>{props.children}</div>
// const Title = (props) => <div className={`text-[1.5rem] font-bold mt-2 ${md("text-[2.2rem]")}`}>{props.children}</div>
// const SubTitle = (props) => <div className={`text-[1rem] font-normal ${md("text-[1.25rem]")}`}>{props.children}</div>



export interface IIntroductionProps {
    profileImage: IGatsbyImageData,
    //children?: React.ReactNode,
}


const Introduction = (
    {
        profileImage
    }: IIntroductionProps
) => {

    return (
        <Background data-component={'Background'}>
            <Wrapper data-component={'Wrapper'}>
                <ProfileImage profileImage={profileImage} />
                <div>
                    <Title data-component={'Title'}>전민배의 블로그</Title>
                    <SubTitle data-component={'SubTitle'}>노력</SubTitle>
                </div>
            </Wrapper>
        </Background>
    )
}


Introduction.defaultProps = {}

export default Introduction