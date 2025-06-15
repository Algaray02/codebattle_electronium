import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function RecentActivity() {
    const activities = [
        {
            description: "New user registered: CodeMaster2024",
            time: "2 minutes ago",
            type: "User",
            color: "text-green-400",
        },
        {
            description: "Problem 'Two Sum' completed 50 times",
            time: "15 minutes ago",
            type: "Problem",
            color: "text-blue-400",
        },
        {
            description: "System maintenance completed",
            time: "1 hour ago",
            type: "System",
            color: "text-purple-400",
        },
    ]

    return (
        <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                                <p className="text-white">{activity.description}</p>
                                <p className="text-gray-200 text-sm">{activity.time}</p>
                            </div>
                            <span className={`text-sm ${activity.color}`}>{activity.type}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}