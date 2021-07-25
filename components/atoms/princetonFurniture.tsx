import React from 'react'
import { Image, Transformer } from "react-konva"
import useImage from 'use-image'
import svgdata from '../svgdata.json'


const PrincetonFurniture = ({ shapeProps, mapScale, scale, imagename, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef(null)
    const trRef = React.useRef(null)
    const path = `/${imagename}.svg`
    const [imageSvg] = useImage(path)
    // const [imageSvg] = useImage(svgdata[imagename])
    
    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current])
            trRef.current.getLayer().batchDraw()
        }
    }, [isSelected])

    return (
        <> 
        <Image
                key={shapeProps.id + "rect"}
                ref={shapeRef}
                image={imageSvg}
                scaleX={scale}
                scaleY={scale}
                onClick={onSelect}
                onTap={onSelect}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                        relx: e.target.x()/ mapScale,
                        rely: e.target.y()/ mapScale,
                    })
                }}
                onTransformEnd={() => {
                    const node = shapeRef.current
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        relx: node.x()/ mapScale,
                        rely: node.y()/ mapScale,
                        rotation: node.rotation()
                    })
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    key={shapeProps.id + "transformer"}
                    rotationSnaps={[0, 90, 180, 270]}
                    rotationSnapTolerance={20}
                    resizeEnabled={shapeProps.resizable || false}
                />)
            }
        </>
        )
        
    

}

export default PrincetonFurniture