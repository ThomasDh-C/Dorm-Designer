import { FullHeightCol, RoundedCol, Grid, Icon, CentredLabel, Divider, ShapeAddButton, Shaded } from './shapesBarstyled'
import Arc from './arc'
import { v4 as uuidv4 } from 'uuid'


const ShapesBar = ({height, shapes, setShapes, canvasCoords, floorplanunits, occupancy}) => {
    const addShape = (name) => {
        const newshape = {
                id: uuidv4(),
                shape: 'img',
                imagename: name,
                x: canvasCoords.x,
                y: canvasCoords.y,
                shapescale: 1,
        }
        setShapes(oldArray => [...oldArray, newshape])
    }

    const percentItems = (item) => {
        const count = shapes.filter(shape => shape.imagename==item).length
        if (count==0) return 3 
        else if (count>= occupancy) return 100
        else return count/occupancy*100
    }

    const isDisabled = (item)=> {
        const count = shapes.filter(shape => shape.imagename==item).length
        if (count == occupancy) return true
        else return false
    }

    return (
        <FullHeightCol>
            <RoundedCol>
                <CentredLabel>Add</CentredLabel>
                <Grid>
                    <ShapeAddButton onClick={()=>addShape('bed')} disabled={isDisabled('bed')}>
                        <Shaded />
                        <Arc percent={percentItems('bed')}/>
                        <Icon className="fas fa-bed" />
                    </ShapeAddButton>
                    <ShapeAddButton onClick={()=>addShape('dresser')} disabled={isDisabled('dresser')}>
                        <Shaded />
                        <Arc percent={percentItems('dresser')}/>
                        <Icon className="fas shapeicon dressericon" />
                    </ShapeAddButton>
                    <ShapeAddButton onClick={()=>addShape('wardrobe')} disabled={isDisabled('wardrobe')}>
                        <Shaded />
                        <Arc percent={percentItems('wardrobe')}/>
                        <Icon className="fas shapeicon wardrobeicon" />
                    </ShapeAddButton>
                    <ShapeAddButton onClick={()=>addShape('bookshelf')} disabled={isDisabled('bookshelf')}>
                        <Shaded />
                        <Arc percent={percentItems('bookshelf')} />
                        <Icon className="fas shapeicon shelficon" />
                    </ShapeAddButton>
                    <ShapeAddButton onClick={()=>addShape('desk')} disabled={isDisabled('desk')}>
                        <Shaded />
                        <Arc percent={percentItems('desk')}/>
                        <Icon className="fas shapeicon deskicon" />
                    </ShapeAddButton>
                    <ShapeAddButton onClick={()=>addShape('chair')} disabled={isDisabled('chair')}>
                        <Shaded />
                        <Arc percent={percentItems('chair')}/>
                        <Icon className="fas fa-chair" />
                    </ShapeAddButton>
                </Grid>
                <Divider />
                <ShapeAddButton style={{alignSelf: 'center'}}>
                    <Icon className="fas fa-file-upload"/>
                </ShapeAddButton>
            </RoundedCol>
        </FullHeightCol>
    )
}

export default ShapesBar