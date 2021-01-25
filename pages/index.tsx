import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NativeEditor from '../components/nativeEditor'
import KonvaEditor from '../components/konvaEditor'
import dynamic from "next/dynamic";

const NoSSRKonvaEditor = dynamic(() => import("../components/konvaEditor"), {
  ssr: false,
});

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Draggable Canvas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NativeEditor />
        <KonvaEditor />
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
