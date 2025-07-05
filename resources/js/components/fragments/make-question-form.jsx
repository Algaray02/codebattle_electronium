"use client";

import { useState } from "react";
import { Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const languages = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "Cpp", label: "C++" },
    { value: "Csharp", label: "C#" },
];

const difficulties = [
    { value: "easy", label: "Easy", points: 10, color: "text-green-400" },
    { value: "medium", label: "Medium", points: 25, color: "text-yellow-400" },
    { value: "hard", label: "Hard", points: 50, color: "text-red-400" },
];

export function MakeQuestionForm({ onSubmit, isLoading }) {
    const [language, setLanguage] = useState("");
    const [difficulty, setDifficulty] = useState("medium");
    const [prompt, setPrompt] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ language, difficulty, prompt });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center text-white text-2xl">
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate New Question
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-white">
                                Programming Language
                            </Label>
                            <Select
                                value={language}
                                onValueChange={setLanguage}
                            >
                                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                                    {languages.map((lang) => (
                                        <SelectItem
                                            key={lang.value}
                                            value={lang.value}
                                        >
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white">
                                Difficulty Level
                            </Label>
                            <div className="grid grid-cols-3 gap-4">
                                {difficulties.map((diff) => (
                                    <button
                                        key={diff.value}
                                        type="button"
                                        onClick={() =>
                                            setDifficulty(diff.value)
                                        }
                                        className={`p-4 rounded-lg border-2 transition-colors ${
                                            difficulty === diff.value
                                                ? "border-purple-500 bg-purple-900/20"
                                                : "border-gray-600 bg-gray-800/50 hover:border-gray-500"
                                        }`}
                                    >
                                        <div
                                            className={`text-lg font-semibold ${diff.color}`}
                                        >
                                            {diff.label}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {diff.points} points
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="prompt" className="text-white">
                                Additional Prompt
                            </Label>
                            <Textarea
                                id="prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="min-h-[120px] bg-gray-800 border-gray-600 text-white"
                                placeholder="Describe what kind of problem you want to generate (e.g. 'array manipulation problem with O(n) solution')"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3"
                            disabled={!language || isLoading}
                        >
                            {isLoading ? (
                                <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
                            ) : (
                                <Wand2 className="h-5 w-5 mr-2" />
                            )}
                            Generate Question
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
