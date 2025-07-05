// components/fragments/recent-battle-card.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Code,
    Sword,
    Award,
    Clock,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

export function RecentBattleCard({ battle }) {
    const [showFullAnswer, setShowFullAnswer] = useState(false);
    const [showFullFeedback, setShowFullFeedback] = useState(false);

    // Mock data - ini akan diganti dengan data dari backend
    const questionDetails = {
        question:
            "Implement a function that takes an array of integers and returns the sum of all even numbers squared.",
        answer: "function sumEvenSquared(arr) {\n  return arr\n    .filter(num => num % 2 === 0)\n    .map(num => num ** 2)\n    .reduce((sum, num) => sum + num, 0);\n}",
        feedback:
            "Good solution! You correctly used filter, map, and reduce. One improvement would be to handle edge cases like empty array input which you already do with the initial value 0 in reduce.",
    };

    const getStatusColor = (status) => {
        return status === "Perfect" ? "text-green-400" : "text-yellow-400";
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return <div className="text-green-400"> Easy</div>;
            case "Medium":
                return <div className="text-yellow-400"> Medium</div>;
            case "Hard":
                return <div className="text-red-400"> Hard</div>;
            default:
                return <div className="text-gray-400"> Unknown</div>;
        }
    };

    return (
        <div className="relative p-1 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 shadow-2xl">
            {/* Inner card with second border layer */}
            <div className="relative bg-gray-900 rounded-xl">
                <Card className="bg-gray-900/95 border-0 rounded-xl backdrop-blur-sm relative overflow-hidden">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-xl"></div>

                    <CardHeader className="relative z-10">
                        <CardTitle className="text-xl text-center font-extrabold text-transparent text-yellow-400">
                            {battle.problem}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="space-y-4">
                            {/* Question Section */}
                            <div>
                                <div className="flex items-center text-sm text-gray-400 mb-3">
                                    <Code className="h-4 w-4 mr-1 text-cyan-400" />
                                    <span className="text-cyan-300">
                                        {battle.language}
                                    </span>{" "}
                                    •{"  "}
                                    {getDifficultyColor(battle.difficulty)}
                                </div>
                                <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/95 backdrop-blur-sm">
                                    <h4 className="font-semibold text-blue-400 mb-2">
                                        Question:
                                    </h4>
                                    <p className="text-sm text-gray-300">
                                        {questionDetails.question}
                                    </p>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800/70 p-3 rounded-lg border border-emerald-500/30 backdrop-blur-sm hover:border-emerald-400/50 transition-colors">
                                    <div className="flex items-center text-sm text-gray-300 mb-1">
                                        <Sword className="h-4 w-4 mr-1 text-emerald-400" />
                                        Status
                                    </div>
                                    <p
                                        className={`font-medium ${getStatusColor(
                                            battle.status
                                        )}`}
                                    >
                                        {battle.status}
                                    </p>
                                </div>
                                <div className="bg-gray-800/70 p-3 rounded-lg border border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-colors">
                                    <div className="flex items-center text-sm text-gray-300 mb-1">
                                        <Award className="h-4 w-4 mr-1 text-pink-400" />
                                        Points
                                    </div>
                                    <p className="font-medium text-pink-400">
                                        +{battle.score} pts
                                    </p>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="bg-gray-800/70 p-3 rounded-lg border border-yellow-500/30 backdrop-blur-sm hover:border-yellow-400/50 transition-colors">
                                <div className="flex items-center text-sm text-gray-300 mb-1">
                                    <Clock className="h-4 w-4 mr-1 text-yellow-400" />
                                    Date & Time
                                </div>
                                <p className="font-medium text-yellow-400">
                                    {battle.date} at {battle.time}
                                </p>
                            </div>

                            {/* Answer Section with Read More */}
                            <div className="bg-gray-800/70 p-4 rounded-lg border border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition-colors">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-green-400">
                                        Your Answer:
                                    </h4>
                                    <button
                                        onClick={() =>
                                            setShowFullAnswer(!showFullAnswer)
                                        }
                                        className="text-xs text-purple-400 hover:text-purple-300 hover:underline flex items-center transition-colors"
                                    >
                                        {showFullAnswer ? (
                                            <>
                                                Show less{" "}
                                                <ChevronUp className="ml-1 h-3 w-3" />
                                            </>
                                        ) : (
                                            <>
                                                Read more{" "}
                                                <ChevronDown className="ml-1 h-3 w-3" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre
                                    className={`text-sm text-gray-300 font-mono overflow-x-auto ${
                                        !showFullAnswer ? "line-clamp-3" : ""
                                    }`}
                                >
                                    {questionDetails.answer}
                                </pre>
                            </div>

                            {/* Feedback Section with Read More */}
                            <div className="bg-gray-800/70 p-4 rounded-lg border border-amber-500/30 backdrop-blur-sm hover:border-amber-400/50 transition-colors">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-amber-400">
                                        Feedback:
                                    </h4>
                                    <button
                                        onClick={() =>
                                            setShowFullFeedback(
                                                !showFullFeedback
                                            )
                                        }
                                        className="text-xs text-purple-400 hover:text-purple-300 hover:underline flex items-center transition-colors"
                                    >
                                        {showFullFeedback ? (
                                            <>
                                                Show less{" "}
                                                <ChevronUp className="ml-1 h-3 w-3" />
                                            </>
                                        ) : (
                                            <>
                                                Read more{" "}
                                                <ChevronDown className="ml-1 h-3 w-3" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p
                                    className={`text-sm text-gray-300 ${
                                        !showFullFeedback ? "line-clamp-3" : ""
                                    }`}
                                >
                                    {questionDetails.feedback}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
