import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function DifficultyStats({ difficultyStats }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="bg-gray-900/50 border-gray-700 mb-6">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Battle Difficulty Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {difficultyStats.map((stat, index) => (
                            <div key={stat.level} className="text-center p-4 bg-gray-800/30 rounded-lg">
                                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                                    {stat.problems}
                                </div>
                                <div className="text-sm text-gray-200 mb-1">{stat.level} Problems</div>
                                <div className="text-xs text-gray-400">Avg Point Earned: {stat.avgScore}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}