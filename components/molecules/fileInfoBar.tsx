import React from 'react'
import styled from 'styled-components'
import { colors } from '../cssVars'
import BlueButton from '../atoms/blueButton'
import InfoContainer from '../compounds/infoContainer'

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
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
    const handleSave = () => {
        db.files.update(currFile.id, currFile)
    }
    const handleShare = async () => {
        const data = await db.files.get(currFile.id)
        const json = JSON.stringify(data)
        const a = document.createElement("a")
        const file = new Blob([json], { type: "text/plain" })
        a.href = URL.createObjectURL(file)
        a.download = `${currFile.name}.json`
        a.click()
    }
    return(
        <LongRow>
                <NoMargH1>{currFile.name}</NoMargH1>
                <Row>
                    <InfoContainer scale = {currFile.scale} occupancy={currFile.occupancy}/>
                    <div>
                        <SquareButton type='button'> <UploadIcon className="fas fa-cogs"/> </SquareButton>
                        <SquareButton type='button' onClick={handleShare}> <UploadIcon className="fas fa-share-square"/> </SquareButton>
                        <SquareButton type='button' onClick={handleSave}> <UploadIcon className="fas fa-save"/> </SquareButton>
                    </div>
                    
                </Row>
            </LongRow>
    )
}

export default FileInfoBar