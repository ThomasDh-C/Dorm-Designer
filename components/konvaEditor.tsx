import React, { useEffect } from "react"
import { Stage, Layer, Star, Text } from "react-konva"
import useWindowDimensions from './windowSize'



const KonvaEditor = () => {
    const [stars, setStars] = React.useState([])
    const { width, height } = useWindowDimensions()
    useEffect(() => {
        setStars([...Array(2)].map((_, i) => ({
            id: i.toString(),
            x: Math.random() * width,
            y: Math.random() * height,
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

    return (
        <Stage width={width} height={height}>
            <Layer>
                <Text text="Try to drag a star" />
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
    )
}

export default KonvaEditor
