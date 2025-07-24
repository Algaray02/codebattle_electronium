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
    User,
    Users,
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
import { Link } from "@inertiajs/react";

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

export default function ProfilePage({
    user: Userss,
    battleHistory,
    languageStats,
}) {
    const hasBattles = battleHistory.data.length > 0;
    const battleHistoryCheck = battleHistory.data.length > 1;
    const latestBattle =
        battleHistory.data && battleHistory.data.length > 0
            ? battleHistory.data[0]
            : null;
    const stats = [
        {
            label: "Total Points",
            value: Userss.total_point,
            icon: Trophy,
            color: "text-yellow-400",
            gradient: { from: "yellow", to: "orange" },
        },
        {
            label: "Total Matches",
            value: Userss.totalMatches,
            icon: Swords,
            color: "text-green-400",
            gradient: { from: "emerald", to: "cyan" },
        },
        {
            label: "Favorite Language",
            value: Userss.favoriteLanguage,
            icon: Code,
            color: "text-blue-400",
            gradient: { from: "blue", to: "purple" },
        },
        {
            label: "Highest Rank",
            value: Userss.badge.name,
            icon: Crown,
            color: "text-orange-400",
            gradient: { from: "orange", to: "pink" },
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar user={Userss} />
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
                                    name={Userss.name}
                                    // imageUrl={userss.imageUrl}
                                />
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                                        {Userss.name}
                                    </h1>
                                    <p className="text-gray-400 mb-3">
                                        {Userss.email}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="text-sm text-gray-400">
                                            Member since{" "}
                                            {new Date(
                                                Userss.created_at
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <EditProfileDialog
                                        user={Userss}
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

                    <div className="container mx-auto p-8">
                        {hasBattles ? (
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Left Column - Recent Battle */}
                                <div className="lg:col-span-2 space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <RecentBattleCard
                                            battle={latestBattle}
                                        />
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
                                                rank={Userss.badge.name}
                                                winRate={Userss.winRate}
                                                points={Userss.total_point}
                                            />
                                        </EnhancedCard>
                                    </motion.div>

                                    {battleHistoryCheck && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                            }}
                                        >
                                            <EnhancedCard
                                                gradientFrom="purple"
                                                gradientTo="pink"
                                            >
                                                <BattleHistoryList
                                                    battles={battleHistory.data}
                                                />
                                            </EnhancedCard>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Language Statistics Chart */}
                                <div className="lg:col-span-3">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.2,
                                        }}
                                    >
                                        <EnhancedCard
                                            gradientFrom="purple"
                                            gradientTo="pink"
                                            padding="p-6"
                                        >
                                            <LanguagePieChart
                                                data={languageStats}
                                            />
                                        </EnhancedCard>
                                    </motion.div>
                                </div>
                            </div>
                        ) : (
                            // Tampilan JIKA TIDAK ADA data battle, dibuat terpusat
                            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                                <div className="p-10 bg-gray-900/50 border border-dashed border-gray-700 rounded-lg">
                                    <h3 className="text-xl font-semibold text-white">
                                        Anda Belum Memulai Pertarungan
                                    </h3>
                                    <p className="text-gray-400 mt-2 mb-4">
                                        Mulai pertarungan pertama Anda untuk
                                        melihat statistik di sini.
                                    </p>
                                    <Link
                                        href={route("battle.index")}
                                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors"
                                    >
                                        Mulai Battle Sekarang
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
