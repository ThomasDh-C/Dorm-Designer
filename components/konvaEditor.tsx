import React, { useEffect, useRef } from "react"
import { Stage, Layer, Star, Text } from "react-konva"
import { useWindowDimensions, useRefDimensions } from './windowSize'



const KonvaEditor = () => {
    const componentRef = useRef()
    const { width, height } = useRefDimensions(componentRef)
    const [stars, setStars] = React.useState([])

    useEffect(() => {
        setStars([...Array(2)].map((_, i) => ({
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
        <div ref={componentRef} style={{ width: "100%", height: '100vh' }}>
            <Stage width={width} height={height}>
                <Layer>
                    {stars.map((star) => (
                        <Star
                            key={star.id}
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
