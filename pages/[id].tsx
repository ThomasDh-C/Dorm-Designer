import {useRouter} from 'next/router'
import dynamic from "next/dynamic"
import React from 'react'
import { MapFile } from '../components/atoms/shapes'
import PageTemplate from '../components/molecules/pageTemplate'
import FileInfoBar from '../components/molecules/fileInfoBar'
import KonvaEditor from '../components/molecules/konvaPanel'

const RoomExists = ({currFile, setCurrFile, id}) => {
    return (
        <PageTemplate>
            <FileInfoBar currFile={currFile} setCurrFile={setCurrFile}/>
            <KonvaEditor activeStep={1} file={currFile.floorplan}/>
        </PageTemplate>
    )
}

const SSRRoom = () => {
    const router = useRouter()
    const {id} = router.query
    const [currFile, setCurrFile] = React.useState<MapFile | undefined>(JSON.parse(localStorage.getItem('currshape')))
    
    if(currFile && currFile.id==id) return <RoomExists currFile={currFile} setCurrFile={setCurrFile} id={id}/>
    return <PageTemplate> <h1>Room doesn't exist</h1> </PageTemplate>
}

const Room = dynamic(Promise.resolve(SSRRoom), {
    ssr: false,
  })

export default Room