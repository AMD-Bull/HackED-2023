import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div>
        <a href="/" color="black">
            OMG GO BACK
        </a>
      </div>
    </main>
  )
}
