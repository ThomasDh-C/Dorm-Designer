import React from 'react'
import { Stage } from "react-konva"

const ScrollableStage = ({ width, height, stagePosScale, setPosScale, onMouseDown, onTouchStart, setCanvasCoords, children }) => {
    const stageref = React.useRef()

    const handleWheel = (e) => {
        e.evt.preventDefault()
        let scaleBy = 1.2
        if (e.evt.ctrlKey) scaleBy = 1 / 1.05
        
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

        // canvas center
        setCanvasCoords({
            x: -stage.x() / newScale + stage.width() / newScale / 2,
            y: - stage.y() / newScale + stage.height() / newScale / 2
        })
    }


    return (
        <>

            <Stage
                ref={stageref}
                width={width}
                height={height}
                x={stagePosScale.stageX}
                y={stagePosScale.stageY}
                scaleX={stagePosScale.stageScale}
                scaleY={stagePosScale.stageScale}

                draggable
                onWheel={handleWheel}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                onDragEnd={e => {

                    const stage = e.target.getStage()
                    setPosScale({
                        ...stagePosScale,
                        stageX: stage.x(),
                        stageY: stage.y(),
                    })
                }}
            >
                {children}
            </Stage>
        </>

    )
}

export default ScrollableStage