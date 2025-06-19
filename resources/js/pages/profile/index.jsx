import { motion } from "framer-motion"
import { Calendar, Trophy, Target, TrendingUp, Clock, Code, Award, Swords, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/fragments/navbar"
import { RankBadge } from "@/components/fragments/rank-badge"
import BattleHistoryCard from "@/components/fragments/battle-history-card"
import LanguageStatCard from "@/components/fragments/language-stat-card"

// Mock user data
const user = {
    name: "King Akbar",
    email: "akbar.king@example.com",
    points: 475,
    rank: "Epic",
    joinDate: "2024-01-01",
    totalMatches: 23,
    battlesTotal: 31,
    winRate: 74,
    highestRank: "Legend",
    favoriteLanguage: "JavaScript",
    totalTimeSpent: "24h 32m",
}

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
]

// Mock language stats data
const languageStats = [
    { language: "JavaScript", battles: 12, totalPoint: 83, color: "bg-yellow-500" },
    { language: "Python", battles: 8, totalPoint: 75, color: "bg-blue-500" },
    { language: "Java", battles: 6, totalPoint: 67, color: "bg-red-500" },
    { language: "C++", battles: 5, totalPoint: 60, color: "bg-purple-500" },
]

export default function ProfilePage() {
    const stats = [
        { label: "Total Points", value: user.points, icon: Trophy, color: "text-yellow-400" },
        { label: "Total Matches", value: user.totalMatches, icon: Swords, color: "text-green-400" },
        { label: "Favorite Language", value: user.favoriteLanguage, icon: Code, color: "text-blue-400" },
        { label: "Highest Rank", value: user.highestRank, icon: Crown, color: "text-orange-400" },
    ]

    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar user={user} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-8 mb-8 border border-gray-700">
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-3xl">
                                {getInitials(user.name)}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                                <p className="text-gray-400 mb-3">{user.email}</p>
                                <div className="flex flex-wrap items-center gap-4">
                                    <RankBadge rank={user.rank} points={user.points} />
                                    <div className="text-sm text-gray-400">
                                        Member since {new Date(user.joinDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-pink-400 text-sm">{stat.label}</p>
                                                <p className="text-2xl text-purple-400 font-bold">{stat.value}</p>
                                            </div>
                                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Clock className="mr-2 h-5 w-5 text-yellow-400" />
                                            <p className="text-xl font-extrabold text-yellow-400">Battle History</p>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {battleHistory.map((battle) => (
                                                <BattleHistoryCard key={battle.id} battle={battle} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="flex items-center text-blue-400">
                                            <Code className="mr-2 h-5 w-5" />
                                            Language Stats
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {languageStats.map((lang) => (
                                                <LanguageStatCard key={lang.language} lang={lang} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}