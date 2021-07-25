import React from 'react'
import styled from 'styled-components'
import { colors } from '../cssVars'



const MainRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    background-color: ${colors.lightBlue};
    border-radius: 4px;
    margin-top: .2rem;
    margin-bottom: .2rem;
    justify-content: space-between;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 4px;
    margin-bottom: 4px;
`



const NoMargH6 = styled.h6`
    margin-top: 0;
    margin-bottom: 0;
`


const InfoContainer = ({scale, occupancy}) =>{
    return (
        <MainRow>
            <Column style={{marginRight:'4px'}}>
                <label>Scale</label>
                <NoMargH6>{scale}'' : 1'</NoMargH6>
            </Column>
            <Column>
                <label>Occupancy</label>
                <NoMargH6>{occupancy}</NoMargH6>
            </Column>
        </MainRow>
    )
}
export default InfoContainer