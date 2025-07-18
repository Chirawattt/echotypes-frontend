"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVolumeUp, FaKeyboard, FaBrain, FaLightbulb } from "react-icons/fa";


// Define a type for our game modes
interface GameMode {
    id: string;
    name: string;
    icon: React.ElementType;
    descriptionThai: string;
    descriptionEng: string;
    fontFamily?: string; // Optional: if a mode name needs a specific font
    bgGradient?: string; // Background gradient for the icon container
    iconGradient?: string; // Icon gradient colors
    glowColor?: string; // Glow effect color
}

// Define available game modes
const gameModes: GameMode[] = [
    {
        id: "echo",
        name: "Echo Mode",
        icon: FaVolumeUp,
        descriptionThai: "ฟังเสียงคำศัพท์แล้วพิมพ์ตาม",
        descriptionEng: "ฝึกทักษะการฟัง (Listening Comprehension) และการสะกดคำ (Spelling) ไปพร้อมกัน",
        fontFamily: "'Caveat Brush', cursive",
        bgGradient: "from-blue-500/10 via-cyan-500/10 to-blue-500/10",
        iconGradient: "from-blue-400 to-cyan-400",
        glowColor: "blue-500/20",
    },
    {
        id: "typing",
        name: "Typing Mode",
        icon: FaKeyboard,
        descriptionThai: "ฝึกพิมพ์คำศัพท์ให้เร็วและแม่นยำ",
        descriptionEng: "Improve your typing speed and accuracy with English vocabulary.",
        fontFamily: "'Caveat Brush', cursive",
        bgGradient: "from-green-500/10 via-emerald-500/10 to-green-500/10",
        iconGradient: "from-green-400 to-emerald-400",
        glowColor: "green-500/20",
    },
    {
        id: "memory",
        name: "Memory Mode",
        icon: FaBrain,
        descriptionThai: "ทดสอบความจำคำศัพท์",
        descriptionEng: "Test your vocabulary retention.",
        fontFamily: "'Caveat Brush', cursive",
        bgGradient: "from-purple-500/10 via-violet-500/10 to-purple-500/10",
        iconGradient: "from-purple-400 to-violet-400",
        glowColor: "purple-500/20",
    },
    {
        id: "meaning-match",
        name: "Meaning Match",
        icon: FaLightbulb,
        descriptionThai: "อ่านความหมายแล้วตอบคำศัพท์",
        descriptionEng: "Read the defunition and type the correct vocabulary word.",
        fontFamily: "'Caveat Brush', cursive",
        bgGradient: "from-yellow-500/10 via-amber-500/10 to-yellow-500/10",
        iconGradient: "from-yellow-400 to-amber-400",
        glowColor: "yellow-500/20",
    }
]

export default function ModeSelectPage() {
    const router = useRouter();
    const [currentModeIndex, setCurrentModeIndex] = useState(0);

    const selectedMode = gameModes[currentModeIndex];

    const handleNextMode = () => {
        setCurrentModeIndex((prevIndex) => (prevIndex + 1) % gameModes.length);
    }

    const handlePrevMode = () => {
        setCurrentModeIndex((prevIndex) => (prevIndex - 1 + gameModes.length) % gameModes.length);
    }

    const handleStartSelectedMode = () => {
        // For the first 3 modes (echo, typing, memory), go directly to pre-game
        // For meaning-match, go to difficulty selection
        if (selectedMode.id === 'meaning-match') {
            router.push(`/play/${selectedMode.id}`);
        } else {
            // For DDA-enabled modes, go directly to pre-game with default difficulty
            router.push(`/play/${selectedMode.id}/dda`);
        }
    }

    const isFirstMode = currentModeIndex === 0;
    const isLastMode = currentModeIndex === gameModes.length - 1;

    return (
        <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#101010] to-[#1A0A1A] text-white pt-12 sm:pt-16 px-2 sm:px-4 overflow-hidden relative">

            {/* Mode Selecting Title */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-xl lg:max-w-7xl px-2 sm:px-4 mt-6 sm:mt-10 relative z-10"
            >
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-6xl text-center bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl"
                    style={{ fontFamily: "'Caveat Brush', cursive" }}
                    animate={{
                        textShadow: [
                            "0 0 20px rgba(239, 68, 68, 0.3)",
                            "0 0 40px rgba(239, 68, 68, 0.5)",
                            "0 0 20px rgba(239, 68, 68, 0.3)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Choose Your Mode
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-base sm:text-lg lg:text-xl text-center mt-2 sm:mt-3 bg-gradient-to-r from-neutral-300 to-neutral-400 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Playpen Sans Thai', sans-serif" }}
                >
                    เลือกโหมดที่ใช่สำหรับคุณ
                </motion.p>
            </motion.div>

            {/* Mode Carousel */}
            <motion.div
                key={selectedMode.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-grow flex-col items-center justify-center w-full max-w-6xl relative z-10"
            >
                {/* Mode Name */}
                <motion.h3
                    className="text-4xl sm:text-5xl mb-1 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent font-bold py-2"
                    style={{ fontFamily: selectedMode.fontFamily }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {selectedMode.name}
                </motion.h3>

                {/* Selector Container */}
                <div className="flex items-center justify-between w-full mb-6 sm:mb-8 lg:mb-10 xl:mb-12 px-2 sm:px-4">
                    {/* Previous Button - Hidden when first mode */}
                    {!isFirstMode && (
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            onClick={handlePrevMode}
                            className="p-2 sm:p-3 lg:p-4 hover:scale-110 transition-all duration-300 focus:outline-none cursor-pointer group"
                            aria-label="Previous Mode"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 sm:p-4 lg:p-6 rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                                <FaChevronLeft className="text-2xl sm:text-4xl lg:text-6xl text-blue-400 group-hover:text-blue-300 transition-all duration-300" />
                            </div>
                        </motion.button>
                    )}

                    {/* Spacer when first mode - Same size as button */}
                    {isFirstMode && (
                        <div className="p-2 sm:p-3 lg:p-4">
                            <div className="p-3 sm:p-4 lg:p-6 rounded-full">
                                <div className="text-2xl sm:text-4xl lg:text-6xl opacity-0">
                                    <FaChevronLeft />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mode Details - Enhanced Card */}
                    <motion.div
                        key={`${selectedMode.id}-details`}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.div
                            className={`relative backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border shadow-2xl ${selectedMode.id === 'echo' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-blue-400/30' :
                                    selectedMode.id === 'typing' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-green-400/30' :
                                        selectedMode.id === 'memory' ? 'bg-gradient-to-br from-purple-500/20 to-violet-500/10 border-purple-400/30' :
                                            'bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border-yellow-400/30'
                                }`}
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.3 }}
                            animate={{
                                boxShadow: selectedMode.id === 'echo' ? [
                                    `0 20px 60px rgba(59, 130, 246, 0.2)`,
                                    `0 25px 80px rgba(59, 130, 246, 0.3)`,
                                    `0 20px 60px rgba(59, 130, 246, 0.2)`
                                ] : selectedMode.id === 'typing' ? [
                                    `0 20px 60px rgba(34, 197, 94, 0.2)`,
                                    `0 25px 80px rgba(34, 197, 94, 0.3)`,
                                    `0 20px 60px rgba(34, 197, 94, 0.2)`
                                ] : selectedMode.id === 'memory' ? [
                                    `0 20px 60px rgba(168, 85, 247, 0.2)`,
                                    `0 25px 80px rgba(168, 85, 247, 0.3)`,
                                    `0 20px 60px rgba(168, 85, 247, 0.2)`
                                ] : [
                                    `0 20px 60px rgba(245, 158, 11, 0.2)`,
                                    `0 25px 80px rgba(245, 158, 11, 0.3)`,
                                    `0 20px 60px rgba(245, 158, 11, 0.2)`
                                ]
                            }}
                        >
                            {/* Mode-specific glowing background effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${selectedMode.bgGradient || 'from-red-500/10 via-orange-500/10 to-red-500/10'} rounded-2xl sm:rounded-3xl blur-xl opacity-50`} />

                            <selectedMode.icon className={`text-6xl sm:text-8xl md:text-[100px] lg:text-[120px] xl:text-[140px] bg-gradient-to-br ${selectedMode.iconGradient || 'from-red-400 to-orange-400'} bg-clip-text drop-shadow-2xl`} />
                            
                        </motion.div>
                    </motion.div>

                    {/* Spacer when last mode - Same size as button */}
                    {isLastMode && (
                        <div className="p-2 sm:p-3 lg:p-4">
                            <div className="p-3 sm:p-4 lg:p-6 rounded-full">
                                <div className="text-2xl sm:text-4xl lg:text-6xl opacity-0">
                                    <FaChevronRight />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Next Button - Hidden when last mode */}
                    {!isLastMode && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            onClick={handleNextMode}
                            className="p-2 sm:p-3 lg:p-4 hover:scale-110 transition-all duration-300 focus:outline-none cursor-pointer group"
                            aria-label="Next Mode"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 sm:p-4 lg:p-6 rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                                <FaChevronRight className="text-2xl sm:text-4xl lg:text-6xl text-purple-400 group-hover:text-purple-300 transition-all duration-300" />
                            </div>
                        </motion.button>
                    )}
                </div>

                {/* Mode Description - Enhanced */}
                <motion.div
                    key={`${selectedMode.id}-description`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center px-2 sm:px-4 max-w-xs sm:max-w-lg lg:max-w-3xl"
                    style={{ fontFamily: "'Playpen Sans Thai', sans-serif" }}
                >
                    <motion.p
                        className="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 bg-gradient-to-r from-white to-neutral-200 bg-clip-text text-transparent font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        {selectedMode.descriptionThai}
                    </motion.p>
                    <motion.p
                        className="text-sm sm:text-base lg:text-md bg-gradient-to-r from-neutral-300 to-neutral-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        {selectedMode.descriptionEng}
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Enhanced Start Button */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4 mb-12 sm:mb-6 flex justify-center w-full max-w-4xl relative z-10 px-2 sm:px-4"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.button
                        onClick={handleStartSelectedMode}
                        className="relative group focus:outline-none rounded-xl sm:rounded-2xl cursor-pointer"
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(239, 68, 68, 0.3)",
                                "0 0 40px rgba(239, 68, 68, 0.6)",
                                "0 0 20px rgba(239, 68, 68, 0.3)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {/* Glowing Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl sm:rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                        {/* Main Button */}
                        <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 sm:py-5 lg:py-6 px-8 sm:px-12 lg:px-16 rounded-xl sm:rounded-2xl text-lg sm:text-xl lg:text-2xl shadow-2xl group-hover:from-red-400 group-hover:to-orange-400 transition-all duration-300 border border-white/20"
                            style={{ fontFamily: "'Playpen Sans Thai', sans-serif" }}>
                            <span className="relative z-10">เลือกโหมดนี้</span>
                        </div>
                    </motion.button>
                </motion.div>
            </motion.div>
        </main>
    );
}
