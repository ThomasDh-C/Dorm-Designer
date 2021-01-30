import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Stepper from '../components/stepper'
import dynamic from "next/dynamic";
import React from 'react'

const NoSSRKonvaPanel = dynamic(() => import("../components/konvaPanel"), {
  ssr: false,
});

function Home() {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>Draggable Canvas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
        <NoSSRKonvaPanel activeStep={activeStep}/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


export default Home
