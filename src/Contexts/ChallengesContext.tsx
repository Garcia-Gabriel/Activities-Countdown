import { createContext, useState, ReactNode, useEffect } from 'react';
import cookies from 'js-cookie';
import challenges from '../../Challenges.json';
import { stringify } from 'querystring';
import { LevelUpModal } from '../components/LevelUpModal';


interface challenge {
    type: 'eye' | 'body';
    description: string;
    amount: number;
}

interface challengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;

}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;

}

export const ChallengesContext = createContext({} as challengesContextData);


export function ChallengesProvider({ children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        cookies.set('level', String(level));
        cookies.set('currentExperience', String(currentExperience));
        cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])


    function levelUp() {

        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {

        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengesIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🚀', {
                body: `valendo! ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!completeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);

        setActiveChallenge(null);

        setChallengesCompleted(challengesCompleted + 1);

    }

    return (
        <ChallengesContext.Provider value={{
            level,
            experienceToNextLevel,
            currentExperience,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
        }
        }
        >
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}