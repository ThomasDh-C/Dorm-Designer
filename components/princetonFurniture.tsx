import React from 'react'
import { Image, Transformer } from "react-konva"
import useImage from 'use-image';

const PrincetonFurniture = ({ shapeProps, setPttopxscaler, scale, imagename, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef(null);
    const trRef = React.useRef(null);

    const path = `/${imagename}.svg`
    const [bedSvg] = useImage(path)

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    return (

        <>
            <Image
                key={shapeProps.id + "rect"}
                ref={shapeRef}
                image={bedSvg}
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
                    })
                }}
                onTransformEnd={() => {
                    const node = shapeRef.current
                    if (shapeProps.imagename === 'twentyfoot')
                        setPttopxscaler(node.scaleX() / scale) // scale is mapscale as initial scaling is 1
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
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
                    resizeEnabled={shapeProps.resizable}
                />)
            }
        </>
    )

}

export default PrincetonFurniture