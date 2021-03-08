import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/Garcia-Gabriel.png" alt="Gabriel Garcia" />

            <div>
                <strong>
                    Gabriel Garcia
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>

        </div>


    );

}