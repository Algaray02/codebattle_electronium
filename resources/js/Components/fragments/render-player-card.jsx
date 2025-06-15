import { motion } from "framer-motion"
import { RankBadge } from "./rank-badge"
import { Award, Crown, Medal } from "lucide-react"

export default function renderPlayerCard(player, index, user) {
    const getRankIcon = (position) => {
        switch (position) {
            case 1:
                return <Crown className="h-6 w-6 text-yellow-400" />
            case 2:
                return <Medal className="h-6 w-6 text-gray-400" />
            case 3:
                return <Award className="h-6 w-6 text-amber-600" />
            default:
                return <span className="text-gray-400 font-bold text-lg">#{position}</span>
        }
    }

    const getPositionBg = (position) => {
        switch (position) {
            case 1:
                return "bg-gradient-to-r from-yellow-400/20 to-yellow-800/20 border-yellow-400/30"
            case 2:
                return "bg-gradient-to-r from-gray-400/20 to-gray-800/20 border-gray-100/30"
            case 3:
                return "bg-gradient-to-r from-amber-800/20 to-amber-800/20 border-amber-600/30"
            default:
                return "bg-gray-900/50 border-gray-700"
        }
    }

    return (
        <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`p-4 rounded-lg border ${getPositionBg(index + 1)} ${player.name === user.name ? "ring-2 ring-purple-500" : ""
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">{getRankIcon(index + 1)}</div>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                            {player.name.charAt(0)}
                        </div>
                        <div>
                            <h3
                                className={`font-semibold ${player.name === user.name ? "text-purple-300" : "text-white"}`}
                            >
                                {player.name}
                                {player.name === user.name && (
                                    <span className="ml-2 text-xs bg-purple-600 px-2 py-1 rounded-full">You</span>
                                )}
                            </h3>
                            <span className="text-gray-400 text-sm">{player.matches} matches</span>
                        </div>
                    </div>
                </div>
                <RankBadge rank={player.rank} points={player.points} size="sm" />
            </div>
        </motion.div>
    )
}