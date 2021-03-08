import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasfinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const countdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;


export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasfinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);

    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    useEffect(
        () => {
            if (isActive && time > 0) {
                countdownTimeout = setTimeout(() => {
                    setTime(time - 1);
                }, 0)
            } else if (isActive && time == 0) {
                setHasFinished(true);
                setIsActive(false);
                startNewChallenge();
            }
        },
        [isActive, time])


    return (
        <countdownContext.Provider value={{
            minutes,
            seconds,
            hasfinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </countdownContext.Provider>
    )
}