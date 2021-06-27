import React from 'react'
import styled from 'styled-components'
import svgToMiniDataURI from 'mini-svg-data-uri'
import {colors} from "../../cssVars"

const Button = styled.button`
    width: 100%;
    height: 100%;
    background-color: ${colors.lightBlue};
    border: none;
    border-radius: 5px;
    padding: 8px;

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

const parse = async (content) => {
  return svgToMiniDataURI(content)
}

const UploadFloorPlan = ({setFile}) => { 
    const hiddenFileInput = React.useRef(null)
    let fileReader;

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    }
    
    // parse data from input and store it
    const handleFileRead = (e) => {
        const content = fileReader.result;
        parse(content)
            .then(parsedData => {
                setFile((oldFile)=> {
                    return {...oldFile, floorplan: parsedData}
                })
            })
            .catch(err => {
                console.error(err);
            })
    }

    // parse raw file and send it to parser
    const handleFileChosen = (file) => {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    }

    return (
        <SmallFloorplan>
            <Button type="button" onClick={handleClick}>
                <NoSpaceP marginBottom='8px'>Upload floor plan</NoSpaceP>
                <UploadIcon className="fas fa-file-upload"/>
            </Button>
            {/* below here is invisible */}
            <input type='file'
                ref={hiddenFileInput}
                accept='.svg'
                onChange={e => handleFileChosen(e.target.files[0])}
                style={{display: 'none'}}
            />
        </SmallFloorplan>)
}

export default UploadFloorPlan