import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/fragments/navbar";
import { RankBadge } from "@/components/fragments/rank-badge";

// Komponen untuk merender setiap baris pemain
const PlayerCard = ({ player, index, isCurrentUser }) => {
    const rank = index + 1;
    let cardClass = "bg-gray-800/50 border-gray-700/50";
    if (isCurrentUser) {
        cardClass =
            "bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-purple-500/50";
    }

    let rankIcon;
    if (rank === 1) rankIcon = "🥇";
    else if (rank === 2) rankIcon = "🥈";
    else if (rank === 3) rankIcon = "🥉";
    else rankIcon = `#${rank}`;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
        >
            <Card className={cardClass}>
                <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="font-bold text-lg w-8 text-center text-gray-300">
                                {rankIcon}
                            </span>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                                    {player.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-300">
                                        {player.name} {isCurrentUser && "(You)"}
                                    </h3>
                                    <div className="text-sm text-gray-400">
                                        {player.battle_stages_count} matches
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RankBadge
                            rank={player.badge?.name}
                            points={player.total_point}
                            size="sm"
                        />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default function LeaderboardPage({ user, leaderboard, currentUser }) {
    return (
        <div
            className="min-h-screen bg-black text-gray-300
        "
        >
            <Navbar user={user} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Global Leaderboard
                        </h1>
                        <p className="text-xl text-gray-300">
                            Top 10 Code Battle Champions
                        </p>
                    </div>

                    <Card className="bg-gray-900/50 border-gray-700">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Trophy className="mr-2 h-6 w-6 text-yellow-400" />
                                <p className="font-extrabold text-xl text-yellow-400">
                                    Rankings
                                </p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {leaderboard
                                    .slice(1, 11)
                                    .map((player, index) => (
                                        <PlayerCard
                                            key={player.id}
                                            player={player}
                                            index={index}
                                            isCurrentUser={
                                                player.id === currentUser.id
                                            }
                                        />
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tampilkan kartu rank user jika tidak masuk 10 besar */}
                    {currentUser.rank_position > 10 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-6"
                        >
                            <PlayerCard
                                player={currentUser}
                                index={currentUser.rank_position - 1}
                                isCurrentUser={true}
                            />
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
