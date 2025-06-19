import React from 'react'
import { motion } from "framer-motion"
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RankBadge from './rank-badge'

export default function UsersTable({ users, searchTerm, setSearchTerm }) {
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
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
                                    <th className="text-left p-4 text-gray-200">User</th>
                                    <th className="text-center p-4 text-gray-200">Rank</th>
                                    <th className="text-center p-4 text-gray-200">Total Battle</th>
                                    <th className="text-left p-4 text-gray-200">Status</th>
                                    <th className="text-left p-4 text-gray-200">Joined</th>
                                    <th className="text-center p-4 text-gray-200">Actions</th>
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
                                                <div>
                                                    <span className="text-white font-medium">{user.name}</span>
                                                    <p className="text-gray-400 text-xs">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <RankBadge points={user.points} rank={user.rank} size="sm" />
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="text-sm">
                                                <span className="text-green-400">{user.battlesTotal}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.status === "Active"
                                                ? "bg-green-900/20 text-green-400"
                                                : "bg-red-900/20 text-red-400"
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-200 text-sm">{user.joined}</td>
                                        <td className="p-4">
                                            <div className="flex space-x-2 justify-center">
                                                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
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
    )
}