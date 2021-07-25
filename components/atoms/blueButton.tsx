import styled from 'styled-components'

const StyledButton= styled.button`
    border-radius: var(--border-radius);
    padding: 4px;
    transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;
    background-color: white;
    border: 2px solid var(--light-blue);

    :hover {
        background: var(--light-blue);
    }
`

const BlueButton = (props) => {
    return <StyledButton type="button" {...props}/>
}

export default BlueButton