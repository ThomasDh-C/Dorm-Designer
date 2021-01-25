import React, { useEffect, useRef, useState } from "react"
import { Stage, Layer, Star, Text } from "react-konva"
import { useWindowDimensions, useRefDimensions } from './windowSize'
import useDimensions from 'react-use-dimensions';



const KonvaEditor = () => {
    const componentRef = useRef()
    const [ref, { width, height }] = useDimensions();
    // const [width, setWidth] = useState(0)
    // const [height, setHeight] = useState(0)

    // useEffect(() => {
    //     const width = (componentRef.current.offsetWidth)
    //     const height = (componentRef.current.offsetHeight)

    // }, [componentRef])

    const [stars, setStars] = React.useState([])

    useEffect(() => {
        setStars([...Array(2)].map((_, i) => ({
            key: i.toString(),
            id: i.toString(),
            x: Math.random() * 800,
            y: Math.random() * 800,
            rotation: Math.random() * 180,
            isDragging: false
        })))
    }, [])

    const handleDragStart = (e) => {
        const id = e.target.id()
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: star.id === id
                }
            })
        )
    }
    const handleDragEnd = (e) => {
        setStars(
            stars.map((star) => {
                return {
                    ...star,
                    isDragging: false
                }
            })
        )
    }

    console.log(width)
    return (
        <div ref={ref} style={{ width: "100%", height: '100vh', border: "2px solid black", borderRadius: "3px", marginTop: "16px" }}>
            <Stage width={width} height={height}>
                <Layer>
                    {stars.map((star) => (
                        <Star
                            key={star.key}
                            id={star.id}
                            x={star.x}
                            y={star.y}
                            numPoints={5}
                            innerRadius={20}
                            outerRadius={40}
                            fill='black'
                            opacity={1}
                            draggable
                            rotation={star.rotation}
                            scaleX={star.isDragging ? 1.2 : 1}
                            scaleY={star.isDragging ? 1.2 : 1}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>

    )
}

export default KonvaEditor
