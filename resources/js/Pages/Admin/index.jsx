import { useState } from "react"
import { motion } from "framer-motion"
import { Users, FileText, Trophy, Settings, Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/fragments/navbar"
import { RankBadge } from "@/components/fragments/rank-badge"

// Mock admin user
const adminUser = {
    name: "Admin User",
    points: 0,
    rank: "Admin",
}

// Mock data
const users = [
    {
        id: 1,
        name: "CodeMaster2024",
        email: "codemaster@example.com",
        points: 2150,
        rank: "Immortal",
        status: "Active",
        joinDate: "2024-01-01",
    },
    {
        id: 2,
        name: "AlgoNinja",
        email: "algoninja@example.com",
        points: 1850,
        rank: "Glory",
        status: "Active",
        joinDate: "2024-01-02",
    },
    {
        id: 3,
        name: "ByteWarrior",
        email: "bytewarrior@example.com",
        points: 1650,
        rank: "Glory",
        status: "Suspended",
        joinDate: "2024-01-03",
    },
]

const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", category: "Array", status: "Active", attempts: 1250, successRate: 78 },
    {
        id: 2,
        title: "Binary Tree Traversal",
        difficulty: "Medium",
        category: "Tree",
        status: "Active",
        attempts: 890,
        successRate: 65,
    },
    {
        id: 3,
        title: "Dynamic Programming",
        difficulty: "Hard",
        category: "DP",
        status: "Draft",
        attempts: 456,
        successRate: 42,
    },
]

const systemStats = [
    { label: "Total Users", value: "12,543", icon: Users, color: "text-blue-400" },
    { label: "Active Problems", value: "156", icon: FileText, color: "text-green-400" },
    { label: "Battles Today", value: "2,847", icon: Trophy, color: "text-yellow-400" },
    { label: "System Health", value: "99.9%", icon: Settings, color: "text-purple-400" },
]

export default function AdminPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const filteredProblems = problems.filter(
        (problem) =>
            problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-black">
            <Navbar user={adminUser} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                        <p className="text-gray-400">Manage users, problems, and system settings</p>
                    </div>

                    {/* Tabs Component */}
                    <Tabs defaultValue="overview" className="mb-8">
                        <TabsList className="bg-gray-900/50 p-1 rounded-lg border border-gray-700">
                            <TabsTrigger value="overview" className="flex items-center space-x-2 px-4 py-2">
                                <Settings className="h-4 w-4" />
                                <span>Overview</span>
                            </TabsTrigger>
                            <TabsTrigger value="users" className="flex items-center space-x-2 px-4 py-2">
                                <Users className="h-4 w-4" />
                                <span>Users</span>
                            </TabsTrigger>
                            <TabsTrigger value="problems" className="flex items-center space-x-2 px-4 py-2">
                                <FileText className="h-4 w-4" />
                                <span>Problems</span>
                            </TabsTrigger>
                            <TabsTrigger value="leaderboard" className="flex items-center space-x-2 px-4 py-2">
                                <Trophy className="h-4 w-4" />
                                <span>Leaderboard</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                {/* System Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    {systemStats.map((stat, index) => (
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
                                                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                                                        </div>
                                                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Recent Activity */}
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">Recent Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                                <div>
                                                    <p className="text-white">New user registered: CodeMaster2024</p>
                                                    <p className="text-gray-400 text-sm">2 minutes ago</p>
                                                </div>
                                                <span className="text-green-400 text-sm">User</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                                <div>
                                                    <p className="text-white">Problem "Two Sum" completed 50 times</p>
                                                    <p className="text-gray-400 text-sm">15 minutes ago</p>
                                                </div>
                                                <span className="text-blue-400 text-sm">Problem</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                                <div>
                                                    <p className="text-white">System maintenance completed</p>
                                                    <p className="text-gray-400 text-sm">1 hour ago</p>
                                                </div>
                                                <span className="text-purple-400 text-sm">System</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        {/* Users Tab */}
                        <TabsContent value="users">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            placeholder="Search users..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 bg-gray-800 border-gray-600 text-white w-64"
                                        />
                                    </div>
                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add User
                                    </Button>
                                </div>

                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-800/50">
                                                    <tr>
                                                        <th className="text-left p-4 text-gray-300">User</th>
                                                        <th className="text-left p-4 text-gray-300">Email</th>
                                                        <th className="text-left p-4 text-gray-300">Rank</th>
                                                        <th className="text-left p-4 text-gray-300">Status</th>
                                                        <th className="text-left p-4 text-gray-300">Join Date</th>
                                                        <th className="text-left p-4 text-gray-300">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredUsers.map((user) => (
                                                        <tr key={user.id} className="border-t border-gray-700">
                                                            <td className="p-4">
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                                        {user.name.charAt(0)}
                                                                    </div>
                                                                    <span className="text-white">{user.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-gray-300">{user.email}</td>
                                                            <td className="p-4">
                                                                <RankBadge rank={user.rank} points={user.points} size="sm" />
                                                            </td>
                                                            <td className="p-4">
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs ${user.status === "Active"
                                                                            ? "bg-green-900/20 text-green-400"
                                                                            : "bg-red-900/20 text-red-400"
                                                                        }`}
                                                                >
                                                                    {user.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-gray-300">{user.joinDate}</td>
                                                            <td className="p-4">
                                                                <div className="flex space-x-2">
                                                                    <Button variant="ghost" size="sm">
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        {/* Problems Tab */}
                        <TabsContent value="problems">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            placeholder="Search problems..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 bg-gray-800 border-gray-600 text-white w-64"
                                        />
                                    </div>
                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Problem
                                    </Button>
                                </div>

                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-800/50">
                                                    <tr>
                                                        <th className="text-left p-4 text-gray-300">Problem</th>
                                                        <th className="text-left p-4 text-gray-300">Difficulty</th>
                                                        <th className="text-left p-4 text-gray-300">Category</th>
                                                        <th className="text-left p-4 text-gray-300">Status</th>
                                                        <th className="text-left p-4 text-gray-300">Attempts</th>
                                                        <th className="text-left p-4 text-gray-300">Success Rate</th>
                                                        <th className="text-left p-4 text-gray-300">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredProblems.map((problem) => (
                                                        <tr key={problem.id} className="border-t border-gray-700">
                                                            <td className="p-4 text-white font-medium">{problem.title}</td>
                                                            <td className="p-4">
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs ${problem.difficulty === "Easy"
                                                                            ? "bg-green-900/20 text-green-400"
                                                                            : problem.difficulty === "Medium"
                                                                                ? "bg-yellow-900/20 text-yellow-400"
                                                                                : "bg-red-900/20 text-red-400"
                                                                        }`}
                                                                >
                                                                    {problem.difficulty}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-gray-300">{problem.category}</td>
                                                            <td className="p-4">
                                                                <span
                                                                    className={`px-2 py-1 rounded-full text-xs ${problem.status === "Active"
                                                                            ? "bg-green-900/20 text-green-400"
                                                                            : "bg-gray-900/20 text-gray-400"
                                                                        }`}
                                                                >
                                                                    {problem.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-gray-300">{problem.attempts.toLocaleString()}</td>
                                                            <td className="p-4 text-gray-300">{problem.successRate}%</td>
                                                            <td className="p-4">
                                                                <div className="flex space-x-2">
                                                                    <Button variant="ghost" size="sm">
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        {/* Leaderboard Tab */}
                        <TabsContent value="leaderboard">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">Leaderboard Management</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                                <div>
                                                    <h3 className="text-white font-medium">Reset Monthly Rankings</h3>
                                                    <p className="text-gray-400 text-sm">Clear all monthly scores and start fresh</p>
                                                </div>
                                                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">
                                                    Reset
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                                <div>
                                                    <h3 className="text-white font-medium">Export Leaderboard Data</h3>
                                                    <p className="text-gray-400 text-sm">Download current rankings as CSV</p>
                                                </div>
                                                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                                                    Export
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                                <div>
                                                    <h3 className="text-white font-medium">Recalculate Rankings</h3>
                                                    <p className="text-gray-400 text-sm">Refresh all user rankings and points</p>
                                                </div>
                                                <Button className="bg-purple-600 hover:bg-purple-700">Recalculate</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    )
}