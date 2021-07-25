import styled from 'styled-components'
import RoundButton from '../atoms/roundButton'

const Col = styled.div`
    position: absolute;
    top: 0;
    right: 8px;
    display: flex;
    flex-direction: column;
    
`
const Icon = styled.i`
    opacity: 0.65;
    transition: opacity 100ms ease-in-out;
`

const PaddedButton = styled(RoundButton)`
    margin-top: 8px;
    width: 35px;
    padding-top: 4px;
    padding-left: 1px;

    :hover ${Icon}{
        opacity: 1;
    }
`

const ScaleButtons = ({ stagePosScale, setPosScale, resetScale}) => {
    const resetscale = () => {
        setPosScale({
            stageScale: 1,
            stageX: 0,
            stageY: 0
        })
        resetScale()
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
        <Col>
            <PaddedButton onClick={resetscale}>
                <Icon className="fas fa-home" />
            </PaddedButton>
            <PaddedButton onClick={zoomIn}>
                <Icon className="fas fa-search-plus" />
            </PaddedButton>
            <PaddedButton onClick={zoomOut}>
                <Icon className="fas fa-search-minus" />
            </PaddedButton>
        </Col>
    )
}

export default ScaleButtons