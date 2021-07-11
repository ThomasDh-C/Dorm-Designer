import {useRouter} from 'next/router'
import dynamic from "next/dynamic"
import React, { useEffect } from 'react'
import { MapFile } from '../components/atoms/shapes'
import PageTemplate from '../components/molecules/pageTemplate'
import FileInfoBar from '../components/molecules/fileInfoBar'
import KonvaEditor from '../components/molecules/konvaPanel'
import { FilesDatabase } from '../components/filesDatabase'

const RoomExists = ({currFile, setCurrFile, id, db}) => {
    return (
        <PageTemplate>
            <FileInfoBar currFile={currFile} setCurrFile={setCurrFile} db={db}/>
            <KonvaEditor file={currFile.floorplan} floorplanunits={currFile.scale} occupancy={currFile.occupancy} currFile={currFile} setCurrFile={setCurrFile}/>
        </PageTemplate>
    )
}

const SSRRoom = () => {
    const router = useRouter()
    const id: string = router.query.id as string
    const [currFile, setCurrFile] = React.useState<MapFile | undefined>()
    
    const db = new FilesDatabase()

    useEffect(()=>{
        if(id){
            db.files.get(id).then((file)=>{
                setCurrFile(file)
            })
        }
    },[id])
    if(currFile && currFile.id==id) return <RoomExists currFile={currFile} setCurrFile={setCurrFile} id={id} db={db}/>
    return <PageTemplate> <h1>Room doesn't exist</h1> </PageTemplate>
}

const Room = dynamic(Promise.resolve(SSRRoom), {
    ssr: false,
})

export default Room