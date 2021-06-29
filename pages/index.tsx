import Head from 'next/head'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import { device } from '../components/cssVars';
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import CreateNewFile from '../components/molecules/createNewFile';

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

function Home() {
  const [currFile, setCurrFile] = React.useState({floorplan: '', 
                                                    name: '', 
                                                    id: uuidv4(), 
                                                    scale: 1/16,
                                                    occupancy: 4,
                                                  })
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Dorm Designer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Dorm Designer</h1>
        <Row>
          <Column>
            <h2>Create new</h2>
            <CreateNewFile currFile={currFile} setFile={setCurrFile}/>

          </Column>
          <Column>
            <h2>Import old</h2>
          </Column>
        </Row>
        <h2>Recent</h2>

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
