import React from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import "twin.macro"

export interface IProfileImageProps {
    profileImage: IGatsbyImageData
    //children?: React.ReactNode,
}

const ProfileImage = (
    {
        profileImage
    }: IProfileImageProps
) => {

    return (
        <GatsbyImage image={profileImage}
                     alt={"profile image"}
                     tw={"mb-5 rounded-full md:(w-[7.5rem] h-[7.5rem]) w-[5rem] h-[5rem]"}
        />
    )
}


ProfileImage.defaultProps = {}

export default ProfileImage