import Head from 'next/head'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import { device } from '../components/cssVars';
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import CreateNewFile from '../components/molecules/createNewFile'
import { useLiveQuery } from "dexie-react-hooks"
import { FilesDatabase } from '../components/filesDatabase'
import UploadJson from '../components/atoms/uploadJson';
import RecentCard from '../components/atoms/recentCard';


const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  // default to mobile
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`

const RecentBoxes = styled.div`
  display: flex;
  flex-direction: row;
`
function Home() {
  const [currFile, setCurrFile] = React.useState({floorplan: '', 
                                                    name: '', 
                                                    id: uuidv4(), 
                                                    scale: 1/16,
                                                    occupancy: 4,
                                                    shapes: []
                                                  })

  const db = new FilesDatabase()
  const allFiles = useLiveQuery(() => db.files.toArray(), [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Dorm Designer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Dorm Designer</h1>
        <h2>Tips</h2>
          <p>
            Find the floorplan in SVG format for your building. For Princeton students, go to http://rooms.tigerapps.org and find your floorplan, then right click and download image as SVG.
          </p>
          <p>
            Upload this floorplan in the Create New section. You should see a small preview in the box. In the bottom left of the floorplan in a larger viewer, you should find the scale. Enter the name of the file, the scale and the number of occupants, then click Submit.
          </p>

        <Row>
          <Column>
            <h2>Create new</h2>
            <CreateNewFile currFile={currFile} setFile={setCurrFile} db={db}/>
          </Column>
          <Column>
            <h2>Import old</h2>
            <UploadJson setFile={setCurrFile} db={db}/>
          </Column>
        </Row>
        
        <h2>Recent</h2>
        <RecentBoxes>
          {allFiles && allFiles.map((file, i)=> <RecentCard file={file} db={db} key={'recentfilecards'+i}/> )}
        </RecentBoxes>
        
      </main>

      <footer className={styles.footer}>
        <p>
          Thomas Dhome-Casanova 2021
        </p>
      </footer>
    </div >
  )
}


export default Home
