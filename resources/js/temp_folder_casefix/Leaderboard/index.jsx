import { motion } from "framer-motion"
import { Trophy, Medal, Award, Crown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/fragments/navbar"
import { RankBadge } from "@/components/fragments/rank-badge"
import renderPlayerCard from "@/components/fragments/render-player-card"

// Mock user data
const user = {
    name: "ClassyCoder",
    points: 360,
    rank: "Master",
}

// Mock leaderboard data
const leaderboard = [
    { id: 1, name: "CodeMaster2024", points: 2150, rank: "Immortal", matches: 89, avgPoints: 24.2 },
    { id: 2, name: "AlgoNinja", points: 1850, rank: "Glory", matches: 76, avgPoints: 24.3 },
    { id: 3, name: "ByteWarrior", points: 1650, rank: "Glory", matches: 68, avgPoints: 24.3 },
    { id: 4, name: "StackOverflow", points: 1420, rank: "Honor", matches: 62, avgPoints: 22.9 },
    { id: 5, name: "DevGuru", points: 1280, rank: "Honor", matches: 58, avgPoints: 22.1 },
    { id: 6, name: "CodeCrusher", points: 1150, rank: "Honor", matches: 54, avgPoints: 21.3 },
    { id: 7, name: "BugHunter", points: 980, rank: "Legend", matches: 48, avgPoints: 20.4 },
    { id: 8, name: "SyntaxSage", points: 850, rank: "Legend", matches: 42, avgPoints: 20.2 },
    { id: 9, name: "LogicLord", points: 720, rank: "Legend", matches: 38, avgPoints: 18.9 },
    { id: 10, name: "Alex Johnson", points: 475, rank: "Epic", matches: 23, avgPoints: 20.7 },
    { id: 11, name: "TechTitan", points: 430, rank: "Epic", matches: 22, avgPoints: 19.5 },
    { id: 12, name: "FunctionFreak", points: 410, rank: "Epic", matches: 20, avgPoints: 20.5 },
    { id: 13, name: "BinaryBoss", points: 390, rank: "Master", matches: 20, avgPoints: 19.5 },
    { id: 14, name: "RecursionRuler", points: 370, rank: "Master", matches: 19, avgPoints: 19.4 },
    { id: 15, name: "ClassyCoder", points: 360, rank: "Master", matches: 18, avgPoints: 20.0 },
]

// Mock top performers data
const topPerformers = [
    { title: "Most Matches", player: "CodeMaster2024", value: "89 matches", icon: Trophy },
    { title: "Highest Points", player: "CodeMaster2024", value: "2150 pts", icon: TrendingUp },
    { title: "Rising Star", player: "ByteWarrior", value: "+150 pts this week", icon: Award },
]

export default function LeaderboardPage() {
    const getUserRank = () => {
        const userIndex = leaderboard.findIndex((player) => player.name === user.name)
        return userIndex !== -1 ? userIndex + 1 : 47 // 47 adalah posisi user di leaderboard
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar user={user} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Global Leaderboard
                        </h1>
                        <p className="text-xl text-gray-300">Top 10 Code Battle Champions</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {topPerformers.map((performer, index) => (
                            <motion.div
                                key={performer.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }}
                            >
                                <Card className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-md border border-purple-500/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardContent className="p-6 text-center space-y-3">
                                        <div className=" flex justify-center">
                                            <performer.icon
                                                className="h-10 w-10 text-purple-400 transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold text-purple-200 tracking-tight">
                                            {performer.title}
                                        </h3>
                                        <p className="text-sm font-medium text-purple-300">
                                            {performer.player}
                                        </p>
                                        <p className="text-xs text-gray-300 opacity-80">
                                            {performer.value}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                                <p className="font-extrabold text-xl text-yellow-400">Rankings</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {leaderboard.slice(0, 10).map((player, index) =>
                                    renderPlayerCard(player, index, user)
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {getUserRank() > 10 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-6"
                        >
                            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-purple-400 font-bold text-lg">#{getUserRank()}</span>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-purple-300">{user.name} (You)</h3>
                                                    <div className="text-sm text-gray-400">
                                                        {user.matches} matches
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <RankBadge rank={user.rank} points={user.points} size="sm" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}