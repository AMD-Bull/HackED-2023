import Image from 'next/image'
import styles from './page.module.css'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getCourses() {
  const courses = await prisma.course.findMany()
  //return courses
  var options = '';

  for (var i = 0; i < courses.length; i++) {
    options += '<option value="' + courses[i].name + '" className={styles.option}/>';
  }
  return options
}

export default async function Home() {

  const courses = await getCourses();
  const coursesStr = JSON.stringify(courses);
  console.log("COURSES")
  console.log(courses)
  console.log(coursesStr)

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
          <datalist className={styles.list} id="courses">
            <div dangerouslySetInnerHTML={{ __html: courses }} />
          </datalist>
          <input 
            className={styles.searchBar}
            placeholder="Search by class"
            id="classname"
            type="text"
            autoComplete='off'
            list="courses"
          />
        </form>
        <div className={styles.subLink}>
          Or search by professor
        </div>
      </div>
    </main>
  )
}
