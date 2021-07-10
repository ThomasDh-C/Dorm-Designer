import { listeners } from "cluster";
import styled from 'styled-components'

const Circle = styled.circle`
    stroke: lightgreen;
    stroke-linecap: round;

    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
`
const CustomSvg = styled.svg`
    position: absolute;
    left: 0;
    top: 0;
`

const Arc = ({percent}) => {
    const stroke = 2.5
    const radius = 20

    const normalizedRadius = radius - stroke/2
    const _circumference = normalizedRadius * 2 * Math.PI
    const strokedsa = '' + _circumference + ' '+ _circumference
    const strokeoffset = _circumference - (percent / 100 * _circumference)
    return (
        <>
            <CustomSvg height={radius * 2} width={radius * 2}>
                <Circle
                    style={{'strokeDashoffset': strokeoffset, 'strokeDasharray': strokedsa, 'strokeWidth': stroke, 'r':normalizedRadius}}
                    strokeoffset={strokeoffset}
                    strokedsa = {strokedsa}
                    stroke={stroke}
                    normalizedRadius={normalizedRadius}
                    radius={radius}
                    fill="transparent"
                    cx={radius}
                    cy={radius}
                >
                </Circle>
            </CustomSvg>
        </>
        
    )
} 

export default Arc