import { motion } from "framer-motion"
import { Link } from "@inertiajs/react"
import { Sword, Trophy, Target, TrendingUp, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/fragments/navbar"
import { RankBadge } from "@/components/fragments/rank-badge"

// Mock user data
const user = {
    name: "Alex Johnson",
    points: 450,
    rank: "Epic",
    battlesWon: 23,
    battlesTotal: 31,
    winRate: 74,
    streak: 5,
    recentBattles: [
        { id: 1, problem: "Two Sum", language: "JavaScript", difficulty: "Easy", score: 10, date: "2024-01-15" },
        {
            id: 2,
            problem: "Binary Tree Traversal",
            language: "Python",
            difficulty: "Medium",
            score: 20,
            date: "2024-01-14",
        },
        {
            id: 3,
            problem: "Dynamic Programming",
            language: "Java",
            difficulty: "Hard",
            score: 45,
            date: "2024-01-13",
        },
    ],
}

export default function DashboardPage() {
    const stats = [
        { label: "Total Points", value: user.points, icon: Trophy, color: "text-yellow-400" },
        { label: "Battles Won", value: user.battlesWon, icon: Target, color: "text-green-400" },
        { label: "Win Rate", value: `${user.winRate}%`, icon: TrendingUp, color: "text-blue-400" },
        { label: "Current Streak", value: user.streak, icon: Calendar, color: "text-purple-400" },
    ]

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "bg-green-400"
            case "Medium":
                return "bg-yellow-400"
            case "Hard":
                return "bg-red-400"
            default:
                return "bg-gray-400"
        }
    }

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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                        <p className="text-gray-400">Ready for your next coding challenge?</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-6 mb-8 border border-gray-700">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-xl">
                                    {getInitials(user.name)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <RankBadge rank={user.rank} points={user.points} />
                                </div>
                            </div>
                            <Link href="/battle">
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                    <Sword className="mr-2 h-4 w-4" />
                                    Start Battle
                                </Button>
                            </Link>
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
                                                <p className="text-gray-400 text-sm">{stat.label}</p>
                                                <p className="text-2xl font-bold">{stat.value}</p>
                                            </div>
                                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Card className="bg-gray-900/50 border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Clock className="mr-2 h-5 w-5" />
                                    Recent Battles
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {user.recentBattles.map((battle) => (
                                        <div
                                            key={battle.id}
                                            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(battle.difficulty)}`} />
                                                <div>
                                                    <h4 className="font-medium">{battle.problem}</h4>
                                                    <p className="text-gray-400 text-sm">
                                                        {battle.language} • {battle.difficulty}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-green-400 font-semibold">+{battle.score} pts</p>
                                                <p className="text-gray-400 text-sm">{battle.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <Link href="/profile">
                                        <Button variant="outline" className="border-gray-600 hover:bg-gray-800">
                                            View All Battles
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}