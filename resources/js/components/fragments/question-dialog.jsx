import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Code,
    Trophy,
    AlertCircle,
    HardHat,
    Clock,
    Copy,
    Check,
    Edit,
} from "lucide-react";
import { useState } from "react";

const difficultyBadge = {
    easy: {
        bg: "bg-green-900/20",
        text: "text-green-400",
        icon: <Trophy className="h-5 w-5" />,
    },
    medium: {
        bg: "bg-yellow-900/20",
        text: "text-yellow-400",
        icon: <AlertCircle className="h-5 w-5" />,
    },
    hard: {
        bg: "bg-red-900/20",
        text: "text-red-400",
        icon: <HardHat className="h-5 w-5" />,
    },
};

export default function QuestionDialog({ question, open, onOpenChange }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(question.correctAnswer);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!question) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <DialogTitle className="text-2xl text-white mb-1">
                                {question.title}
                            </DialogTitle>
                            <div className="flex items-center space-x-3">
                                <div
                                    className={`flex items-center justify-center space-x-1 px-2 py-1 rounded-full ${
                                        difficultyBadge[question.difficulty].bg
                                    } ${
                                        difficultyBadge[question.difficulty]
                                            .text
                                    }`}
                                >
                                    {difficultyBadge[question.difficulty].icon}
                                    <span className="capitalize text-sm">
                                        {question.difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1 text-blue-400">
                                    <Code className="h-5 w-5" />
                                    <span className="text-sm">
                                        {question.language}
                                    </span>
                                </div>
                                <div className="text-purple-400 text-sm">
                                    {question.points} points
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <h3 className="font-semibold text-white">
                            Problem Statement
                        </h3>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                            <div className="max-h-[200px] overflow-y-auto">
                                <p className="whitespace-pre-line text-gray-300">
                                    {question.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-white">
                                Correct Solution
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300"
                                onClick={handleCopy}
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 mr-2" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copy Code
                                    </>
                                )}
                            </Button>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                            <div className="max-h-[200px] overflow-y-auto">
                                <pre className="font-mono text-sm text-gray-300">
                                    <code>{question.correctAnswer}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Question
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
