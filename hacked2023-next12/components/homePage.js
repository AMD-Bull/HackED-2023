
import styles from '../styles/home.module.css'
import { PrismaClient } from '@prisma/client'

function filterClasses() {
    if (typeof window !== "undefined") {
        // browser code
    // Get the input field
        const input = document.getElementById("classname");
        console.log("HI")
        console.log(input.value)
    }
    // Get the filter value
    // var filter = input.value.toLowerCase();
    // // Get the list items
    // var listItems = namesList.getElementsByTagName("li");
  
    // // Loop through the list items and hide those that don't match the filter
    // for (var i = 0; i < listItems.length; i++) {
    //   var name = listItems[i].textContent;
    //   if (name.toLowerCase().indexOf(filter) > -1) {
    //     listItems[i].style.display = "";
    //   } else {
    //     listItems[i].style.display = "none";
    //   }
    // }
  }


export default function HomePage({ courses }) {

    console.log(courses)
   
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.description}>
                <h1 className={styles.title}>
                    Grizzly Trails
                </h1>
                <p className={styles.subtitle}>
                    Faster and meaner than bear tracks
                </p>
            </div>
            <form className={styles.form} action="#">
            {/* <datalist className={styles.list} id="courses">
                <div dangerouslySetInnerHTML={{ __html: courses }} />
            </datalist> */}
            <input 
                className={styles.searchBar}
                placeholder="Search by class"
                id="classname"
                type="text"
                autoComplete="off"
                list="courses"
                onKeyUp={filterClasses()}
            />
            </form>
            <div className={styles.subLink}>
            Or search by professor
            </div>
        </div>
    )
}

export async function getServerSideProps(){
    const prisma = new PrismaClient()
    const courses = await prisma.course.findMany()
    console.log(courses)
    return { props: { courses } }
}