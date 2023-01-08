import Image from 'next/image'
import styles from './page.module.css'
import getCourses from './getClasses'

function filterClasses(courses) {
  // Get the input field
  var input = document.getElementById("classname");
  console.log(input)
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
            onKeyUp={() => filterClasses(courses)}
          />
        </form>
        <div className={styles.subLink}>
          Or search by professor
        </div>
      </div>
    </main>
  )
}
