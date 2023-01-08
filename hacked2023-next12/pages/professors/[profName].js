import { useRouter } from "next/router";
import styles from '../../styles/professor.module.css';
import Navbar from "../../components/navbar";
import { PrismaClient } from '@prisma/client'

export default function Class({ professor }) {

    const router = useRouter()
    const profName = router.query.profName   

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
                    <a className={styles.classLink} href='/classes/{className}'>
                        <div className={styles.classCard}>
                            
                        </div>
                    </a>
                    <a className={styles.classLink} href='/classes/{className}'>
                        <div className={styles.classCard}>
                            
                        </div>
                    </a>
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
            courses: true
        }
    })
    console.log(professor)
    return { props: { professor } }
}