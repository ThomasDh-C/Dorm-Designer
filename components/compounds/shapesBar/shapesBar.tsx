import { FullHeightCol, RoundedCol, Grid, Icon, CentredLabel, Divider, SillyButton } from './shapesBarstyled'
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
                shapescale: floorplanunits,
        }
        setShapes(oldArray => [...oldArray, newshape])
    }

    const percentItems = (item) => {
        const count = shapes.filter(shape => shape.imagename==item).length
        if (count==0) return 3 
        else if (count>= occupancy) return 100
        else return count/occupancy*100
    }

    return (
        <FullHeightCol>
            <RoundedCol>
                <CentredLabel>Add</CentredLabel>
                <Grid>
                    <SillyButton onClick={()=>addShape('bed')} >
                        <Arc percent={percentItems('bed')}/>
                        <Icon className="fas fa-bed" />
                    </SillyButton>
                    <SillyButton onClick={()=>addShape('dresser')}>
                        <Arc percent={percentItems('dresser')}/>
                        <Icon className="fas shapeicon dressericon" />
                    </SillyButton>
                    <SillyButton onClick={()=>addShape('wardrobe')}>
                        {/* wardrobe */}
                        <Arc percent={percentItems('wardrobe')}/>
                        <Icon className="fas shapeicon wardrobeicon" />
                    </SillyButton>
                    <SillyButton onClick={()=>addShape('bookshelf')}>
                        {/* Shelves */}
                        <Arc percent={percentItems('bookshelf')}/>
                        <Icon className="fas shapeicon shelficon" />
                    </SillyButton>
                    <SillyButton onClick={()=>addShape('desk')}>
                        {/* Desk */}
                        <Arc percent={percentItems('desk')}/>
                        <Icon className="fas shapeicon deskicon" />
                    </SillyButton>
                    <SillyButton onClick={()=>addShape('chair')}>
                        <Arc percent={percentItems('chair')}/>
                        <Icon className="fas fa-chair" />
                    </SillyButton>
                </Grid>
                <Divider />
                <SillyButton style={{alignSelf: 'center'}}>
                    <Icon className="fas fa-file-upload"/>
                </SillyButton>
            </RoundedCol>
        </FullHeightCol>
    )
}

export default ShapesBar