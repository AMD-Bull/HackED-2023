import { useRouter } from "next/router";
import styles from '../../styles/class.module.css';
import Navbar from "../../components/navbar";
import { PrismaClient } from '@prisma/client'


export default function Class({ course }) {

    const router = useRouter()
    const className = router.query.className

    function getRounded (input) {
        debugger;
        return new Intl.NumberFormat('en', { maximumSignificantDigits: 1 }).format(input);
    }

    function getRand() {
        return Math.floor(Math.random() * 200) + 1;
    }

    const profs = course[0].professors.map((prof, id) => {
        console.log(prof.professor.name)
        return (
            <a className={styles.professorLink} href={"/professors/" + prof.professor.name}>
                <div className={styles.professorCard}>
                    <h4 className={styles.professorName}>
                        {prof.professor.name}
                    </h4>
                    <div className={styles.professorRatingsWrapper}>
                        <div className={styles.professorRating}>
                            Overall: {getRounded(prof.professor.overall)}/5
                        </div>
                        <div className={styles.professorRating}>
                            Course Quality: {getRounded(prof.professor.course_quality)}/5
                        </div>
                        <div className={styles.professorRating}>
                            Communication: {getRounded(prof.professor.communication)}/5
                        </div>
                        <div className={styles.professorRating}>
                            Teaching Quality: {getRounded(prof.professor.teaching_quality)}/5
                        </div>
                    </div>
                </div>
            </a>
        );
    });

    return (
        <main className={styles.background}>
            <Navbar />
            <div className={styles.contentWrapper}>
                <div className={styles.leftSide}>
                    <h1 className={styles.classTitle}>
                        {className} - {course[0].title}
                    </h1>
                    <p className={styles.classDescription}>
                        {course[0].description}
                    </p>
                    <div className={styles.classDescription}>
                        Current course offerings:
                    </div>
                    {/* <div className={styles.scheduleWrapper}>
                        <div className={styles.schedule}>
                            <h3 className={styles.time}>
                                9 am
                            </h3>
                            <h3 className={styles.date}>
                                W23
                            </h3>
                        </div>
                        <div className={styles.schedule}>
                            <h3 className={styles.time}>
                                10 am
                            </h3>
                            <h3 className={styles.date}>
                                W23
                            </h3>
                        </div>
                        <div className={styles.schedule}>
                            <h3 className={styles.time}>
                                11 am
                            </h3>
                            <h3 className={styles.date}>
                                W23
                            </h3>
                        </div>
                    </div> */}
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.subtitle}>
                        Over a total of {getRand()} submissions
                    </div>
                    <div className={styles.ratingsWrapper}>
                        <h2 className={styles.overallRating}>
                            {course[0].overall}/5
                        </h2>
                        <h2 className={styles.rating}>
                            Quality: {course[0].course_quality}/5
                        </h2>
                        <h2 className={styles.rating}>
                            Usefulness: {course[0].knowledge_increase}/5
                        </h2>
                    </div>
                    <div className={styles.largerSubtitle}>
                        Professors who teach this course:
                    </div>
                    <div className={styles.professorWrapper}>
                        <li className={styles.list}>
                            {profs}
                        </li>
                        {/* <a className={styles.professorLink} href="/professors/Buddy McGuy">
                            <div className={styles.professorCard}>
                                <h4 className={styles.professorName}>
                                    Buddy McGuy
                                </h4>
                                <div className={styles.professorRatings}>
                                    idk how this will be
                                </div>
                            </div>
                        </a>
                        <a className={styles.professorLink} href="/professors/Silly Hill Billy">
                            <div className={styles.professorCard}>
                                <h4 className={styles.professorName}>
                                    Silly Hill Billy
                                </h4>
                                <div className={styles.professorRatings}>
                                    idk how this will be
                                </div>
                            </div>
                        </a> */}
                    </div>
                </div>
            </div>
        </main>
    )
}

export async function getServerSideProps({params}){

    console.log(params.className)
    const prisma = new PrismaClient()
    const course = await prisma.course.findMany({
        where: {
            name: {
                equals: params.className
            }
        },
        include: {
            professors: {
                include: {
                    professor: true
                }
            }
        }
    })
    console.log(course)
    console.log(course[0].professors);
    return { props: { course } }
}