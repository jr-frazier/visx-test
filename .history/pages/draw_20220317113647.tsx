import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Draw from '../components/Draw'
import {lines} from '../public/lines'

type Line = { x: number; y: number }[];

function resizeLines(lines: Line[]): Line[] {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scale = Math.min(width / 500, height / 500);
    return lines.map((line) => line.map((point) => ({
        x: point.x * scale,
        y: point.y * scale,
    })));
}


const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Draw data={resizeLines(lines)} />
      </Layout>
    </div>
  )
}

export default Home