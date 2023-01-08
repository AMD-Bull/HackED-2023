import styles from '../styles/home.module.css'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar';
import { PrismaClient } from '@prisma/client'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import {useRouter} from 'next/router'


export default function Home({ names }) {
    const router = useRouter()
    const [route, setRoute] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push("/classes/" + route)
    }  
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.contentWrapper}>
          <div className={styles.description}>
              <h1 className={styles.title}>
                  Grizzly Trails
              </h1>
              <p className={styles.subtitle}>
                  Faster and meaner than bear tracks
              </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name='route' onChange={(e)=>{setRoute(e.target.value)}} />
            <Button
                type="submit"
            >
                Search
            </Button>
          </form>
          <div className={styles.subLink}>
          Or search by professor
          </div>
      </div>
    </main>
  )
}

export async function getServerSideProps(){
    const prisma = new PrismaClient()
    const courses = await prisma.course.findMany()
    const names = courses.map(course => course.name);
    console.log(names)
    return { props: { names } }
}