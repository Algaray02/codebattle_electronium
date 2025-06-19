import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Settings,
    Users,
    Trophy,
    Code,
    Target,
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    Zap,
    Swords
} from "lucide-react"
import Navbar from "@/components/fragments/navbar"
import SystemStats from "@/components/fragments/system-stats"
import DifficultyStats from "@/components/fragments/difficult-stats"
import UsersTable from "@/components/fragments/users-table"

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
        battlesTotal: 52,
        status: "Active",
        joined: "2024-01-15",
    },
    {
        id: 2,
        name: "AlgoNinja",
        email: "algoninja@example.com",
        points: 1850,
        rank: "Glory",
        battlesTotal: 44,
        status: "Active",
        joined: "2024-02-03",
    },
    {
        id: 3,
        name: "ByteWarrior",
        email: "bytewarrior@example.com",
        points: 1650,
        rank: "Glory",
        battlesTotal: 41,
        status: "Suspended",
        joined: "2024-01-28",
    },
    {
        id: 4,
        name: "JSExplorer",
        email: "jsexplorer@example.com",
        points: 950,
        rank: "Legend",
        battlesTotal: 28,
        status: "Active",
        joined: "2024-03-10",
    },
    {
        id: 5,
        name: "PythonPro",
        email: "pythonpro@example.com",
        points: 450,
        rank: "Epic",
        battlesTotal: 18,
        status: "Active",
        joined: "2024-04-01",
    }
  ]

const systemStats = [
    {
        label: "Total Users",
        value: "12,543",
        icon: Users,
        color: "text-blue-400",
    },
    {
        label: "Battles Today",
        value: "2,847",
        icon: Swords,
        color: "text-yellow-400",
    },
    {
        label: "Active Coders",
        value: "8,921",
        icon: Code,
        color: "text-green-400",
    },
    {
        label: "Most Chosen Language",
        value: "45,629",
        icon: Target,
        color: "text-purple-400",
    }
]

const difficultyStats = [
    { level: "Easy", problems: 1256, avgScore: "8.7", color: "text-green-400" },
    { level: "Medium", problems: 2847, avgScore: "23.4", color: "text-yellow-400" },
    { level: "Hard", problems: 1892, avgScore: "41.8", color: "text-red-400" }
]

export default function AdminPage() {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="min-h-screen bg-black">
            <Navbar user={adminUser} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Code Battle Dashboard</h1>
                        <p className="text-gray-200">Manage your coding battle platform</p>
                    </div>

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
                            <TabsTrigger value="battles" className="flex items-center space-x-2 px-4 py-2">
                                <Zap className="h-4 w-4" />
                                <span>Battles</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <SystemStats stats={systemStats} />
                                <DifficultyStats difficultyStats={difficultyStats} />
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="users">
                            <UsersTable
                                users={users}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        </TabsContent>

                        <TabsContent value="battles">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="bg-gray-900/50 border-gray-700">
                                    <CardContent className="p-6 text-center">
                                        <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-white mb-2">Battle Management</h3>
                                        <p className="text-gray-400 mb-4">Monitor active battles and problem generation</p>
                                        <Button className="bg-purple-600 hover:bg-purple-700">
                                            View Active Battles
                                        </Button>
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