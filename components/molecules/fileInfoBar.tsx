import React from 'react'
import styled from 'styled-components'
import { colors } from '../cssVars'
import BlueButton from '../atoms/blueButton'

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

const InfoContainer = styled(Row)`
    background-color: ${colors.lightBlue};
    border-radius: 4px;
    margin-top: .2rem;
    margin-bottom: .2rem;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 4px;
    margin-bottom: 4px;
`

const LongRow = styled(Row)`
    width: 100%;
    justify-content: space-between;
    padding-bottom: .8rem;
    // padding-top: 2.852rem;
`

const NoMargH1 = styled.h1`
    margin-top: .2rem;
    margin-bottom: .2rem;
`
const NoMargH6 = styled.h6`
    margin-top: 0;
    margin-bottom: 0;
`

const UploadIcon = styled.i`
    font-size: 1.2rem;
`
const SquareButton = styled(BlueButton)`
    height: 54px;
    width: 54px;
    margin-left: 8px;
    margin-top: .2rem;
    margin-bottom: .2rem;
`

const FileInfoBar = ({currFile, setCurrFile, db}) => {
    const handleSave = () =>{
        console.log(currFile)
        db.files.update(currFile.id, currFile)
    }
    return(
        <LongRow>
                <NoMargH1>{currFile.name}</NoMargH1>
                <Row>
                    <InfoContainer>
                        <Column style={{marginRight:'4px'}}>
                            <label>Scale</label>
                            <NoMargH6>{currFile.scale}'' : 1'</NoMargH6>
                        </Column>
                        <Column>
                            <label>Occupancy</label>
                            <NoMargH6>{currFile.occupancy}</NoMargH6>
                        </Column>
                    </InfoContainer>
                    <div>
                        <SquareButton type='button'> <UploadIcon className="fas fa-cogs"/> </SquareButton>
                        <SquareButton type='button'> <UploadIcon className="fas fa-share-square"/> </SquareButton>
                        <SquareButton type='button' onClick={handleSave}> <UploadIcon className="fas fa-save"/> </SquareButton>
                    </div>
                    
                </Row>
            </LongRow>
    )
}

export default FileInfoBar