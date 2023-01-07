import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.contentWrapper}>
        <div className={styles.description}>
          <h1 className={styles.title}>
            Grizzly Trails
          </h1>
          <p className={styles.subtitle}>
            The most powerful professor and class rating software
          </p>
        </div>
        <form className={styles.form}>
          <input 
            className={styles.searchBar}
            placeholder="Search by class"
            id="classname"
            type="text"
            autoComplete='off'
          />
        </form>
        <div className={styles.subLink}>
          Or search by professor
        </div>
      </div>
    </main>
  )
}
