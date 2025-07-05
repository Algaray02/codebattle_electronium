import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Crown,
    Award,
    Star,
    Zap,
    Flame,
    Gem,
    Trophy,
    Infinity,
} from "lucide-react";

function getRankConfig(rank) {
    switch (rank) {
        case "Bronze":
            return {
                color: "from-amber-600 to-amber-800",
                icon: Award,
                bg: "bg-amber-900/20",
                text: "text-amber-500",
            };
        case "Silver":
            return {
                color: "from-gray-400 to-gray-600",
                icon: Star,
                bg: "bg-gray-900/20",
                text: "text-gray-500",
            };
        case "Master":
            return {
                color: "from-blue-400 to-blue-600",
                icon: Zap,
                bg: "bg-blue-900/20",
                text: "text-blue-500",
            };
        case "Epic":
            return {
                color: "from-purple-400 to-purple-600",
                icon: Flame,
                bg: "bg-purple-900/20",
                text: "text-purple-500",
            };
        case "Legend":
            return {
                color: "from-red-400 to-red-600",
                icon: Crown,
                bg: "bg-red-900/20",
                text: "text-red-500",
            };
        case "Honor":
            return {
                color: "from-green-400 to-green-600",
                icon: Gem,
                bg: "bg-green-900/20",
                text: "text-green-500",
            };
        case "Glory":
            return {
                color: "from-yellow-400 to-yellow-600",
                icon: Trophy,
                bg: "bg-yellow-900/20",
                text: "text-yellow-500",
            };
        case "Immortal":
            return {
                color: "from-pink-400 to-purple-600",
                icon: Infinity,
                bg: "bg-gradient-to-r from-pink-900/20 to-purple-900/20",
                text: "text-pink-500",
            };
        default:
            return {
                color: "from-amber-600 to-amber-800",
                icon: Award,
                bg: "bg-amber-900/20",
                text: "text-amber-500",
            };
    }
}

export function RankWinrateCard({ rank, winRate, points }) {
    const config = getRankConfig(rank);
    const Icon = config.icon;
    const winRateDashArray = `${winRate * 2.83} 283`;

    return (
        <>
            <svg width="0" height="0">
                <defs>
                    <linearGradient
                        id="winrateGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                    <linearGradient
                        id="pointsGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                </defs>
            </svg>

            <CardHeader>
                <CardTitle className="text-xl font-extrabold text-orange-400">
                    Current Stats
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    {/* Rank Circle */}
                    <div className="flex flex-col items-center">
                        <div
                            className={`h-20 w-20 rounded-full ${config.bg} border border-gray-700 flex items-center justify-center mb-2`}
                        >
                            <Icon
                                className={`h-8 w-8 bg-gradient-to-r ${config.color} bg-clip-text ${config.text}`}
                            />
                        </div>
                        <span className="text-xs text-gray-400">Rank</span>
                        <span
                            className={`text-sm font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}
                        >
                            {rank}
                        </span>
                    </div>

                    {/* Winrate Circle */}
                    <div className="flex flex-col items-center">
                        <div className="h-20 w-20 rounded-full bg-green-900/20 border border-gray-700 flex items-center justify-center mb-2">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                                    <span className="text-lg font-bold text-green-400">
                                        {winRate}%
                                    </span>
                                </div>
                                <svg
                                    className="absolute w-full h-full"
                                    viewBox="0 0 100 100"
                                >
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#1F2937"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="url(#winrateGradient)"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={winRateDashArray}
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400">Win Rate</span>
                        <span className="text-sm font-bold text-green-400">
                            {winRate}%
                        </span>
                    </div>

                    {/* Points Circle */}
                    <div className="flex flex-col items-center">
                        <div className="h-20 w-20 rounded-full bg-purple-900/20 border border-gray-700 flex items-center justify-center mb-2">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                                    <span className="text-lg font-bold text-purple-400">
                                        {points >= 1000
                                            ? `${(points / 1000).toFixed(1)}k`
                                            : points}
                                    </span>
                                </div>
                                <svg
                                    className="absolute w-full h-full"
                                    viewBox="0 0 100 100"
                                >
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#1F2937"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="url(#pointsGradient)"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray="283 283"
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400">
                            Total Points
                        </span>
                        <span className="text-sm font-bold text-purple-400">
                            {points.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </>
    );
}
