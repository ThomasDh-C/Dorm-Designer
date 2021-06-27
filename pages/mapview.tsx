import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ProgressStepper from '../components/progressStepper'
import UploadFloorPlan from '../components/atoms/uploadFloorPlan/uploadFloorPlan'
import dynamic from "next/dynamic";
import React from 'react'

const NoSSRKonvaPanel = dynamic(() => import("../components/konvaPanel"), {
  ssr: false,
});

function Home() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [file,setFile] = React.useState('')

  const mainstyle: React.CSSProperties = {
    visibility: file !== '' ? 'visible' : 'hidden'
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Draggable Canvas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <UploadFloorPlan setFile={setFile} />
        <div style={mainstyle}>
          <ProgressStepper activeStep={activeStep} setActiveStep={setActiveStep} />
          <NoSSRKonvaPanel activeStep={activeStep} file={file}/>
        </div>

      </main>

      <footer className={styles.footer}>
        <p>
          Thomas Dhome-Casanova 2020
        </p>
      </footer>
    </div >
  )
}


export default Home
