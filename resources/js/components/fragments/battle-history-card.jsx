import { Award } from "lucide-react";
export default function BattleHistoryCard({ battle }) {
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

    const getStatusColor = (status) => {
        return status === "Perfect" ? "text-green-400" : "text-yellow-400";
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
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
                        {battle.language} • {battle.difficulty} • {battle.date}{" "}
                        at {battle.time}
                    </p>
                </div>
            </div>
            <div className="flex items-center bg-gray-800 px-2 py-1 rounded text-sm ml-auto">
                <Award className="h-3 w-3 mr-1 text-yellow-400" />
                <div className="text-gray-400 text-sm">+{battle.score} pts</div>
            </div>
        </div>
    );
}
