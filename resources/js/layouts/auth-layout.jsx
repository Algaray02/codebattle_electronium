import { motion } from "framer-motion"
import { Sword } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function AuthLayout({ title, description, children }) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md"
            >
                <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-lg border border-gray-700">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                            <Sword className="h-8 w-8 text-purple-500" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Code Battle
                            </span>
                        </Link>
                        <h1 className="text-2xl font-bold mb-2">{title}</h1>
                        <p className="text-gray-400">{description}</p>
                    </div>
                    {children}
                </div>
            </motion.div>
        </div>
    )
}
