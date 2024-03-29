import React from 'react'
import { Rect, Transformer } from 'react-konva'



const KonvaRectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef(null)
    const trRef = React.useRef(null)

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current])
            trRef.current.getLayer().batchDraw()
        }
    }, [isSelected])

    return (
        <>
            <Rect
                key={shapeProps.id + "rect"}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
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
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current
                    const scaleX = node.scaleX()
                    const scaleY = node.scaleY()

                    // we will reset it back
                    node.scaleX(1)
                    node.scaleY(1)
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    })
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    key={shapeProps.id + "transformer"}
                    rotationSnaps={[0, 90, 180, 270]}
                    rotationSnapTolerance={20}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox
                        }
                        return newBox
                    }}
                />)
            }
        </>
    )
}


export default KonvaRectangle