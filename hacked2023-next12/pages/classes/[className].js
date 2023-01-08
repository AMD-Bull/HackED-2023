import { useRouter } from "next/router";
import styles from '../../styles/class.module.css';
import Navbar from "../../components/navbar";
import { PrismaClient } from '@prisma/client'


export default function Class({course}) {
    
    const router = useRouter()
    const className = router.query.className   

    return (
        <main className={styles.background}>
            <Navbar />
            <h1>
                This is the description for course {className}
            </h1>
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