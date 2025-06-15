import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import {
    RotateCcw,
    Download,
    Calculator,
    AlertTriangle,
    CheckCircle,
    Loader2,
    Users,
    Trophy,
    Calendar,
    Settings
} from "lucide-react"

export default function EnhancedLeaderboardManagement() {
    const [loadingStates, setLoadingStates] = useState({})
    const [completedActions, setCompletedActions] = useState(new Set())
    const [showConfirmation, setShowConfirmation] = useState(null)

    const handleAction = async (actionId, requiresConfirmation = false) => {
        if (requiresConfirmation && !showConfirmation) {
            setShowConfirmation(actionId)
            return
        }

        setLoadingStates(prev => ({ ...prev, [actionId]: true }))
        setShowConfirmation(null)

        // Simulate async operation
        setTimeout(() => {
            setLoadingStates(prev => ({ ...prev, [actionId]: false }))
            setCompletedActions(prev => new Set([...prev, actionId]))

            // Remove completed state after 3 seconds
            setTimeout(() => {
                setCompletedActions(prev => {
                    const newSet = new Set(prev)
                    newSet.delete(actionId)
                    return newSet
                })
            }, 3000)
        }, 2000)
    }

    const actions = [
        {
            id: "reset",
            title: "Reset Monthly Rankings",
            description: "Clear all monthly scores and start fresh for the new period",
            icon: RotateCcw,
            button: {
                variant: "default",
                className: "bg-red-600 hover:bg-red-700 text-white",
                text: "Reset Rankings"
            },
            requiresConfirmation: true,
            dangerLevel: "high"
        },
        {
            id: "export",
            title: "Export Leaderboard Data",
            description: "Download current rankings, scores, and user data as CSV file",
            icon: Download,
            button: {
                variant: "default",
                className: "bg-green-600 hover:bg-green-700 text-white",
                text: "Export Data"
            },
            requiresConfirmation: false,
            dangerLevel: "low"
        },
        {
            id: "recalculate",
            title: "Recalculate Rankings",
            description: "Refresh all user rankings, points, and leaderboard positions",
            icon: Calculator,
            button: {
                variant: "default",
                className: "bg-yellow-600 hover:bg-yellow-700 text-white",
                text: "Recalculate"
            },
            requiresConfirmation: false,
            dangerLevel: "medium"
        },
    ]

    const getActionStatus = (actionId) => {
        if (loadingStates[actionId]) return "loading"
        if (completedActions.has(actionId)) return "completed"
        return "idle"
    }

    const renderActionButton = (action) => {
        const status = getActionStatus(action.id)
        const isLoading = status === "loading"
        const isCompleted = status === "completed"

        return (
            <Button
                variant={action.button.variant}
                className={`${action.button.className} min-w-[140px] transition-all duration-200 ${isCompleted ? "bg-green-600 hover:bg-green-700 border-green-500 text-white" : ""
                    }`}
                onClick={() => handleAction(action.id, action.requiresConfirmation)}
                disabled={isLoading}
            >
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                        >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                        </motion.div>
                    ) : isCompleted ? (
                        <motion.div
                            key="completed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Completed
                        </motion.div>
                    ) : (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                        >
                            <action.icon className="w-4 h-4" />
                            {action.button.text}
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Main Management Card */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        Leaderboard Management
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {actions.map((action, index) => (
                            <motion.div
                                key={action.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`group relative overflow-hidden rounded-lg border transition-all duration-200 ${action.dangerLevel === "high"
                                        ? "border-red-500/20 bg-red-950/20 hover:border-red-500/40"
                                        : action.dangerLevel === "medium"
                                            ? "border-yellow-500/20 bg-yellow-950/20 hover:border-yellow-500/40"
                                            : "border-green-600/20 bg-green-800/20 hover:border-green-500/40"
                                    }`}
                            >
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${action.dangerLevel === "high"
                                                ? "bg-red-500/20 text-red-400"
                                                : action.dangerLevel === "medium"
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : "bg-green-500/20 text-green-400"
                                            }`}>
                                            <action.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-white font-medium">{action.title}</h3>
                                                {action.dangerLevel === "high" && (
                                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                                )}
                                            </div>
                                            <p className="text-gray-300 text-sm mt-1">{action.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {renderActionButton(action)}
                                    </div>
                                </div>

                                {/* Progress bar for loading states */}
                                {loadingStates[action.id] && (
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 2 }}
                                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 origin-left"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowConfirmation(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-400" />
                                <h3 className="text-lg font-semibold text-white">Confirm Action</h3>
                            </div>
                            <p className="text-gray-300 mb-6">
                                Are you sure you want to reset all monthly rankings? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <Button
                                    variant="outline"
                                    className="border-gray-600 text-gray-900 hover:bg-gray-800"
                                    onClick={() => setShowConfirmation(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => handleAction(showConfirmation, false)}
                                >
                                    Reset Rankings
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}