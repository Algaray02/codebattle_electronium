import { motion } from 'framer-motion';

export default function LanguageStatCard({ lang }) {
    return (
        <motion.div
            className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
                    <h3 className="text-lg font-semibold text-white">{lang.language}</h3>
                </div>
                <div className="text-sm text-gray-400">
                    <span className="font-medium">{lang.battles}</span> battles •{' '}
                    <span className="font-medium">{lang.totalPoint}</span> points
                </div>
            </div>
        </motion.div>
    );
}