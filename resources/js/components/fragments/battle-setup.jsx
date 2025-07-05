import { motion } from "framer-motion";
import { Sword, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import Navbar from "./navbar";

export default function BattleSetupScreen({
    user,
    selectedLanguage,
    setSelectedLanguage,
    selectedDifficulty,
    setSelectedDifficulty,
    handleStartBattle,
    languages = [],
    difficulties = [],
}) {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar user={user} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Battle Arena
                        </h1>
                        <p className="text-xl text-gray-300">
                            Choose your language and difficulty
                        </p>
                    </div>

                    <Card className="bg-gray-900/50 border-gray-700 max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center text-white">
                                <Settings className="mr-2 h-5 w-5" />
                                Battle Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Programming Language
                                </label>
                                <Select
                                    value={selectedLanguage}
                                    onValueChange={setSelectedLanguage}
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

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Difficulty Level
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {difficulties.map((diff) => (
                                        <button
                                            key={diff.value}
                                            onClick={() =>
                                                setSelectedDifficulty(
                                                    diff.value
                                                )
                                            }
                                            className={`p-4 rounded-lg border-2 transition-colors ${
                                                selectedDifficulty ===
                                                diff.value
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

                            <Button
                                onClick={handleStartBattle}
                                disabled={
                                    !selectedLanguage || !selectedDifficulty
                                }
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3"
                            >
                                <Sword className="mr-2 h-5 w-5" />
                                Start Battle
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
