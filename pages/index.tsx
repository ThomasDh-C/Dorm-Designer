import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ProgressStepper from '../components/progressStepper'
import PlanUrl from '../components/planUrl'
import dynamic from "next/dynamic";
import React from 'react'

const NoSSRKonvaPanel = dynamic(() => import("../components/konvaPanel"), {
  ssr: false,
});

function Home() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [planUrl, setPlanUrl] = React.useState('')


  const mainstyle: React.CSSProperties = {
    visibility: planUrl !== '' ? 'visible' : 'hidden'
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Draggable Canvas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PlanUrl setPlanUrl={setPlanUrl} />
        <div style={mainstyle}>
          <ProgressStepper activeStep={activeStep} setActiveStep={setActiveStep} />
          <NoSSRKonvaPanel activeStep={activeStep} planUrl={planUrl}/>
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
