import { motion } from "framer-motion"
import { Crown, Award, Star, Zap, Flame, Gem, Trophy, Infinity } from "lucide-react"

const rankConfig = {
    Bronze: { color: "from-amber-600 to-amber-800", icon: Award, bg: "bg-amber-900/20" },
    Silver: { color: "from-gray-400 to-gray-600", icon: Star, bg: "bg-gray-900/20" },
    Master: { color: "from-blue-400 to-blue-600", icon: Zap, bg: "bg-blue-900/20" },
    Epic: { color: "from-purple-400 to-purple-600", icon: Flame, bg: "bg-purple-900/20" },
    Legend: { color: "from-red-400 to-red-600", icon: Crown, bg: "bg-red-900/20" },
    Honor: { color: "from-green-400 to-green-600", icon: Gem, bg: "bg-green-900/20" },
    Glory: { color: "from-yellow-400 to-yellow-600", icon: Trophy, bg: "bg-yellow-900/20" },
    Immortal: {
        color: "from-pink-400 to-purple-600",
        icon: Infinity,
        bg: "bg-gradient-to-r from-pink-900/20 to-purple-900/20",
    },
}

export function RankBadge({ rank, points, size = "md" }) {
    const config = rankConfig[rank] || rankConfig.Bronze
    const Icon = config.icon

    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
    }

    const iconSizes = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    }

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center space-x-2 rounded-full ${config.bg} border border-gray-700 ${sizeClasses[size]}`}
        >
            <Icon className={`${iconSizes[size]} bg-gradient-to-r ${config.color} bg-clip-text text-transparent`} />
            <span className={`font-semibold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{rank}</span>
            <span className="text-gray-400 text-xs">({points} pts)</span>
        </motion.div>
    )
}