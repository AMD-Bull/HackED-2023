import { useRouter } from "next/router";
import styles from '../../styles/class.module.css';
import Navbar from "../../components/navbar";
import { PrismaClient } from '@prisma/client'


export default function Class({ course }) {

    const router = useRouter()
    const className = router.query.className   

    return (
        <main className={styles.background}>
            <Navbar />
            <div className={styles.contentWrapper}>
                <div className={styles.leftSide}>
                    <h1 className={styles.classTitle}>
                        {course[0].title} - {className}
                    </h1>
                    <p className={styles.description}>
                    Computer arithmetic and errors. The study of computational methods for solving problems in linear algebra, non-linear equations, optimization, interpolation and approximation, and integration. This course will provide a basic foundation in numerical methods that supports further study in machine learning; computer graphics, vision and multimedia; robotics; and other topics in Science and Engineering.
                    </p>
                    <div className={styles.scheduleWrapper}>
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
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.ratingsWrapper}>
                        <h2 className={styles.rating}>
                            Course Quality: {course[0].course_quality}
                        </h2>
                        <h2 className={styles.rating}>
                            Knowledge Increase: {course[0].knowledge_increase}
                        </h2>
                        <h2 className={styles.rating}>
                            Overall: {course[0].overall}
                        </h2>
                    </div>
                    <div className={styles.professorWrapper}>
                        <a className={styles.professorLink} href="/professors/Buddy McGuy">
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
                                    Buddy McGuy
                                </h4>
                                <div className={styles.professorRatings}>
                                    idk how this will be
                                </div>
                            </div>
                        </a>
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
            name: params.className
        }
    })
    console.log(course)
    return { props: { course } }
}