import { useState } from "react"
import { motion } from "framer-motion"
import { Timer, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/fragments/navbar"
import CodeEditor from "@/components/fragments/code-editor"
import BattleSetupScreen from "@/components/fragments/battle-setup"

// Mock user data
const user = {
    name: "Alex Johnson",
    points: 450,
    rank: "Epic",
}

// Configuration options
const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
]

const difficulties = [
    { value: "easy", label: "Easy", points: 10, color: "text-green-400" },
    { value: "medium", label: "Medium", points: 25, color: "text-yellow-400" },
    { value: "hard", label: "Hard", points: 50, color: "text-red-400" },
]

// Mock problem data
const mockProblem = {
    title: "Two Sum",
    difficulty: "Easy",
    points: 10,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
        {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]",
            explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        },
    ],
    constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists.",
    ],
}

export default function BattlePage() {
    const [selectedLanguage, setSelectedLanguage] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("")
    const [battleStarted, setBattleStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(1800) // 30 menit

    const handleStartBattle = () => {
        if (selectedLanguage && selectedDifficulty) {
            setBattleStarted(true)
            // action
        }
    }

    const handleSubmitCode = (code) => {
        console.log("Submitted code:", code)
        // action
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const getLanguageLabel = () =>
        languages.find((lang) => lang.value === selectedLanguage)?.label || "Unknown"

    const getDifficultyColor = () => {
        switch (mockProblem.difficulty) {
            case "Easy":
                return "bg-green-900/20 text-green-400"
            case "Medium":
                return "bg-yellow-900/20 text-yellow-400"
            case "Hard":
                return "bg-red-900/20 text-red-400"
            default:
                return "bg-gray-900/20 text-gray-200"
        }
    }

    if (!battleStarted) {
        return (
            <div className="min-h-screen bg-black text-white">
                <BattleSetupScreen
                    user={user}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                    selectedDifficulty={selectedDifficulty}
                    setSelectedDifficulty={setSelectedDifficulty}
                    handleStartBattle={handleStartBattle}
                    languages={languages}
                    difficulties={difficulties}
                />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar user={user} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Timer className="h-5 w-5 text-red-400" />
                            <span className="text-xl font-mono text-red-400">{formatTime(timeLeft)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Trophy className="h-5 w-5 text-yellow-400" />
                            <span className="text-gray-200">{mockProblem.points} points</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Language:</span>
                        <span className="font-medium text-gray-200">{getLanguageLabel()}</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Card className="bg-gray-900/50 border-gray-700 h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-white">{mockProblem.title}</span>
                                    <span className={`text-sm px-2 py-1 rounded ${getDifficultyColor()}`}>
                                        {mockProblem.difficulty}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-2 text-white">Description</h3>
                                    <p className="text-gray-200 whitespace-pre-line">{mockProblem.description}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 text-white">Examples</h3>
                                    {mockProblem.examples.map((example, index) => (
                                        <div key={index} className="bg-gray-800/50 p-3 rounded-lg mb-3">
                                            <div className="text-sm">
                                                <div className="text-gray-400">Input:</div>
                                                <div className="font-mono text-gray-200">{example.input}</div>
                                                <div className="text-gray-400 mt-1">Output:</div>
                                                <div className="font-mono text-gray-200">{example.output}</div>
                                                <div className="text-gray-400 mt-1">Explanation:</div>
                                                <div className="text-gray-200">{example.explanation}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 text-white">Constraints</h3>
                                    <ul className="text-gray-200 space-y-1">
                                        {mockProblem.constraints.map((constraint, index) => (
                                            <li key={index} className="text-sm">• {constraint}</li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <CodeEditor
                            language="javascript"
                            initialCode="Write your code here"
                            onSubmit={(code) => console.log('Running:', code)}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}