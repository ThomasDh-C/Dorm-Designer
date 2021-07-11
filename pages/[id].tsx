import {useRouter} from 'next/router'
import dynamic from "next/dynamic"
import React from 'react'
import { MapFile } from '../components/atoms/shapes'
import PageTemplate from '../components/molecules/pageTemplate'
import FileInfoBar from '../components/molecules/fileInfoBar'
import KonvaEditor from '../components/molecules/konvaPanel'
import { useEffect } from 'react'

const RoomExists = ({currFile, setCurrFile, id}) => {
    return (
        <PageTemplate>
            <FileInfoBar currFile={currFile} setCurrFile={setCurrFile}/>
            <KonvaEditor file={currFile.floorplan} floorplanunits={currFile.scale} occupancy={currFile.occupancy}/>
        </PageTemplate>
    )
}

const SSRRoom = () => {
    const router = useRouter()
    const id: string = router.query.id as string
    const [currFile, setCurrFile] = React.useState<MapFile | undefined>()
    // console.log(JSON.parse(localStorage.getItem('files'))[id])
    useEffect(()=>{
        const file = JSON.parse(localStorage.getItem('files'))[id]
        setCurrFile(file)
    },[id])
    // console.log(currFile)
    if(currFile && currFile.id==id) return <RoomExists currFile={currFile} setCurrFile={setCurrFile} id={id}/>
    return <PageTemplate> <h1>Room doesn't exist</h1> </PageTemplate>
}

const Room = dynamic(Promise.resolve(SSRRoom), {
    ssr: false,
})

export default Room