import styles from '../../styles/Home.module.css'
import Head from 'next/head'

const PageTemplate = (props) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Draggable Canvas</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {props.children}
            </main>

            <footer className={styles.footer}>
                <p>
                Thomas Dhome-Casanova 2021
                </p>
            </footer>
        </div > 
    )
}

export default PageTemplate
