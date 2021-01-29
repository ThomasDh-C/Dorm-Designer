import React from 'react'
// import rawBedSvg from '../public/dormbed.svg'
import { Image } from "react-konva"
import useImage from 'use-image';

const Bed = ({ scale, imagename }) => {
    // console.log(require('../public/dormbed.svg'))
    const dormthing = 'dormbed'
    const [bedSvg] = useImage(require(`../public/${dormthing}.svg`).default)
    return (
        <Image image={bedSvg} scaleX={scale} scaleY={scale} draggable />
    )

}

export default Bed