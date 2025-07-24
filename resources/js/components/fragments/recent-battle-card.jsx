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

    // Fungsi untuk warna status berdasarkan is_correct dari backend
    const getStatusColor = (isCorrect) => {
        return isCorrect ? "text-green-400" : "text-red-400";
    };

    // Fungsi untuk warna kesulitan, dibuat case-insensitive
    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return <div className="text-green-400">Easy</div>;
            case "medium":
                return <div className="text-yellow-400">Medium</div>;
            case "hard":
                return <div className="text-red-400">Hard</div>;
            default:
                return <div className="text-gray-400">Unknown</div>;
        }
    };

    // Format tanggal dan waktu dari `created_at`
    const battleDate = new Date(battle.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const battleTime = new Date(battle.created_at).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="relative p-1 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 shadow-2xl">
            <div className="relative bg-gray-900 rounded-xl">
                <Card className="bg-gray-900/95 border-0 rounded-xl backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-xl"></div>
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-xl text-center font-extrabold text-yellow-400">
                            {/* Gunakan data asli dari backend */}
                            {battle.question.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center text-sm text-gray-400 mb-3">
                                    <Code className="h-4 w-4 mr-1 text-cyan-400" />
                                    <span className="text-cyan-300">
                                        {/* Gunakan data asli dari backend */}
                                        {battle.question.language}
                                    </span>
                                    <span className="mx-2">•</span>
                                    {getDifficultyColor(
                                        battle.question.difficulty
                                    )}
                                     
                                </div>
                                <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700/95 backdrop-blur-sm">
                                    <h4 className="font-semibold text-blue-400 mb-2">
                                        Question:
                                    </h4>
                                    <p className="text-sm text-gray-300 whitespace-pre-wrap">
                                        {/* Gunakan data asli dari backend */}
                                        {battle.question.question}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800/70 p-3 rounded-lg border border-emerald-500/30">
                                    <div className="flex items-center text-sm text-gray-300 mb-1">
                                        <Sword className="h-4 w-4 mr-1 text-emerald-400" />{" "}
                                        Status
                                    </div>
                                    <p
                                        className={`font-medium ${getStatusColor(
                                            battle.is_correct
                                        )}`}
                                    >
                                        {/* Gunakan data asli dari backend */}
                                        {battle.status}
                                    </p>
                                </div>
                                <div className="bg-gray-800/70 p-3 rounded-lg border border-pink-500/30">
                                    <div className="flex items-center text-sm text-gray-300 mb-1">
                                        <Award className="h-4 w-4 mr-1 text-pink-400" />{" "}
                                        Points
                                    </div>
                                    <p className="font-medium text-pink-400">
                                        +{battle.score} pts
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-800/70 p-3 rounded-lg border border-yellow-500/30">
                                <div className="flex items-center text-sm text-gray-300 mb-1">
                                    <Clock className="h-4 w-4 mr-1 text-yellow-400" />{" "}
                                    Date & Time
                                </div>
                                <p className="font-medium text-yellow-400">
                                    {battleDate} at {battleTime}
                                </p>
                            </div>
                            <div className="bg-gray-800/70 p-4 rounded-lg border border-green-500/30">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-green-400">
                                        Your Answer:
                                    </h4>
                                    <button
                                        onClick={() =>
                                            setShowFullAnswer(!showFullAnswer)
                                        }
                                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center"
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
                                    className={`text-sm text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap ${
                                        !showFullAnswer ? "line-clamp-3" : ""
                                    }`}
                                >
                                    {/* Gunakan data asli dari backend */}
                                    {battle.user_answer}
                                </pre>
                            </div>
                            <div className="bg-gray-800/70 p-4 rounded-lg border border-amber-500/30">
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
                                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center"
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
                                    className={`text-sm text-gray-300 whitespace-pre-wrap ${
                                        !showFullFeedback ? "line-clamp-3" : ""
                                    }`}
                                >
                                    {/* Gunakan data asli dari backend */}
                                    {battle.feedback}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
