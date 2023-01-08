import { useRouter } from "next/router";
import styles from '../../styles/professor.module.css';
import Navbar from "../../components/navbar";
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

export default function Class({ professor }) {

    const router = useRouter()
    const profName = router.query.profName   

    const courses = professor[0].courses.map((course) => {
        console.log(course.course.name)
        return (
            <Link className={styles.courseLink} key="{course.id}" href={"/professors/" + course.course.name}>
                <div className={styles.courseCard}>
                    <h4 className={styles.courseName}>
                        {course.course.name}
                    </h4>
                    <div className={styles.courseRatingsWrapper}>
                        <div className={styles.courseRating}>
                            Overall: {getRounded(course.course.overall)}/5
                        </div>
                        <div className={styles.courseRating}>
                            Course Quality: {getRounded(course.course.communication)}/5
                        </div>
                        <div className={styles.courseRating}>
                            Knowledge Increase: {getRounded(course.course.knowledge_increase)}/5
                        </div>
                    </div>
                </div>
            </Link>
        );
    });


    return (
        <main className={styles.background}>
            <Navbar />
            <div className={styles.contentWrapper}>
                <div className={styles.ratingsWrapper}>
                    <div className={styles.overallRating}>
                        {professor[0].overall}/5
                    </div>
                    <div className={styles.rating}>
                        Course Quality: {professor[0].course_quality}/5
                    </div>
                    <div className={styles.rating}>
                        Communication: {professor[0].communication}/5
                    </div>
                    <div className={styles.rating}>
                        Teaching: {professor[0].teaching_quality}/5
                    </div>
                </div>
                <div className={styles.profName}>
                    {profName}
                </div>
                <div className={styles.classWrapper}>
                    <li className={styles.list}>
                        {courses}
                    </li>
                </div>
            </div>
        </main>
    )

}

export async function getServerSideProps({params}){

    console.log(params.profName)
    const prisma = new PrismaClient()
    const professor = await prisma.professor.findMany({
        where: {
            name: params.profName
        },
        include: {
            courses: {
                include: {
                    course: true
                }
            }
        }
    })
    console.log(professor)
    return { props: { professor } }
}