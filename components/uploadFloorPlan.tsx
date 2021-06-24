import React from 'react'
// import parse from './vcd-parser'
import styled from 'styled-components'
import svgToMiniDataURI from 'mini-svg-data-uri'

const ThickBaseDiv = styled.div`
padding-top: 60px;
padding-bottom: 20px;
margin-left: auto;
margin-right: auto;
`

// currently a fake function
const parse = async (content) => {
  const regex = /^\<\?xml.*>/
  const cleaned_svg_string = content.replace(regex, '').replace('\n', '    ')
  return svgToMiniDataURI(cleaned_svg_string)
}

const UploadFloorPlan = (props) => { 
    let fileReader;

    // parse data from input and store it
    const handleFileRead = (e) => {
        const content = fileReader.result;
        parse(content)
            .then(parsedData => {
                props.setFile(parsedData)
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
        <ThickBaseDiv>
            <input type='file'
                id='file'
                accept='.svg'
                onChange={e => handleFileChosen(e.target.files[0])}
            />
        </ThickBaseDiv>)
}

export default UploadFloorPlan