import styled from 'styled-components'

const StyledButton = styled.button`
    display: inline-block;    
    min-width: 25px;
    max-width: 60px;
    border-radius: 100%;
    
    outline: none;
    border-style: none;
    color: black;
    background-color: white;
    box-shadow: 3px 3px 5px 6px rgba(218, 223, 225, .7);
    
    overflow: none;
    text-decoration: none;
    text-align: center;
    padding:0;

    
    :before {
        content:'';
        display:inline-block;;
        vertical-align:middle;
        padding-top:100%;
      }

    transition: background-color 100ms ease-in-out, box-shadow 100ms ease-in-out;
    :active, :hover {
        // background-color: var(--light-blue);
        box-shadow: 1px 1px 3px 4px rgba(218, 223, 225, .7);
    }
`

const RoundButton = (props) => {
    return <StyledButton type="button" {...props}/>
}

export default RoundButton