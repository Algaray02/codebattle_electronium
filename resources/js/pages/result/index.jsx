import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import {
    CheckCircle,
    XCircle,
    Clock,
    Trophy,
    ArrowRight,
    RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/fragments/navbar";
import CodeEditor from "@/components/fragments/code-editor";

// Mock user data
const user = {
    name: "Alex Johnson",
    points: 475,
    rank: "Epic",
};

// Mock result data
const result = {
    problem: "Two Sum",
    language: "JavaScript",
    difficulty: "Easy",
    maxPoints: 10,
    earnedPoints: 8,
    status: "Partially Correct",
    timeSpent: "12:34",
    testCases: {
        passed: 7,
        total: 10,
    },
    code: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
    feedback: {
        strengths: [
            "Good use of HashMap for O(1) lookup",
            "Clean and readable code structure",
            "Proper variable naming conventions",
        ],
        improvements: [
            "Consider edge cases for empty arrays",
            "Add input validation for better robustness",
            "Handle case when no solution exists",
        ],
        aiSuggestion:
            "Your solution demonstrates a solid understanding of hash tables. To improve, consider adding input validation and handling edge cases more explicitly.",
    },
};

export default function ResultPage() {
    const successRate =
        (result.testCases.passed / result.testCases.total) * 100;

    const getResultIcon = () => {
        if (result.earnedPoints === result.maxPoints) {
            return <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />;
        }
        if (result.earnedPoints > 0) {
            return <Trophy className="h-16 w-16 text-yellow-400 mx-auto" />;
        }
        return <XCircle className="h-16 w-16 text-red-400 mx-auto" />;
    };

    const getResultMessage = () => {
        if (result.earnedPoints === result.maxPoints)
            return "Perfect Solution!";
        if (result.earnedPoints > 0) return "Good Effort!";
        return "Keep Practicing!";
    };

    const getDifficultyColor = () => {
        switch (result.difficulty) {
            case "Easy":
                return "bg-green-400/20 text-green-400";
            case "Medium":
                return "bg-yellow-400/20 text-yellow-400";
            case "Hard":
                return "bg-red-400/20 text-red-400";
            default:
                return "bg-gray-400/20 text-white";
        }
    };

    const ScoreCard = ({
        icon: Icon,
        title,
        value,
        subtitle,
        color,
        delay,
    }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
        >
            <Card className="bg-gray-900/50 border-gray-700 text-center text-white">
                <CardContent className="p-6">
                    <Icon className={`h-8 w-8 ${color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-gray-400">{title}</div>
                    <div className="text-sm text-gray-500">{subtitle}</div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const FeedbackList = ({ title, items, icon: Icon, color }) => (
        <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
                <CardTitle className={`${color} flex items-center`}>
                    <Icon className="mr-2 h-5 w-5" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="text-gray-300 flex items-start"
                        >
                            <span className={`${color} mr-2`}>•</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar user={user} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-4"
                        >
                            {getResultIcon()}
                        </motion.div>
                        <h1 className="text-4xl font-bold mb-2">
                            Battle Complete!
                        </h1>
                        <p className="text-xl text-gray-300">
                            {getResultMessage()}
                        </p>
                    </div>

                    {/* Score Summary */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8 ">
                        <ScoreCard
                            icon={Trophy}
                            title="Points Earned"
                            value={result.earnedPoints}
                            subtitle={`out of ${result.maxPoints}`}
                            color="text-yellow-400"
                            delay={0.1}
                        />
                        <ScoreCard
                            icon={CheckCircle}
                            title="Success Rate"
                            value={`${successRate.toFixed(0)}%`}
                            subtitle={`${result.testCases.passed}/${result.testCases.total} tests`}
                            color="text-green-400"
                            delay={0.2}
                        />
                        <ScoreCard
                            icon={Clock}
                            title="Time Spent"
                            value={result.timeSpent}
                            subtitle={`${result.difficulty} Problem`}
                            color="text-blue-400"
                            delay={0.3}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Card className="bg-gray-900/50 border-gray-700 text-center text-white">
                                <CardContent className="p-6">
                                    <div
                                        className={`h-8 w-8 mx-auto mb-2 flex rounded-lg items-center justify-center ${getDifficultyColor()}`}
                                    >
                                        <span className="font-bold text-sm">
                                            {result.difficulty}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {result.difficulty}
                                    </div>
                                    <div className="text-gray-400">
                                        Difficulty
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {result.problem}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Your Solution */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <Card className="bg-gray-900/50 border-gray-700 text-white">
                                <CardHeader>
                                    <CardTitle>Your Solution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CodeEditor
                                        language={result.language}
                                        initialCode={result.code}
                                        readOnly={true}
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* AI Feedback */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="space-y-6"
                        >
                            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                                            <span className="text-sm font-bold">
                                                AI
                                            </span>
                                        </div>
                                        AI Feedback
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300">
                                        {result.feedback.aiSuggestion}
                                    </p>
                                </CardContent>
                            </Card>

                            <FeedbackList
                                title="Strengths"
                                items={result.feedback.strengths}
                                icon={CheckCircle}
                                color="text-green-400"
                            />

                            <FeedbackList
                                title="Areas for Improvement"
                                items={result.feedback.improvements}
                                icon={ArrowRight}
                                color="text-yellow-400"
                            />
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                    >
                        <Link href="/battle">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Try Another Battle
                            </Button>
                        </Link>
                        <Link href="/profile">
                            <Button
                                variant="outline"
                                className="border-gray-600 text-pink-600 hover:bg-gray-300 hover:text-pink-800"
                            >
                                Back to Profile
                            </Button>
                        </Link>
                        <Link href="/leaderboard">
                            <Button
                                variant="outline"
                                className="border-gray-600 text-pink-600 hover:bg-gray-300 hover:text-pink-800"
                            >
                                View Leaderboard
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
