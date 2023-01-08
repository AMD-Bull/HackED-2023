import styles from '../styles/home.module.css'
import React, { useState, useEffect } from 'react'

import Navbar from '../components/navbar';
import { PrismaClient } from '@prisma/client'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';


export default function Home({ names }) {

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
          <form>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={names}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Course"/>}
            />
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