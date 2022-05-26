import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Draw from '../components/Draw'
import {lines} from '../public/lines'
type Line = { x: number; y: number }[];

function reduceLines (lines: Line[]) {
  return lines.reduce((acc: any[], curr: Line) => {
    acc.push(curr.map(({x, y}) => {x - 10; y - 10}))
    return acc
  })
}

const Home: NextPage = () => {

    console.log('Data', reduceLines(lines));
    console.log('Data2', lines);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Draw data={reduceLines(lines)} />
      </Layout>
    </div>
  )
}

export default Home