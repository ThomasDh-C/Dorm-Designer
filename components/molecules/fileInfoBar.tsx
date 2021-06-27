import React from 'react'
import styled from 'styled-components'
import { colors } from '../cssVars'

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

const InfoContainer = styled(Row)`
    background-color: ${colors.lightBlue};
    border-radius: 4px;
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
    padding-bottom: 1rem;
    padding-top: 3.052rem;
`

const NoMargH1 = styled.h1`
    margin-top: 0;
    margin-bottom: 0;
`
const NoMargH6 = styled.h6`
    margin-top: 0;
    margin-bottom: 0;
`

const UploadIcon = styled.i`
    font-size: 1.2rem;
`
const SquareButton = styled.button`
    height: 54px;
    width: 54px;
    margin-left: 8px;
`

const FileInfoBar = ({currFile, setCurrFile}) => {
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
                    <SquareButton type='button'> <UploadIcon className="fas fa-cogs"/> </SquareButton>
                    <SquareButton type='button'> <UploadIcon className="fas fa-share-square"/> </SquareButton>
                    <SquareButton type='button'> <UploadIcon className="fas fa-save"/> </SquareButton>
                </Row>
            </LongRow>
    )
}

export default FileInfoBar