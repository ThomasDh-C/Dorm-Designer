import React from 'react'
import { Image } from "react-konva"
import useImage from 'use-image';

const Bed = ({ scale, imagename }) => {
    const [bedSvg] = useImage(require(`../public/${imagename}.svg`).default)
    return (
        <Image image={bedSvg} scaleX={scale} scaleY={scale} draggable />
    )

}

export default Bed