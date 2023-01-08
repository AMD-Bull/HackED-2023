import Image from 'next/image'
import styles from '../styles/navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <Link href="/">
                    <Image
                        src="/media/grizzly_logo.png"
                        alt="logo"
                        className={styles.logo}
                        width={100}
                        height={100}
                        priority
                    />
                </Link>
                <div className={styles.linkWrapper}>
                    <Link
                        className={styles.link}
                        href="/"
                    >
                        Grizzly Trails
                    </Link>
                </div>
            </div>
            {/* <div className={styles.rightSide}>
                <div className={styles.linkWrapper}>
                    <a
                        className={styles.link}
                        href="/how-it-works"    
                    >
                        How it Works
                    </a>
                </div>
            </div> */}
        </div>
    )
}