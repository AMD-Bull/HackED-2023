import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './navbar.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Navbar() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <a href="/">
                    <Image
                        src="/grizzly_logo.png"
                        alt="logo"
                        className={styles.logo}
                        width={100}
                        height={100}
                        priority
                    />
                </a>
                <div className={styles.linkWrapper}>
                    <a
                        className={styles.link}
                        href="/"
                    >
                        Grizzly Trails
                    </a>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.linkWrapper}>
                    <a
                        className={styles.link}
                        href="/how-it-works"    
                    >
                        How it Works
                    </a>
                </div>
            </div>
        </div>
    )
}