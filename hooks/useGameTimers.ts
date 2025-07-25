import { useState, useRef, useCallback, useEffect } from 'react';
import { useGameStore } from '@/lib/stores/gameStore';

interface UseGameTimersProps {
    modeId: string;
    gameStyle: 'practice' | 'challenge';
}

export function useGameTimers({ modeId, gameStyle }: UseGameTimersProps) {
    const {
        status,
        startTime,
        setStartTime,
        setCurrentTime,
        setStatus,
        decrementTimeLeft
    } = useGameStore();

    // Timer-related state
    const [isEchoCountingDown, setIsEchoCountingDown] = useState(false);
    const [echoTimeLeft, setEchoTimeLeft] = useState(5.0);
    const [memoryTimeLeft, setMemoryTimeLeft] = useState(5.0);

    // Timer refs
    const echoStopTimerRef = useRef<(() => void) | null>(null);
    const memoryStopTimerRef = useRef<(() => void) | null>(null);

    // Timer callback handlers
    const handleEchoTimerReady = useCallback((stopTimer: () => void) => {
        echoStopTimerRef.current = stopTimer;
    }, []);

    const handleMemoryTimerReady = useCallback((stopTimer: () => void) => {
        memoryStopTimerRef.current = stopTimer;
    }, []);

    const handleEchoTimeLeftChange = useCallback((timeLeft: number) => {
        setEchoTimeLeft(timeLeft);
    }, []);

    const handleMemoryTimeLeftChange = useCallback((timeLeft: number) => {
        setMemoryTimeLeft(timeLeft);
    }, []);

    // Stop Echo timer
    const stopEchoTimer = useCallback(() => {
        if (modeId === 'echo' && gameStyle === 'challenge' && echoStopTimerRef.current) {
            echoStopTimerRef.current();
        }
    }, [modeId, gameStyle]);

    // Stop Memory timer
    const stopMemoryTimer = useCallback(() => {
        if (modeId === 'memory' && gameStyle === 'challenge' && memoryStopTimerRef.current) {
            memoryStopTimerRef.current();
        }
    }, [modeId, gameStyle]);

    // Start timer when game starts
    useEffect(() => {
        if (status === 'playing' && !startTime) {
            setStartTime(new Date());
        }
    }, [status, startTime, setStartTime]);

    // Count-up timer for non-typing modes
    useEffect(() => {
        let timerInterval: NodeJS.Timeout;
        if (status === 'playing' && startTime && modeId !== 'typing') {
            timerInterval = setInterval(() => {
                const now = new Date();
                const timeDiff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
                setCurrentTime({ minutes: Math.floor(timeDiff / 60), seconds: timeDiff % 60 });
            }, 1000);
        }
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [status, startTime, modeId, setCurrentTime]);

    // Countdown timer for Typing Mode (only in Practice Mode)
    useEffect(() => {
        let timerInterval: NodeJS.Timeout;
        if (status === 'playing' && modeId === 'typing' && gameStyle === 'practice') {
            timerInterval = setInterval(() => {
                const newTimeLeft = decrementTimeLeft();
                if (newTimeLeft <= 0) {
                    clearInterval(timerInterval);
                    setStatus('gameOver');
                }
            }, 1000);
        }
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [status, modeId, gameStyle, decrementTimeLeft, setStatus]);

    return {
        // State
        isEchoCountingDown,
        echoTimeLeft,
        memoryTimeLeft,
        
        // Refs
        echoStopTimerRef,
        
        // Functions
        setIsEchoCountingDown,
        setEchoTimeLeft,
        setMemoryTimeLeft,
        handleEchoTimerReady,
        handleMemoryTimerReady,
        handleEchoTimeLeftChange,
        handleMemoryTimeLeftChange,
        stopEchoTimer,
        stopMemoryTimer
    };
}
