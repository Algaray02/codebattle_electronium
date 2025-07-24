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

export function MakeQuestionForm({
    onSubmit,
    isLoading,
    difficulties,
    languages,
    data,
    setData,
    errors,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
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
                                value={data.language}
                                onValueChange={(value) =>
                                    setData("language", value)
                                }
                                required
                            >
                                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                                    {languages.map((lang) => (
                                        <SelectItem
                                            key={`lang-${lang}`}
                                            value={lang}
                                        >
                                            {lang}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.language && (
                                <p className="text-red-500 text-sm">
                                    {errors.language}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white">
                                Difficulty Level
                            </Label>
                            <div className="grid grid-cols-3 gap-4">
                                {difficulties.map((diff) => (
                                    <button
                                        key={`diff-${diff}`}
                                        type="button"
                                        onClick={() =>
                                            setData("difficulty", diff)
                                        }
                                        className={`p-4 rounded-lg border-2 transition-colors ${
                                            data.difficulty === diff
                                                ? "border-purple-500 bg-purple-900/20"
                                                : "border-gray-600 bg-gray-800/50 hover:border-gray-500"
                                        }`}
                                    >
                                        <div
                                            className={`text-lg font-semibold ${
                                                diff === "easy"
                                                    ? "text-green-400"
                                                    : diff === "medium"
                                                    ? "text-yellow-400"
                                                    : "text-red-400"
                                            }`}
                                        >
                                            {diff.charAt(0).toUpperCase() +
                                                diff.slice(1)}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {diff === "easy"
                                                ? "10"
                                                : diff === "medium"
                                                ? "25"
                                                : "50"}{" "}
                                            points
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {errors.difficulty && (
                                <p className="text-red-500 text-sm">
                                    {errors.difficulty}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="prompt" className="text-white">
                                Additional Prompt
                            </Label>
                            <Textarea
                                id="prompt"
                                value={data.prompt}
                                onChange={(e) =>
                                    setData("prompt", e.target.value)
                                }
                                className="min-h-[120px] bg-gray-800 border-gray-600 text-white"
                                placeholder="Describe what kind of problem you want to generate (e.g. 'array manipulation problem with O(n) solution')"
                            />
                            {errors.prompt && (
                                <p className="text-red-500 text-sm">
                                    {errors.prompt}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3"
                            disabled={!data.language || isLoading}
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
