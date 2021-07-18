import React, { useEffect, useRef } from "react"
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

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
}
const setInitShapes = (shapes, mapScale) => {
    return shapes.map((shape) => {return {...shape, x: shape.relx*mapScale, y: shape.rely*mapScale}})
}

const KonvaEditor = ({ file , floorplanunits, occupancy, currFile, setCurrFile}) => {
    const [containerRef, { width, height }] = useDimensions()                    // get canvas dimensions
    
    const [mapScale, setMapScale] = React.useState(1)               // scale down/up map to fill canvas
    const [shapes, setShapes] = React.useState< Array<Shape> | undefined> (setInitShapes(currFile.shapes, mapScale))            // shapes array
    const [selectedShapeId, selectShapeId] = React.useState(0)                          // selected shape
    const [stagePosScale, setPosScale] = React.useState({
        stageScale: 1,
        stageX: 0,
        stageY: 0
    })            // scale of stage and stage x and y position ... updated on stage scroll or drag events
    const [canvasCoords, setCanvasCoords] = React.useState({ x: 0, y: 0 }) // centre of canvas ... updated on same events as above

    const floorplanRef = React.useRef(null)
    const prevWidth = usePrevious(width / floorplanRef?.current?.attrs?.image?.width)
    const prevHeight = usePrevious(height / floorplanRef?.current?.attrs?.image?.height)
    const [floorplanSvg] = useImage(file)



    // deselect when clicked on empty area
    const checkDeselect = (e) => {
        const clickedOnEmpty = (e.target.getLayer() === floorplanRef.current.getLayer()) || (e.target === e.target.getStage())
        if (clickedOnEmpty) selectShapeId(null)
    }

    useEffect(()=>setCurrFile((old)=>{
        return {...old, shapes: shapes}
    }),[shapes])

    // scale is dim_floorplan/ dim_container
    // update position of all shapes in shape State to be same relative to floorplan
    // have to change width and height of reg shapes, images relativescale doesn't change so only position
    const updateScale = () => {
        const Xscale = width / floorplanRef?.current?.attrs?.image?.width
        const Yscale = height / floorplanRef?.current?.attrs?.image?.height
        const minscale = Math.min(Xscale, Yscale)

        if (!isNaN(minscale)) {
            const r = minscale / mapScale
            setMapScale(minscale)
            setShapes(shapes.map((shape) => {
                if (shape.shape !== 'img') return { ...shape, x: shape.x * r, y: shape.y * r, width: shape?.width * r, height: shape?.height * r }
                else return { ...shape, x: shape.x * r, y: shape.y * r, relx: shape.x * r/minscale, rely: shape.y/minscale}
            }))
        }
    }
    useEffect(() => {
        const Xscale = width / floorplanRef?.current?.attrs?.image?.width
        const Yscale = height / floorplanRef?.current?.attrs?.image?.height
        if((!prevWidth && Xscale) && (!prevHeight && Yscale)){
            updateScale()
        }
    }, [prevWidth, prevHeight])
    return (
        <>
            <FullWidthContainer ref={containerRef}>
                <ScrollableStage width={width} height={height} stagePosScale={stagePosScale} setPosScale={setPosScale} onMouseDown={checkDeselect} onTouchStart={checkDeselect} setCanvasCoords={setCanvasCoords}>
                    <Layer>
                        <Image ref={floorplanRef} image={floorplanSvg} scaleX={mapScale} scaleY={mapScale}/>
                    </Layer>
                    <Layer>
                        {shapes.map((props, i) => {
                            if (props.shape == 'img') return (
                                <PrincetonFurniture
                                    key={props.id}
                                    shapeProps={props}
                                    mapScale={mapScale}
                                    scale={mapScale * props.shapescale*floorplanunits}
                                    imagename={props.imagename}
                                    isSelected={i === selectedShapeId}
                                    onSelect={() => { selectShapeId(i) }}
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
                <ScaleButtons stagePosScale={stagePosScale} setPosScale={setPosScale} resetScale={updateScale} />
                <ShapesBar shapes={shapes} setShapes={setShapes} canvasCoords={canvasCoords} occupancy={occupancy} mapScale={mapScale}/>
            </FullWidthContainer>
        </>
    )
}

export default KonvaEditor