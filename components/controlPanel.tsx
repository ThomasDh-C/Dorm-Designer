import React from 'react'
import styled from 'styled-components'
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { MdPanTool, MdRotateRight } from 'react-icons/md'
import { Button } from 'antd'

const Row = styled.div`
    width: 100%;
    display: flex;
    margin-top: 16px;
    padding-top: 4px;
    justify-content: space-between;
    border: grey 2px solid;
    border-bottom: none;
    border-radius: 3px 3px 0 0; 
`

const Halfwidth = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    padding: 8px 4px 8px 4px;
`


const CustomButton = styled(Button)`
    padding: 0 16px 0 16px;
`


const ControlPanel = ({ stagePosScale, setPosScale }) => {
    const resetscale = () => {
        setPosScale({
            stageScale: 1,
            stageX: 0,
            stageY: 0
        })
    }

    const zoomIn = () => {
        setPosScale({
            ...stagePosScale,
            stageScale: stagePosScale.stageScale * 1.2,
        })
    }

    const zoomOut = () => {
        setPosScale({
            ...stagePosScale,
            stageScale: stagePosScale.stageScale / 1.2,
        })
    }
    return (
        <Row>
            <Halfwidth style={{ borderRight: "grey 2px solid" }}>
                <p><AiOutlineZoomIn />: Scroll or Pinch to zoom</p>
                <p><MdPanTool />: Drag to pan</p>
                <p><MdRotateRight />: Click on object to rotate</p>
            </Halfwidth>
            <Halfwidth>
                <CustomButton onClick={resetscale}>Reset Zoom</CustomButton>
                <CustomButton onClick={zoomIn}><AiOutlineZoomIn /> Zoom in</CustomButton>
                <CustomButton onClick={zoomOut}><AiOutlineZoomOut /> Zoom out</CustomButton>
            </Halfwidth>


        </Row>
    )
}


export default ControlPanel