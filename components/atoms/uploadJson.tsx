import React from 'react'
import styled from 'styled-components'
import Ajv from 'ajv'
import fileSchema from './fileSchema.json'
import { useRouter } from 'next/router'
import BlueButton from './blueButton'

import { v4 as uuidv4 } from 'uuid'

const Button = styled(BlueButton)`
    width: 100%;
    height: 100%;
    max-height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const UploadIcon = styled.i`
    font-size: 3rem;
`

const NoSpaceP = styled.p`
    margin-bottom: 8px;
`

const SmallFloorplan = styled.div`
    flex-basis: 100%;
    flex-grow: 1;
    padding-right: 8px;
`

const SmallImage = styled.img`
    max-width: 65%;
    width: auto;
    max-height: 80%;
`

const UploadJson = ({setFile, db}) => { 
    const hiddenFileInput = React.useRef(null)
    const [localFile, setLocalFile] = React.useState<string | undefined>('')
    const router = useRouter()
    let fileReader

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click()
    }
    
    // parse data from input and store it
    const handleFileRead = (e) => {
        const content = fileReader.result;
        const file = JSON.parse(content)
        const ajv = new Ajv()
        const schema = fileSchema
        var validator = ajv.compile(schema);
        if (!validator(file)) {
            console.log(validator.errors)
            // do this better
        }
        else {
            file.id = uuidv4()
            setFile(file)
            db.files.add(file)
            router.push('./'+ file.id)
        }
    }

    // parse raw file and send it to parser
    const handleFileChosen = (file) => {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    }

    return (
        <SmallFloorplan>
            <Button onClick={handleClick}>
                {localFile ? 
                <>
                    <NoSpaceP marginBottom='8px'>Replace floor plan</NoSpaceP>
                    {/* <SmallImage src={localFile} /> */}
                </>
                :
                <>
                    <NoSpaceP marginBottom='8px'>Upload JSON</NoSpaceP>
                    <UploadIcon className="fas fa-file-upload"/>
                </>
                }
            </Button>
            {/* below here is invisible */}
            <input type='file'
                ref={hiddenFileInput}
                accept='.json'
                onChange={e => handleFileChosen(e.target.files[0])}
                style={{display: 'none'}}
            />
        </SmallFloorplan>)
}

export default UploadJson