import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Learning Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to THE CSET Learning Tool!
        </h1>

        <p className={styles.description}>
          Capstone Project by Steve, Kate and Kevin. Supplimentary learning tool for CSET.
        </p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
