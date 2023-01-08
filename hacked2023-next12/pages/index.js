import styles from '../styles/home.module.css'

import Navbar from '../components/navbar';
import HomePage from '../components/homePage';


export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <HomePage />
    </main>
  )
}
