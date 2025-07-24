import { useState } from "react";
import { ChevronDown, ChevronUp, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ProblemList({
    problems,
    selectedProblem,
    onSelectProblem,
}) {
    const [expandedProblem, setExpandedProblem] = useState(null);

    const toggleExpand = (problemId) => {
        setExpandedProblem(expandedProblem === problemId ? null : problemId);
    };

    if (selectedProblem) {
        return (
            <Card className="bg-gray-900/50 border-gray-700 h-full">
                <CardHeader>
                    <CardTitle className="text-white">
                        {selectedProblem.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        <span
                            className={`text-sm px-2 py-1 rounded ${getDifficultyColor(
                                selectedProblem.difficulty
                            )}`}
                        >
                            {selectedProblem.difficulty}
                        </span>
                        <span className="text-sm text-yellow-400">
                            {selectedProblem.max_points} points
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2 text-white">
                            Description
                        </h3>
                        <p className="text-gray-200 whitespace-pre-line">
                            {selectedProblem.question}
                        </p>
                    </div>
                    {/* <div>
                        <h3 className="font-semibold mb-2 text-white">
                            Examples
                        </h3>
                        {selectedProblem.examples.map((example, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 p-3 rounded-lg mb-3"
                            >
                                <div className="text-sm">
                                    <div className="text-gray-400">Input:</div>
                                    <div className="font-mono text-gray-200">
                                        {example.input}
                                    </div>
                                    <div className="text-gray-400 mt-1">
                                        Output:
                                    </div>
                                    <div className="font-mono text-gray-200">
                                        {example.output}
                                    </div>
                                    <div className="text-gray-400 mt-1">
                                        Explanation:
                                    </div>
                                    <div className="text-gray-200">
                                        {example.explanation}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-white">
                            Constraints
                        </h3>
                        <ul className="text-gray-200 space-y-1">
                            {selectedProblem.constraints.map(
                                (constraint, index) => (
                                    <li key={index} className="text-sm">
                                        • {constraint}
                                    </li>
                                )
                            )}
                        </ul>
                    </div> */}
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {problems.map((problem) => (
                <Card
                    key={problem.id}
                    className="bg-gray-900/50 border-gray-700"
                >
                    <CardHeader
                        className="cursor-pointer"
                        onClick={() => toggleExpand(problem.id)}
                    >
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-white">
                                {problem.title}
                            </CardTitle>
                            {expandedProblem === problem.id ? (
                                <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <span
                                className={`text-xs px-2 py-1 rounded ${getDifficultyColor(
                                    problem.difficulty
                                )}`}
                            >
                                {problem.difficulty}
                            </span>
                            <span className="text-xs text-yellow-400">
                                {problem.points} points
                            </span>
                        </div>
                    </CardHeader>
                    {expandedProblem === problem.id && (
                        <CardContent className="pt-0 space-y-3">
                            <p className="text-gray-300 text-sm line-clamp-3">
                                {problem.description}
                            </p>
                            <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                onClick={() => onSelectProblem(problem)}
                            >
                                <Sword className="mr-2 h-4 w-4" />
                                Select Problem
                            </Button>
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    );
}

function getDifficultyColor(difficulty) {
    switch (difficulty) {
        case "easy":
            return "bg-green-900/20 text-green-400";
        case "medium":
            return "bg-yellow-900/20 text-yellow-400";
        case "hard":
            return "bg-red-900/20 text-red-400";
        default:
            return "bg-gray-900/20 text-gray-200";
    }
}
