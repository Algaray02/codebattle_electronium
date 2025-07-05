import { motion } from "framer-motion";
import {
    Calendar,
    Trophy,
    Target,
    TrendingUp,
    Clock,
    Code,
    Award,
    Swords,
    Crown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/fragments/navbar";
import { RankBadge } from "@/components/fragments/rank-badge";
import BattleHistoryCard from "@/components/fragments/battle-history-card";
import LanguageStatCard from "@/components/fragments/language-stat-card";
import EditableAvatar from "@/components/fragments/editable-avatar";
import EditProfileDialog from "@/components/fragments/edit-profile-dialog";
import { RecentBattleCard } from "@/components/fragments/recent-battle-card";
import { RankWinrateCard } from "@/components/fragments/rank-winrate-card";
import { BattleHistoryList } from "@/components/fragments/battle-history-list";
import { LanguagePieChart } from "@/components/fragments/language-pie-chart";

// Mock user data
const user = {
    name: "King Akbar",
    email: "akbar.king@example.com",
    imageUrl:
        "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    points: 701,
    rank: "Legend",
    joinDate: "2024-01-01",
    totalMatches: 23,
    battlesTotal: 31,
    winRate: 80,
    highestRank: "Legend",
    favoriteLanguage: "JavaScript",
    totalTimeSpent: "24h 32m",
};

const recentBattle = {
    id: 1,
    problem: "Two Sum",
    language: "JavaScript",
    difficulty: "Easy",
    score: 100,
    status: "Perfect",
    date: "2024-01-15",
    time: "08:45",
    question:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    answer: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
    feedback:
        "Excellent solution! Your implementation has O(n) time complexity which is optimal for this problem. The use of a Map to store complements is very efficient.",
};

// Mock battle history data
const battleHistory = [
    {
        id: 1,
        problem: "Two Sum",
        language: "JavaScript",
        difficulty: "Easy",
        score: 10,
        status: "Perfect",
        date: "2024-01-15",
        time: "08:45",
    },
    {
        id: 2,
        problem: "Binary Tree Traversal",
        language: "Python",
        difficulty: "Medium",
        score: 20,
        status: "Partial",
        date: "2024-01-14",
        time: "15:23",
    },
    {
        id: 3,
        problem: "Dynamic Programming",
        language: "Java",
        difficulty: "Hard",
        score: 45,
        status: "Perfect",
        date: "2024-01-13",
        time: "22:17",
    },
    {
        id: 4,
        problem: "Graph Algorithms",
        language: "C++",
        difficulty: "Hard",
        score: 35,
        status: "Partial",
        date: "2024-01-12",
        time: "18:30",
    },
    {
        id: 5,
        problem: "String Manipulation",
        language: "Python",
        difficulty: "Medium",
        score: 25,
        status: "Perfect",
        date: "2024-01-11",
        time: "12:15",
    },
    {
        id: 6,
        problem: "Array Sorting",
        language: "JavaScript",
        difficulty: "Easy",
        score: 8,
        status: "Partial",
        date: "2024-01-10",
        time: "09:22",
    },
];

// Mock language stats data
const languageStats = [
    {
        language: "JavaScript",
        battles: 20,
        totalPoint: 158,
        color: "text-yellow-500",
        easyAvg: 12,
        mediumAvg: 6,
        hardAvg: 2,
    },
    {
        language: "Python",
        battles: 12,
        totalPoint: 125,
        color: "text-blue-500",
        easyAvg: 7,
        mediumAvg: 2,
        hardAvg: 3,
    },
    {
        language: "Java",
        battles: 6,
        totalPoint: 67,
        color: "text-blue-50",
        easyAvg: 4,
        mediumAvg: 2,
        hardAvg: 0,
    },
    {
        language: "Cpp",
        battles: 5,
        totalPoint: 60,
        color: "text-purple-500",
        easyAvg: 3,
        mediumAvg: 1,
        hardAvg: 1,
    },
    {
        language: "Go",
        battles: 15,
        totalPoint: 87,
        color: "text-cyan-500",
        easyAvg: 6,
        mediumAvg: 6,
        hardAvg: 3,
    },
    {
        language: "HTML",
        battles: 23,
        totalPoint: 204,
        color: "text-orange-500",
        easyAvg: 13,
        mediumAvg: 7,
        hardAvg: 3,
    },
];

// Enhanced Card Wrapper Component
const EnhancedCard = ({
    children,
    className = "",
    gradientFrom = "purple",
    gradientTo = "cyan",
    padding = "",
}) => {
    const getGradientColors = (from, to) => {
        const gradientMap = {
            purple: "from-purple-500",
            pink: "from-pink-500",
            cyan: "from-cyan-500",
            blue: "from-blue-500",
            emerald: "from-emerald-500",
            yellow: "from-yellow-500",
            orange: "from-orange-500",
        };

        const toMap = {
            purple: "to-purple-500",
            pink: "to-pink-500",
            cyan: "to-cyan-500",
            blue: "to-blue-500",
            emerald: "to-emerald-500",
            yellow: "to-yellow-500",
            orange: "to-orange-500",
        };

        return `${gradientMap[from] || gradientMap.purple} ${
            toMap[to] || toMap.cyan
        }`;
    };

    const gradientClass = getGradientColors(gradientFrom, gradientTo);

    return (
        <div
            className={`p-[2px] rounded-xl bg-gradient-to-br ${gradientClass} ${className}`}
        >
            <div className={`rounded-xl bg-gray-900 ${padding}`}>
                {children}
            </div>
        </div>
    );
};

export default function ProfilePage() {
    const stats = [
        {
            label: "Total Points",
            value: user.points,
            icon: Trophy,
            color: "text-yellow-400",
            gradient: { from: "yellow", to: "orange" },
        },
        {
            label: "Total Matches",
            value: user.totalMatches,
            icon: Swords,
            color: "text-green-400",
            gradient: { from: "emerald", to: "cyan" },
        },
        {
            label: "Favorite Language",
            value: user.favoriteLanguage,
            icon: Code,
            color: "text-blue-400",
            gradient: { from: "blue", to: "purple" },
        },
        {
            label: "Highest Rank",
            value: user.highestRank,
            icon: Crown,
            color: "text-orange-400",
            gradient: { from: "orange", to: "pink" },
        },
    ];

    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("");

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar user={user} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Profile Header Card */}
                    <EnhancedCard
                        gradientFrom="purple"
                        gradientTo="pink"
                        className="mb-8"
                    >
                        <div className="p-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                <EditableAvatar
                                    name={user.name}
                                    imageUrl={user.imageUrl}
                                />
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                                        {user.name}
                                    </h1>
                                    <p className="text-gray-400 mb-3">
                                        {user.email}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="text-sm text-gray-400">
                                            Member since{" "}
                                            {new Date(
                                                user.joinDate
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <EditProfileDialog
                                        user={user}
                                        onSave={(data) =>
                                            console.log(
                                                "Update user data:",
                                                data
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </EnhancedCard>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                }}
                            >
                                <EnhancedCard
                                    gradientFrom={stat.gradient.from}
                                    gradientTo={stat.gradient.to}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-pink-400 text-sm">
                                                    {stat.label}
                                                </p>
                                                <p className="text-2xl text-white font-bold">
                                                    {stat.value}
                                                </p>
                                            </div>
                                            <stat.icon
                                                className={`h-8 w-8 ${stat.color}`}
                                            />
                                        </div>
                                    </div>
                                </EnhancedCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Recent Battle */}
                        <div className="lg:col-span-2 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <RecentBattleCard battle={recentBattle} />
                            </motion.div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Rank & Winrate Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <EnhancedCard
                                    gradientFrom="purple"
                                    gradientTo="pink"
                                >
                                    <RankWinrateCard
                                        rank={user.rank}
                                        winRate={user.winRate}
                                        points={user.points}
                                    />
                                </EnhancedCard>
                            </motion.div>

                            {/* Battle History List */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <EnhancedCard
                                    gradientFrom="purple"
                                    gradientTo="pink"
                                >
                                    <BattleHistoryList
                                        battles={battleHistory}
                                    />
                                </EnhancedCard>
                            </motion.div>
                        </div>

                        {/* Language Statistics Chart */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <EnhancedCard
                                    gradientFrom="purple"
                                    gradientTo="pink"
                                    padding="p-6"
                                >
                                    <LanguagePieChart data={languageStats} />
                                </EnhancedCard>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
