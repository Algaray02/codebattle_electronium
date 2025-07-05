import { useState, useEffect } from "react";
import { Timer, Trophy, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/fragments/navbar";
import CodeEditor from "@/components/fragments/code-editor";
import BattleSetupScreen from "@/components/fragments/battle-setup";
import ProblemList from "@/components/fragments/problem-list";

// Mock user data
const user = {
    name: "Alex Johnson",
    points: 450,
    rank: "Epic",
};

// Configuration options
const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
];

const difficulties = [
    { value: "easy", label: "Easy", points: 10, color: "text-green-400" },
    { value: "medium", label: "Medium", points: 25, color: "text-yellow-400" },
    { value: "hard", label: "Hard", points: 50, color: "text-red-400" },
];

// Mock problems data
const mockProblems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        points: 10,
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation:
                    "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
        ],
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Easy",
        points: 10,
        description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.`,
        examples: [
            {
                input: "l1 = [2,4,3], l2 = [5,6,4]",
                output: "[7,0,8]",
                explanation: "342 + 465 = 807.",
            },
        ],
        constraints: [
            "The number of nodes in each linked list is in the range [1, 100].",
            "0 <= Node.val <= 9",
        ],
    },
    // Add 3 more problems...
];

export default function BattlePage() {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [battleStarted, setBattleStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [code, setCode] = useState("");

    const handleStartBattle = () => {
        if (selectedLanguage && selectedDifficulty) {
            setBattleStarted(true);
        }
    };

    const handleSubmitSolution = () => {
        console.log("Submitted solution:", {
            problemId: selectedProblem.id,
            language: selectedLanguage,
            code,
        });
        // Add submission logic here
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const getLanguageLabel = () =>
        languages.find((lang) => lang.value === selectedLanguage)?.label ||
        "Unknown";

    // Filter problems by selected difficulty
    const filteredProblems = mockProblems.filter(
        (problem) => problem.difficulty.toLowerCase() === selectedDifficulty
    );

    useEffect(() => {
        if (!battleStarted || !selectedProblem) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [battleStarted, selectedProblem]);

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
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar user={user} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Timer className="h-5 w-5 text-red-400" />
                            <span className="text-xl font-mono text-red-400">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Trophy className="h-5 w-5 text-yellow-400" />
                            <span className="text-gray-200">
                                {selectedProblem?.points || 0} points
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Language:</span>
                        <span className="font-medium text-gray-200">
                            {getLanguageLabel()}
                        </span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <ProblemList
                            problems={filteredProblems}
                            selectedProblem={selectedProblem}
                            onSelectProblem={setSelectedProblem}
                        />
                    </div>

                    <div className="space-y-4">
                        <CodeEditor
                            language={selectedLanguage}
                            initialCode={code}
                            onCodeChange={setCode}
                            height={
                                selectedProblem
                                    ? "calc(100vh - 20rem)"
                                    : "24rem"
                            }
                        />
                        {selectedProblem && (
                            <Button
                                onClick={handleSubmitSolution}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3"
                            >
                                <Sword className="mr-2 h-5 w-5" />
                                Submit Solution
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
