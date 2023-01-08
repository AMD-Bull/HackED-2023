import styles from '../styles/home.module.css'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar';
import { PrismaClient } from '@prisma/client'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import {useRouter} from 'next/router'



export default function Home({ names }) {

    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

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
              <div className={styles.title}>
                  Grizzly Trails
              </div>
              <div className={styles.subtitle}>
                  Faster and meaner than bear tracks
              </div>
          </div>
          <form className={styles.searchWrapper} onSubmit={handleSubmit} >
            <Autocomplete
                route={route}
                onChange={(event, newValue) => {
                    setRoute(newValue.toUpperCase());
                }}
                onInputChange={(event, newInputValue) => {
                    setRoute(newInputValue.toUpperCase());
                }}
                disablePortal
                id="combo-box-demo"
                options={names}
                sx={{ borderRadius: '50%' }}
                fullwidth
                renderInput={(params) => <TextField className={styles.searchBar} {...params} fullwidth name="route" label="Class" />}
            />
            <Button
                type="submit"
            >
                Search
            </Button>
          </form>
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