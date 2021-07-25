import styled from 'styled-components'
import InfoContainer from '../compounds/infoContainer'
import { useRouter } from 'next/router'

const Card = styled.div`
    display: flex;
    flex-direction: column;

    width: 250px;
    min-width: 200px;
    margin-right: 16px;
    border-radius: 4px;
    box-shadow: 1px 1px 3px 4px rgba(218, 223, 225, .7);
`
const NoMarg = styled.h3`
    margin-top: 12px;
    margin-bottom: 8px;
`
const Preview = styled.div`
    height: 100px;
    width: 100%;
    background: url("${props => props.background}") no-repeat center center; 
    border-radius: 4px;
    background-size: cover;
`
const Borders = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 8px;
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`


const StyledButton= styled.button`
    padding: 0.5rem 1.25rem;
    border-radius: var(--border-radius);

    margin-top: 1rem;
    margin-left: 8px;
    line-height: initial;
    transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;
    background-color: var(--red);
    border: 2px solid var(--red);
    color: white;

    :hover {
        background-color: var(--dark-red);
    }
`


const RecentCard = ({file, db}) => {
    const router = useRouter()

    const rerouteClick = () => {
        router.push('./'+ file.id)
    }
    const handleDelete = () => {
        db.files.delete(file.id)
    }
    return (
        
        <Card>
            <Preview background={file.floorplan}/> 
            <Borders>
                <NoMarg>{file.name}</NoMarg>
                <InfoContainer scale={file.scale} occupancy={file.occupancy}/>
                <Row style={{justifyContent: 'flex-end'}}>
                    <StyledButton onClick={()=>handleDelete()}>Delete</StyledButton>
                    <button type="submit" onClick={()=>rerouteClick()}> Open </button>
                </Row>
                
            </Borders>

        </Card>
    )
}

export default RecentCard