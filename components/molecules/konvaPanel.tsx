import React, { useEffect } from "react"
import { Layer, Image } from "react-konva"
import useDimensions from 'react-use-dimensions';
import useImage from 'use-image';
import styled from 'styled-components'
import ScrollableStage from '../atoms/scrollableStage'
import PrincetonFurniture from '../atoms/princetonFurniture'
import { Shape } from '../atoms/shapes'
import ScaleButtons from '../compounds/scaleButtons'
import ShapesBar from "../compounds/shapesBar/shapesBar";



const FullWidthContainer = styled.div`
    position: relative;
    width: 100%; 
    height: 60vh; 
    overflow: hidden;
    border: 2px solid black;
    border-radius: 3px; 
    margin-top: 4px;
`

const KonvaEditor = ({ file , floorplanunits}) => {
    const [ref, { width, height }] = useDimensions()            // get canvas dimensions
    const [mapScale, setMapScale] = React.useState(0.1)               // scale down map to fill canvas
    const [shapes, setShapes] = React.useState< Array<Shape> | undefined> ([])   // shapes array
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

    // ---- TODO: run this normally whenver hit home button (nested callback?)
    // scale is dim_floorplan/ dim_container
    // update position of all shapes in shape State to be same relative to floorplan
    // have to change width and height of reg shapes, images relativescale doesn't change so only position
    useEffect(() => {
        const Xscale = width / floorplan?.current?.attrs?.image?.width
        const Yscale = height / floorplan?.current?.attrs?.image?.height
        const minscale = Math.min(Xscale, Yscale)
        if (!isNaN(minscale)) {
            const r = minscale / mapScale
            setMapScale(minscale)
            setShapes(shapes.map((shape) => {
                if (shape.shape !== 'img') return { ...shape, x: shape.x * r, y: shape.y * r, width: shape?.width * r, height: shape?.height * r }
                else return { ...shape, x: shape.x * r, y: shape.y * r }
            }))
        }

    }, [floorplanSvg])

    return (
        <>
            <FullWidthContainer ref={ref}>
                <ScrollableStage width={width} height={height} stagePosScale={stagePosScale} setPosScale={setPosScale} onMouseDown={checkDeselect} onTouchStart={checkDeselect} setCanvasCoords={setCanvasCoords}>
                    <Layer>
                        <Image ref={floorplan} image={floorplanSvg} scaleX={mapScale} scaleY={mapScale}/>
                    </Layer>
                    <Layer>
                        {shapes.map((props, i) => {
                            if (props.shape == 'img') return (
                                <PrincetonFurniture
                                    key={props.id}
                                    shapeProps={props}
                                    mapScale={mapScale}
                                    scale={mapScale * props.shapescale}
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
                <ScaleButtons stagePosScale={stagePosScale} setPosScale={setPosScale} />
                <ShapesBar height={height} shapes={shapes} setShapes={setShapes} canvasCoords={canvasCoords} floorplanunits={floorplanunits}/>
            </FullWidthContainer>
        </>
    )
}

export default KonvaEditor