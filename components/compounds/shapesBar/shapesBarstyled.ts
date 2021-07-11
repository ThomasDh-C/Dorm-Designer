import styled from 'styled-components'

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
    font-size: 20px;
`

export const Shaded = styled.div`
    position: absolute;
    left: 1px;
    right: 1px;
    width: 43px;
    height: 43px;
    border-radius: 10000px;

    background-image: linear-gradient(45deg, black 10%, transparent 10%, transparent 50%, black 50%, black 60%, transparent 60%, transparent 100%);
    background-size: 14.14px 14.14px;
    opacity: 0;
    transition: opacity 500ms ease-in-out;
`

export const ShapeAddButton = styled.button`
    position: relative;
    border-radius: 10000px;
    margin-top: 8px;
    width: 45px;
    height: 45px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    border: none;
    box-shadow: 2px 3px 3px 2px rgba(218, 223, 225, .7);
    transition: box-shadow 500ms ease-in-out;

    :enabled {
        :active, :hover {
            box-shadow: 1px 2px 1px 1px rgba(218, 223, 225, .7);
        }
        :hover ${Icon}{
            opacity: 1;
        }
    }
    
    :disabled {
        cursor: default;
        box-shadow: none;

        ${Shaded}{
            opacity: 0.65;
        }
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

