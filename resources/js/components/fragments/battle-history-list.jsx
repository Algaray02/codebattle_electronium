import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Code, Sword, Award } from "lucide-react";

export function BattleHistoryList({ battles }) {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "bg-green-400";
            case "Medium":
                return "bg-yellow-400";
            case "Hard":
                return "bg-red-400";
            default:
                return "bg-gray-400";
        }
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-yellow-400" />
                    <p className="text-xl font-extrabold text-yellow-400">
                        Battle History
                    </p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {battles.slice(1, 4).map((battle) => (
                        <div
                            key={battle.id}
                            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`w-3 h-3 rounded-full ${getDifficultyColor(
                                        battle.difficulty
                                    )}`}
                                />
                                <div>
                                    <h4 className="font-medium text-gray-100">
                                        {battle.problem}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {battle.language} • {battle.difficulty}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {battle.date} at {battle.time}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center bg-gray-800 px-2 py-1 rounded text-sm ml-auto">
                                <Award className="h-3 w-3 mr-1 text-yellow-400" />
                                <div className="text-gray-400 text-sm">
                                    +{battle.score}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </>
    );
}
