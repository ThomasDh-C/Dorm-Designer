import React from 'react'
import { Stage } from "react-konva"

const ScrollableStage = ({ width, height, onMouseDown, onTouchStart, scaleToggle, children }) => {
    const [stagePosScale, setPosScale] = React.useState({
        stageScale: 1,
        stageX: 0,
        stageY: 0
    })

    React.useEffect(() => {
        setPosScale({
            stageScale: 1,
            stageX: 0,
            stageY: 0
        })
    }, [scaleToggle])


    const handleWheel = (e) => {
        e.evt.preventDefault()
        const scaleBy = 1.2

        // calculate new scale
        const stage = e.target.getStage()
        const oldScale = stage.scaleX()
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        }
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy
        stage.scale({ x: newScale, y: newScale })

        // set scale
        setPosScale({
            stageScale: newScale,
            stageX:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            stageY:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        })
    }

    return (
        <>

            <Stage
                width={width}
                height={height}
                onWheel={handleWheel}
                scaleX={stagePosScale.stageScale}
                scaleY={stagePosScale.stageScale}
                x={stagePosScale.stageX}
                y={stagePosScale.stageY}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
            >
                {children}
            </Stage>
        </>

    )
}

export default ScrollableStage