import { motion } from "framer-motion"
import { Crown, Award, Star, Zap, Flame, Gem, Trophy, Infinity } from "lucide-react"

function getRankConfig(rank) {
    switch (rank) {
        case 'Bronze':
            return {
                color: "from-amber-600 to-amber-800",
                icon: Award,
                bg: "bg-amber-900/20",
                text: "text-amber-500"
            }
        case 'Silver':
            return {
                color: "from-gray-400 to-gray-600",
                icon: Star,
                bg: "bg-gray-900/20",
                text: "text-gray-500"
            }
        case 'Master':
            return {
                color: "from-blue-400 to-blue-600",
                icon: Zap,
                bg: "bg-blue-900/20",
                text: "text-blue-500"
            }
        case 'Epic':
            return {
                color: "from-purple-400 to-purple-600",
                icon: Flame,
                bg: "bg-purple-900/20",
                text: "text-purple-500"
            }
        case 'Legend':
            return {
                color: "from-red-400 to-red-600",
                icon: Crown,
                bg: "bg-red-900/20",
                text: "text-red-500"
            }
        case 'Honor':
            return {
                color: "from-green-400 to-green-600",
                icon: Gem,
                bg: "bg-green-900/20",
                text: "text-green-500"
            }
        case 'Glory':
            return {
                color: "from-yellow-400 to-yellow-600",
                icon: Trophy,
                bg: "bg-yellow-900/20",
                text: "text-yellow-500"
            }
        case 'Immortal':
            return {
                color: "from-pink-400 to-purple-600",
                icon: Infinity,
                bg: "bg-gradient-to-r from-pink-900/20 to-purple-900/20",
                text: "text-pink-500"
            }
        default:
            return {
                color: "from-amber-600 to-amber-800",
                icon: Award,
                bg: "bg-amber-900/20",
                text: "text-amber-500"
            }
    }
}

export function RankBadge({ rank, points }) {
    const config = getRankConfig(rank)
    const Icon = config.icon

    const safePoints = points || 0

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center space-x-2 rounded-full ${config.bg} border border-gray-700 px-3 py-2`}
        >
            <Icon className={`h-4 w-4 bg-gradient-to-r ${config.color} bg-clip-text ${config.text}`} />
            <span className={`text-sm font-semibold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                {rank}
            </span>
            <span className="text-gray-400 text-xs">
                ({safePoints.toLocaleString()} pts)
            </span>
        </motion.div>
    )
}

export default RankBadge