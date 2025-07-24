"use client";

import { useState } from "react";

import {
    Save,
    Wand2,
    Edit,
    Check,
    X,
    Code,
    HardHat,
    AlertCircle,
    Trophy,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const difficultyConfig = {
    easy: {
        bg: "bg-green-900/20",
        text: "text-green-400",
        icon: <Trophy className="h-4 w-4" />,
        border: "border-green-500/30",
    },
    medium: {
        bg: "bg-yellow-900/20",
        text: "text-yellow-400",
        icon: <AlertCircle className="h-4 w-4" />,
        border: "border-yellow-500/30",
    },
    hard: {
        bg: "bg-red-900/20",
        text: "text-red-400",
        icon: <HardHat className="h-4 w-4" />,
        border: "border-red-500/30",
    },
};

export function AIQuestionResult({
    question,
    onSave,
    onRetry,
    isSaving,
    isLoading,
    isEditing,
    setIsEditing,
}) {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const hasChanges =
        JSON.stringify(editedQuestion) !== JSON.stringify(question);

    const handleSave = () => {
        onSave(question);
    };

    const handleSaveChanges = () => {
        onSave(editedQuestion);
        setIsEditing(false);
    };

    const handleEditToggle = () => {
        if (isEditing) {
            setEditedQuestion(question);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="bg-gray-900/50 border-gray-700">
                <div className="flex justify-between items-center border-b border-gray-700">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center text-white text-2xl">
                            <Wand2 className="mr-2 h-6 w-6 text-purple-400" />
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                AI Generated Question
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={handleEditToggle}
                        className="mr-4 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
                    >
                        {isEditing ? (
                            <X className="h-4 w-4 mr-1" />
                        ) : (
                            <Edit className="h-4 w-4 mr-1" />
                        )}
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>

                <CardContent className="pt-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-gray-300">Title</Label>
                            {isEditing ? (
                                <Input
                                    value={editedQuestion.title}
                                    onChange={(e) =>
                                        setEditedQuestion({
                                            ...editedQuestion,
                                            title: e.target.value,
                                        })
                                    }
                                    className="bg-gray-800 border-gray-600 text-white text-lg font-medium"
                                />
                            ) : (
                                <h3 className="text-xl font-bold text-white">
                                    {question.title}
                                </h3>
                            )}
                        </div>

                        {/* Language and Difficulty */}
                        <div className="flex flex-wrap gap-4">
                            <div className="space-y-2 flex-1 min-w-[200px]">
                                <Label className="text-gray-300">
                                    Language
                                </Label>

                                <div
                                    className={`flex items-center gap-2 p-2 rounded-lg ${
                                        difficultyConfig[question.difficulty]
                                            .border
                                    }`}
                                >
                                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-800 font-mono font-bold text-xs text-blue-500">
                                        <Code />
                                    </div>
                                    <span className="font-medium text-white">
                                        {question.language}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 flex-1 min-w-[200px]">
                                <Label className="text-gray-300">
                                    Difficulty
                                </Label>

                                <div
                                    className={`flex items-center gap-2  rounded-lg  ${
                                        difficultyConfig[question.difficulty]
                                            .border
                                    }`}
                                >
                                    <div
                                        className={`flex items-center justify-center w-8 h-8 rounded-md bg-gray-800 ${
                                            difficultyConfig[
                                                question.difficulty
                                            ].text
                                        }`}
                                    >
                                        {
                                            difficultyConfig[
                                                question.difficulty
                                            ].icon
                                        }
                                    </div>
                                    <div>
                                        <span
                                            className={`block font-medium capitalize ${
                                                difficultyConfig[
                                                    question.difficulty
                                                ].text
                                            }`}
                                        >
                                            {question.difficulty}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {difficultyConfig[
                                                question.difficulty
                                            ].bg.includes("green")
                                                ? "10"
                                                : difficultyConfig[
                                                      question.difficulty
                                                  ].bg.includes("yellow")
                                                ? "25"
                                                : "50"}{" "}
                                            points
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Problem Description */}
                        <div className="space-y-2">
                            <Label className="text-gray-300">
                                Problem Description
                            </Label>
                            {isEditing ? (
                                <Textarea
                                    value={editedQuestion.description}
                                    onChange={(e) =>
                                        setEditedQuestion({
                                            ...editedQuestion,
                                            description: e.target.value,
                                        })
                                    }
                                    className="min-h-[200px] bg-gray-800 border-gray-600 text-white font-mono text-sm"
                                />
                            ) : (
                                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                    <pre className="whitespace-pre-wrap text-gray-200 font-mono text-sm">
                                        {question.description}
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Correct Answer */}
                        <div className="space-y-2">
                            <Label className="text-gray-300">
                                Correct Answer
                            </Label>
                            {isEditing ? (
                                <Textarea
                                    value={editedQuestion.correctAnswer}
                                    onChange={(e) =>
                                        setEditedQuestion({
                                            ...editedQuestion,
                                            correctAnswer: e.target.value,
                                        })
                                    }
                                    className="min-h-[150px] bg-gray-800 border-gray-600 text-white font-mono text-sm"
                                />
                            ) : (
                                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 overflow-x-auto">
                                    <pre className="text-green-400 font-mono text-sm">
                                        {question.correctAnswer}
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                variant="outline"
                                onClick={onRetry}
                                className="border-gray-600 text-purple-600 "
                                disabled={isEditing || isLoading} // Disable when editing
                            >
                                {isLoading ? (
                                    <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                                ) : (
                                    <Wand2 className="h-4 w-4 mr-2" />
                                )}
                                Regenerate
                            </Button>

                            {isEditing ? (
                                <Button
                                    onClick={handleSaveChanges}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                    disabled={isSaving || !hasChanges}
                                >
                                    {isSaving ? (
                                        <Check className="h-4 w-4 mr-2 animate-pulse" />
                                    ) : (
                                        <Save className="h-4 w-4 mr-2" />
                                    )}
                                    Save Changes
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSave}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <Check className="h-4 w-4 mr-2 animate-pulse" />
                                    ) : (
                                        <Save className="h-4 w-4 mr-2" />
                                    )}
                                    Save Question
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
