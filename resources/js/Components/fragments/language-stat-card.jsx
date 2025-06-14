export default function LanguageStatCard ({ lang }) {
    return (
    <div className="space-y-2">
        <div className="flex justify-between text-sm">
            <span>{lang.language}</span>
            <span className="text-gray-400">
                {lang.battles} battles • {lang.winRate}%
            </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
            <div className={`h-2 rounded-full ${lang.color}`} style={{ width: `${lang.winRate}%` }} />
        </div>
    </div>
)}