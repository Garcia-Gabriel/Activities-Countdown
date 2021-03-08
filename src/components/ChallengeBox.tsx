import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';
import { useContext } from 'react';
import { countdownContext } from '../Contexts/Countdown.context';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(countdownContext);

    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="null" />
                        <strong>Novo desafio!</strong>
                        <p>
                            {activeChallenge.description}
                        </p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                            </button>

                        <button
                            type="button"
                            className={styles.challengeCompletedButton}
                            onClick={handleChallengeSucceeded}
                        >

                            Completei
                         </button>

                    </footer>

                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um novo desafio!</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de levels completando desafios.
                </p>

                    </div>

                )
            }
        </div >

    )
} 