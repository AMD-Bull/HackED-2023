import { useRouter } from "next/router";
import styles from '../../styles/professor.module.css';
import Navbar from "../../components/navbar";

export default function Professor() {
    const router = useRouter()
    const profName = router.query.profName
    

    return (
        <main profName={styles.background}>
            <Navbar />
            <h1>
                This is the description for senorita {profName}
            </h1>
        </main>
    )

}