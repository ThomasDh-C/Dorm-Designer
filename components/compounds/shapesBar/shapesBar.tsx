import styled from 'styled-components'
import RoundButton from '../../atoms/roundButton'
import { FullHeightCol, RoundedCol, Grid, Icon, PaddedButton, CentredLabel, Divider } from './shapesBarstyled'

import { v4 as uuidv4 } from 'uuid'


const ShapesBar = ({height, shapes, setShapes, canvasCoords, floorplanunits}) => {
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

    return (
        <FullHeightCol>
            <RoundedCol>
                <CentredLabel>Add</CentredLabel>
                <Grid>
                    <PaddedButton onClick={()=>addShape('bed')} >
                        <Icon className="fas fa-bed" />
                    </PaddedButton>
                    <PaddedButton onClick={()=>addShape('dresser')}>
                        {/* Dresser */}
                        <label>Dr</label>
                    </PaddedButton>
                    <PaddedButton onClick={()=>addShape('wardrobe')}>
                        {/* Chest */}
                        <label>Ch</label>
                    </PaddedButton>
                    <PaddedButton onClick={()=>addShape('bookshelf')}>
                        {/* Shelves */}
                        <label>Shelf</label>
                    </PaddedButton>
                    <PaddedButton onClick={()=>addShape('desk')}>
                        {/* Desk */}
                        <label>Desk</label>
                    </PaddedButton>
                    <PaddedButton onClick={()=>addShape('chair')}>
                        <Icon className="fas fa-chair" />
                    </PaddedButton>
                </Grid>
                <Divider />
                <PaddedButton style={{alignSelf: 'center'}}>
                    <Icon className="fas fa-file-upload"/>
                </PaddedButton>
            </RoundedCol>
        </FullHeightCol>
    )
}

export default ShapesBar