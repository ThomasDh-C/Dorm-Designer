import React, { useEffect } from "react"
import { Layer, Image } from "react-konva"
import useDimensions from 'react-use-dimensions';
import KonvaRectangle from './konvaRectangle'
import useImage from 'use-image';
import styled from 'styled-components'
import ScrollableStage from './scrollableStage'
import PrincetonFurniture from './princetonFurniture'
import { initialShapes, standardFurniture } from './shapes'
import ControlPanel from './controlPanel'



const FullWidthContainer = styled.div`
    width: 100%; 
    height: 60vh; 
    overflow: hidden;
    border: 2px solid black;
    border-radius: 3px; 
    margin-top: 4px;
`

const KonvaEditor = ({ activeStep, file }) => {
    const [ref, { width, height }] = useDimensions()            // get canvas dimensions
    const [scale, setScale] = React.useState(0.1)               // scale down map to fill canvas
    const [pttopxscaler, setPttopxscaler] = React.useState(1)   // ratio of pixels to ft
    const [shapes, setShapes] = React.useState(initialShapes)   // shapes array
    const [selectedShapeId, selectShapeId] = React.useState(0)  // selected shape
    const [stagePosScale, setPosScale] = React.useState({
        stageScale: 1,
        stageX: 0,
        stageY: 0
    }) // scale of stage and stage x and y position ... updated on stage scroll or drag events
    const [canvasCoords, setCanvasCoords] = React.useState({ x: 0, y: 0 }) // centre of canvas ... updated on same events as above

    const floorplan = React.useRef(null);
    const [floorplanSvg] = useImage(file)


    // deselect when clicked on empty area
    const checkDeselect = (e) => {
        const clickedOnEmpty = (e.target.getLayer() === floorplan.current.getLayer()) || (e.target === e.target.getStage())
        if (clickedOnEmpty) {
            selectShapeId(null)
        }
    }

    // scale is dim_floorplan/ dim_container
    // update position of all shapes to be same relative to floorplan
    // for some reason also have to also scale drawn objects?
    useEffect(() => {
        const Xscale = width / floorplan?.current?.attrs?.image?.width
        const Yscale = height / floorplan?.current?.attrs?.image?.height
        const minscale = Math.min(Xscale, Yscale)
        if (!isNaN(minscale)) {
            const r = minscale / scale
            setScale(minscale)
            setShapes(shapes.map((shape) => {
                if (shape.shape !== 'img') return { ...shape, x: shape.x * r, y: shape.y * r, width: shape?.width * r, height: shape?.height * r }
                else return { ...shape, x: shape.x * r, y: shape.y * r }
            }))
        }

    }, [width, height, floorplan, floorplanSvg])

    // Step 0: scale the scale setter img to the right size
    // Step 1: upload all standard shapes and save relative coords for local storage
    useEffect(() => {
        if (activeStep == 0) setShapes(initialShapes)
        if (activeStep == 1) {
            // standardFurniture returns a array of shapes if passed x and y coords (centre of screen)
            setShapes(standardFurniture(canvasCoords.x, canvasCoords.y).map((item, id) => {
                return ({
                    id: id,
                    shapescale: pttopxscaler / 10,
                    relativex: item.x / floorplan?.current.width(),
                    relativey: item.y / floorplan?.current.height(),
                    ...item,
                })
            }))
        }
    }, [activeStep])

    
    localStorage.setItem('shapesdata', JSON.stringify(shapes))

    return (
        <>
            <ControlPanel stagePosScale={stagePosScale} setPosScale={setPosScale} />
            <FullWidthContainer ref={ref}>
                <ScrollableStage width={width} height={height} stagePosScale={stagePosScale} setPosScale={setPosScale} onMouseDown={checkDeselect} onTouchStart={checkDeselect} setCanvasCoords={setCanvasCoords}>
                    <Layer>
                        <Image ref={floorplan} image={floorplanSvg} scaleX={scale} scaleY={scale}/>
                    </Layer>
                    <Layer>
                        {shapes.map((props, i) => {
                            if (props.shape == 'rect') return (
                                <KonvaRectangle
                                    key={props.id}
                                    shapeProps={props}
                                    isSelected={props.id === selectedShapeId}
                                    onSelect={() => { selectShapeId(props.id) }}
                                    onChange={(newAttrs) => {
                                        const tempshapes = shapes.slice()
                                        tempshapes[i] = newAttrs
                                        setShapes(tempshapes)
                                    }}
                                />
                            )
                            if (props.shape == 'img') return (
                                <PrincetonFurniture
                                    key={props.id}
                                    shapeProps={props}

                                    setPttopxscaler={setPttopxscaler}
                                    scale={scale * props.shapescale}
                                    imagename={props.imagename}
                                    isSelected={props.id === selectedShapeId}
                                    onSelect={() => { selectShapeId(props.id) }}
                                    onChange={(newAttrs) => {
                                        const tempshapes = shapes.slice()
                                        tempshapes[i] = newAttrs
                                        setShapes(tempshapes)
                                    }}
                                />
                            )
                        })}

                    </Layer>
                </ScrollableStage>
            </FullWidthContainer>
        </>
    )
}

export default KonvaEditor
