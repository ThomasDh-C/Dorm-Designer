import styled from 'styled-components'
import RoundButton from '../../atoms/roundButton'

export const FullHeightCol = styled.div`
    position: absolute;
    top: 0;
    left: 8px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const RoundedCol = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: white;
    box-shadow: 1px 1px 3px 4px rgba(218, 223, 225, .7);
    border-radius: var(--border-radius);
    padding: 4px 4px 8px 4px;
`

export const Grid = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, auto);
    column-gap: 8px;
`

export const Icon = styled.i`
    opacity: 0.65;
    transition: opacity 100ms ease-in-out;
`

export const PaddedButton = styled(RoundButton)`
    position: relative;
    margin-top: 8px;
    width: 40px;
    padding-top: 4px;
    padding-left: 1px;
    border: solid 2px red;
    box-shadow: 2px 3px 3px 2px rgba(218, 223, 225, .7);
    :active, :hover {
        box-shadow: 1px 2px 1px 1px rgba(218, 223, 225, .7);
    }

    :hover ${Icon}{
        opacity: 1;
    }
`

export const SillyButton = styled.button`
    position: relative;
    border-radius: 10000px;
    margin-top: 8px;
    width: 40px;
    height: 40px;
    // padding-top: 4px;
    // padding-left: 1px;
    border: none;
    box-shadow: 2px 3px 3px 2px rgba(218, 223, 225, .7);
    :active, :hover {
        box-shadow: 1px 2px 1px 1px rgba(218, 223, 225, .7);
    }

    :hover ${Icon}{
        opacity: 1;
    }
`

export const CentredLabel = styled.label`
    align-self: center;
`

export const Divider = styled.hr`
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 8px 0 -4px 0;
    padding: 0;
`

